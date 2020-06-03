import boto3
import os
import sys
import uuid
from urllib.parse import unquote_plus
import cv2
import numpy as np
import os

# debug
import json

s3_client = boto3.client('s3')
dynamo_db = boto3.resource('dynamodb')
yolov3_download_url = 'https://pjreddie.com/media/files/yolov3.weights'
model = 'yolov3.weights'
cfg = 'yolov3.cfg'
class_file = "coco.names"
classes = None
confThreshold = 0.5  # Confidence threshold
with open(class_file, 'rt') as f:
    classes = f.read().rstrip('\n').split('\n')


# def download_yolov3():
#     print('downloading yolov3.weight...')
#     r = reqests.get(yolov3_download_url)
#     with open(model, "wb") as file:
#         file.write(r.content)
#     print('downloading yolov3.weight successfully')


def lambda_handler(event, context):
    result=[]
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = unquote_plus(record['s3']['object']['key'])
        tmpkey = key.replace('/', '')
        download_path = 'tmp/{}{}'.format(uuid.uuid4(), tmpkey)
        print(bucket, key, download_path)
        s3_client.download_file(bucket, key, download_path)
        with open(download_path, "rb") as file:
            image = file.read()
            result_list = detect_image(image)
            print(result_list)
            image_s3_url = "https://{}.s3.amazonaws.com/{}".format(bucket, key)
            table = dynamo_db.Table('FIT5225Assignment2')
            response = table.put_item(
                Item={
                    'id':"{}{}".format(uuid.uuid4(), tmpkey),
                    'tag':result_list,
                    'link':image_s3_url
                }
            )
            result.append(response)
    print(result)
    return result

def detect_image(image):
    result_map = []
    nparr = np.fromstring(image, np.uint8)
    img_np = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    blob = cv2.dnn.blobFromImage(img_np, 1 / 255, (416, 416), [0, 0, 0], 1, crop=False)
    cv_detection = cv2.dnn.readNetFromDarknet(cfg, model)
    cv_detection.setInput(blob)
    outs = cv_detection.forward(_get_output_layers(cv_detection))
    values = {}
    for out in outs:
        for detection in out:
            scores = detection[5:]
            classId = np.argmax(scores)
            confidence = scores[classId]
            if confidence > confThreshold:
                values[classes[classId]] = confidence
    for key, value in values.items():
        result_map.append(key)
    return result_map


def _get_output_layers(cv_detection):
    layerNames = cv_detection.getLayerNames()
    return [layerNames[i[0] - 1] for i in cv_detection.getUnconnectedOutLayers()]


if __name__ == "__main__":
    with open("test.json", "r") as file:
        lambda_handler(json.load(file), 1)

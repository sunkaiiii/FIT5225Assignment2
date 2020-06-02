import cv2
import numpy as np
import json

model = 'yolov3.weights'
cfg = 'yolov3.cfg'
class_file = "coco.names"
classes = None
confThreshold = 0.5  # Confidence threshold
with open(class_file, 'rt') as f:
    classes = f.read().rstrip('\n').split('\n')


def find_objects(event, context):
    image = event['image']


def detect_image(image):
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
        detected_object = {"label": key, "accuracy": str(value)}
        # result_map.get("objects").append(detected_object)


def _get_output_layers(cv_detection):
    layerNames = cv_detection.getLayerNames()
    return [layerNames[i[0] - 1] for i in cv_detection.getUnconnectedOutLayers()]

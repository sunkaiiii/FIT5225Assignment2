import json
import base64
import boto3


def lambda_handler(event, context):
    file_content = base64.b64decode(event['content'])
    file_path = event['filename']
    bucket_name = "fit5225-ass2"
    s3 = boto3.client('s3')
    try:
        s3_response = s3.put_object(Bucket=bucket_name, Key=file_path, Body=file_content, ACL='public-read')
    except Exception as e:
        raise IOError(e)
    return {
        'statusCode': 200,
        'body': {
            'file_path': file_path
        }
    }


if __name__ == "__main__":
    request = {}
    file_name = 'S51223-093756.jpg'

    with open(file_name, 'rb') as f:
        request['content'] = base64.b64encode(f.read()).decode('ascii')
        request['filename'] = 'S51223-093756.jpg'
        print(json.dumps(request))
        lambda_handler(request, 1)

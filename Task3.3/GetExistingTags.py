import json
def lambda_handler(event, context):
    with open("coco.names") as file:   #get all the tags from coco.name
        result = {"tags": file.read().split("\n")}
        return {
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": True,
            },
            "statusCode": 200,
            "body": json.dumps(result),
            "isBase64Encoded": "false"
        }

if __name__ == '__main__':
    print(lambda_handler(1,1))

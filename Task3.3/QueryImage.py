import json
import boto3
from boto3.dynamodb.conditions import Attr, Or


def lambda_handler(event, context):
    query_parameters = event["queryStringParameters"]
    tags = []
    [tags.append(value) for value in query_parameters.values()]
    if len(tags) == 1:
        filter_expression = Attr("tag").contains(tags[0])
    else:
        filter_expression = Or(*[(Attr("tag").contains(value)) for value in tags])
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table("FIT5225Assignment2")
    response = table.scan(
        FilterExpression=filter_expression
    )
    result = {"links": []}
    [result["links"].append(item["link"]) for item in response["Items"]]
    return {
        "statusCode": 200,
        "body": json.dumps(result),
        "isBase64Encoded": "false"
    }


if __name__ == '__main__':
    print(lambda_handler(json.load(open("test.json", "rb")), 1))

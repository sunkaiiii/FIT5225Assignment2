import json
import boto3
from boto3.dynamodb.conditions import Attr


def lambda_handler(event, context):
    if event["queryStringParameters"] is None:  # identify search tag exist or not
        return {
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": True,
            },
            "statusCode": 200,
            "body": json.dumps("please enter a tag"),
            "isBase64Encoded": "false"
        }
    else:
        query_parameters = event["queryStringParameters"]  # get the query
        tags = []
        [tags.append(value) for value in query_parameters.values()]  # store all the tags in a list
        filter_expression = None
        for value in tags:  # make the filter condition
            if filter_expression is None:
                filter_expression = Attr("tag").contains(value)
            else:
                filter_expression = filter_expression & Attr("tag").contains(value)
        dynamodb = boto3.resource("dynamodb")
        table = dynamodb.Table("FIT5225Assignment2")
        response = table.scan(
            FilterExpression=filter_expression
        )
        result = {"links": []}
        [result["links"].append(item["link"]) for item in response["Items"]]
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
    print(lambda_handler(json.load(open("test.json", "rb")), 1))

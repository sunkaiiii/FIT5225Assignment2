import boto3
import json
from boto3.dynamodb.conditions import Attr, And


def lambda_handler(event, context):
    if event["queryStringParameters"] is None:  # identify search tag exist or not
        return {
            "statusCode": 200,
            "body": json.dumps("please enter a tag"),
            "isBase64Encoded": "false"
        }
    else:
        query_parameters = event["queryStringParameters"]  # get the query
        tags = []
        [tags.append(value) for value in query_parameters.values()]  # store all the tags in a list
        if len(tags) == 1:
            filter_expression = Attr("tag").contains(tags[0])  # if only one searching tags
        else:
            filter_expression = And(*[(Attr("tag").contains(value)) for value in tags])
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

import boto3
import json
from boto3.dynamodb.conditions import Attr, And


def lambda_handler(event, context):
    query_parameters = event["queryStringParameters"]  #get the query
    tags = []
    [tags.append(value) for value in query_parameters.values()] #store all the tags in a list
    if len(tags) == 1:
        filter_expression = Attr("tag").contains(tags[0]) #if only one searching tags
    else:
        filter_expression = And(*[(Attr("tag").contains(value)) for value in tags]) #if mutiable tags, store them
                                                                                    # and set the and expression to
                                                                                    # search image containing all tags
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table("todos")
    response = table.scan(
        FilterExpression=filter_expression      # setting the filter expression
    )
    result = {"links": []}
    [result["links"].append(item["link"]) for item in response["Items"]]
    return {
        "statusCode": 200,
        "body": json.dumps(result),
        "isBase64Encoded": "false"
    }
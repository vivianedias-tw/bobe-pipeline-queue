import logging
import json

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)
 
def main(event, context):
    body = json.loads(event['body'])
    logger.info(f'Request body: {body}')


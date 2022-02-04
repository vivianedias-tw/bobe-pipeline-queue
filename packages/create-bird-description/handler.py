import logging

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)
 
def main(event, context, callback):
    logger('EVENT', event)
    logger('CONTEXT', context)
    return callback("YOU'RE NEXT IN LINE")


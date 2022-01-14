const AWS = require("aws-sdk");

AWS.config.update({ region: process.env.AWS_REGION });
const sqs = new AWS.SQS();
const QUEUE_NAME = "BobeQueue";

const getQueueUrl = (context) => {
  const region = context.invokedFunctionArn.split(":")[3];
  const accountId = context.invokedFunctionArn.split(":")[4];
  const queueUrl = `https://sqs.${region}.amazonaws.com/${accountId}/${QUEUE_NAME}`;

  return queueUrl;
};

module.exports = { sqs, getQueueUrl };

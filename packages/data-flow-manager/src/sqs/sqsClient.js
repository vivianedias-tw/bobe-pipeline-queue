const AWS = require("aws-sdk");

AWS.config.update({ region: process.env.AWS_REGION, apiVersion: "latest" });
const sqs = new AWS.SQS();

module.exports = sqs;

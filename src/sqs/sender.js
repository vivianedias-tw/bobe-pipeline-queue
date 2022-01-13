const AWS = require("aws-sdk");

AWS.config.update({ region: process.env.AWS_REGION });
const sqs = new AWS.SQS();

const sender = async (event, context) => {
  let statusCode = 200;
  let message;
  const records = event.Records;

  if (records.length < 1) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "No record was found",
      }),
    };
  }

  const region = context.invokedFunctionArn.split(":")[3];
  const accountId = context.invokedFunctionArn.split(":")[4];
  const queueName = "BobeQueue";
  const queueUrl = `https://sqs.${region}.amazonaws.com/${accountId}/${queueName}`;

  try {
    const filesToQueue = records.map(async (record) => {
      const filename = record.s3.object.key;
      const filesize = record.s3.object.size;
      const id = record.s3.object.eTag;
      await sqs
        .sendMessage({
          QueueUrl: queueUrl,
          MessageGroupId: `${process.env.AWS_MESSAGE_GROUP}`,
          MessageBody: JSON.stringify({
            filename,
            filesize,
          }),
          MessageDeduplicationId: id,
          MessageAttributes: {
            AttributeNameHere: {
              StringValue: "Attribute Value Here",
              DataType: "String",
            },
          },
        })
        .promise();
    });

    await Promise.all(filesToQueue);

    message = "Records placed in the Queue!";
  } catch (error) {
    console.log(error);
    message = error;
    statusCode = 500;
  }

  return {
    statusCode,
    body: JSON.stringify({
      message,
    }),
  };
};

module.exports = sender;

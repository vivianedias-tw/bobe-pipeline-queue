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

  try {
    const filesToQueue = records.map(async (record) => {
      const filename = record.s3.object.key;
      const filesize = record.s3.object.size;
      console.log(record);

      await sqs
        .sendMessage({
          QueueUrl: `${process.env.AWS_QUEUE_URL}`,
          MessageGroupId: `${process.env.AWS_MESSAGE_GROUP}`,
          MessageBody: JSON.stringify({
            filename,
            filesize,
          }),
          MessageDeduplicationId: "2",
          MessageAttributes: {
            AttributeNameHere: {
              StringValue: "Attribute Value Here",
              DataType: "String",
            },
          },
        })
        .promise();
    });

    Promise.all(filesToQueue);

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

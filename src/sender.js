const { sqs, getQueueUrl } = require("./sqs/sqsClient");

const sender = async (event, context) => {
  let statusCode = 200;
  let message;
  const records = event.Records;

  if (records && records.length < 1) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "No record was found",
      }),
    };
  }

  const queueUrl = getQueueUrl(context);

  try {
    const filesToQueue = records.map(async (record) => {
      const filename = record.s3.object.key;
      const filesize = record.s3.object.size;

      await sqs
        .sendMessage({
          QueueUrl: queueUrl,
          MessageBody: JSON.stringify({
            filename,
            filesize,
          }),
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

const { sqs, getQueueUrl } = require("./sqs/sqsClient");

const publisher = async (event, context) => {
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

  const queueUrl = process.env.AWS_QUEUE_URL;

  try {
    const filesToQueue = records.map(async (record) => {
      console.log("S3 OBJECT", JSON.stringify(record, null, 2));
      const filename = record.s3.object.key;
      const filesize = record.s3.object.size;
      const id = record.s3.object.eTag;

      await sqs
        .sendMessage({
          QueueUrl: queueUrl,
          MessageBody: JSON.stringify({
            filename,
            filesize,
          }),
          MessageGroupId: `${process.env.AWS_MESSAGE_GROUP}`,
          MessageDeduplicationId: id,
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

module.exports = publisher;

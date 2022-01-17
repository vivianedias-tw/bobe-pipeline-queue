const worker = function (event, context) {
  // SQS may invoke with multiple messages
  for (const message of event.Records) {
    const bodyData = JSON.parse(message.body);
    console.log("BODY DATA", bodyData);

    const fileName = bodyData.fileName;
    return fileName;
  }
};

module.exports = worker;

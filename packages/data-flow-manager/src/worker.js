const worker = function (event, context) {
  // SQS may invoke with multiple messages
  for (const message of event.Records) {
    console.log("MESSAGE", message);
    const parsedMessage = JSON.parse(message);

    return parsedMessage.body;
  }
};

module.exports = worker;

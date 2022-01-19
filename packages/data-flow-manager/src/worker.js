const worker = function (event, context) {
  // SQS may invoke with multiple messages
  for (const message of event.Records) {
    const message = JSON.parse(message);
    console.log("MESSAGE", message);

    return message.body;
  }
};

module.exports = worker;

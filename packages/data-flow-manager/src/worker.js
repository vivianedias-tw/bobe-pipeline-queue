const invokeLambda = require("./lambda/invoke");

const worker = function (event, context) {
  for (const message of event.Records) {
    console.log("MESSAGE", message);

    const { messageAttributes } = message;

    const lambdaName =
      messageAttributes &&
      messageAttributes.Service &&
      messageAttributes.Service.stringValue;

    const params = {
      FunctionName: lambdaName,
      InvocationType: "RequestResponse",
      LogType: "Tail",
      Payload: message.body,
    };

    invokeLambda(params, context);

    return message.body;
  }
};

module.exports = worker;

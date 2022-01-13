const sqsClient = require("./sqs/sqsClient");

const handler = async (event, context) => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  console.log("Received context:", JSON.stringify(context, null, 2));

  try {
    const result = await sqsClient.sendMessage({ id: 2, action: "y" });
    return result;
  } catch (error) {
    console.log(`ERRO: ${error}`);
    throw new Error(`ERROR: ${error}`);
  }
};

module.exports = handler;

const sqsClient = require("./src/sqsClient");

exports.handler = async (event, context) => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  console.log("Received context:", JSON.stringify(context, null, 2));

  try {
    const result = await sqsClient.sendMessage({ id: 1, action: "x" });
    return result;
  } catch (error) {
    console.log(`ERRO: ${error}`);
    throw new Error(`ERROR: ${error}`);
  }
};

const AWS = require("aws-sdk");

AWS.config.update({ region: process.env.AWS_REGION });
const lambda = new AWS.Lambda();

const invoke = (params, context) => {
  lambda.invoke(params, (err, data) => {
    if (err) {
      context.fail(err);
    } else {
      context.succeed(`${params.FunctionName} said ` + data.Payload);
    }
  });
};

module.exports = invoke;

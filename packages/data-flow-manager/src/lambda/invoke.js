const AWS = require("aws-sdk");

AWS.config.update({ region: process.env.AWS_REGION });
const lambda = new AWS.Lambda();

const invoke = (params, context) => {
  console.log(params);
  lambda.invoke(params, (err, data) => {
    if (err) {
      console.error(err);
      context.fail(err);
    } else {
      console.log(data);
      context.succeed(`${params.FunctionName} said ` + data.Payload);
    }
  });
};

module.exports = invoke;

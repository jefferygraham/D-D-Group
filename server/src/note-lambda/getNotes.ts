const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

exports.handler = async (event, context, callback) => {
  const params = {
    TableName: 'notes',
  };

  try {
    const data = await docClient.scan(params).promise();

    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

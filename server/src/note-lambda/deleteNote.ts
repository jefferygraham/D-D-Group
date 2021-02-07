const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

exports.handler = async (event) => {
  const params = {
    TableName: 'notes',
    Key: {
      noteId: `${event.pathParameters.noteid}`,
    },
  };

  var result = {};

  try {
    result = await docClient.delete(params).promise();
  } catch (error) {
    result = {};
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(result),
  };
};

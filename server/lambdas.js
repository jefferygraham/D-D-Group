//get users
exports.handler = async (event) => {
  const { Client } = require('pg'); //  Needs the nodePostgres Lambda Layer.
  const client = new Client();
  await client.connect();

  const res = await client.query('select * from users');
  console.log(res.rows);
  await client.end();

  let response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
      'Access-Control-Allow-Headers':'*',
    },
    body: JSON.stringify(res.rows),
  };
  console.log('response: ' + JSON.stringify(response));
  return response;
};

//get users by name
exports.handler = async (event) => {
  const { Client } = require('pg'); //  Needs the nodePostgres Lambda Layer.
  const client = new Client();
  await client.connect();

  let response = await client.query(
    `select * from users where name='${event.name}' and password='${event.password}'`
  );
  console.log(response.rows[0]);

  if (response) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
      },
      body: response.rows[0],
    };
  }
  console.log('response: ' + JSON.stringify(response));
  await client.end();
};

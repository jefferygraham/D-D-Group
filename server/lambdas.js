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

//insert new user
exports.handler = async (event: any) => {
  const { Client } = require('pg'); //  Needs the nodePostgres Lambda Layer.
  const client = new Client();

  client.connect();
  const q =
    'INSERT INTO users(name, password, role) VALUES($1, $2, $3) RETURNING *';
  const args = [event.name, event.password, event.role];
  const response = await client.query(q, args);
  console.log(response.rows[0]);

  if (response.rows.length > 0) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
      },
      body: response.rows[0],
    };
  } else {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
      },
    };
  }
  client.end();
};

exports.handler = async (event: any) => {
  const { Client } = require('pg'); //  Needs the nodePostgres Lambda Layer.
  const client = new Client();

  client.connect();
  const q =
    'INSERT INTO users(name, password, role) VALUES($1, $2, $3) RETURNING *';
  const args = [event.name, event.password, event.role];
  const response = await client.query(q, args);
  console.log(response.rows[0]);

  client.end();

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
};

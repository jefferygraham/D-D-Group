exports.handler = async (event: any) => {
  const { Client } = require('pg'); //  Needs the nodePostgres Lambda Layer.
  const client = new Client();

  const q = `select * from users where name=$1::text and password=$2::text`;
  const args = [event.name, event.password];
  await client.connect();
  const response = await client.query(q, args);
  await client.end();

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
};

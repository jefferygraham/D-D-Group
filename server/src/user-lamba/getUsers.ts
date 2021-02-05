exports.handler = async (event) => {
  const { Client } = require('pg'); //  Needs the nodePostgres Lambda Layer.
  const client = new Client();
  await client.connect();

  const res = await client.query('select * from users');
  console.log(res.rows);
  await client.end();

  let response = {
    statusCode: 200,
    body: JSON.stringify(res.rows),
  };
  console.log('response: ' + JSON.stringify(response));
  return response;
};

exports.handler = async (event: any) => {
    const { Client } = require('pg'); //  Needs the nodePostgres Lambda Layer.
    const client = new Client();
    await client.connect();

    const res = await client.query('select * from campaigns');
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
}
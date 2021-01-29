exports.handler = async (event: any) => {
    const { Client } = require('pg'); //  Needs the nodePostgres Lambda Layer.
    const client = new Client();
    client.connect();

    const body = JSON.parse(event.body);

    const q = `select * from campaigns where DM=${body.DM}`;
    const response = await client.query(q);

    if (response.rows.length > 0) {
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            },
            body: JSON.stringify(response.rows),
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
}
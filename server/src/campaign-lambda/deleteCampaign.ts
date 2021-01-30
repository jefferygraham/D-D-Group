exports.handler = async (event: any) => {
    const { Client } = require('pg');
    const client = new Client();
    client.connect();

    const body = event.pathParameters.id;

    const q = `delete from campaigns where campaignID=${body.id} returning *`;
    const response = await client.query(q);

    if(response.rows.length == 1) {
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,DELETE',
            },
            body: JSON.stringify(response.rows[0]),
        };
    } else {
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,DELETE',
            },
        };
    }
    client.end();
}
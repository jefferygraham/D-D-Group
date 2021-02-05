exports.handler = async (event: any) => {
    const { Client } = require('pg');
    const client = new Client();
    await client.connect();

    const body = event.path.substring(event.path.lastIndexOf('/') + 1, event.path.length);

    const q = `delete from character where charID=${body} returning *`;
    console.log(body.charid)
    const response = await client.query(q);
    client.end();
    if (response) {
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

}
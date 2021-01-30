exports.handler = async (event: any) => {
    const { Client } = require('pg'); //  Needs the nodePostgres Lambda Layer.
    const client = new Client();
    await client.connect();

    const camp = event.path.substring(event.path.lastIndexOf('/')+1, event.path.length);

    const q = client.query("select * from campaigns where DM=" + camp);
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
        }
    } else {
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
            },
        };
    }
    client.end();
}
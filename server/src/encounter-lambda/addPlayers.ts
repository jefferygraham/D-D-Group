exports.handler = async (event: any) => {
    const { Client } = require('pg');
    const client = new Client();
    await client.connect();

    const encounter = event.path.substring(event.path.lastIndexOf('/') + 1, event.path.length);
    const body = JSON.parse(event.body);
    const q = `insert into encounter_characters (encounterid, charid, initiative) values(${encounter},${body.character},${body.initiative}) returning *`

    const response = await client.query(q);

    if (response.rows.length > 0) {
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,GET',
            },
            body: JSON.stringify(response.rows),
        }
    } else {
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            },
        }
    }
    client.end();
}
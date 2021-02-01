exports.handler = async (event: any) => {
    const { Client } = require('pg'); //  Needs the nodePostgres Lambda Layer.
    const client = new Client();
    client.connect();

    const q = 'insert into campaigns(campaignName, DM, players, notes) values ($1,$2) returning *';
    const body = JSON.parse(event.body);

    const args = [body.campaignName, body.DM];
    const response = await client.query(q, args);

    if (response.rows.length > 0) {
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
            },
            body: JSON.stringify(response.rows[0]),
        };
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
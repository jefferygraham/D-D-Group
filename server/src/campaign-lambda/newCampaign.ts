exports.handler = async (event: any) => {
    const { Client } = require('pg'); //  Needs the nodePostgres Lambda Layer.
    const client = new Client();
    client.connect();

    const q = 'insert into campaigns(campaignName, DM, players, notes) values ($1,$2,$3,$4) returning *';

    const args = [event.campaignName, event.DM, event.players, event.notes];
    const response = await client.query(q, args);

    if (response.rows.length > 0) {
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            },
            body: response.rows[0],
        };
    } else {
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            },
        };
    }
    client.end();
}
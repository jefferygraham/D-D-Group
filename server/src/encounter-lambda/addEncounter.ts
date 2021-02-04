exports.handler = async (event: any) => {
    const { Client } = require('pg');
    const client = new Client();
    client.connect();

    const campaign = event.path.substring((event.path.lastIndexOf('campaign/') + 9), event.path.lastIndexOf('/') - 1);
    const q = `insert into encounters(campaignid) values (${campaign}) returning *`;

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
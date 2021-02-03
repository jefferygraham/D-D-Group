exports.handler = async (event: any) => {
    const { Client } = require('pg');
    const client = new Client();
    client.connect();

    const user = event.path.substring(event.path.lastIndexOf('/') + 1, event.path.length);
    //update 
    const campaign = event.path.substring(event.path.lastIndexOf('campaign/'+8), event.path.lastIndexOf('/') - 1);

    const q = `delete from player_campaigns where user_id=${user} and campaign_id=${campaign} returning *`;
    const response = await client.query(q);

    if (response.rows.length == 1) {
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
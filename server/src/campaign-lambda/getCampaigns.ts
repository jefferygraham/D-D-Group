exports.handler = async (event: any) => {
    const { Client } = require('pg'); //  Needs the nodePostgres Lambda Layer.
    const client = new Client();
    client.connect();

    const body = event.pathParameters.id;

    const p = `select * from(select c.campaignid, c.campaignname, c.dm, pc.user_id from campaigns c inner join player_campaigns 
        pc on pc.campaign_id = c.campaignid) as j where user_id = ${body.id};`
    const q = `select * from campaigns where DM=${body.id}`;
    const u = `select u.role from users u where id = ${body.id}`;
    let response;

    if(u == 'player'){
        response = await client.query(p);
    } else {
        response = await client.query(q);
    }

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
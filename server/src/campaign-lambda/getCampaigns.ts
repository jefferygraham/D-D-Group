exports.handler = async (event: any) => {
    const { Client } = require('pg');
    const client = new Client();
    await client.connect();

    const user = event.path.substring(event.path.lastIndexOf('/') + 1, event.path.length);

    const q = "select u.role from users u where id=" + user;
    const response = await client.query(q);

    const res = JSON.stringify(response.rows[0]);

    if (res == `{"role":"player"}`) {
        const p = "select * from(select c.campaignid, c.campaignname, c.dm, pc.user_id from campaigns c inner join player_campaigns pc on pc.campaign_id = c.campaignid) as j where user_id =" + user;
        const camps = await client.query(p);
        if (camps.rows.length > 0) {
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                },
                body: JSON.stringify(camps.rows),
            }
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
    } else if (res == `{"role":"master"}`) {
        const d = "select * from campaigns where DM=" + user;
        const camps = await client.query(d);
        if (camps.rows.length > 0) {
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                },
                body: JSON.stringify(camps.rows),
            }
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
    }
    client.end();
}
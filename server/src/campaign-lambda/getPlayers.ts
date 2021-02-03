exports.handler = async (event: any) => {
    const { Client } = require('pg');
    const client = new Client();
    await client.connect();

    //need to fix this to take the middle id
    //look up .lastIndexOf
    const campaign = event.path.substring(event.path.lastIndexOf('campaign/'+8), event.path.lastIndexOf('/') - 1);

    const q = `select j.name, j.id from(select * from users u inner join player_campaigns pc on pc.user_id = u.id) as j where campaign_id = ${campaign}`;
    const response = await client.query(q);

    if(response.rows.length > 0){
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
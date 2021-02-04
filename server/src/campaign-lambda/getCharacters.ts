exports.handler = async (event: any) => {
    const { Client } = require('pg');
    const client = new Client();
    await client.connect();

    //need to fix this to take the middle id
    //look up .lastIndexOf
    const campaign = event.path.substring(event.path.lastIndexOf('campaign/'+9), event.path.lastIndexOf('/') - 1);

    const q = `select * from (select * from "character" c inner join player_campaigns pc on pc.character_id = c.charid) as j where campaign_id= ${campaign}`;
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
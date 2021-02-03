import createResponse from "../response";

exports.handler= async (event:any)=>{
    const { Client } = require("pg");
    const client = new Client();

    client.connect();

    let ids = JSON.parse(event.body);
    console.log(ids);
    let campaign = event.path.substring(event.path.lastIndexOf('/') + 10, event.path.length-10);
    console.log(campaign);
    let response = await client.query(`insert into player_campaigns(campaign_id,user_id,character_id)
    values($1,$2,$3)`,[
        campaign,
        ids.user,
        ids.char
    ])
    client.end();
    if (response) {
        return createResponse('', 204,);
    } else {
        return createResponse('', 400);
    }

}
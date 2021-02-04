import createResponse from "../response";

exports.handler= async (event:any)=>{
    const { Client } = require("pg");
    const client = new Client();

    client.connect();

    let campaignID = event.path.substring(event.path.lastIndexOf('/') + 1, event.path.length);
    let campaignName = JSON.parse(event.body);
    let response = await client.query(`update campaigns set "campaignname" = $1 where "campaignid" = $2`,[
        campaignName.campaign,
        campaignID
    ])
    client.end();
    if (response) {
        return createResponse('', 200,);
    } else {
        return createResponse('', 400);
    }

}
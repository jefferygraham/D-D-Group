import createResponse from "../response";

exports.handler = async (event: any) => {
    const { Client } = require("pg");
    const client = new Client();

    client.connect();

    let user = event.path.substring(event.path.lastIndexOf('/') + 1, event.path.length);
    console.log(user);
    console.log(isNaN(user));
    let response;
    if (isNaN(user)) {
        response = await client.query(
            `select * from character where playerid = (select id from users where name = '${user}')`
        );
        
        if (response) {
            return createResponse(JSON.stringify(response.rows), 200);
        } else {
            return createResponse('', 400);
        }

    } else {
        response = await client.query(
            `select * from character where charid = '${user}'`
        )
        
        if (response) {
            return createResponse(JSON.stringify(response.rows), 200);
        } else {
            return createResponse('', 400);
        }
    }
    client.end();




}
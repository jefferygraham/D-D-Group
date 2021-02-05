import createResponse from "../response";

exports.handler = async (event: any) => {
    const { Client } = require("pg");
    const client = new Client();

    client.connect();

    let user = event.path.substring(event.path.lastIndexOf('/') + 1, event.path.length);
    let response;
    if (isNaN(user)) {
        response = await client.query(
            `select * from character where playerid = (select id from users where name = '${user}')`
        );
        client.end();
        if (response) {
            return createResponse(JSON.stringify(response.rows), 200);
        } else {
            return createResponse('', 400);
        }

    } else {
        response = await client.query(
            `select * from character where charid = '${user}'`
        )
        client.end();

        if (response) {
            return createResponse(JSON.stringify(response.rows), 200);
        } else {
            return createResponse('', 400);
        }
    }





}
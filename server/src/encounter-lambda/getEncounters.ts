exports.handler = async (event: any) => {
    const { Client } = require('pg');
    const client = new Client();
    await client.connect();

    if ((event.path.substring(event.path.lastIndexOf('/') + 1, event.path.length)) == 'encounters') {
        const campaign = event.path.substring((event.path.lastIndexOf('campaign/') + 9), event.path.lastIndexOf('/'));

        const q = "select * from encounters where campaignid=" + campaign;
        const response = await client.query(q);

        if (response.rows.length > 0) {
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
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
            };
        }
    } else {
        const encounter = event.path.substring(event.path.lastIndexOf('/') + 1, event.path.length);
        const q = 'select * from(select * from encounter_characters ec inner join "character" c on ec.charid = c.charid) as j where encounterid=' + encounter;

        const response = await client.query(q);

        if (response.rows.length > 0) {
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
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
            };
        }
    }
    client.end();
}
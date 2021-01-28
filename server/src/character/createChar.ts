import createResponse from "../response";

exports.handler = async (event:any) =>{
    const {Client} = require("pg");
    const client = new Client();

    client.connect();
    console.log(event.race)
    const q = `
    INSERT INTO character(playerid,strength, dexterity,constitution,intelligence,wisdom,charisma,race,class,alignment,faith,lifestyle,name) 
    VALUES (`+ event.playerID +", "+ event.strength + ", "+ event.dexterity +", "+ event.constitution +", "+ event.intelligence +", "+ event.wisdom +", "+ event.charisma + ", '"+ event.race +"', '"+ event.class +"', '"+ event.alignment +"', '"+ event.faith +"', '"+ event.lifestyle +"', '"+ event.name +"')" ;
    const response = await client.query(q);
    if(response){
        return createResponse('', 204);
    }else{
        return createResponse('', 400);
    }
    client.end();
}
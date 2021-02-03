import createResponse from "../response";



exports.handler = async (event: any) => {
    const { Client } = require("pg");
    const client = new Client();

    client.connect();

    let char = JSON.parse(event.body);
    console.log(char);

    let response = await client.query(
        `insert into character(playerid,strength, dexterity,constitution,intelligence,wisdom,charisma,race,class,alignment,
        faith,lifestyle,name,gender,age,haircolor,skincolor,eyecolor,height,weight,organizations,allies,enemies,other,personalitytraits,ideals,flaws) 
        values ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27)`,[
            char.playerid,
            char.strength,
            char.dexterity,
            char.constitution,
            char.intelligence,
            char.wisdom,
            char.charisma,
            char.race,
            char.class,
            char.alignment,
            char.faith,
            char.lifestyle,
            char.name,
            char.gender,
            char.age,
            char.hairColor,
            char.skinColor,
            char.eyeColor,
            char.height,
            char.weight,
            char.organizations,
            char.allies,
            char.enemies,
            char.otherInfo,
            char.personalityTraits,
            char.ideals,
            char.flaws
        ]
    )
    
    client.end();
    if (response) {
        return createResponse('', 204,);
    } else {
        return createResponse('', 400);
    }

}
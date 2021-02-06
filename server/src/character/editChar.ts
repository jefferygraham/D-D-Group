import createResponse from "../response";

exports.handler= async (event:any)=>{
    const { Client } = require("pg");
    const client = new Client();

    client.connect();

    let charID = event.path.substring(event.path.lastIndexOf('/') + 1, event.path.length);
    let char = JSON.parse(event.body);
    console.log(charID)
    console.log(char)

    let response = await client.query(
        `update character  set strength = $1, dexterity = $2,  constitution = $3,  intelligence = $4 , wisdom = $5,
         charisma = $6,  race = $7, class = $8,  alignment = $9,  faith = $10 , lifestyle = $11,  name= $12,
         gender = $13,  age = $14 , haircolor = $15,  skincolor = $16,  eyecolor = $17,  height = $18 ,
         weight = $19 ,  organizations = $20 ,  allies = $21 ,  enemies = $22 ,  other = $23,  personalitytraits = $24,
         ideals = $25,  flaws = $26 where  charid = $27`,[
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
            char.flaws,
            char.charid
        ]
    )
    client.end();
    if (response) {
        return createResponse('', 200,);
    } else {
        return createResponse('', 400);
    }
}
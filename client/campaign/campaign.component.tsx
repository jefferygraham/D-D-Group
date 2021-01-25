import React from 'react';
import { Campaign } from './campaign';
import { View, Text, Button } from 'react-native';

interface CampaignProps {
    data: Campaign;
}

function CampaignComponent({ data }: CampaignProps) {

    //function to access all notes for the campaign,
    //should route to a notes component
    function getNotes(){

    }

    //will target a character and take you to the character sheet
    function goToCharacter(){

    }

    //button shows up if the user is DM
    //should remove the campaign from each user and character associated
    //then deletes all notes and the campaign itself
    function removeCampaign(){
        data.players.forEach((user) => {
            // userService.getUser(user).then((ind) => {
            //     let x = ind.campaigns.getIndexOf(data.campaignID);
            //     ind.campaigns.splice(x, 1);
            //     //update the user
            // })
        })
    }

    return (
        <View>
            <Text>{data.campaignName}</Text>
            <Text>Dungeon Master{data.DM}</Text>
            <Text>Players: {data.players}</Text>
        </View>
    )
}
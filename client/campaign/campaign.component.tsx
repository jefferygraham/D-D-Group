import React from 'react';
import { Campaign } from './campaign';
import { View, Text } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import campaignService from './campaign.service';
import { StackParams } from '../router/router.component';

interface Props {
    route: RouteProp<StackParams, 'Campaign'>;
}

function CampaignComponent(data: Props) {
    const nav = useNavigation();
    const campaign = data.route.params;

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
        campaignService.deleteCampaign(campaign.campaignid);
    }

    return (
        <View>
            <Text>{campaign.campaignname}</Text>
            <Text>Dungeon Master: {campaign.dm}</Text>
        </View>
    )
}

export default CampaignComponent;
import React from 'react';
import { Campaign } from './campaign';
import { View, Text, Button } from 'react-native';
import { CampaignState, UserState } from '../store/store';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import campaignService from './campaign.service';
import userService from '../user/user.service';

interface CampaignProps {
    data: Campaign;
}

function CampaignComponent({ data }: CampaignProps) {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const campaignSelector = (state: CampaignState) => state.campaign;
    const campaign = useSelector(campaignSelector);
    const nav = useNavigation();

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
            <Text>{data.campaignname}</Text>
            <Text>Dungeon Master{data.dm}</Text>
        </View>
    )
}

export default CampaignComponent;
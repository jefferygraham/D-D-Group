import React, { useEffect } from 'react';
import { Campaign } from './campaign';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { CampaignState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { changeCampaign } from '../store/actions';
import campaignService from './campaign.service';

interface CampaignProps {
    data: Campaign;
}

function MinCampaignComponent({data}: CampaignProps) {
    const nav = useNavigation();

    function goToCampaign(){
        nav.navigate('Campaign', data);
    }

    return (
        <View>
            <Text>{data.campaignid}: {data.campaignname}</Text><br/>
            <Button title='go to campaign' onPress={goToCampaign}></Button><br/>        
        </View>
    )
}

export default MinCampaignComponent;
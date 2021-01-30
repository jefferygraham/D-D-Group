import React from 'react';
import { Campaign } from './campaign';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';

interface CampaignProps {
    data: Campaign;
}

function MinCampaignComponent({data}: CampaignProps) {
    const nav = useNavigation();
    console.log(data.campaignname);

    function goToCampaign(){
        nav.navigate('CampaignComponent', data);
    }

    return (
        <View>
            <Text>{data.campaignid}: {data.campaignname}</Text>
            <Text>Dungeon Master:{data.dm}</Text>
            <Button title='go to campaign' onPress={goToCampaign}></Button>
        </View>
    )
}

export default MinCampaignComponent;
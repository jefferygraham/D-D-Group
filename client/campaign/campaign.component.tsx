import React from 'react';
import { Campaign } from './campaign';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';

interface CampaignProps {
    data: Campaign;
}

function MinCampaignComponent({data}: CampaignProps) {
    const nav = useNavigation();

    function goToCampaign(){
        nav.navigate('CampaignComponent', data);
    }

    return (
        <View>
            <Text>{data.id}: {data.campaignName}</Text>
            <Text>Dungeon Master{data.DM}</Text>
            <Text># of Players: {data.players.length}</Text>
            <Button title='campaign' onPress={goToCampaign}/>
        </View>
    )
}
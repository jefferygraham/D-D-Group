import React, { useEffect } from 'react';
import { Campaign } from './campaign';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { EncounterState, UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import campaignService from './campaign.service';
import { getEncounters } from '../store/actions';


interface CampaignProps {
    data: Campaign;
}

function MinCampaignComponent({ data }: CampaignProps) {
    const nav = useNavigation();
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const encounterSelector = (state: EncounterState) => state.encounters;
    const encounters = useSelector(encounterSelector);

    function goToCampaign() {
        campaignService.getEncounters(data.campaignid).then((results) => {
            dispatch(getEncounters(results));
        })
        nav.navigate('Campaign', data);
    }

    return (
        <View style={styles.displayBox}>
            {(user.role == 'master') && (
                <Text style={styles.btnLabel}>Campagin ID: {data.campaignid}</Text>
            )}
            <Text style={styles.btnLabel}>Campagin Name: {data.campaignname}</Text>
            <TouchableOpacity style={styles.button} onPress={goToCampaign}>
                <Text style={styles.btnLabel}>Go To Campaign</Text>
            </TouchableOpacity>
        </View>

    )
}
const styles = StyleSheet.create({
  
    displayBox: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 25,
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: 'white',
        width:'25%'

    },
    button: {
        
        backgroundColor: '#fb5b5a',
        borderRadius: 25,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding:10,
    },
    btnLabel: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 20,
        marginRight: 10,
        
    },


});
export default MinCampaignComponent;
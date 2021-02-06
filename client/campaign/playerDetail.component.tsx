import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayers } from '../store/actions';
import { CampaignState } from '../store/store';
import { User } from '../user/user';
import campaignService from './campaign.service';
import styles from '../global-styles';

interface Props {
    data: User;
}

function PlayerComponent({data}: Props){
    const nav = useNavigation();
    const campaignSelector = (state: CampaignState) => state.campaign;
    const campaign = useSelector(campaignSelector);
    const dispatch = useDispatch();

    function removePlayer(){
        if(data.id){
            campaignService.removePlayer(campaign.campaignid,data.id).then(()=> {
                campaignService.getPlayers(campaign.campaignid).then((results) => {
                    dispatch(getPlayers(results));
                    nav.navigate('Campaign',campaign);
                })
            });
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.loginText}>{data.name}</Text>
            <Button title='remove player' onPress={removePlayer}></Button>
        </View>
    )
}

export default PlayerComponent;
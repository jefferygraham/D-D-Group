import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayers } from '../store/actions';
import { CampaignState } from '../store/store';
import { User } from '../user/user';
import campaignService from './campaign.service';
import styles from '../global-styles';

interface Props {
    data: User;
}

function PlayerComponent({ data }: Props) {
    const nav = useNavigation();
    const campaignSelector = (state: CampaignState) => state.campaign;
    const campaign = useSelector(campaignSelector);
    const dispatch = useDispatch();

    function removePlayer() {
        if (data.id) {
            campaignService.removePlayer(campaign.campaignid, data.id).then(() => {
                campaignService.getPlayers(campaign.campaignid).then((results) => {
                    dispatch(getPlayers(results));
                    nav.navigate('Campaign', campaign);
                })
            });
        }
    }

    return (
        <View style={playerStyles.backgroundBox}>
            <Text style={styles.radioText}>Player : {data.name}</Text>
            <TouchableOpacity style={styles.button} onPress={removePlayer}>
                <Text style={styles.radioText}>Remove Player</Text>
            </TouchableOpacity>
        </View>
    )

}
const playerStyles = StyleSheet.create({
    backgroundBox: {
        borderRadius: 25,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',

    },
})

export default PlayerComponent;
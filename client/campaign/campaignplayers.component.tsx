import { RouteProp } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { StackParams } from "../router/router.component";
import styles from '../global-styles';
import { User } from "../user/user";
import PlayerComponent from "./playerDetail.component";

interface Props {
    route: RouteProp<StackParams, 'Players'>;
}

function CampaignPlayers(data: Props) {
    const players = data.route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.logo}> Players</Text>

            <View style={campaignStyles.backgroundBox}>
                {players.map((req: User, index: number) =>
                    <PlayerComponent key={'req-' + index} data={req}></PlayerComponent>
                )}
            </View>

        </View>
    )
}
const campaignStyles = StyleSheet.create({
    backgroundBox: {
        backgroundColor: '#465881',
        flexDirection: 'row',
        width: '80%',
        borderRadius: 25,
        padding: 10,
        justifyContent: 'space-evenly'
    },
})

export default CampaignPlayers;
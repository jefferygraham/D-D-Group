import { RouteProp } from "@react-navigation/native";
import React from "react";
import { View} from "react-native";
import { StackParams } from "../router/router.component";
import styles from '../global-styles';
import { User } from "../user/user";
import PlayerComponent from "./playerDetail.component";

interface Props {
    route: RouteProp<StackParams, 'Players'>;
}

function CampaignPlayers(data: Props){
    const players = data.route.params;

    return(
        <View style={styles.container}>
            {players.map((req: User, index: number) =>
                <PlayerComponent key={'req-' + index} data={req}></PlayerComponent>
            )}
        </View>
    )
}

export default CampaignPlayers;
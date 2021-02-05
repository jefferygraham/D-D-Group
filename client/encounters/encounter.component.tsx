import React from 'react';
import { RouteProp } from "@react-navigation/native";
import { View, Text } from "react-native";
import { StackParams } from "../router/router.component";
import { UserState } from '../store/store';
import { useSelector } from 'react-redux';
import styles from '../global-styles';
import campaignService from '../campaign/campaign.service';

interface Props{
    route: RouteProp<StackParams,'Encounter'>;
}

function EncounterComponent(data: Props){
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const encounter = data.route.params;

    

    return(
        <View style={styles.container}>
            {user.role == 'master' && (
                <View>

                </View>
            )}
        </View>
    )
}

export default EncounterComponent;
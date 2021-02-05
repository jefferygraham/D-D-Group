import React, { useEffect } from 'react';
import { RouteProp, useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { StackParams } from "../router/router.component";
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../global-styles';
import campaignService from '../campaign/campaign.service';
import { useForm } from 'react-hook-form';
import { EncounterChars } from './encounterChars';

interface Props{
    route: RouteProp<StackParams,'Encounter'>;
}
type CharInit = {
    characterid: number;
    initiative: number;
}

function EncounterComponent(data: Props){
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const nav = useNavigation();
    const { register, handleSubmit, errors } = useForm<CharInit>();
    const encounter = data.route.params;

    useEffect(() => {
        campaignService.getEncounterChars(encounter.encounterid).then((results) => {
            dispatch(changeEncounterChars())
        })
    })

    const onSubmit = handleSubmit((info) => {
        campaignService.updateEncounter(encounter.campaignid,encounter.encounterid,info.characterid,info.initiative).then(() => {
            nav.navigate('Encounter',encounter);
        })
    })

    return(
        <View style={styles.container}>
            {user.role == 'master' && (
                <View style={styles.container}>
                    
                </View>
            )}
        </View>
    )
}

export default EncounterComponent;
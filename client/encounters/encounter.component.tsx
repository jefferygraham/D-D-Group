import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { StackParams } from "../router/router.component";
import { CharacterState, EncounterState, UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../global-styles';
import campaignService from '../campaign/campaign.service';
import RNPickerSelect from 'react-native-picker-select';
import { changeEncounterChars } from '../store/actions';
import NumericInput from 'react-native-numeric-input'

interface Props {
    route: RouteProp<StackParams, 'Encounter'>;
}
type CharInit = {
    characterid: number;
    initiative: number;
}

function EncounterComponent(data: Props) {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const charSelector = (state: EncounterState) => state.encounterChars;
    const chars = useSelector(charSelector);
    const characterSelector = (state: CharacterState) => state.characters;
    const characters = useSelector(characterSelector);
    const dispatch = useDispatch();
    const nav = useNavigation();
    const encounter = data.route.params;
    let round = 1;

    useEffect(() => {
        campaignService.getEncounterChars(encounter.campaignid, encounter.encounterid).then((results) => {
            dispatch(changeEncounterChars(results));
        })
    }, [dispatch])
    const [characterid, setCharID] = useState(-1);
    const [initiative, setInit] = useState(-1);

    function submitForm() {
        const data = {
            characterid,
            initiative
        }
        console.log(data);
        campaignService.updateEncounter(encounter.campaignid, encounter.encounterid, data.characterid, data.initiative).then(() => {
            campaignService.getEncounterChars(encounter.campaignid, encounter.encounterid).then((results) => {
                dispatch(changeEncounterChars(results));
            })
        })
    }
    function nextRound() {
        round++;
        console.log(round);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Ecounter {encounter.encounterid}</Text>
            <View style={styles.displayContainer}>
                {user.role == 'master' && (
                    <View style={styles.backgroundInfoContainer}>
                        {chars.length > 0 &&
                            chars.map((char) => {
                                return (
                                    <View
                                        key={`${char.charid}`}
                                        style={styles.borderedBoxColumn}>
                                        <Text style={styles.loginText}>Charcter: {char.name}</Text>
                                        <Text style={styles.loginText}>Initiative: {char.initiative}</Text>
                                    </View>
                                )
                            })}
                        <View style={styles.borderedBoxColumn}>
                            <Text style={styles.leftLabel}> Add Initiatieve</Text>
                            <View style={styles.inputView}>
                                <RNPickerSelect
                                    placeholder={{ label: 'Select a character', value: null }}
                                    useNativeAndroidPickerStyle={false}
                                    onValueChange={(characterid) => setCharID(characterid)}
                                    items={characters.map(character => (
                                        {
                                            key: character.charid,
                                            label: character.name,
                                            value: character.charid,
                                        }))
                                    }
                                />
                            </View>
                            <View>
                                <NumericInput
                                    type='up-down'
                                    totalWidth={240}
                                    totalHeight={50}
                                    iconSize={25}
                                    step={1.5}
                                    valueType='real'
                                    rounded
                                    textColor='white'
                                    rightButtonBackgroundColor='#EA3788'
                                    leftButtonBackgroundColor='#E56B70'
                                    onChange={(initiative) => setInit(initiative)}
                                />
                            </View>
                            <TouchableOpacity style={styles.loginBtn} onPress={submitForm}>
                                <Text style={styles.loginText}>Add Character</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </View>
    )
}

export default EncounterComponent;
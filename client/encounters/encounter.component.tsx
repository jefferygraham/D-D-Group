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
    const encounter = data.route.params;

    useEffect(() => {
        campaignService.getEncounterChars(encounter.campaignid, encounter.encounterid).then((results) => {
            dispatch(changeEncounterChars(results));
        })
    },[dispatch])
    const [characterid, setCharID] = useState(-1);
    const [initiative, setInit] = useState(-1);

    function submitForm() {
        const info = {
            characterid,
            initiative
        }
        campaignService.updateEncounter(encounter.campaignid, encounter.encounterid, info.characterid, info.initiative).then(() => {
            campaignService.getEncounterChars(encounter.campaignid,encounter.encounterid).then((results) => {
                dispatch(changeEncounterChars(results));
            })
        })
    }

    return (
        <View style={styles.container}>
            {user.role == 'master' && (
                <View>
                    {chars.length > 0 &&
                        chars.map((char) => {
                            return (
                                <View
                                    key={`${char.charid}`}
                                    style={{ borderColor: 'white', borderWidth: 1 }}>
                                    <Text style={styles.loginText}>{char.name}: {char.initiative}</Text>
                                </View>
                            )
                        })}
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
                            textColor='#B0228C'
                            rightButtonBackgroundColor='#EA3788'
                            leftButtonBackgroundColor='#E56B70'
                            onChange={(initiative) => setInit(initiative)}
                        />
                    </View>
                    <TouchableOpacity style={styles.loginBtn} onPress={submitForm}>
                        <Text style={styles.loginText}>Add Character</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default EncounterComponent;
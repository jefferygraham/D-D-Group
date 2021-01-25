import React from 'react';
import {
    Platform,
    Button,
    TextInput,
    Text,
    View,
    TouchableNativeFeedback,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';
import styles from '../global-styles';
import { Character } from './character';
import RadioButtonRN from 'radio-buttons-react-native';

interface CreateProp {
    navigation: any;
}

export function CharacterCreationComponent({ navigation }: CreateProp) {
    const char: Character = new Character();

    function submitForm() {

    }
    return (
        <View style={styles.charContainer}>
            <View style={styles.charInputBox}>
                <Text style={styles.charLabel}>Character Name: </Text>
                <TextInput
                    style={styles.charInputText}
                    placeholder='Charater Name ...'
                    placeholderTextColor='white'
                /* value={char.name} */
                />
            </View>
            <View style={styles.charInputBox}>
                <RadioButtonRN

            />


            </View>
        </View>
    )


}


export default CharacterCreationComponent;
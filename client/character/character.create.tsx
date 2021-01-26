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


interface CreateProp {
    navigation: any;
}

export function CharacterCreationComponent({ navigation }: CreateProp) {
    const char: Character = new Character();

    function submitForm() {

    }
    function RadioButton(props: any) {
        return (
            <View style={[{
                height: 25,
                width: 25,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center'
            }, styles.radioText]}>
                {
                    props.selected ?
                        <View style={{
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: 'black',
                        }} />
                        : null
                }
            </View>
        );
    }
    return (
        <View style={styles.charContainer}>
        {/* Character Name */}
        <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>Character Name</Text>
            <View style={styles.charInputBox}>
            
                <TextInput
                    style={styles.charInputText}
                    placeholder='Charater Name ...'
                    placeholderTextColor='white'
                /* value={char.name} */
                />
            </View>
            </View>
        {/* Race */}
            <View style={styles.radioContainer}>
                <Text style={styles.radioLabel}>Race</Text>
                <View style={styles.radioBox}>
                    <TouchableOpacity onPress={() => { }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Dragonborn</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => { }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Wood Elf</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => { }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Half-Elf</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => { }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Half-Orc</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => { }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Human</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => { }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Lightfoot Halfling</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => { }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Tiefling</Text>
                    </TouchableOpacity >
                </View>
            </View>
        {/* Class */}
        <View style={styles.radioContainer}>
                <Text style={styles.radioLabel}>Class</Text>
                <View style={styles.radioBox}>
                    <TouchableOpacity onPress={() => { }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Bard</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => { }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Cleric</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => { }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Fighter</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => { }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Paladin</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => { }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Ranger</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => { }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Rouge</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => { }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Warlock</Text>
                    </TouchableOpacity >
                </View>
            </View>
        </View>
    )


}


export default CharacterCreationComponent;
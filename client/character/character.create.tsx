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
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../global-styles';
import { changeCharacter, CharacterActions } from '../store/actions';
import { CharacterState } from '../store/store';
import { Character } from './character';


interface CreateProp {
    navigation: any;
}

export function CharacterCreationComponent({ navigation }: CreateProp) {
    const charSelector = (state: CharacterState) => state.character;
    const char = useSelector(charSelector)
    const dispatch = useDispatch();

    function submitForm() {
        console.log(char)

    }

    function RadioButton(props: any) {
        return (
            <View style={[{
                height: 15,
                width: 15,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: 'white',
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
                    <View style={styles.charInputLabel}>
                        <TextInput
                            style={styles.charInputTextLong}
                            placeholder='Type Name Here'
                            placeholderTextColor='white'
                            onChangeText={(value) =>
                                dispatch(changeCharacter({ ...char, name: value }))
                            }
                            value={char.name}
                        />
                    </View>
                </View>
            </View>
            {/* Race */}
            <View style={styles.radioContainer}>
                <Text style={styles.radioLabel}>Race</Text>
                <View style={styles.radioBox}>
                    <TouchableOpacity onPress={() => {
                        char.race = 'Dragonborn'
                        dispatch(changeCharacter(char))
                    }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Dragonborn</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => {
                        char.race = 'Wood Elf'
                        dispatch(changeCharacter(char))
                    }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Wood Elf</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => {
                        char.race = 'Half-Elf'
                        dispatch(changeCharacter(char))
                    }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Half-Elf</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => {
                        char.race = 'Half-Orc'
                        dispatch(changeCharacter(char))
                    }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Half-Orc</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => {
                        char.race = 'Human'
                        dispatch(changeCharacter(char))
                    }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Human</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => {
                        char.race = 'Lightfoot Halfling'
                        dispatch(changeCharacter(char))
                    }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Lightfoot Halfling</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => {
                        char.race = 'Tiefling'
                        dispatch(changeCharacter(char))
                    }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Tiefling</Text>
                    </TouchableOpacity >
                </View>
            </View>
            {/* Class */}
            <View style={styles.radioContainer}>
                <Text style={styles.radioLabel}>Class</Text>
                <View style={styles.radioBox}>
                    <TouchableOpacity onPress={() => {
                        char.class = 'Bard'
                        dispatch(changeCharacter(char))
                    }} style={styles.radio} >
                        {RadioButton(char.class)}
                        <Text style={styles.radioText}>Bard</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => {
                        char.class = 'Cleric'
                        dispatch(changeCharacter(char))
                    }} style={styles.radio} >
                        {RadioButton(char.class)}
                        <Text style={styles.radioText}>Cleric</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => {
                        char.class = 'Fighter'
                        dispatch(changeCharacter(char))
                    }} style={styles.radio} >
                        {RadioButton(char.class)}
                        <Text style={styles.radioText}>Fighter</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => { 
                        char.class = 'Paladin'
                        dispatch(changeCharacter(char))
                    }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Paladin</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => { 
                        char.class = 'Ranger'
                        dispatch(changeCharacter(char))
                    }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Ranger</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => {
                        char.class = 'Rouge'
                        dispatch(changeCharacter(char))
                     }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Rouge</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => { 
                        char.class = 'Warlock'
                        dispatch(changeCharacter(char))
                    }} style={styles.radio} >
                        {RadioButton('test')}
                        <Text style={styles.radioText}>Warlock</Text>
                    </TouchableOpacity >
                </View>
            </View>
            {/*  Physical Characteristics */}
            <View style={styles.radioContainer}>
                <Text style={styles.radioLabel}>Character Appearance</Text>
                <View style={styles.radioBox}>
                    <View style={styles.charInputLabel}>
                        <Text style={styles.looksLabel}>Gender:</Text>
                        <TextInput
                            style={styles.charInputTextLong}
                            placeholder='...'
                            placeholderTextColor='white'
                            onChangeText={(value) =>
                                dispatch(changeCharacter({ ...char, gender: value }))
                            }
                            value={char.gender}
                        />
                    </View>
                    <View style={styles.charInputLabel}>
                        <Text style={styles.looksLabel}>Age:</Text>
                        <TextInput
                            style={styles.charInputText}
                            placeholder='0'
                            placeholderTextColor='white'
                            onChangeText={(value) =>
                                dispatch(changeCharacter({ ...char, age: value }))
                            }
                            value={char.age}
                        />
                    </View>
                    <View style={styles.charInputLabel}>
                        <Text style={styles.looksLabel}>Hair Color:</Text>
                        <TextInput
                            style={styles.charInputText}
                            placeholder='Hair Color ...'
                            placeholderTextColor='white'
                            onChangeText={(value) =>
                                dispatch(changeCharacter({ ...char, hairColor: value }))
                            }
                            value={char.hairColor}
                        />
                    </View>
                    <View style={styles.charInputLabel}>
                        <Text style={styles.looksLabel}>Skin Color:</Text>
                        <TextInput
                            style={styles.charInputText}
                            placeholder='Skin Color ...'
                            placeholderTextColor='white'
                            onChangeText={(value) =>
                                dispatch(changeCharacter({ ...char, skinColor: value }))
                            }
                            value={char.skinColor}
                        />
                    </View>
                    <View style={styles.charInputLabel}>
                        <Text style={styles.looksLabel}>Eye Color:</Text>
                        <TextInput
                            style={styles.charInputText}
                            placeholder='Eye Color ...'
                            placeholderTextColor='white'
                            onChangeText={(value) =>
                                dispatch(changeCharacter({ ...char, eyecolor: value }))
                            }
                            value={char.eyecolor}
                        />
                    </View>
                    <View style={styles.charInputLabel}>
                        <Text style={styles.looksLabel}>Height:</Text>
                        <TextInput
                            style={styles.charInputText}
                            placeholder='Height ...'
                            placeholderTextColor='white'
                            onChangeText={(value) =>
                                dispatch(changeCharacter({ ...char, height: value }))
                            }
                            value={char.height}
                        />
                    </View>
                    <View style={styles.charInputLabel}>
                        <Text style={styles.looksLabel}>Weight:</Text>
                        <TextInput
                            style={styles.charInputText}
                            placeholder='Weight ...'
                            placeholderTextColor='white'
                            onChangeText={(value) =>
                                dispatch(changeCharacter({ ...char, weight: value }))
                            }
                            value={char.weight}
                        />
                    </View>
                </View>
            </View>
            {/* Background Info */}
            <View style={styles.radioContainer}>
                <Text style={styles.radioLabel}>Background Information</Text>
                <View style={styles.radioBox}>
                    <View style={styles.backgroundInfoContainer}>
                        <Text style={styles.leftLabel}>Alignment</Text>
                        <View style={styles.borderedBoxRow}>
                            <View style={styles.boxOfThree}>
                                <TouchableOpacity onPress={() => { 
                                     char.alignment = 'Lawful Good'
                                     dispatch(changeCharacter(char))
                                }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Lawful Good</Text>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={() => {
                                    char.alignment = 'Lawful Neutral'
                                    dispatch(changeCharacter(char))
                                 }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Lawful Neutral</Text>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={() => { 
                                    char.alignment = 'Lawful Bad'
                                    dispatch(changeCharacter(char))
                                }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Lawful Bad</Text>
                                </TouchableOpacity >
                            </View>
                            <View style={styles.boxOfThree}>
                                <TouchableOpacity onPress={() => { 
                                    char.alignment = 'Neutral Good'
                                    dispatch(changeCharacter(char))
                                }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Neutral Good</Text>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={() => {
                                    char.alignment = 'True Neutral'
                                    dispatch(changeCharacter(char))
                                 }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>True Neutral</Text>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={() => { 
                                    char.alignment = 'Neutral Bad'
                                    dispatch(changeCharacter(char))
                                }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Neutral Bad</Text>
                                </TouchableOpacity >
                            </View>
                            <View style={styles.boxOfThree}>
                                <TouchableOpacity onPress={() => { 
                                    char.alignment = 'Chaotic Good'
                                    dispatch(changeCharacter(char))
                                }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Chaotic Good</Text>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={() => { 
                                     char.alignment = 'Chaotic Neutral'
                                     dispatch(changeCharacter(char))
                                }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Chaotic Neutral</Text>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={() => {
                                     char.alignment = 'Chaotic Bad'
                                     dispatch(changeCharacter(char))
                                }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Chaotic Bad</Text>
                                </TouchableOpacity >
                            </View>
                        </View>
                    </View>
                    <View style={styles.backgroundInfoContainer}>
                        <Text style={styles.leftLabel}>Lifestyle</Text>
                        <View style={styles.borderedBoxRow}>
                            <View style={styles.boxOfThree}>
                                <TouchableOpacity onPress={() => { 
                                     char.lifestyle = 'Wretched'
                                     dispatch(changeCharacter(char))
                                }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Wretched</Text>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={() => { 
                                    char.lifestyle = 'Squalid'
                                    dispatch(changeCharacter(char))
                                }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Squalid</Text>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={() => {
                                    char.lifestyle = 'Poor'
                                    dispatch(changeCharacter(char))
                                 }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Poor</Text>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={() => {
                                    char.lifestyle = 'Modest'
                                    dispatch(changeCharacter(char))
                                 }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Modest</Text>
                                </TouchableOpacity >
                            </View>
                            <View style={styles.boxOfThree}>
                                <TouchableOpacity onPress={() => { 
                                    char.lifestyle = 'Comfortable'
                                    dispatch(changeCharacter(char))
                                }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Comfortable</Text>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={() => {
                                    char.lifestyle = 'Wealthy'
                                    dispatch(changeCharacter(char))
                                 }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Wealthy</Text>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={() => {
                                    char.lifestyle = 'Aristocratic'
                                    dispatch(changeCharacter(char))
                                 }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Aristocratic</Text>
                                </TouchableOpacity >
                            </View>
                        </View>
                    </View>
                    <View style={styles.backgroundInfoContainer}>

                        <Text style={styles.leftLabel}>Faith </Text>
                        <TextInput
                            style={styles.charInputTextLong}
                            placeholder='Traits ...'
                            placeholderTextColor='white'
                            multiline={true}
                            numberOfLines={5}
                            onChangeText={(value) =>
                                dispatch(changeCharacter({ ...char, faith: value }))
                            }
                            value={char.faith}
                        />



                    </View>
                </View>
            </View>
            {/*  Personal Characteristics */}
            <View style={styles.radioContainer}>
                <Text style={styles.radioLabel}>Personality Characteristics</Text>
                <View style={styles.charInputBox}>
                    <View style={styles.charInputLabel}>
                        <Text style={styles.characteristicsLabel}>Personality Traits: </Text>
                        <TextInput
                            style={styles.charInputTextLong}
                            placeholder='Traits ...'
                            placeholderTextColor='white'
                            multiline={true}
                            numberOfLines={5}
                        /* value={char.name} */
                        />
                    </View>


                    <View style={styles.charInputLabel}>
                        <Text style={styles.characteristicsLabel}>Ideals: </Text>
                        <TextInput
                            style={styles.charInputTextLong}
                            placeholder='Enter Ideals Here'
                            placeholderTextColor='white'
                            multiline={true}
                            numberOfLines={5}
                        /* value={char.name} */
                        />
                    </View>


                    <View style={styles.charInputLabel}>
                        <Text style={styles.characteristicsLabel}>Bonds: </Text>
                        <TextInput
                            style={styles.charInputTextLong}
                            placeholder='Traits ...'
                            placeholderTextColor='white'
                            multiline={true}
                            numberOfLines={5}
                        /* value={char.name} */
                        />
                    </View>


                    <View style={styles.charInputLabel}>
                        <Text style={styles.characteristicsLabel}>Flaws: </Text>
                        <TextInput
                            style={styles.charInputTextLong}
                            placeholder='Traits ...'
                            placeholderTextColor='white'
                            multiline={true}
                            numberOfLines={5}
                        /* value={char.name} */
                        />
                    </View>
                </View>

            </View>
            {/* Backstory Info */}
            <View style={styles.radioContainer}>
                <Text style={styles.radioLabel}>Backstory Information</Text>
                <View style={styles.charInputBox}>
                    <View style={styles.charInputLabel}>
                        <Text style={styles.characteristicsLabel}>Organizations: </Text>
                        <TextInput
                            style={styles.charInputTextLong}
                            placeholder='Traits ...'
                            placeholderTextColor='white'
                            multiline={true}
                            numberOfLines={5}
                            onChangeText={(value) =>
                                dispatch(changeCharacter({ ...char, organizations: value }))
                            }
                            value={char.organizations}
                        />
                    </View>
                    <View style={styles.charInputLabel}>
                        <Text style={styles.characteristicsLabel}>Allies: </Text>
                        <TextInput
                            style={styles.charInputTextLong}
                            placeholder='Traits ...'
                            placeholderTextColor='white'
                            multiline={true}
                            numberOfLines={5}
                            onChangeText={(value) =>
                                dispatch(changeCharacter({ ...char, allies: value }))
                            }
                            value={char.allies}
                        />
                    </View>
                    <View style={styles.charInputLabel}>
                        <Text style={styles.characteristicsLabel}>Enemies: </Text>
                        <TextInput
                            style={styles.charInputTextLong}
                            placeholder='Traits ...'
                            placeholderTextColor='white'
                            multiline={true}
                            numberOfLines={5}
                           onChangeText={(value) =>
                            dispatch(changeCharacter({ ...char, enemies: value }))
                        }
                        value={char.enemies}
                        />
                    </View>
                    <View style={styles.charInputLabel}>
                        <Text style={styles.characteristicsLabel}>Other Information: </Text>
                        <TextInput
                            style={styles.charInputTextLong}
                            placeholder='Traits ...'
                            placeholderTextColor='white'
                            multiline={true}
                            numberOfLines={5}
                            onChangeText={(value) =>
                                dispatch(changeCharacter({ ...char, otherInfo: value }))
                            }
                            value={char.otherInfo}
                        />
                    </View>

                </View>

            </View>
            {/* Create Character Button */}
            <TouchableOpacity style={styles.createBtn} onPress={submitForm}>
                <Text style={styles.looksLabel}>Create Character</Text>
            </TouchableOpacity>
        </View>
    )
}


export default CharacterCreationComponent;
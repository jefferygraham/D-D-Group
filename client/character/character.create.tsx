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
                        /* value={char.name} */
                        />
                    </View>
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
                        /* value={char.name} */
                        />
                    </View>
                    <View style={styles.charInputLabel}>
                        <Text style={styles.looksLabel}>Age:</Text>
                        <TextInput
                            style={styles.charInputText}
                            placeholder='0'
                            placeholderTextColor='white'
                        /* value={char.name} */
                        />
                    </View>
                    <View style={styles.charInputLabel}>
                        <Text style={styles.looksLabel}>Hair Color:</Text>
                        <TextInput
                            style={styles.charInputText}
                            placeholder='Hair Color ...'
                            placeholderTextColor='white'
                        /* value={char.name} */
                        />
                    </View>
                    <View style={styles.charInputLabel}>
                        <Text style={styles.looksLabel}>Skin Color:</Text>
                        <TextInput
                            style={styles.charInputText}
                            placeholder='Skin Color ...'
                            placeholderTextColor='white'
                        /* value={char.name} */
                        />
                    </View>
                    <View style={styles.charInputLabel}>
                        <Text style={styles.looksLabel}>Eye Color:</Text>
                        <TextInput
                            style={styles.charInputText}
                            placeholder='Eye Color ...'
                            placeholderTextColor='white'
                        /* value={char.name} */
                        />
                    </View>
                    <View style={styles.charInputLabel}>
                        <Text style={styles.looksLabel}>Height:</Text>
                        <TextInput
                            style={styles.charInputText}
                            placeholder='Height ...'
                            placeholderTextColor='white'
                        /* value={char.name} */
                        />
                    </View>
                    <View style={styles.charInputLabel}>
                        <Text style={styles.looksLabel}>Weight:</Text>
                        <TextInput
                            style={styles.charInputText}
                            placeholder='Weight ...'
                            placeholderTextColor='white'
                        /* value={char.name} */
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
                                <TouchableOpacity onPress={() => { }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Lawful Good</Text>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={() => { }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Lawful Neutral</Text>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={() => { }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Lawful Bad</Text>
                                </TouchableOpacity >
                            </View>
                            <View style={styles.boxOfThree}>
                                <TouchableOpacity onPress={() => { }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Neutral Good</Text>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={() => { }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>True Neutral</Text>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={() => { }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Neutral Bad</Text>
                                </TouchableOpacity >
                            </View>
                            <View style={styles.boxOfThree}>
                                <TouchableOpacity onPress={() => { }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Chaotic Good</Text>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={() => { }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Chaotic Neutral</Text>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={() => { }} style={styles.radio} >
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
                                <TouchableOpacity onPress={() => { }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Wretched</Text>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={() => { }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Squalid</Text>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={() => { }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Poor</Text>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={() => { }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Modest</Text>
                                </TouchableOpacity >
                            </View>
                            <View style={styles.boxOfThree}>
                                <TouchableOpacity onPress={() => { }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Comfortable</Text>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={() => { }} style={styles.radio} >
                                    {RadioButton('test')}
                                    <Text style={styles.radioText}>Wealthy</Text>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={() => { }} style={styles.radio} >
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
                        /* value={char.name} */
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
                        /* value={char.name} */
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
                        /* value={char.name} */
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
                        /* value={char.name} */
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
                        /* value={char.name} */
                        />
                    </View>

                </View>

            </View>
        </View>
    )


}


export default CharacterCreationComponent;
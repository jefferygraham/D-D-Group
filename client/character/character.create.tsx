import React, { useState } from 'react';
import {
    TextInput,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../global-styles';
import { changeCharacter, getCharacters } from '../store/actions';
import { CharacterState, UserState } from '../store/store';
import characterService from './character.service';
import { useNavigation } from '@react-navigation/native';
import { Character } from './character';


interface CreateProp {
    navigation: any;
}

export function CharacterCreationComponent({ navigation }: CreateProp) {
    const charSelector = (state: CharacterState) => state.character;
    const userSelector = (state: UserState) => state.user;
    const char = useSelector(charSelector);
    const user = useSelector(userSelector);

    const dispatch = useDispatch();
    const dndAPI = 'https://www.dnd5eapi.co/api/';
    const nav = useNavigation();

    const [race, setRace] = React.useState([
        { id: 1, value: 'dragonborn', name: 'Dragonborn', selected: true },
        { id: 2, value: 'elf', name: 'Elf', selected: false },
        { id: 3, value: 'half-elf', name: 'Half-Elf', selected: false },
        { id: 4, value: 'half-orc', name: 'Half-Orc', selected: false },
        { id: 5, value: 'human', name: 'Human', selected: false },
        { id: 6, value: 'galfling', name: 'Halfling', selected: false },
        { id: 7, value: 'tiefling', name: 'Tiefling', selected: false },
    ]);

    const [charClass, setCharClass] = React.useState([
        { id: 1, value: 'bard', name: 'Bard', selected: true },
        { id: 2, value: 'cleric', name: 'Cleric', selected: false },
        { id: 3, value: 'fighter', name: 'Fighter', selected: false },
        { id: 4, value: 'paladin', name: 'Paladin', selected: false },
        { id: 5, value: 'ranger', name: 'Ranger', selected: false },
        { id: 6, value: 'rouge', name: 'Rouge', selected: false },
        { id: 7, value: 'warlock', name: 'Warlock', selected: false },

    ]);
    const [lifestyle, setLifestyle] = React.useState([
        { id: 1, value: 'Wretched', name: 'Wretched', selected: false },
        { id: 2, value: 'Squalid', name: 'Squalid', selected: false },
        { id: 3, value: 'Poor', name: 'Poor', selected: false },
        { id: 4, value: 'Modest', name: 'Modest', selected: false },
        { id: 5, value: 'Comfortable', name: 'Comfortable', selected: false },
        { id: 6, value: 'Wealthy', name: 'Wealthy', selected: false },
        { id: 7, value: 'Aristocratic', name: 'Aristocratic', selected: false },

    ]);

    const [alignment, setAlignment] = React.useState([
        { id: 1, value: 'Lawful Good', name: 'Lawful Good', selected: false },
        { id: 2, value: 'Neutral Good', name: 'Neutral Good', selected: false },
        { id: 3, value: 'Chaotic Good', name: 'Chaotic Good', selected: false },
        { id: 4, value: 'Lawful Neutral', name: 'Lawful Neutral', selected: false },
        { id: 5, value: 'True Neutral', name: 'True Neutral', selected: false },
        { id: 6, value: 'Chaotic Neutral', name: 'Chaotic Neutral', selected: false },
        { id: 7, value: 'Lawful Evil', name: 'Lawful Evil', selected: false },
        { id: 8, value: 'Neutral Evil', name: 'Neutral Evil', selected: false },
        { id: 9, value: 'Chaotic Evil', name: 'Chaotic Evil', selected: false },

    ]);

    function submitForm() {
        if (user.id) {
            char.playerid = user.id
        }
        console.log(char)
        let race = char.race.toLowerCase();
        let api = dndAPI + 'races/' + race;
        //change stats based on race
        fetch(api).then((response) => response.json()).then((json) => {
            json.ability_bonuses.forEach((element: any) => {
                let stat: string = element.ability_score.index;
                switch (stat) {
                    case 'str':
                        char.strength += Number(element.bonus)
                        break;
                    case 'dex':
                        char.dexterity += Number(element.bonus)
                        break;
                    case 'con':
                        char.constitution += Number(element.bonus)
                        break;
                    case 'int':
                        char.intelligence += Number(element.bonus)
                        break;
                    case 'wis':
                        char.wisdom += Number(element.bonus)
                        break;
                    case 'cha':
                        char.charisma += Number(element.bonus)
                        break;
                    default:
                        console.log('error')
                        break;
                }


            })
            console.log(char)
            characterService.createCharacter(char).then(()=>{
                characterService.getCharactersByUser(user).then((results) => {
                console.log(results);
                dispatch(getCharacters(results));
                dispatch(changeCharacter(new Character()));
                nav.navigate('Home');
            })
            });
            

        })



    }

    const onRadioBtnClickRace = (item: any) => {
        let updatedState = race.map((isLikedItem) =>
            isLikedItem.id === item.id
                ? { ...isLikedItem, selected: true }
                : { ...isLikedItem, selected: false }
        );
        setRace(updatedState);
        char.race = item.value;
        dispatch(changeCharacter(char));
        console.log(char)
    };
    const onRadioBtnClickClass = (item: any) => {
        let updatedState = charClass.map((isLikedItem) =>
            isLikedItem.id === item.id
                ? { ...isLikedItem, selected: true }
                : { ...isLikedItem, selected: false }
        );
        setCharClass(updatedState);
        char.class = item.value;
        dispatch(changeCharacter(char));
        console.log(char)
    };
    const onRadioBtnClickAlignment = (item: any) => {
        let updatedState = alignment.map((isLikedItem) =>
            isLikedItem.id === item.id
                ? { ...isLikedItem, selected: true }
                : { ...isLikedItem, selected: false }
        );
        setAlignment(updatedState);
        char.alignment = item.value;
        dispatch(changeCharacter(char));
        console.log(char)
    };
    const onRadioBtnClickLifestyle = (item: any) => {
        let updatedState = lifestyle.map((isLikedItem) =>
            isLikedItem.id === item.id
                ? { ...isLikedItem, selected: true }
                : { ...isLikedItem, selected: false }
        );
        setLifestyle(updatedState);
        char.lifestyle = item.value;
        dispatch(changeCharacter(char));
        console.log(char)
    };


    const RadioButton = ({ onPress, selected, children }: any) => {
        return (
            <View style={styles.radioButtonContainer}>
                <TouchableOpacity onPress={onPress} style={styles.radioButton}>
                    {selected ? <View style={styles.radioButtonIcon} /> : null}
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress}>
                    <Text style={styles.radioText}>{children}</Text>
                </TouchableOpacity>
            </View>
        );
    };

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
                    {race.map((item) => (
                        <RadioButton
                            onPress={() => onRadioBtnClickRace(item)}
                            selected={item.selected}
                            key={item.id}
                        >
                            {item.name}
                        </RadioButton>
                    ))}
                </View>
            </View>
            {/* Class */}
            <View style={styles.radioContainer}>
                <Text style={styles.radioLabel}>Class</Text>
                <View style={styles.radioBox}>
                    {charClass.map((item) => (
                        <RadioButton
                            onPress={() => onRadioBtnClickClass(item)}
                            selected={item.selected}
                            key={item.id}
                        >
                            {item.name}
                        </RadioButton>
                    ))}
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
                    <View style={styles.backgroundInfoContainer2}>
                        <Text style={styles.leftLabel}>Alignment</Text>
                        <View style={styles.borderedBoxRow}>
                            {alignment.map((item) => (
                                <RadioButton
                                    onPress={() => onRadioBtnClickAlignment(item)}
                                    selected={item.selected}
                                    key={item.id}
                                >
                                    {item.name}
                                </RadioButton>
                            ))}
                        </View>
                    </View>
                    <View style={styles.backgroundInfoContainer}>
                        <Text style={styles.leftLabel}>Lifestyle</Text>
                        <View style={styles.borderedBoxColumn}>
                            {lifestyle.map((item) => (
                                <RadioButton
                                    onPress={() => onRadioBtnClickLifestyle(item)}
                                    selected={item.selected}
                                    key={item.id}
                                >
                                    {item.name}
                                </RadioButton>
                            ))}
                        </View>
                    </View>
                    <View style={styles.backgroundInfoContainer}>

                        <Text style={styles.leftLabel}>Faith </Text>
                        <TextInput
                            style={styles.charInputTextLong}
                            placeholder='Faith ...'
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
                            onChangeText={(value) =>
                                dispatch(changeCharacter({ ...char, personalityTraits: value }))
                            }
                            value={char.personalityTraits}
                        />
                    </View>


                    <View style={styles.charInputLabel}>
                        <Text style={styles.characteristicsLabel}>Ideals: </Text>
                        <TextInput
                            style={styles.charInputTextLong}
                            placeholder='Ideals...'
                            placeholderTextColor='white'
                            multiline={true}
                            numberOfLines={5}
                            onChangeText={(value) =>
                                dispatch(changeCharacter({ ...char, ideals: value }))
                            }
                            value={char.ideals}
                        />
                    </View>
                    <View style={styles.charInputLabel}>
                        <Text style={styles.characteristicsLabel}>Flaws: </Text>
                        <TextInput
                            style={styles.charInputTextLong}
                            placeholder='Flaws ...'
                            placeholderTextColor='white'
                            multiline={true}
                            numberOfLines={5}
                            onChangeText={(value) =>
                                dispatch(changeCharacter({ ...char, flaws: value }))
                            }
                            value={char.flaws}
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
                            placeholder='Organizations ...'
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
                            placeholder='Allies ...'
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
                            placeholder='Enemies ...'
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
                            placeholder='Other Information ...'
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
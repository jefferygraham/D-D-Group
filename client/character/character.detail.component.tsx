import React from 'react';
import styles from '../global-styles';
import {Text,View,TouchableOpacity, Button} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackParams } from '../router/router.component';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../store/store';
import characterService from './character.service';
import { changeCharacter, getCharacters } from '../store/actions';
import { Character } from './character';

interface Props {
    route: RouteProp<StackParams, 'CharacterDetail'>;
}

export default function CharacterDetailComponent(props: Props) {
    const char = props.route.params;
    console.log(char)
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const nav = useNavigation();
    const dispatch = useDispatch();


    const rest = props.route.params;

    function removeCharacter() {
        characterService.deleteCharacter(char.charid).then(() => {
            if (user.name) {
                characterService.getCharactersByUser(user).then((result) => {
                    dispatch(getCharacters(result))
                    nav.navigate('Home');
                });
            }
        })
    }
    function goToEdit(){
        nav.navigate('EditCharacter');
    }

    return (
        <View style={styles.charContainer}>
            <Text style={styles.logo}>Character Name: {char.name}</Text>
            <Text style={styles.logo}>Player ID: {char.playerid}</Text>
            <View style={styles.displayContainer}>
                <Text style={styles.leftLabel}>Basic Information</Text>
                <View style={styles.borderedBoxColumn}>
                    <Text style={styles.leftText}>Race: {char.race}</Text>
                    <Text style={styles.leftText}>Class: {char.class}</Text>
                    <Text style={styles.leftText}>Gender: {char.gender}</Text>
                    <Text style={styles.leftText}>Age: {char.age}</Text>
                </View>
                <Text style={styles.leftLabel}>Stats</Text>
                <View style={styles.borderedBoxRow}>
                    <View style={styles.boxOfThree}>
                        <Text style={styles.leftText}>Strength: {char.strength}</Text>
                        <Text style={styles.leftText}>Dexterity: {char.dexterity}</Text>
                        <Text style={styles.leftText}>Constitution: {char.constitution}</Text>
                    </View>
                    <View style={styles.boxOfThree}>
                        <Text style={styles.leftText}>Intelligence: {char.strength}</Text>
                        <Text style={styles.leftText}>Wisdom: {char.dexterity}</Text>
                        <Text style={styles.leftText}>Charisma: {char.constitution}</Text>
                    </View>
                </View>
                <Text style={styles.leftLabel}>Physical Characteristics</Text>
                <View style={styles.borderedBoxColumn}>
                    <Text style={styles.leftText}>Height: {char.height}</Text>
                    <Text style={styles.leftText}>Weight: {char.weight}</Text>
                    <Text style={styles.leftText}>Skin Color: {char.skinColor}</Text>
                    <Text style={styles.leftText}>Hair Color: {char.hairColor}</Text>
                    <Text style={styles.leftText}>Eye Color: {char.eyecolor}</Text>
                </View>
                <Text style={styles.leftLabel}>Personal Characteristics</Text>
                <View style={styles.borderedBoxColumn}>
                    <Text style={styles.leftText}>Alignment: {char.alignment}</Text>
                    <Text style={styles.leftText}>Faith: {char.faith}</Text>
                    <Text style={styles.leftText}>Lifestyle: {char.lifestyle}</Text>
                    <Text style={styles.leftText}>Personality Traits: {char.personalityTraits}</Text>
                    <Text style={styles.leftText}>Ideals: {char.ideals}</Text>
                    <Text style={styles.leftText}>Flaws: {char.flaws}</Text>
                </View>
                <Text style={styles.leftLabel}>Backstory</Text>
                <View style={styles.borderedBoxColumn}>
                    <Text style={styles.leftText}>Organizations: {char.organizations}</Text>
                    <Text style={styles.leftText}>Allies: {char.allies}</Text>
                    <Text style={styles.leftText}>Enemies: {char.enemies}</Text>
                    <Text style={styles.leftText}>Other Information: {char.otherInfo}</Text>
                </View>
                <TouchableOpacity style={styles.createBtn} onPress={goToEdit}>
                    <Text style={styles.looksLabel}>Edit Character</Text>
                </TouchableOpacity>
            </View>
            {user.id == char.playerid && (
                <View style={styles.radio}>
                    <TouchableOpacity style={styles.button} onPress={removeCharacter}>
                        <Text style={styles.radioText}>Delete Character</Text>
                    </TouchableOpacity>
                </View>

            )}
        </View>
    )
}
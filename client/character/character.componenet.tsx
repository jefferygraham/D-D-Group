import React from 'react';
import { Character } from "./character";
import styles from '../global-styles';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

interface CharacterProps {
    data: Character;
}
import { useNavigation } from '@react-navigation/native';

function CharacterComponent({ data }: CharacterProps) {
    const nav = useNavigation();

    function goToChar() {
        nav.navigate('CharDetail', data);
    }

    return (
        <View style={styles.radioContainer}>
            <View style={styles.displayBox}>
                <View style={styles.boxOfThree}>
                    <Text style={styles.leftText}> Character Name: {data.name}</Text>
                    <Text style={styles.leftText}> Gender: {data.gender}</Text>
                    <Text style={styles.leftText}> Race: {data.race}</Text>
                    <Text style={styles.leftText}> Class: {data.class}</Text>
                </View>
                <View style={styles.boxOfThree}>
                    <Text style={styles.leftText}> Strength: {data.strength}</Text>
                    <Text style={styles.leftText}> Dexterity: {data.dexterity}</Text>
                    <Text style={styles.leftText}> Constitution: {data.constitution}</Text>
                    <Text style={styles.leftText}> Intelligence: {data.intelligence}</Text>
                </View>
                <View style={styles.boxOfThree}>
                    <Text style={styles.leftText}> Wisdom: {data.wisdom}</Text>
                    <Text style={styles.leftText}> Charisma: {data.charisma}</Text>
                </View>

            </View>
            <TouchableOpacity style={styles.createBtn} onPress={goToChar}>
                <Text style={styles.looksLabel}>More Info</Text>
            </TouchableOpacity>
        
        </View>




    )
}

export default CharacterComponent;
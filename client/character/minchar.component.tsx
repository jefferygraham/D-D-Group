import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../global-styles';
import { Character } from './character';

interface CharacterProps {
    data: Character;
}

function MinCharacterComponent({data}: CharacterProps) {

    return (
        <View style={charStyles.borderedContainer}>
            <Text style={styles.looksLabel}>{data.name}</Text>
            <Text style={styles.loginText}>Race: {data.race}</Text>
            <Text style={styles.loginText}>Class: {data.class}</Text>
        </View>
    )
}

const charStyles = StyleSheet.create({
    borderedContainer: {
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        borderRadius: 25,
        
    },


})

export default MinCharacterComponent;
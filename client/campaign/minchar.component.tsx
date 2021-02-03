import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from '../global-styles';
import { Character } from '../character/character';

interface CharacterProps {
    data: Character;
}

function MinCharacterComponent({data}: CharacterProps) {
    const nav = useNavigation();
    
    function goToCharacter(){
        //nav.navigate('Campaign', data);
    }

    return (
        <View>
            <Text style={styles.loginText}>{data.name}</Text>
            <Text style={styles.loginText}>{data.class}</Text>
            <Text style={styles.loginText}>{data.race}</Text>    
        </View>
    )
}

export default MinCharacterComponent;
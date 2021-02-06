import React from 'react';
import { View, Text } from 'react-native';
import styles from '../global-styles';
import { Character } from './character';

interface CharacterProps {
    data: Character;
}

function MinCharacterComponent({data}: CharacterProps) {

    return (
        <View>
            <Text style={styles.loginText}>{data.name}</Text>
            <Text style={styles.loginText}>{data.class}</Text>
            <Text style={styles.loginText}>{data.race}</Text>    
        </View>
    )
}

export default MinCharacterComponent;
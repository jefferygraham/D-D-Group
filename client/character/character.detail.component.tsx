import React from 'react';
import { Character } from "./character";
import styles from '../global-styles';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackParams } from '../router/router.component';

interface Props{
    route: RouteProp<StackParams, 'CharacterDetail'>;
}

export default function CharacterDetailComponent(props: Props){
    const char = props.route.params;

    return(
        <View style = {styles.charContainer}>

        </View>
    )
}
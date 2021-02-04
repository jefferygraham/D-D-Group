import styles from '../global-styles';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { CharacterState, NoteState, UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getCampaigns, getCharacters } from '../store/actions';
import userService from '../user/user.service';
import { User } from '../user/user';
import { Character } from '../character/character';
import CharacterService from '../character/character.service';


function ProfileComponent() {
    const nav = useNavigation();
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);


    let chars: Character[];
    return (
        <View style={styles.container}>

        </View>
    )
}

export default ProfileComponent;
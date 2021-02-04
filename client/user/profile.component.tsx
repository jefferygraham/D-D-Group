//import styles from '../global-styles';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Button, FlatList, StyleSheet } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { CharacterState, NoteState, UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getCampaigns, getCharacters } from '../store/actions';
import CharacterService from '../character/character.service';
import CharacterComponent from '../character/character.componenet';


function ProfileComponent() {
    const nav = useNavigation();
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const charSelector = (state: CharacterState) => state.characters;
    const characters = useSelector(charSelector);

    
    const dispatch = useDispatch();
    useEffect(() => {
        CharacterService.getCharactersByUser(user).then((results) => {
            dispatch(getCharacters(results));
        })
    }, [dispatch])
    return (
        <View style={styles.infoBoxLarge}>
            <Text style={styles.titleLeft}> Characters </Text>
            <View style={styles.background}>
                <FlatList
                    data={characters}
                    renderItem={({ item }) => (<CharacterComponent data={item}></CharacterComponent>)}
                    keyExtractor={(item) => item.name} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    infoBox: {
        width: '50%',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#465881',
        borderRadius: 25,
        padding: 25,
        margin: 25,
    },
    infoBoxLarge: {
        width: '80%',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 25,
        padding: 25,
        margin: 25,
    },
    title: {
        margin: 10,
        fontWeight: 'bold',
        fontSize: 30,
        color: '#fb5b5a',
    },
    titleLeft: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#fb5b5a',
        alignSelf: 'flex-start'

    },
    inputText: {
        flex: 2,
        color: 'white',
        fontSize: 20,
        borderColor: 'white',
        borderWidth: 1,

    },
    background: {
        backgroundColor: '#465881',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 25,
        padding: 25,
        width: '100%'
    },
    box: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#003f5c',

    },
    inputBox: {
        flexDirection: 'row',
        margin: 10,
        padding: 5,


    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center'
    },
    btn: {
        width: '45%',
        backgroundColor: '#fb5b5a',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }


});

export default ProfileComponent;
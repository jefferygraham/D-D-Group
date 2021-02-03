import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, AppState } from "react-native";
import { useSelector } from "react-redux";
import CharacterComponent from "../character/character.componenet";
import { CharacterState, UserState } from "../store/store";


export function JoinCampaign() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const charsSelector = (state: CharacterState) => state.characters;
    const characters = useSelector(charsSelector);
    const nav = useNavigation();

    function submitForm() {
        console.log('testing');
    }
    return (
        <View style={styles.box}>
            <Text style={styles.title}> Join a Campaign </Text>
            <View style={styles.infoBox}>
                <View style={styles.inputBox}>
                    <Text style={styles.label}>Campaign ID: </Text>
                    <TextInput
                        style={styles.inputText}
                        placeholder='Enter Campaign ID ...'
                        placeholderTextColor='white'
                    /* onChangeText={(value) =>
                        dispatch(changeCharacter({ ...char, organizations: value }))
                    }
                    value={char.organizations} */
                    />
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.label}>Character ID: </Text>
                    <TextInput
                        style={styles.inputText}
                        placeholder='Enter Character ID ...'
                        placeholderTextColor='white'
                    /* onChangeText={(value) =>
                        dispatch(changeCharacter({ ...char, organizations: value }))
                    }
                    value={char.organizations} */
                    />
                </View>
                <TouchableOpacity style={styles.btn} onPress={submitForm}>
                    <Text style={styles.label}>Join Campaign</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.infoBoxLarge}>
                <Text style={styles.titleLeft}> Characters </Text>
                <View style={styles.background}>
                <FlatList
                    data={characters}
                    renderItem={({ item }) => (<CharacterComponent data={item}></CharacterComponent>)}
                    keyExtractor={(item) => item.name} />
                    </View>
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
    background:{
        backgroundColor: '#465881',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 25,
        padding: 25,
        width:'100%'
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
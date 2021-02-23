import React from 'react';
import { Character } from "./character";
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

interface CharacterProps {
    data: Character;
}
import { useNavigation } from '@react-navigation/native';

function CharacterComponent({ data }: CharacterProps) {
    const nav = useNavigation();

    function goToChar() {
        nav.navigate('CharacterDetail', data);
    }

    return (
        <View style={styles.backgroundBox}>
            <View style={styles.displayBox}>
                <Text style={styles.btnLabel}> Character Name: {data.name}</Text>
                <Text style={styles.btnLabel}> Character ID: {data.charid}</Text>
                <View style={styles.infoBox}>
                    
                    <View style={styles.columnBox}>

                        <Text style={styles.leftText}> Gender: {data.gender}</Text>
                        <Text style={styles.leftText}> Race: {data.race}</Text>
                        <Text style={styles.leftText}> Class: {data.class}</Text>
                    </View>
                    <View style={styles.columnBox}>
                        <Text style={styles.leftText}> Strength: {data.strength}</Text>
                        <Text style={styles.leftText}> Dexterity: {data.dexterity}</Text>
                        <Text style={styles.leftText}> Constitution: {data.constitution}</Text>

                    </View>
                    <View style={styles.columnBox}>
                        <Text style={styles.leftText}> Intelligence: {data.intelligence}</Text>
                        <Text style={styles.leftText}> Wisdom: {data.wisdom}</Text>
                        <Text style={styles.leftText}> Charisma: {data.charisma}</Text>

                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={goToChar}>
                <Text style={styles.btnLabel}>More Info</Text>
            </TouchableOpacity>
            </View>
            

        </View>




    )
};

const styles = StyleSheet.create({
    backgroundBox: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#465881',
        flexDirection: 'column',
        width:'100%',
        flex:1,
        margin:10
    },
    displayBox:{
        flexDirection:'column',
        alignItems: 'center',
        borderRadius: 25,
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: 'white',
        width: '100%',

    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        justifyContent: 'space-evenly',
        width: '100%',

    },
    columnBox: {
        flexDirection: 'column',
        alignSelf:'center',
        justifyContent: 'space-evenly',
        flex: 1

    },
    leftText: {
        alignSelf: 'flex-start',
        color: 'white',
        margin: 5,
        fontSize: 17,

    },
    button: {
        width: '50%',
        backgroundColor: '#BA3130',
        borderRadius: 25,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    btnLabel: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 20,
        marginRight: 10
    },


});
export default CharacterComponent;
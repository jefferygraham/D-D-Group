import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../global-styles";
import { Encounter } from "./encounter";

interface EncounterProps {
    data: Encounter;
}

function MinEncounterComponent({data}: EncounterProps){
    const nav = useNavigation();

    function goToEncounter(){

    }

    return(
        <View style={styles.displayBox}>
            <Text>Hi</Text>
            <Text style={styles.loginText}>Encounter ID: {data.id}</Text>
            <TouchableOpacity style={styles.button} onPress={goToEncounter}>
                <Text style={styles.loginText}>Go To Encounter</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MinEncounterComponent;
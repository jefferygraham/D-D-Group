import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getCampaigns } from '../store/actions';
import { CampaignState, UserState } from '../store/store';
import userService from '../user/user.service';
import campaignService from './campaign.service';

export function EditCampaign() {
    const campaignSelector = (state: CampaignState) => state.campaign;
    const campaign = useSelector(campaignSelector);
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const [name,setName]=React.useState('');
    const dispatch = useDispatch();
    const nav = useNavigation();

    function submitForm(){
        campaignService.updateCampaign(campaign.campaignid,name).then(()=>{
            if(user.id){
                userService.getCampaignsByID(user.id).then((results)=>{
                    dispatch(getCampaigns(results));
                    nav.navigate('Home');

                })
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <View>
            <Text style={styles.title}>Edit Campaign</Text>
            <View style={styles.displayBox}>
                <View style={styles.inputBox}>
                    <Text> Campaign ID: </Text>
                    <TextInput
                        style={styles.inputText}
                        editable = {false}
                        value={String(campaign.campaignid)}
                    />
                </View>
                <View style={styles.inputBox}>
                    <Text> Campaign Name: </Text>
                    <TextInput
                        style={styles.inputText}
                        onChangeText={text => setName(text)}
                        value={campaign.campaignname}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={submitForm}>
                    <Text style={styles.btnLabel}>Update Campaign</Text>
                </TouchableOpacity>
            </View>
        </View>)

}

const styles = StyleSheet.create({

    displayBox: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        padding: 10,
        margin: 10,
        backgroundColor: '#465881',
        width: '80%'

    },
    button: {

        backgroundColor: '#fb5b5a',
        borderRadius: 25,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 10,
    },
    btnLabel: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 20,
        marginRight: 10,

    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#fb5b5a',
    },
    inputText: {
        flex: 2,
        color: 'white',
        fontSize: 20,
        borderColor: 'white',
        borderWidth: 1,
    },
    inputBox: {
        flexDirection: 'row',
        margin: 10,
        padding: 5,
    },


});
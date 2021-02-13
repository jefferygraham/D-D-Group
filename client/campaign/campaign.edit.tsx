import { RouteProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { StackParams } from '../router/router.component';
import { getCampaigns } from '../store/actions';
import { UserState } from '../store/store';
import userService from '../user/user.service';
import campaignService from './campaign.service';

interface Props {
    route: RouteProp<StackParams, 'Campaign'>;
}

export function EditCampaign(data:Props) {
    const campaign = data.route.params;
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const nav = useNavigation();
    const [campaignName, setCampaignName] = React.useState(campaign.campaignname);

    function submitForm(){
        campaignService.updateCampaign(campaign.campaignid,campaignName).then(()=>{
            if(user.id){
                userService.getCampaignsByID(user.id).then((results)=>{
                    let sorted = results.sort(function (a,b){
                        return a.campaignid - b.campaignid

                    });
                    dispatch(getCampaigns(sorted));
                    nav.navigate('Home');

                })
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <View style={styles.displayBox}>
            <Text style={styles.title}>Edit Campaign</Text>
            <View style={styles.container}>
                <View style={styles.inputBox}>
                    <Text style={styles.btnLabel}> Campaign ID: </Text>
                    <TextInput
                        style={styles.inputText}
                        editable = {false}
                        value={String(campaign.campaignid)}
                    />
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.btnLabel}> Campaign Name: </Text>
                    <TextInput
                        style={styles.inputText}
                        onChangeText={text => setCampaignName(text)}
                        value={campaignName}
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
        backgroundColor: '#003f5c',
        flex:1,

    },
    button: {

        backgroundColor: '#BA3130',
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
        margin:10,
        color: '#F6DEB9',
        alignSelf:'center',
    },
    inputText: {
        flex: 2,
        color: 'white',
        fontSize: 20,
        borderColor: 'white',
        borderWidth: 1,
    },
    container:{
        width:'50%',
        backgroundColor: '#465881',
        borderRadius: 25,
        padding: 20,

    },
    inputBox: {
        flexDirection: 'row',
        margin: 10,
        padding: 5,
    },


});
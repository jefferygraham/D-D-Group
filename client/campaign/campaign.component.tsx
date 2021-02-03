import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import campaignService from './campaign.service';
import { StackParams } from '../router/router.component';
import styles from '../global-styles';
<<<<<<< HEAD
import { CharacterState, UserState } from '../store/store';
=======
import { CharacterState, NoteState, UserState } from '../store/store';
>>>>>>> 687a260fc5d3c19c484de430617d075b03a18fb9
import { useDispatch, useSelector } from 'react-redux';
import { changeCampaign, getCampaigns, getCharacters } from '../store/actions';
import userService from '../user/user.service';
import { User } from '../user/user';
import { Character } from '../character/character';
import MinCharacterComponent from './minchar.component';

interface Props {
    route: RouteProp<StackParams, 'Campaign'>;
}

function CampaignComponent(data: Props) {
    const nav = useNavigation();
    const campaign = data.route.params;
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const charSelector = (state: CharacterState) => state.characters;
    const characters = useSelector(charSelector);
<<<<<<< HEAD
=======
    const notesSelector = (state: NoteState) => {
        console.log(state);
        return state.notes;
    };
>>>>>>> 687a260fc5d3c19c484de430617d075b03a18fb9
    const dispatch = useDispatch();
    let players: User[];

    useEffect(() => {
        campaignService.getCharacters(campaign.campaignid).then((results) => {
            dispatch(getCharacters(results));
        })
    }, [dispatch])
<<<<<<< HEAD
=======
    const notes = useSelector(notesSelector);
>>>>>>> 687a260fc5d3c19c484de430617d075b03a18fb9

    //function to access all notes for the campaign,
    //should route to a notes component
    const campaignNotes = notes.filter(
        (note) => note.campaignId === campaign.campaignid
    );

    //routes to playerpage for that campaign
    function viewPlayers() {
        dispatch(changeCampaign(campaign));
        campaignService.getPlayers(campaign.campaignid).then((results) => {
            players = results;
            nav.navigate('Players', players);
        })
    }

    function gotoAddNote() {
        nav.navigate('AddNote', { campaign });
    }

    //button shows up if the user is DM
    //should remove the campaign from each user and character associated
    //then deletes all notes and the campaign itself
    function removeCampaign() {
        campaignService.deleteCampaign(campaign.campaignid).then(() => {
            if (user.id) {
                userService.getCampaignsByID(user.id).then((results) => {
                    dispatch(getCampaigns(results));
                    nav.navigate('Home');
                });
            }
        })
    }

    function editCampaign() {
        nav.navigate('EditCampaign', campaign);

    }


    return (
        <View style={styles.container}>
            <Text style={styles.loginText}>{campaign.campaignname}</Text>
            <Text style={styles.loginText}>Dungeon Master: {campaign.dm}</Text>
            {characters.map((req: Character, index: number) =>
                <MinCharacterComponent key={'req-' + index} data={req}></MinCharacterComponent>
            )}
            <Text style={styles.loginText}>Notes:</Text>
            {campaignNotes.length > 0 &&
                campaignNotes.map((campaign) => {
                    return (
                        <View
                            key={`${campaign.userId}-${campaign.timestamp}`}
                            style={{ borderColor: 'white', borderWidth: 1 }}>
                            <Text style={styles.loginText}>{campaign.message}</Text>
                            <Text style={styles.loginText}>
                                -{campaign.username},
                {new Date(campaign.timestamp).toLocaleString()}
                            </Text>
                        </View>
                    );
                })}
            {user.role == 'master' && (
                <View style={styles.radio}>
                    <TouchableOpacity style={styles.button} onPress={editCampaign}>
                        <Text style={styles.radioText}>Edit Campaign</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={removeCampaign}>
                        <Text style={styles.radioText}>Delete Campaign</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={viewPlayers}>
                        <Text style={styles.radioText}>Manage Players</Text>
                    </TouchableOpacity>

                </View>

            )}
            <TouchableOpacity style={styles.button} onPress={gotoAddNote}>
                <Text style={styles.radioText}>Add Note</Text>
            </TouchableOpacity>
            <Button
                title='view all notes'
                onPress={() => nav.navigate('NoteList', { campaign })}></Button>
        </View>
    );
}

export default CampaignComponent;

import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import campaignService from './campaign.service';
import { StackParams } from '../router/router.component';
import styles from '../global-styles';
import { CharacterState, NoteState, UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeCampaign,
  getCampaigns,
  getCharacters,
  getPlayers,
} from '../store/actions';
import userService from '../user/user.service';
import { User } from '../user/user';
import { Character } from '../character/character';
import MinCharacterComponent from './minchar.component';
import { Note } from '../note/note';

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
  const notesSelector = (state: NoteState) => {
    return state.notes;
  };
  const notes = useSelector(notesSelector);
  const dispatch = useDispatch();
  let players: User[];

  useEffect(() => {
    campaignService.getCharacters(campaign.campaignid).then((results) => {
      dispatch(getCharacters(results));
    });
  }, [dispatch]);

  //function to access all notes for the campaign,
  //should route to a notes component
  const campaignNotes: Note[] =
    notes.length > 0
      ? notes.filter((note) => note.campaignId === campaign.campaignid)
      : [];

  const sortedNotes = campaignNotes.sort((a, b) => b.timestamp - a.timestamp);

  //routes to playerpage for that campaign
  function viewPlayers() {
    dispatch(changeCampaign(campaign));
    campaignService.getPlayers(campaign.campaignid).then((results) => {
      players = results;
      nav.navigate('Players', players);
    });
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
    });
  }

  function editCampaign() {
    nav.navigate('EditCampaign', campaign);
  }

  function leaveCampaign() {
    if (user.id) {
      campaignService.removePlayer(campaign.campaignid, user.id).then(() => {
        if (user.id) {
          userService.getCampaignsByID(user.id).then((camps) => {
            dispatch(getCampaigns(camps));
            nav.navigate('Home');
          });
        }
      });
    }
  }

  // function addEncounter(){
  //     campaignService.addEncounter(campaign.campaignid).then(() => {
  //         nav.navigate('Campaign',campaign);
  //     })
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>{campaign.campaignname}</Text>
      <Text style={styles.loginText}>Dungeon Master: {campaign.dm}</Text>
      {characters.map((req: Character, index: number) => (
        <MinCharacterComponent
          key={'req-' + index}
          data={req}></MinCharacterComponent>
      ))}
      <Text style={styles.loginText}>Notes:</Text>
      {sortedNotes.length > 0 &&
        sortedNotes.splice(0, 3).map((campaign) => {
          return (
            <View
              key={`${campaign.noteId}`}
              style={{
                alignItems: 'center',
                borderColor: 'white',
                borderWidth: 1,
                borderRadius: 5,
                padding: 15,
                margin: 15,
              }}>
              <Text style={styles.loginText}>{campaign.username} wrote:</Text>
              <Text style={styles.loginText}>{campaign.message}</Text>
              <Text style={styles.loginText}>
                {new Date(campaign.timestamp).toLocaleString()}
              </Text>
            </View>
          );
        })}
      {user.role == 'master' && (
        <View style={styles.radio}>
          {/* <TouchableOpacity style={styles.button} onPress={addEncounter}>
                        <Text style={styles.radioText}>Add Encounter</Text>
                    </TouchableOpacity> */}
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
      <Button
        title='add note'
        onPress={() => nav.navigate('AddNote', { campaign })}></Button>
      <Button
        title='view all notes'
        onPress={() => nav.navigate('NoteList', { campaign })}></Button>
      {user.role == 'player' && (
        <TouchableOpacity style={styles.button} onPress={leaveCampaign}>
          <Text style={styles.radioText}>Leave Campaign</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default CampaignComponent;

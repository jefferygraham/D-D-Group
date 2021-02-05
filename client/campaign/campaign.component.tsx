import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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

  function goToAddNote() {
    nav.navigate('AddNote', campaign)
  }

  function gotToNoteList() {
    nav.navigate('NoteList', { campaign })

  }
  // function addEncounter(){
  //     campaignService.addEncounter(campaign.campaignid).then(() => {
  //         nav.navigate('Campaign',campaign);
  //     })
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>{campaign.campaignname}</Text>
      <Text style={styles.looksLabel}>Dungeon Master: {campaign.dm}</Text>
      <View style={campaignStyles.container}>
        <Text style={styles.radioLabel}>Characters</Text>
        <View style={campaignStyles.backgroundBox}>
          {characters.map((req: Character, index: number) => (
            <MinCharacterComponent
              key={'req-' + index}
              data={req}></MinCharacterComponent>
          ))}
        </View>
      </View>
      <View style={campaignStyles.container}>
        <Text style={styles.radioLabel}>Notes:</Text>
        <View style={campaignStyles.backgroundBox}>
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
        </View>
      </View>




      <View style={styles.radio}>
        <TouchableOpacity style={styles.button} onPress={goToAddNote}>
          <Text style={styles.radioText}>Add Note</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={gotToNoteList}>
          <Text style={styles.radioText}>View All Notes</Text>
        </TouchableOpacity>
        {user.role == 'master' && (

          <View style={styles.radio}>
            {/* <TouchableOpacity style={styles.button} onPress={addEncounter}>
                        <Text style={styles.radioText}>Add Encounter</Text>
                    </TouchableOpacity> */}
            <TouchableOpacity style={styles.button} onPress={editCampaign}>
              <Text style={styles.radioText}>Edit Campaign</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={viewPlayers}>
              <Text style={styles.radioText}>Manage Players</Text>
            </TouchableOpacity>
          </View>


        )}
        {user.role == 'player' && (
          <TouchableOpacity style={styles.button} onPress={leaveCampaign}>
            <Text style={styles.radioText}>Leave Campaign</Text>
          </TouchableOpacity>
        )}
      </View>
      {user.role == 'master' && (
        <TouchableOpacity style={campaignStyles.dangerButton} onPress={removeCampaign}>
          <Text style={styles.radioText}>DELETE CAMPAIGN</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const campaignStyles = StyleSheet.create({
  backgroundBox: {
    backgroundColor: '#465881',
    flexDirection: 'row',
    width: '100%',
    borderRadius: 25,
    padding: 10,
  },
  container: {
    width: '80%',
    justifyContent: 'space-evenly'
  },
  dangerButton:{
    margin: 20,
    padding: 10,
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: 'red',
    width:'25%',
    fontWeight:'bold'

  }


})

export default CampaignComponent;

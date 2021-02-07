import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import campaignService from './campaign.service';
import { StackParams } from '../router/router.component';
import styles from '../global-styles';
import {
  CharacterState,
  EncounterState,
  NoteState,
  UserState,
} from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeCampaign,
  getCampaigns,
  getCharacters,
  getEncounters,
} from '../store/actions';
import userService from '../user/user.service';
import { User } from '../user/user';
import { Character } from '../character/character';
import MinCharacterComponent from '../character/minchar.component';
import { Encounter } from '../encounters/encounter';

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
  const campaignNotes = notes.filter(
    (note) => note.campaignId === campaign.campaignid
  );
  const encounterSelector = (state: EncounterState) => state.encounters;
  const encounters = useSelector(encounterSelector);

  useEffect(() => {
    let chars: Character[] = [];
    dispatch(getCharacters(chars));
    campaignService.getCharacters(campaign.campaignid).then((results) => {
      dispatch(getCharacters(results));
    })
  }, [dispatch])



  //routes to playerpage for that campaign
  function viewPlayers() {
    dispatch(changeCampaign(campaign));
    campaignService.getPlayers(campaign.campaignid).then((results) => {
      players = results;
      nav.navigate('Players', players);
    });
  }

  function gotoAddNote() {
    nav.navigate('AddNote', { campaign });
  }

  function removeCampaign() {
    console.log(campaign.campaignid);
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

  function addEncounter() {
    campaignService.addEncounter(campaign.campaignid).then((encounter) => {
      campaignService.getEncounters(campaign.campaignid).then((results) => {
        dispatch(getEncounters(results));
      });
    });
  }

  function goToEncounter(encounter: Encounter) {
    nav.navigate('Encounter', encounter);
  }

  function goToAddNote() {
    nav.navigate('AddNote', campaign)
  }

  function gotToNoteList() {
    nav.navigate('NoteList', { campaign })

  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>{campaign.campaignname}</Text>
      <Text style={styles.looksLabel}>Dungeon Master: {campaign.dm}</Text>
      <View style={campaignStyles.container}>
        <Text style={styles.radioLabel}>Characters</Text>
        <View style={campaignStyles.backgroundBox}>
          {characters.length == 0 &&
            <Text style={styles.looksLabel}> No Characters</Text>
          }
          {characters.length > 0 &&
            characters.map((req: Character, index: number) => (
              <MinCharacterComponent
                key={'req-' + index}
                data={req}></MinCharacterComponent>
            ))
          }

        </View>
      </View>
      <View style={campaignStyles.container}>
        <Text style={styles.radioLabel}>Notes:</Text>
        <View style={campaignStyles.backgroundBox}>
          {campaignNotes.length == 0 &&
            <Text style={styles.looksLabel}> No Notes</Text>
          }
          {campaignNotes.length > 0 &&
            campaignNotes.splice(0, 3).map((campaign) => {
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
      {user.role == 'master' &&
        <View style={campaignStyles.container}>
          <Text style={styles.radioLabel}>Encounters:</Text>
          <View style={campaignStyles.backgroundBox}>
            {encounters.length == 0 &&
              <Text style={styles.looksLabel}> No Encounters</Text>
            }
            {encounters.length > 0 &&
              encounters.map((encounter) => {
                return (
                  <View
                    key={`${encounter.encounterid}`}
                    style={{ borderColor: 'white', borderWidth: 1, alignItems: 'center', margin: 5 }}>
                    <Text style={styles.loginText}>{encounter.encounterid}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => goToEncounter(encounter)}>
                      <Text style={styles.loginText}>Go To Encounter</Text>
                    </TouchableOpacity>
                  </View>
                )
              })}
          </View>
        </View>
      }
      <View style={styles.radio}>
        <TouchableOpacity style={styles.button} onPress={goToAddNote}>
          <Text style={styles.radioText}>Add Note</Text>
        </TouchableOpacity>
        {campaignNotes.length > 0 &&
          <TouchableOpacity style={styles.button} onPress={gotToNoteList}>
            <Text style={styles.radioText}>View All Notes</Text>
          </TouchableOpacity>
        }

        {user.role == 'master' && (

          <View style={styles.radio}>
            <TouchableOpacity style={styles.button} onPress={addEncounter}>
              <Text style={styles.radioText}>Add Encounter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={editCampaign}>
              <Text style={styles.radioText}>Edit Campaign</Text>
            </TouchableOpacity>
            {characters.length > 0 &&
              <TouchableOpacity style={styles.button} onPress={viewPlayers}>
                <Text style={styles.radioText}>Manage Players</Text>
              </TouchableOpacity>
            }


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
    flexWrap: 'wrap'
  },
  container: {
    width: '80%',
    justifyContent: 'space-evenly',
    marginBottom: 10,
    marginTop: 10


  },
  dangerButton: {
    margin: 20,
    padding: 10,
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: 'red',
    width: '25%',
    fontWeight: 'bold'
  }


})

export default CampaignComponent;

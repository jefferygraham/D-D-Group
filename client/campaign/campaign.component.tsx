import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import campaignService from './campaign.service';
import { StackParams } from '../router/router.component';
import styles from '../global-styles';
import { UserState, NoteState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { changeCampaign, getCampaigns, getPlayers } from '../store/actions';
import userService from '../user/user.service';
import { User } from '../user/user';

interface Props {
  route: RouteProp<StackParams, 'Campaign'>;
}

function CampaignComponent(data: Props) {
  const nav = useNavigation();
  const campaign = data.route.params;
  const userSelector = (state: UserState) => state.user;
  const user = useSelector(userSelector);
  const notesSelector = (state: NoteState) => {
    console.log(state);
    return state.notes;
  };
  const notes = useSelector(notesSelector);
  const dispatch = useDispatch();
  let players: User[];

  //function to access all notes for the campaign,
  //should route to a notes component
  const campaignNotes = notes.filter(
    (note) => note.campaignId === campaign.campaignid
  );

  //will target a character and take you to the character sheet
  function goToCharacter() { }

  //routes to playerpage for that campaign
  function viewPlayers() {
    dispatch(changeCampaign(campaign));
    campaignService.getPlayers(campaign.campaignid).then((results) => {
      players = results;
      dispatch(getPlayers(players));
      console.log(players);
      nav.navigate('Players', players);
    });
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
    });
  }

  function editCampaign() {
    nav.navigate('EditCampaign', campaign);

  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>{campaign.campaignname}</Text>
      <Text style={styles.logo}>Dungeon Master: {campaign.dm}</Text>
      <Text style={styles.logo}>Notes</Text>
      {campaignNotes.length > 0 && campaignNotes.map((campaign) => {
        return (
          <View
            key={`${campaign.userId}-${campaign.timestamp}`}
            style={{ borderColor: 'white', borderWidth: 1 }}>
            <Text style={styles.loginText}>{campaign.message}</Text>
            <Text style={styles.loginText}>
              {campaign.username},
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
          <TouchableOpacity style={styles.button} onPress={gotoAddNote}>
            <Text style={styles.radioText}>Add Note</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={viewPlayers}>
            <Text style={styles.radioText}>Manage Players</Text>
          </TouchableOpacity>

        </View>

      )}
    </View>
  )
}

export default CampaignComponent;

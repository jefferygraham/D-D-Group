import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
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
  function goToCharacter() {}

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

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>{campaign.campaignname}</Text>
      <Text style={styles.loginText}>Dungeon Master: {campaign.dm}</Text>
      <Text style={styles.loginText}>Notes:</Text>
      {campaignNotes.length > 0 &&
        campaignNotes.map((campaign) => {
          return (
            <View
              key={`${campaign.userId}-${campaign.timestamp}`}
              style={{
                alignItems: 'center',
                borderColor: 'white',
                borderWidth: 1,
                borderRadius: 5,
                padding: 15,
                margin: 15,
              }}>
              <Text style={styles.loginText}>{campaign.message}</Text>
              <Text style={styles.loginText}>
                -{campaign.username},
                {new Date(campaign.timestamp).toLocaleString()}
              </Text>
            </View>
          );
        })}
      {user.role == 'master' && (
          <Button title='delete campaign' onPress={removeCampaign}></Button>
        ) && <Button title='manage players' onPress={viewPlayers}></Button>}
      <Button
        title='add note'
        onPress={() => nav.navigate('AddNote', { campaign })}></Button>
      <Button
        title='view all notes'
        onPress={() => nav.navigate('NoteList', { campaign })}></Button>
    </View>
  );
}

export default CampaignComponent;

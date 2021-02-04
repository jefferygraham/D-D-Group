import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {  Text, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Campaign } from './campaign/campaign';
import MinCampaignComponent from './campaign/mincampaign.component';
import styles from './global-styles';
import { getCampaigns } from './store/actions';
import {
  CampaignState,
  CharacterState,
  UserState,
  NoteState,
} from './store/store';
import userService from './user/user.service';
import { thunkGetNotes } from './store/thunks';

export default function App() {
  const userSelector = (state: UserState) => state.user;
  const user = useSelector(userSelector);
  const campaignSelector = (state: CampaignState) => state.campaigns;
  const campaigns = useSelector(campaignSelector);
  const dispatch = useDispatch();
  const nav = useNavigation();

  useEffect(() => {
    dispatch(thunkGetNotes());
  }, [dispatch]);

  useEffect(() => {
    if (user.id) {
      userService.getCampaignsByID(user.id).then((results) => {
        dispatch(getCampaigns(results));
      });
    }
  }, [dispatch]);

  const selectCharacters = (state: CharacterState) => state.characters;
  const characters = useSelector(selectCharacters);
  console.log(characters);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Home Page</Text>
      <StatusBar style='auto' />
      <View style={styles.radioContainer}>
      <Text style={styles.radioLabel}>Your Campaigns</Text>
      <View style = {homeStyles.campaignContainer}>
        {campaigns.map((req: Campaign, index: number) =>
          <MinCampaignComponent key={'req-' + index} data={req}></MinCampaignComponent>
        )}
      </View>
      </View>
     

    </View>
  );
}

const homeStyles = StyleSheet.create({
  campaignContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#465881',
    borderRadius: 25,
    padding: 10,
    margin: 10,
    justifyContent: 'space-evenly',
    width:'100%',

  }
  })



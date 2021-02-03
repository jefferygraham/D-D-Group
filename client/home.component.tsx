import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
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

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Home Page</Text>
      <StatusBar style='auto' />
      <Text style={styles.logo}>Your Campaigns:</Text>
      <View>
        {campaigns.map((req: Campaign, index: number) => (
          <MinCampaignComponent
            key={'req-' + index}
            data={req}></MinCampaignComponent>
        ))}
      </View>
    </View>
  );
}

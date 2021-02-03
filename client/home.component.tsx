import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Campaign } from './campaign/campaign';
import campaignService from './campaign/campaign.service';
import MinCampaignComponent from './campaign/mincampaign.component';
import { getCampaigns } from './store/actions';
import { getNotes } from './store/actions';
import noteService from './note/note.service';
import { thunkGetNotes } from './store/thunks';

import { CampaignState, UserState, NoteState } from './store/store';

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
    //get campaigns by user as player or get campaigns by user as DM
    if (user.id) {
      campaignService.getCampaignsByID(user.id).then((results) => {
        dispatch(getCampaigns(results));
      });
    }
  }, [dispatch]);

  function goToAdd() {
    nav.navigate('AddCampaign');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Page</Text>
      <StatusBar style='auto' />
      <Text style={styles.text}>Your Campaigns:</Text>
      <View>
        {campaigns.map((req: Campaign, index: number) => (
          <MinCampaignComponent
            key={'req-' + index}
            data={req}></MinCampaignComponent>
        ))}
      </View>
      {user.role == 'master' && (
        <TouchableOpacity style={styles.loginBtn} onPress={goToAdd}>
          <Text>Add Campaign</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
    color: 'white',
  },
  text: {
    color: 'white',
  },
});

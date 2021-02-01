import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { AppState, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Campaign } from './campaign/campaign';
import campaignService from './campaign/campaign.service';
import CharacterComponent from './character/character.componenet';
import styles from './global-styles';
//import MinCampaignComponent from './campaign/mincampaign.component';
import MinCampaignComponent from './campaign/mincampaign.component';
import { getCampaigns } from './store/actions';
import { CampaignState, CharacterState, UserState } from './store/store';

export default function App() {
  const userSelector = (state: UserState) => state.user;
  const user = useSelector(userSelector);
  const campaignSelector = (state: CampaignState) => state.campaigns;
  const campaigns = useSelector(campaignSelector);
  const dispatch = useDispatch();
  const nav = useNavigation();

  useEffect(() => {
    //get campaigns by user as player or get campaigns by user as DM
    // if (user.role === 'DM') {
    //   if (user.id) {
    //     campaignService.getCampaignsByID(user.id).then((results) => {
    //       dispatch(getCampaigns(results));
    //     })
    //   }
    // }
  

    if (user.id) {
      campaignService.getCampaignsByID(user.id).then((results) => {
        dispatch(getCampaigns(results));
      })
    }
  }, [dispatch])

  function goToAdd() {
    nav.navigate('AddCampaign');
  }
  const selectCharacters = (state:CharacterState)=> state.characters;
  const characters = useSelector(selectCharacters);
  console.log(characters)

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Home Page</Text>
      <StatusBar style='auto' />
      <Text style={styles.logo}>Your Campaigns:</Text>
      <View>
        {campaigns.map((req: Campaign, index: number) =>
          <MinCampaignComponent key={'req-' + index} data={req}></MinCampaignComponent>
        )}
      </View>
      {user.role == 'master' && (
        <TouchableOpacity style={styles.loginBtn} onPress={goToAdd}>
          <Text>Add Campaign</Text>
        </TouchableOpacity>
      )}

    </View>
  );
}




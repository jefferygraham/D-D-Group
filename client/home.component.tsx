import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Campaign } from './campaign/campaign';
import campaignService from './campaign/campaign.service';
//import MinCampaignComponent from './campaign/mincampaign.component';
import { getCampaigns } from './store/actions';
import { CampaignState, UserState } from './store/store';

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
  })


  function goToAdd() {
    nav.navigate('AddCampaign');
  }

  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <StatusBar style='auto' />
      {user.role === 'master' && (
        <View>
          <View>
            {/* {campaigns.map((req: Campaign, index: number) =>
              <MinCampaignComponent key={'req-' + index} data={req}></MinCampaignComponent>
            )} */}
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={goToAdd}>
            <Text>Add Campaign</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    width: '70%',
    backgroundColor: '#fb5b5a',
    color: 'white',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
});

import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { AppState, UserState } from '../store/store';
import { CardStyleInterpolators } from '@react-navigation/stack';

function NavBarComponent() {
  const nav = useNavigation();
  const user = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();
  let header = <Text></Text>;

  function goToAdd() {
    nav.navigate('AddCampaign');
  }

  function goToCreateChar() {
    nav.navigate('CharacterCreation');
  }
  function goToJoinCampaign() {
    nav.navigate('JoinCampaign');
  }

  // if (user.name) {
  //   header = <Text>{user.name}</Text>;
  // } else {
  //   header = <Text>Not logged in</Text>;
  // }

  if (user) {
    return (
      <View style={styles.navBox}>
        {(user.role == 'player') && (
          <View style={styles.navBox}>
            <TouchableOpacity style={styles.navButton} onPress={goToCreateChar}>
              <Text >Create A Character</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={goToJoinCampaign}>
              <Text >Join A Campaign</Text>
            </TouchableOpacity>
          </View>
        )}
        {user.role == 'master' && (
          <View style={styles.navBox}>
            <TouchableOpacity style={styles.navButton} onPress={goToAdd}>
              <Text >Add A Campaign</Text>
            </TouchableOpacity>
          </View>

        )}

        {header}

      </View>)

  } else {
    return (
      <View>
        {header}
      </View>
    )
  }

};

const styles = StyleSheet.create({
  navBox: {
    flexDirection: 'row',

  },
  navButton: {
    margin: 5,
    padding:10,
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#fb5b5a'
  }

});

export default NavBarComponent;

import React, { useEffect } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { AppState, UserState } from '../store/store';
import styles from '../global-styles';

function NavBarComponent() {
  const nav = useNavigation();
  const user = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();
  let header = <Text></Text>;

  function goToAdd() {
    nav.navigate('AddCampaign');
  }

  // if (user.name) {
  //   header = <Text>{user.name}</Text>;
  // } else {
  //   header = <Text>Not logged in</Text>;
  // }
  if (user) {
    return (
      <View>
        {(user.role == 'player') && (
          <Button
            onPress={() => {
              nav.navigate('CharacterCreation');
            }}
            title='Create Character '
          />
        )}
        {user.role == 'master' && (
          <Button
            onPress={() => {
              nav.navigate('AddCampaign');
            }}
            title='Add Campaign '
          />
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

}

export default NavBarComponent;

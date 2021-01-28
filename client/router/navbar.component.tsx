import React, { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { AppState, UserState } from '../store/store';

function NavBarComponent() {
  const nav = useNavigation();
  const user = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();
  let header = <Text></Text>;


  // if (user.name) {
  //   header = <Text>{user.name}</Text>;
  // } else {
  //   header = <Text>Not logged in</Text>;
  // }
console.log(user)
  return (
    <View>
      {/* {user.id ? ( */}
        <Button
          onPress={() => {
            nav.navigate('CharacterCreation');
          }}
          title='Create Character '
        />
      {/* ) : ('')}  */}

      {header}

    </View>)
}

export default NavBarComponent;

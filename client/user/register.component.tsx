import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { registerAction } from '../store/actions';
import userService from './user.service';
import { UserState } from '../store/store';

interface RegisterProp {
  navigation: any;
}

function RegisterComponent({ navigation }: RegisterProp) {
  const userSelector = (state: UserState) => state.user;
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  function submitForm() {
    userService.register(user).then((user) => {
      dispatch(registerAction(user));

      if (user) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Unauthorized');
      }
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>D&D Management</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder='Username...'
          placeholderTextColor='#003f5c'
          onChangeText={(value) =>
            dispatch(registerAction({ ...user, name: value }))
          }
          value={user.name}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder='Password...'
          placeholderTextColor='#003f5c'
          secureTextEntry
          onChangeText={(value) =>
            dispatch(registerAction({ ...user, password: value }))
          }
          value={user.password}
        />
      </View>
      <View style={styles.inputView}>
        <RNPickerSelect
          placeholder={{ label: 'Select a role', value: null }}
          useNativeAndroidPickerStyle={false}
          onValueChange={(value) =>
            dispatch(registerAction({ ...user, role: value }))
          }
          items={[
            { label: 'Player', value: 'player' },
            { label: 'Master', value: 'master' },
          ]}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={submitForm}>
        <Text style={styles.loginText}>REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
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
  },
  loginText: {
    color: 'white',
  },
});

export default RegisterComponent;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { getCharacters, getUser, loginAction } from '../store/actions';
import userService from './user.service';
import { UserState } from '../store/store';
import characterService from '../character/character.service';
import { thunkGetMessages } from '../store/thunks';

interface LoginProp {
  navigation: any;
}

function LoginComponent({ navigation }: LoginProp) {
  const userSelector = (state: UserState) => {
    return state.loginUser;
  };
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetMessages());
  }, [dispatch]);

  function submitForm() {
    userService.login(user).then((user) => {
      dispatch(getUser(user));

      if (user) {
        characterService.getCharactersByUser(user).then((char) => {
          dispatch(getCharacters(char));
          navigation.navigate('Home');
        });
      } else {
        navigation.navigate('Unauthorized');
      }
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>D&D Management</Text>
      <View style={styles.inputContainer}>
        <label>
        <Text style = {styles.loginText}>Username</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder='Enter Username'
              placeholderTextColor='white'
              onChangeText={(value) =>
                dispatch(loginAction({ ...user, name: value }))
              }
              value={user.name}
            />
          </View>
        </label>
      </View>
      <View style={styles.inputContainer}>
        <label>
          <Text style = {styles.loginText}>Password</Text>
          <View style={styles.inputView}>
            <TextInput

              nativeID={'passwordInput'}
              style={styles.inputText}
              placeholder='Enter Password'
              placeholderTextColor='white'
              secureTextEntry
              onChangeText={(value) =>
                dispatch(loginAction({ ...user, password: value }))
              }
              value={user.password}
            />
          </View>
        </label>
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={submitForm}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.loginText}>Register</Text>
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
    color: 'white',
    marginBottom: 40,
  },
  inputView: {
    width: '100%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    width: '80%',
    color: 'white',
    fontSize: 18,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    margin: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  loginBtn: {
    width: '50%',
    backgroundColor: '#BA3130',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  loginText: {
    color: 'white',
    fontSize: 18
  },
  label: {
    color: 'white'
  },
  lightBackground: {

  }
});

export default LoginComponent;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { addMessage } from '../store/actions';

import { customAlphabet } from 'nanoid';
import { RouteProp, useNavigation } from '@react-navigation/native';

import { UserState } from '../store/store';
import messageService from '..//message/message.service';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 5);

function AddMessageComponent({ route, navigation }: any) {
  const userSelector = (state: UserState) => state.user;
  const user = useSelector(userSelector);

  const [message, setMessage] = useState('');

  // const { campaign } = route.params;

  const dispatch = useDispatch();

  function submitForm() {
    const msg = {
      messageId: nanoid(),
      timestamp: Date.now(),
      campaignId: 11111,
      userId: Number(user.id),
      username: user.name,
      role: user.role,
      message: message,
      recipients: ['test'],
    };

    dispatch(addMessage(msg));

    messageService.addMessage(msg).then((msg) => {});
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Add Message</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder='Add message...'
          placeholderTextColor='#003f5c'
          onChangeText={(message) => setMessage(message)}
          value={message}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={submitForm}>
        <Text style={styles.loginText}>ADD MESSAGE</Text>
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

export default AddMessageComponent;

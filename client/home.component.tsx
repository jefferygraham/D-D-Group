import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from './store/store';

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const userSelector = (state: UserState) => {
    console.log(state);
    return state.loginUser;
  };

  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <StatusBar style='auto' />
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
});

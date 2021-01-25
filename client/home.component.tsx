import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import style from './global-styles';

export default function App() {
  return (
    <View style={style.container}>
      <Text>Home Page</Text>
      <StatusBar style='auto' />
    </View>
  );
}


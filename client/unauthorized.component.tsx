import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import styles from './global-styles';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>UNAUTHORIZED</Text>
      <StatusBar style='auto' />
    </View>
  );
}



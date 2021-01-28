import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  
  const nav = useNavigation();


  function goToAdd(){
    nav.navigate('AddCampaign');
  }
  
  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <StatusBar style='auto' />
      <TouchableOpacity style={styles.loginBtn} onPress={goToAdd}>
        <Text>Add Campaign</Text>
      </TouchableOpacity>
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
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
    color: 'white'
  },
});

import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';

import LoginComponent from '../user/login.component';
import HomeComponent from '../home.component';
import NavBarComponent from './navbar.component';
import UnauthorizedComponent from '../unauthorized.component';
import { AppState } from '../store/store';
import CharacterCreationComponent from '../character/character.create';

export type StackParams = {
  Login: undefined;
  Home: undefined;
  Unauthorized: undefined;
  CharacterCreation: undefined;
};

const Stack = createStackNavigator<StackParams>();

const headerOptions: StackHeaderOptions = {
  headerTitle: () => <Text>Dungeons & Dragons</Text>,
  headerRight: () => <NavBarComponent />,
};

function RouterComponent(props: any) {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name='Login'
        component={LoginComponent}
        options={headerOptions}
      />
      <Stack.Screen
        name='Home'
        component={HomeComponent}
        options={headerOptions}
      />
      <Stack.Screen
        name='Unauthorized'
        component={UnauthorizedComponent}
        options={headerOptions}
      />
      <Stack.Screen
        name='CharacterCreation'
        component={CharacterCreationComponent}
        options={headerOptions}
      />
    </Stack.Navigator>
  );
}

export default RouterComponent;

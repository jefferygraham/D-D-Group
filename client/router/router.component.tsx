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
import AddCampaignComponent from '../campaign/newCampaign.component';
import CharacterDetailComponent from '../character/character.detail.component';
import { Character } from '../character/character';

import { Campaign } from '../campaign/campaign';
import CampaignComponent from '../campaign/campaign.component';
import AddNoteComponent from '../note/addNote.component';

export type StackParams = {
  Login: undefined;
  Home: undefined;
  Unauthorized: undefined;
  AddCampaign: undefined;
  CharacterDetail: Character;
  Campaign: Campaign;
  CharacterCreation: undefined;
  AddNote: undefined;
};

const Stack = createStackNavigator<StackParams>();

const headerOptions: StackHeaderOptions = {
  headerTitle: () => <Text>Dungeons & Dragons</Text>,
  headerRight: () => <NavBarComponent />,
};

function RouterComponent(props: any) {
  const char = useSelector((state:AppState)=>state.character);
  const campaign = useSelector((state: AppState) => state.campaign);
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
        name='AddCampaign'
        component={AddCampaignComponent}
        options={headerOptions}
      />
      <Stack.Screen
        name='Campaign'
        component={CampaignComponent}
        options={headerOptions}
        initialParams={campaign}
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
      <Stack.Screen
        name='CharacterDetail'
        component={CharacterDetailComponent}
        options={headerOptions}
        initialParams={char}
        />
        <Stack.Screen
        name='AddNote'
        component={AddNoteComponent}
        options={headerOptions}
      />
    </Stack.Navigator>
  );
}

export default RouterComponent;

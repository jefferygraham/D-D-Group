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
<<<<<<< HEAD
import CharacterDetailComponent from '../character/character.detail.component';
import { Character } from '../character/character';

=======
import { Campaign } from '../campaign/campaign';
import CampaignComponent from '../campaign/campaign.component';
import AddNoteComponent from '../note/addNote.component';
>>>>>>> a359ff37363062f6bb0f92f57ed209b70ceb5414

export type StackParams = {
  Login: undefined;
  Home: undefined;
  Unauthorized: undefined;
  AddCampaign: undefined;
<<<<<<< HEAD
  CharacterDetail: Character;
=======
  Campaign: Campaign;
  CharacterCreation: undefined;
  AddNote: undefined;
>>>>>>> a359ff37363062f6bb0f92f57ed209b70ceb5414
};

const Stack = createStackNavigator<StackParams>();

const headerOptions: StackHeaderOptions = {
  headerTitle: () => <Text>Dungeons & Dragons</Text>,
  headerRight: () => <NavBarComponent />,
};

function RouterComponent(props: any) {
<<<<<<< HEAD
  const char = useSelector((state:AppState)=>state.character);
=======
  const campaign = useSelector((state: AppState) => state.campaign);
>>>>>>> a359ff37363062f6bb0f92f57ed209b70ceb5414
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
<<<<<<< HEAD
        name='CharacterDetail'
        component={CharacterDetailComponent}
        options={headerOptions}
        initialParams={char}
=======
        name='AddNote'
        component={AddNoteComponent}
        options={headerOptions}
>>>>>>> a359ff37363062f6bb0f92f57ed209b70ceb5414
      />
    </Stack.Navigator>
  );
}

export default RouterComponent;

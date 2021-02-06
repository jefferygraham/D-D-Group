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
import { User } from '../user/user';
import AddNoteComponent from '../note/addNote.component';
import { JoinCampaign } from '../campaign/campaign.join';
import { EditCampaign } from '../campaign/campaign.edit';
import NoteListComponent from '../note/NoteList.component';
import ProfileComponent from '../user/profile.component';
import RegisterComponent from '../user/register.component';
import styles from '../global-styles';
import EditNoteComponent from '../note/editNote.component';
import CampaignPlayers from '../campaign/campaignplayers.component';
import EncounterComponent from '../encounters/encounter.component';
import { Encounter } from '../encounters/encounter';
import EditCharacter from '../character/character.edit';

export type StackParams = {
  Login: undefined;
  Home: undefined;
  Unauthorized: undefined;
  AddCampaign: undefined;
  CharacterDetail: Character;
  Campaign: Campaign;
  Players: User[];
  CharacterCreation: undefined;
  AddNote: undefined;
  EditCampaign: undefined;
  JoinCampaign: undefined;
  NoteList: undefined;
  Profile: undefined;
  EditCharacter: undefined;
  Register: undefined;
  EditNote: undefined;
  Encounter: Encounter;
};

const Stack = createStackNavigator<StackParams>();

const headerOptions: StackHeaderOptions = {
  headerTitle: () => <Text style={styles.logo}>Dungeons & Dragons</Text>,
  headerRight: () => <NavBarComponent />,
};

function RouterComponent(props: any) {
  const char = useSelector((state: AppState) => state.character);
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
        name='Players'
        component={CampaignPlayers}
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
      <Stack.Screen
        name='JoinCampaign'
        component={JoinCampaign}
        options={headerOptions}
      />
      <Stack.Screen
        name='NoteList'
        component={NoteListComponent}
        options={headerOptions}
      />
      <Stack.Screen
        name='EditCampaign'
        component={EditCampaign}
        options={headerOptions}
      />
      <Stack.Screen
        name='Encounter'
        component={EncounterComponent}
        options={headerOptions}
      />
      <Stack.Screen
        name='EditNote'
        component={EditNoteComponent}
        options={headerOptions}
      />
      <Stack.Screen
        name='Profile'
        component={ProfileComponent}
        options={headerOptions}
      />
      <Stack.Screen
        name='EditCharacter'
        component={EditCharacter}
        options={headerOptions}
      />
    </Stack.Navigator>
  );
}

export default RouterComponent;

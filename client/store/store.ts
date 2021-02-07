import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { Campaign } from '../campaign/campaign';
import { Character } from '../character/character';
import { Encounter } from '../encounters/encounter';
import { EncounterChars } from '../encounters/encounterChars';
import { Note } from '../note/note';
import { User } from '../user/user';
import { Message } from '../message/message';
import { AppAction } from './actions';
import reducer from './reducer';

export interface UserState {
  user: User;
  loginUser: User;
  players: User[];
}

export interface CampaignState {
  campaign: Campaign;
  campaigns: Campaign[];
}

export interface CharacterState {
  character: Character;
  characters: Character[];
}

export interface NoteState {
  note: Note;
  notes: Note[];
}

export interface EncounterState {
  encounters: Encounter[];
  encounterChars: EncounterChars[];
}

export interface MessageState {
  message: Message;
  messages: Message[];
}

export interface AppState
  extends UserState,
    CampaignState,
    CharacterState,
    NoteState,
    MessageState,
    EncounterState {}

const store: Store<AppState, AppAction> = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;

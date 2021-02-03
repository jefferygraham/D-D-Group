import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { Campaign } from '../campaign/campaign';
import { Character } from '../character/character';
import { Note } from '../note/note';
import { User } from '../user/user';
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

export interface AppState
  extends UserState,
    CampaignState,
    CharacterState,
    NoteState {}

const store: Store<AppState, AppAction> = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;

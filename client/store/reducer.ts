import * as Actions from './actions';
import { User } from './../user/user';
import { AppState, EncounterState } from './store';
import { Campaign } from '../campaign/campaign';
import { Character } from './../character/character';
import { Note } from './../note/note';
import { Encounter } from '../encounters/encounter';
import { EncounterChars } from '../encounters/encounterChars';
import { Message } from './../message/message';

export const initialState: AppState = {
  user: new User(),
  loginUser: new User(),
  players: [],
  campaign: new Campaign(),
  campaigns: [],
  character: new Character(),
  characters: [],
  note: new Note(),
  notes: [],
  encounters: [],
  encounterChars: [],
  message: new Message(),
  messages: [],
};

const reducer = (
  state: AppState = initialState,
  action: Actions.AppAction
): AppState => {
  const newState = { ...state };

  switch (action.type) {
    case Actions.UserActions.GetUser:
      newState.user = action.payload as User;
      newState.loginUser = new User();
      return newState;
    case Actions.UserActions.LoginChange:
      newState.loginUser = action.payload as User;
      return newState;
    case Actions.UserActions.RegisterUser:
      return newState;
    case Actions.CampaignActions.GetCampaigns:
      newState.campaigns = action.payload as Campaign[];
      return newState;
    case Actions.CampaignActions.ChangeCampaign:
      newState.campaign = action.payload as Campaign;
      return newState;
    case Actions.CharacterActions.ChangeCharacter:
      newState.character = action.payload as Character;
      return newState;
    case Actions.CharacterActions.GetCharacters:
      newState.characters = action.payload as Character[];
      return newState;
    case Actions.UserActions.GetPlayers:
      newState.players = action.payload as User[];
    case Actions.NoteActions.GetNotes:
      newState.notes = action.payload as Note[];
      return newState;
    case Actions.EncounterActions.GetEncounters:
      newState.encounters = action.payload as Encounter[];
      return newState;
    case Actions.EncounterActions.ChangeEncounterChars:
      newState.encounterChars = action.payload as EncounterChars[];
      return newState;
    case Actions.NoteActions.AddNote:
      newState.notes = [...state.notes, action.payload];
      return newState;
    case Actions.NoteActions.GetNotes:
      newState.notes = action.payload as Note[];
      return newState;
    case Actions.NoteActions.DeleteNote:
      newState.notes = state.notes.filter(
        (note) => note.noteId !== action.payload.noteId
      );
      return newState;
    case Actions.NoteActions.UpdateNote:
      const idx = state.notes.findIndex(
        (note) => note.noteId === action.payload.noteId
      );
      newState.notes = [
        ...state.notes.slice(0, idx),
        action.payload,
        ...state.notes.slice(idx + 1),
      ];
      return newState;
    case Actions.MessageActions.GetMessages:
      newState.messages = action.payload as Message[];
      return newState;
    case Actions.MessageActions.AddMessage:
      newState.messages = [...state.messages, action.payload];
      return newState;
    default:
      return state;
  }
};

export default reducer;

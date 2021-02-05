import { Campaign } from '../campaign/campaign';
import { User } from './../user/user';
import { Character } from './../character/character';
import { Note } from './../note/note';

export enum UserActions {
  GetUser = 'GET_USER',
  LoginChange = 'CHANGE_LOGIN',
  GetPlayers = 'GET_PLAYERS',
  RegisterUser = 'REGISTER_USER',
}

export enum CampaignActions {
  GetCampaigns = 'GET_CAMPAIGNS',
  ChangeCampaign = 'CHANGE_CAMPAIGN',
}

export enum CharacterActions {
  ChangeCharacter = 'CHANGE_CHARACTER',
  GetCharacters = 'GET_CHARACTERS',
}

export enum NoteActions {
  AddNote = 'ADD_NOTE',
  GetNotes = 'GET_NOTES',
  DeleteNote = 'DELETE_NOTE',
  UpdateNote = 'UPDATE_NOTE',
}

export interface AppAction {
  type: string;
  payload: any;
}

export interface UserAction<User> extends AppAction {
  type: UserActions;
  payload: User | User[];
}

export interface CampaignAction extends AppAction {
  type: CampaignActions;
  payload: Campaign | Campaign[];
}

export interface CharacterAction extends AppAction {
  type: CharacterActions;
  payload: Character | Character[];
}

export interface NoteAction extends AppAction {
  type: NoteActions;
  payload: Note | Note[];
}

export function changeCharacter(char: Character): CharacterAction {
  const action: CharacterAction = {
    type: CharacterActions.ChangeCharacter,
    payload: char,
  };
  return action;
}
export function getCharacters(chars: Character[]): CharacterAction {
  const action: CharacterAction = {
    type: CharacterActions.GetCharacters,
    payload: chars,
  };
  return action;
}
export function getUser(user: User): UserAction<User> {
  const action: UserAction<User> = {
    type: UserActions.GetUser,
    payload: user,
  };
  return action;
}

export function loginAction(user: User): UserAction<User> {
  const action: UserAction<User> = {
    type: UserActions.LoginChange,
    payload: user,
  };
  return action;
}

export function registerAction(user: User): UserAction<User> {
  const action: UserAction<User> = {
    type: UserActions.RegisterUser,
    payload: user,
  };
  return action;
}

export function getCampaigns(campaigns: Campaign[]): CampaignAction {
  const action: CampaignAction = {
    type: CampaignActions.GetCampaigns,
    payload: campaigns,
  };
  return action;
}

export function changeCampaign(campaign: Campaign): CampaignAction {
  const action: CampaignAction = {
    type: CampaignActions.ChangeCampaign,
    payload: campaign,
  };
  return action;
}

export function getPlayers(players: User[]): UserAction<User> {
  const action: UserAction<User> = {
    type: UserActions.GetPlayers,
    payload: players,
  };
  return action;
}

export function addNote(note: Note): NoteAction {
  const action: NoteAction = {
    type: NoteActions.AddNote,
    payload: note,
  };
  return action;
}

export function getNotes(notes: Note[]): NoteAction {
  const action: NoteAction = {
    type: NoteActions.GetNotes,
    payload: notes,
  };
  return action;
}

export function deleteNote(note: Note): NoteAction {
  const action: NoteAction = {
    type: NoteActions.DeleteNote,
    payload: note,
  };
  return action;
}

export function updateNote(note: Note): NoteAction {
  const action: NoteAction = {
    type: NoteActions.UpdateNote,
    payload: note,
  };
  return action;
}

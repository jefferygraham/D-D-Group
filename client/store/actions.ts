import { Campaign } from '../campaign/campaign';
import { User } from './../user/user';
import { Character } from './../character/character';
import { Note } from './../note/note';
import { Encounter } from '../encounters/encounter';
import { EncounterChars } from '../encounters/encounterChars';
import { Message } from './../message/message';

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

export enum EncounterActions {
  GetEncounters = 'GET_ENCOUNTERS',
  ChangeEncounterChars = 'CHANGE_ENCOUNTER_CHARS',
}

export enum MessageActions {
  AddMessage = 'ADD_MESSAGE',
  GetMessages = 'GET_MESSAGES',
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

export interface EncounterAction extends AppAction {
  type: EncounterActions;
  payload: Encounter[] | EncounterChars[];
}

export interface MessageAction extends AppAction {
  type: MessageActions;
  payload: Message | Message[];
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

export function getNotes(notes: Note[]): NoteAction {
  const action: NoteAction = {
    type: NoteActions.GetNotes,
    payload: notes,
  };
  return action;
}

export function getEncounters(encounters: Encounter[]): EncounterAction {
  const action: EncounterAction = {
    type: EncounterActions.GetEncounters,
    payload: encounters,
  };
  return action;
}

export function changeEncounterChars(
  characters: EncounterChars[]
): EncounterAction {
  const action: EncounterAction = {
    type: EncounterActions.ChangeEncounterChars,
    payload: characters,
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

export function addMessage(message: Message): MessageAction {
  const action: MessageAction = {
    type: MessageActions.AddMessage,
    payload: message,
  };
  return action;
}

export function getMessages(messages: Message[]): MessageAction {
  const action: MessageAction = {
    type: MessageActions.GetMessages,
    payload: messages,
  };
  return action;
}

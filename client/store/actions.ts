import { Campaign } from '../campaign/campaign';
import { User } from './../user/user';
import {Character} from './../character/character'

export enum UserActions {
  GetUser = 'GET_USER',
  LoginChange = 'CHANGE_LOGIN',
  GetPlayers = 'GET_PLAYERS',
}

export enum CampaignActions {
  GetCampaigns = 'GET_CAMPAIGNS',
  ChangeCampaign = 'CHANGE_CAMPAIGN'
}

export enum CharacterActions{
  ChangeCharacter = 'CHANGE_CHARACTER',
  GetCharacters = "GET_CHARACTERS"
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

export interface CharacterAction extends AppAction{
  type: CharacterActions;
  payload:Character | Character[];
}

export function changeCharacter(char: Character):CharacterAction{
  const action: CharacterAction = {
    type: CharacterActions.ChangeCharacter,
    payload:char
  }
  return action;

}
export function getCharacters(chars: Character[]):CharacterAction{
  const action: CharacterAction = {
    type: CharacterActions.GetCharacters,
    payload:chars
  }
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
  return action
}

export function getPlayers(players: User[]): UserAction<User> {
  const action: UserAction<User> = {
    type: UserActions.GetPlayers,
    payload: players
  };
  console.log('action: '+players);
  return action;
}

import { Campaign } from '../campaign/campaign';
import { User } from './../user/user';

export enum UserActions {
  GetUser = 'GET_USER',
  LoginChange = 'CHANGE_LOGIN',
  RegisterUser = 'REGISTER_USER',
}

export enum CampaignActions {
  GetCampaigns = 'GET_CAMPAIGNS',
  ChangeCampaign = 'CHANGE_CAMPAIGN',
}

export interface AppAction {
  type: string;
  payload: any;
}

export interface UserAction<P> extends AppAction {
  type: UserActions;
  payload: P;
}

export interface CampaignAction extends AppAction {
  type: CampaignActions;
  payload: Campaign | Campaign[];
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

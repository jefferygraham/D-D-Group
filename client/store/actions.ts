import { Campaign } from '../campaign/campaign';
import { User } from './../user/user';

export enum UserActions {
  GetUser = 'GET_USER',
  LoginChange = 'CHANGE_LOGIN',
}

export enum CampaignActions {
  GetCampaign = 'GET_CAMPAIGN',
}

export interface AppAction {
  type: string;
  payload: any;
}

export interface UserAction<P> extends AppAction {
  type: UserActions;
  payload: P;
}

export interface CampaignAction<P> extends AppAction {
  type: CampaignActions;
  payload: P;
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

export function getCampaign(campaign: Campaign): CampaignAction<Campaign> {
  const action: CampaignAction<Campaign> = {
    type: CampaignActions.GetCampaign,
    payload: campaign,
  };
  return action;
}

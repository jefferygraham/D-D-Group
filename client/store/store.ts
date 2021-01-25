import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { Campaign } from '../campaign/campaign';

import { User } from '../user/user';
import { AppAction } from './actions';
import reducer from './reducer';

export interface UserState {
  user: User;
  loginUser: User;
}

export interface CampaignState {
  campaign: Campaign;
}

export interface AppState extends UserState, CampaignState{}

const store: Store<AppState, AppAction> = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;

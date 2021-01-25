import * as Actions from './actions';
import { User } from './../user/user';
import { AppState } from './store';
import { Campaign } from '../campaign/campaign';

export const initialState: AppState = {
  user: new User(),
  loginUser: new User(),
  campaign: new Campaign(),
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
    case Actions.CampaignActions.GetCampaign:
      newState.campaign = action.payload as Campaign;
      return newState;
    default:
      return state;
  }
};

export default reducer;

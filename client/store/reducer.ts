import * as Actions from './actions';
import { User } from './../user/user';
import { AppState } from './store';
import { Campaign } from '../campaign/campaign';
import { Character } from './../character/character';
import { Note } from './../note/note';

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
    default:
      return state;
  }
};

export default reducer;

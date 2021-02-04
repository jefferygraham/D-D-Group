import { AppState } from './store';
import { AppAction, getNotes } from './actions';
import { ThunkAction } from 'redux-thunk';
import noteService from '../note/note.service';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  AppAction
>;

export const thunkGetNotes = (): AppThunk => async (dispatch) => {
  const asyncResp = await noteService.getNotes();
  dispatch(getNotes(asyncResp));
};

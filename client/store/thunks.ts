import { AppState } from './store';
import { AppAction, getNotes, getMessages } from './actions';
import { ThunkAction } from 'redux-thunk';
import noteService from '../note/note.service';
import messageService from '../message/message.service';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  AppAction
>;

export const thunkGetNotes = (): AppThunk => async (dispatch) => {
  const asyncResp = await noteService.getNotes();
  console.log('before thunk dispatch');
  dispatch(getNotes(asyncResp));
};

export const thunkGetMessages = (): AppThunk => async (dispatch) => {
  const asyncResp = await messageService.getMessages();
  dispatch(getMessages(asyncResp));
};

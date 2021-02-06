import axios from 'axios';
import { Note } from './note';

class NoteService {
  private URI: string;
  constructor() {
    this.URI =
      'https://ev0gpvh8kl.execute-api.us-east-1.amazonaws.com/dev/notes';
  }

  addNote(note: Note): Promise<Note> {
    return axios
      .put(`${this.URI}`, note)
      .then((result) => result.data.body)
      .catch((err) => err);
  }

  getNotes(): Promise<Note[]> {
    return axios
      .get(`${this.URI}`)
      .then((result) => result.data.Items)
      .catch((err) => err);
  }

  deleteNote(note: Note): Promise<null> {
    return axios
      .delete(`${this.URI}/${note.noteId}`)
      .then((result) => result.data.body)
      .catch((err) => err);
  }
}

export default new NoteService();

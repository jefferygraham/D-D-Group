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
      .post(`${this.URI}`, note)
      .then((result) => result.data.body)
      .catch((err) => err);
  }
}

export default new NoteService();

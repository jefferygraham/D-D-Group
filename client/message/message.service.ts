import axios from 'axios';
import { Message } from './message';

class MessageService {
  private URI: string;
  constructor() {
    this.URI =
      'https://kdqiq1k0rk.execute-api.us-east-1.amazonaws.com/dev/messages';
  }

  addMessage(message: Message): Promise<Message> {
    return axios
      .put(`${this.URI}`, message)
      .then((result) => result.data.body)
      .catch((err) => err);
  }

  getMessages(): Promise<Message[]> {
    return axios
      .get(`${this.URI}`)
      .then((result) => result.data.Items)
      .catch((err) => err);
  }
}

export default new MessageService();

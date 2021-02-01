import axios from 'axios';
import { User } from './user';

class UserService {
  private URI: string;
  constructor() {
    // URL of the express server
    this.URI =
      'https://awti071wrk.execute-api.us-east-1.amazonaws.com/default/users';
  }

  getLogin(): Promise<User> {
    return axios.get(this.URI).then((result) => {
      console.log(result);
      return result.data;
    });
  }

  login(user: User): Promise<User> {
    return axios
      .post(`${this.URI}/login`, user)
      .then((result) => result.data.body)
      .catch((err) => err);
  }

  register(user: User): Promise<User> {
    return axios
      .post(`${this.URI}`, user)
      .then((result) => result.data.body)
      .catch((err) => err);
  }

  logout(): Promise<null> {
    return axios.delete(this.URI).then((result) => null);
  }
}

export default new UserService();

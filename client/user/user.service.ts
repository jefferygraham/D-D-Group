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
<<<<<<< HEAD
    return axios.get(this.URI).then((result) => {
=======
    return axios.get(this.URI ).then((result) => {
>>>>>>> a3459f6c42f91dc1716f4addba2cef5b5d831340
      console.log(result);
      return result.data;
    });
  }

  login(user: User): Promise<User> {
    return axios
<<<<<<< HEAD
      .post(`${this.URI}/login`, user)
=======
      .post(`${this.URI}/login`, user )
>>>>>>> a3459f6c42f91dc1716f4addba2cef5b5d831340
      .then((result) => result.data.body)
      .catch((err) => err);
  }

  logout(): Promise<null> {
    return axios
      .delete(this.URI)
      .then((result) => null);
  }
}

export default new UserService();

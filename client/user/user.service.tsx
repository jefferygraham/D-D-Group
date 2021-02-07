// import axios from 'axios';
// import { Campaign } from '../campaign/campaign';
// import { User } from './user';

// class UserService {
//   private URI: string;
//   constructor() {
//     // URL of the express server
//     this.URI =
//       'https://awti071wrk.execute-api.us-east-1.amazonaws.com/default/users';
//   }

//   getLogin(): Promise<User> {
//     return axios.get(this.URI ).then((result) => {
//       console.log(result);
//       return result.data;
//     });
//   }


//   login(user: User): Promise<User> {
//     return axios
//       .post(`${this.URI}/login`, user )
//       .then((result) => result.data.body)
//       .catch((err) => err);
//   }

//   logout(): Promise<null> {
//     return axios
//       .delete(this.URI)
//       .then((result) => null);
//   }

//   getUser(id: number): Promise<User> {
//     return axios.get(this.URI + '/' + id)
//     .then((user) => user.data.body);
//   }
  
//   getCampaignsByID(id: number): Promise<Campaign[]> {
//     return axios.get(this.URI +'/campaigns/' + id).then((results) => {
//         return results.data as Campaign[];
//     })
//   }
// }

// export default new UserService();

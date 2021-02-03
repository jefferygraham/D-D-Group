import axios from 'axios';
import { User } from '../user/user';
import {Character} from './character'


class CharacterService{
    private URI: string;
  constructor() {
    this.URI =
      'https://46k03urfmi.execute-api.us-east-1.amazonaws.com/Beta/createCharacter';
  }

  createCharacter(char:Character):Promise<null>{
      return axios.post(this.URI, char).then(result => null);
  }

  deleteCharacter(id: string): Promise<null> {
    return axios.delete(this.URI + '/' + id).then(result => null);
  }
  getCharactersByUser(user:User): Promise<Character []>{
    return axios.get(this.URI +'/' +user.name).then(result => result.data)
  }

  getCharacterByID(id: Number): Promise<Character>{
    return axios.get(this.URI +'/'+id).then(result => result.data)
  }


}
    


export default new CharacterService();
import axios from 'axios';
import {Character} from './character'


class CharacterService{
    private URI: string;
  constructor() {
    this.URI =
      'https://awti071wrk.execute-api.us-east-1.amazonaws.com/default/users';
  }

  createCharacter(char:Character):Promise<null>{
      return axios.post(this.URI, char).then(result => null);
  }


}
    


export default new CharacterService();
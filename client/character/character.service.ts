import axios from 'axios';
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
}
    


export default new CharacterService();
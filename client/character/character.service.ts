import axios from 'axios';
import {Character} from './character'


class CharacterService{
    private URI: string;
  constructor() {
    this.URI =
      ' https://46k03urfmi.execute-api.us-east-1.amazonaws.com/Beta';
  }

  createCharacter(char:Character):Promise<null>{
      return axios.post(this.URI, char).then(result => null);
  }


}
    


export default new CharacterService();
import axios from 'axios';
import { User } from '../user/user';
import { Campaign } from './campaign';

class CampaignService {
    private URI: string;
    constructor(){
        //URL of lambda server
        this.URI = 'https://fxs5gq3hob.execute-api.us-east-1.amazonaws.com/default/campaign';
    }

    addCampaign(c: Campaign): Promise<Campaign> {
        return axios.post(`${this.URI}`, c)
        .then(result => result.data.body)
        .catch((err) => err);
    }

    joinCampaign(id:Number,user:User, characterId:Number): Promise<null>{
        let data={
            user: user.id,
            char: characterId
        }
        return axios.post(this.URI + '/' + id +'/players', data).then(result=>null);
    }

    deleteCampaign(id: number): Promise<null> {
        return axios.delete(this.URI+'/'+id).then(result => null); 
    }

    removePlayer(cid: number,uid: number): Promise<null> {
        return axios.delete(this.URI +'/'+cid+'/players/'+uid).then(result => null);
    }
    getPlayers(id: number): Promise<User[]>{
        return axios.get(this.URI+'/'+id+'/players').then((results) => {
            return results.data as User[];
        })
    }
}

export default new CampaignService();
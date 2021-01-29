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

    deleteCampaign(id: string): Promise<null> {
        return axios.delete(this.URI+'/'+id).then(result => null); 
    }

    getCampaignsByID(u: number): Promise<Campaign[]> {
        return axios.get(this.URI +'/' + u).then((results) => {
            return results.data as Campaign[];
        })
    }
}

export default new CampaignService();
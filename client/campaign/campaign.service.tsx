import axios from 'axios';
import { Campaign } from './campaign';

class CampaignService {
    private URI: string;
    constructor(){
        //URL of lambda server
        this.URI = 'https://awti071wrk.execute-api.us-east-1.amazonaws.com/default/campaign';
    }

    addCampaign(c: Campaign): Promise<null> {
        return axios.post(`${this.URI}/add`, c).then(result => null);
    }

    deleteCampaign(id: string): Promise<null> {
        return axios.delete(this.URI+'/'+id, {withCredentials: true}).then(result => null); 
    }
}

export default new CampaignService();
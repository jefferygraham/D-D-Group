import axios from 'axios';
import { Character } from '../character/character';
import { Encounter } from '../encounters/encounter';
import { EncounterChars } from '../encounters/encounterChars';
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

    updateCampaign(id:number, name:string):Promise<null>{
        let data = {campaign: name}
        return axios.put(this.URI+'/'+id,data).then(result =>null);
    }

    removePlayer(cid: number,uid: number): Promise<null> {
        return axios.delete(this.URI +'/'+cid+'/players/'+uid).then(result => null);
    }
    getPlayers(id: number): Promise<User[]>{
        return axios.get(this.URI+'/'+id+'/players').then((results) => {
            return results.data as User[];
        })
    }
    getCharacters(id: number): Promise<Character[]>{
        return axios.get(this.URI+'/'+id+'/characters').then((results) => {
            return results.data as Character[];
        })
    }
    addEncounter(id: number): Promise<Encounter>{
        return axios.post(this.URI+'/'+id+'/encounters')
        .then(result => result.data.body)
        .catch((err) => err);
    }
    getEncounters(id: number): Promise<Encounter[]>{
        return axios.get(this.URI+'/'+id+'/encounters').then((results) => {
            return results.data as Encounter[];
        })
    }
    getEncounterChars(cid: number,eid: number): Promise<EncounterChars[]>{
        return axios.get(this.URI+'/'+cid+'/encounters/'+eid).then((results) => {
            console.log(results.data);
            return results.data as EncounterChars[];
        })
    }
    updateEncounter(campId: number, encId: number, charId: number, init: number): Promise<null>{
        let data = {
            character: charId,
            initiative: init
        }
        return axios.post(this.URI+'/'+campId+'/encounters/'+encId, data).then(results=>null); 
    }
}

export default new CampaignService();
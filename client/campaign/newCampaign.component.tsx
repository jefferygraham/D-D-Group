import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { Campaign } from "./campaign";
import campaignService from './campaign.service';

type Name = {
    campaignName: string;
}

function AddCampaignComponent() {
    const nav = useNavigation();

    const { register, handleSubmit, errors } = useForm<Name>();

    const onSubmit = handleSubmit((data) => {
        //create a campaign with the data entered and the user's username
        //need to generate a campaign id
        //let cID = user.campaigns.length++;
        let cID = '';
        let name = '';
        campaignService.addCampaign(new Campaign(cID, data.campaignName, name, [], [])).then(() => {
            //replace with campaign page once the route is set up
            nav.navigate('Home');
        });
    })

    return (
        <View>
            <form onSubmit={onSubmit}>
                <label>Campaign Name:</label>
                <input type="text" name='campaignName' ref={register({ required: true })} />
                { errors.campaignName && <div className="error">Enter a campaign name.</div> }
                <button type="submit">Create</button>
            </form>
        </View>
    )
}

export default AddCampaignComponent;
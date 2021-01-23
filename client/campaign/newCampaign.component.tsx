import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";


function AddCampaignComponent(){
    const nav = useNavigation();

    const { register, handleSubmit, errors } = useForm();

    return (
        <View>
            <form>
                <label>Campaign Name:</label>
                <input type="text" name='campaignName' ref={register({ required: true})} />
                <button type="submit">Create</button>
            </form>
        </View>
    )
}

export default AddCampaignComponent;
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import campaignService from './campaign.service';
import { StackParams } from '../router/router.component';
import styles from '../global-styles';
import { CharacterState, UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { changeCampaign, getCampaigns, getCharacters } from '../store/actions';
import userService from '../user/user.service';
import { User } from '../user/user';
import { Character } from '../character/character';
import MinCharacterComponent from './minchar.component';

interface Props {
    route: RouteProp<StackParams, 'Campaign'>;
}

function CampaignComponent(data: Props) {
    const nav = useNavigation();
    const campaign = data.route.params;
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const charSelector = (state: CharacterState) => state.characters;
    const characters = useSelector(charSelector);
    const dispatch = useDispatch();
    let players: User[];

    useEffect(() => {
        campaignService.getCharacters(campaign.campaignid).then((results) => {
            dispatch(getCharacters(results));
        })
    }, [dispatch])

    //function to access all notes for the campaign,
    //should route to a notes component
    function getNotes() {

    }

    //will target a character and take you to the character sheet
    function goToCharacter() {

    }

    //routes to playerpage for that campaign
    function viewPlayers() {
        dispatch(changeCampaign(campaign));
        campaignService.getPlayers(campaign.campaignid).then((results) => {
            players = results;
            nav.navigate('Players', players);
        })
    }

    //button shows up if the user is DM
    //should remove the campaign from each user and character associated
    //then deletes all notes and the campaign itself
    function removeCampaign() {
        campaignService.deleteCampaign(campaign.campaignid).then(() => {
            if (user.id) {
                userService.getCampaignsByID(user.id).then((results) => {
                    dispatch(getCampaigns(results));
                    nav.navigate('Home');
                })
            }
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.loginText}>{campaign.campaignname}</Text>
            <Text style={styles.loginText}>Dungeon Master: {campaign.dm}</Text>
            {characters.map((req: Character, index: number) =>
                <MinCharacterComponent key={'req-' + index} data={req}></MinCharacterComponent>
            )}
            {user.role == 'master' && (
                <View>
                    <Button title='manage players' onPress={viewPlayers}></Button>
                    <Button title='delete campaign' onPress={removeCampaign}></Button>
                </View>
            )}
        </View>
    )
}

export default CampaignComponent;

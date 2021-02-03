import { View, Text, Button } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import campaignService from './campaign.service';
import { StackParams } from '../router/router.component';
import styles from '../global-styles';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { changeCampaign, getCampaigns, getPlayers } from '../store/actions';
import userService from '../user/user.service';
import { User } from '../user/user';

interface Props {
  route: RouteProp<StackParams, 'Campaign'>;
}

function CampaignComponent(data: Props) {
    const nav = useNavigation();
    const campaign = data.route.params;
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    let players: User[]; 

    

    //function to access all notes for the campaign,
    //should route to a notes component
    function getNotes() {

    }

    //will target a character and take you to the character sheet
    function goToCharacter() {

    }

    //routes to playerpage for that campaign
    function viewPlayers(){
        dispatch(changeCampaign(campaign));
        campaignService.getPlayers(campaign.campaignid).then((results) => {
            players = results;
            dispatch(getPlayers(players));
            console.log(players);
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
            {user.role == 'master' && (
                <Button title='delete campaign' onPress={removeCampaign}></Button>
            ) && (
                <Button title='manage players' onPress={viewPlayers}></Button>
            )}
        </View>
    )
}

export default CampaignComponent;

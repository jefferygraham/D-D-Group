import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, View, FlatList, Text, Button } from 'react-native';

import { NoteState, UserState } from '../store/store';
import { thunkGetNotes } from '../store/thunks';
import styles from '../global-styles';

const Item = (props: any) => (
  <View
    style={{
      alignItems: 'center',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 5,
      padding: 15,
      margin: 15,
    }}>
    <Text style={styles.loginText}>{props.username} wrote:</Text>
    <Text style={styles.loginText}>{props.message}</Text>
    <Text style={[styles.loginText, { marginBottom: 10 }]}>
      {new Date(props.timestamp).toLocaleString()}
    </Text>

    {props.user.id === props.userId && (
      <Button title='delete' onPress={() => console.log('Pressed')}></Button>
    )}
  </View>
);

const NoteListComponent = ({ route, navigation }: any) => {
  const { campaign } = route.params;

  const userSelector = (state: UserState) => state.user;
  const user = useSelector(userSelector);

  const notesSelector = (state: NoteState) => state.notes;
  const notes = useSelector(notesSelector);

  const campaignNotes = notes.filter(
    (note) => note.campaignId === campaign.campaignid
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetNotes());
  }, [dispatch]);

  const renderItem = ({ item }: any) => (
    <Item
      username={item.username}
      userId={item.userId}
      message={item.message}
      timestamp={item.timestamp}
      user={user}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Notes for {campaign.campaignname}</Text>
      <FlatList
        data={campaignNotes}
        renderItem={renderItem}
        keyExtractor={(item) => item.noteId}
      />
    </SafeAreaView>
  );
};

export default NoteListComponent;

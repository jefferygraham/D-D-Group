import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  Button,
  StyleSheet,
  StatusBar,
} from 'react-native';

import { NoteState, UserState } from '../store/store';
import noteService from '../note/note.service';
import { deleteNote } from '../store/actions';
import { thunkGetNotes } from '../store/thunks';
import styles from '../global-styles';

const NoteListComponent = ({ route, navigation }: any) => {
  const { campaign } = route.params;

  const userSelector = (state: UserState) => state.user;
  const user = useSelector(userSelector);

  const notesSelector = (state: NoteState) => state.notes;
  const notes = useSelector(notesSelector);

  const campaignNotes = notes.filter(
    (note) => note.campaignId === campaign.campaignid
  );

  const sortedNotes = campaignNotes.sort((a, b) => b.timestamp - a.timestamp);

  const dispatch = useDispatch();

  const handleDeleteNote = (note: any) => {
    noteService.deleteNote(note).then(() => {
      dispatch(deleteNote(note));
    });
  };

  useEffect(() => {
    dispatch(thunkGetNotes());
  }, [dispatch]);

  const renderItem = ({ item }: any) => <Item note={item} user={user} />;

  const Item = ({ note, user }: any) => (
    <View style={flatlistStyles.item}>
      <Text style={[styles.loginText, { textDecorationLine: 'underline' }]}>
        {note.username} wrote:
      </Text>
      <Text style={[styles.loginText, { fontWeight: 'bold' }]}>
        {note.message}
      </Text>
      <Text
        style={[styles.loginText, { marginBottom: 10, fontStyle: 'italic' }]}>
        {new Date(note.timestamp).toLocaleString()}
      </Text>

      {(user.id === note.userId || user.role == 'master') && (
        <View>
          <Button
            color='#fb5b5a'
            title='edit'
            onPress={() => navigation.navigate('EditNote', { note })}></Button>
          <Button
            color='#fb5b5a'
            title='delete'
            onPress={() => handleDeleteNote(note)}></Button>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Notes for {campaign.campaignname}</Text>
      {sortedNotes.length > 0 && (
        <FlatList
          data={sortedNotes}
          renderItem={renderItem}
          keyExtractor={(item) => item.noteId}
        />
      )}
    </SafeAreaView>
  );
};

const flatlistStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#465881',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    fontSize: 32,
  },
});

export default NoteListComponent;

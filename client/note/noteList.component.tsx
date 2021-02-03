import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, View, FlatList, Text } from 'react-native';

import { NoteState } from '../store/store';
import { thunkGetNotes } from '../store/thunks';

const Item = (props: any) => (
  <View>
    <Text>{props.username} wrote:</Text>
    <Text>{props.message}</Text>
    <Text>{new Date(props.timestamp).toLocaleString()}</Text>
  </View>
);

const NoteListComponent = ({ route, navigation }: any) => {
  const { campaign } = route.params;

  const notesSelector = (state: NoteState) => {
    console.log(state);
    return state.notes;
  };
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
      message={item.message}
      timestamp={item.timestamp}
    />
  );

  return (
    <SafeAreaView>
      <FlatList
        data={campaignNotes}
        renderItem={renderItem}
        keyExtractor={(item) => item.noteId}
      />
    </SafeAreaView>
  );
};

export default NoteListComponent;

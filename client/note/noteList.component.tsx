import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, View, FlatList, Text } from 'react-native';

import { NoteState } from '../store/store';
import { thunkGetNotes } from '../store/thunks';

const Item = (props: any) => (
  <View>
    <Text>{props.username} wrote:</Text>
    <Text>{props.message}</Text>
    <Text>{props.timestamp}</Text>
  </View>
);

const NoteListComponent = () => {
  const notesSelector = (state: NoteState) => {
    console.log(state);
    return state.notes;
  };
  const notes = useSelector(notesSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetNotes());
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <Item
      username={item.username}
      message={item.message}
      timestamp={item.timestamp}
    />
  );

  return (
    <SafeAreaView>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.noteId}
      />
    </SafeAreaView>
  );
};

export default NoteListComponent;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, View, FlatList, Text } from 'react-native';

import { NoteState } from '../store/store';

const notesSelector = (state: NoteState) => {
  console.log(state);
  return state.notes;
};
const notes = useSelector(notesSelector);

const Item = (props: any) => (
  <View>
    <Text>{props.NoteId.S}</Text>
  </View>
);

const NoteListComponent = () => {
  const notesSelector = (state: NoteState) => {
    console.log(state);
    return state.notes;
  };
  const notes = useSelector(notesSelector);

  const renderItem = (note: any) => <Item title={note.NoteId.S} />;

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

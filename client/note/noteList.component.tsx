import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, View, FlatList, Text } from 'react-native';

import { NoteState } from '../store/store';
import { thunkGetNotes } from '../store/thunks';

const Item = (props: any) => (
  <View>
    <Text>{props.title}</Text>
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

  const renderItem = ({ item }) => <Item title={item.NoteId} />;

  return (
    <SafeAreaView>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.NoteId}
      />
    </SafeAreaView>
  );
};

export default NoteListComponent;

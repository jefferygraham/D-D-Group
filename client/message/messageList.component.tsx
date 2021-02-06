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

import { MessageState, UserState } from '../store/store';
// import { thunkGetMessages } from '../store/thunks';
import styles from '../global-styles';

const MessageListComponent = ({ route, navigation }: any) => {
  console.log(route);
  const { campaign } = route.params;

  const userSelector = (state: UserState) => state.user;
  const user = useSelector(userSelector);

  const messagesSelector = (state: MessageState) => state.messages;
  const messages = useSelector(messagesSelector);

  const campaignMessages =
    messages.length > 0
      ? messages.filter((message) => message.campaignId === campaign.campaignid)
      : [];

  const sortedMessages =
    campaignMessages.length > 0
      ? campaignMessages.sort((a, b) => b.timestamp - a.timestamp)
      : [];

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(thunkGetMessages());
  // }, [dispatch]);

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
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Messages for {campaign.campaignname}</Text>
      {sortedMessages.length > 0 && (
        <FlatList
          data={sortedMessages}
          renderItem={renderItem}
          keyExtractor={(item) => item.messageId}
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

export default MessageListComponent;

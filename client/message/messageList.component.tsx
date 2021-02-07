import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { MessageState, UserState } from '../store/store';
import { NetworkContext } from '../router/router.component';
import styles from '../global-styles';

const MessageListComponent = () => {
  const campaign = useContext(NetworkContext);
  console.group(campaign);

  const userSelector = (state: UserState) => state.user;
  const user = useSelector(userSelector);

  const messagesSelector = (state: MessageState) => state.messages;
  const messages = useSelector(messagesSelector);

  const campaignMessages =
    messages.length > 0
      ? messages
          .filter((message) => message.campaignId === campaign.campaignid)
          .filter((message) => Number(message.recipient) === user.id)
      : [];

  const sortedMessages =
    campaignMessages.length > 0
      ? campaignMessages.sort((a, b) => b.timestamp - a.timestamp)
      : [];

  const renderItem = ({ item }: any) => <Item message={item} />;

  const Item = ({ message }: any) => (
    <View style={flatlistStyles.item}>
      <Text style={[styles.loginText, { textDecorationLine: 'underline' }]}>
        {message.username} wrote:
      </Text>
      <Text style={[styles.loginText, { fontWeight: 'bold' }]}>
        {message.message}
      </Text>
      <Text
        style={[styles.loginText, { marginBottom: 10, fontStyle: 'italic' }]}>
        {new Date(message.timestamp).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Your Messages for {campaign.campaignname}</Text>
      {campaignMessages.length > 0 && (
        <FlatList
          data={campaignMessages}
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

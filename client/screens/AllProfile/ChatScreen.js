
   
import React, {useState, useEffect, useCallback} from 'react';
import {View, ActivityIndicator, StyleSheet,LogBox,Text} from 'react-native';
import {Bubble, GiftedChat, Send,SystemMessage,Avatar} from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';
import Loading from '../../Components/Loading';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
LogBox.ignoreLogs(['Require cycle:']);

const ChatScreen = ( params ) => {
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);

  const max  = params.srcEmail.toUpperCase();
  const min = params.dstEmail.toUpperCase();
  const sender = params.srcEmail.toUpperCase();

  const maxNickName  = params.srcNickName;
  const minNickName = params.dstNickName;


//   const arr = ['foo', 'bar', 'baz']
  const compare =  min.localeCompare(max)
  //if(min<max)alpha
  const sorted = compare==-1? (min+':'+max):(max+':'+min)
//   console.log(sorted)
 async function handleSend(messages) {
  const text = messages[0].text;

  firestore()
    .collection('THREADS')
    .doc(sorted)
    .collection('MESSAGES')
    .add({
      text,
      createdAt: new Date().getTime(),
      user: {
        _id: sender,
       email: sender
      }
    });

  await firestore()
    .collection('THREADS')
    .doc(sorted)
    .set(
      {
        email1: max,
        email2: min,
        nickName1: maxNickName,
        nickName2: minNickName,
        latestMessage: {
          text,
          createdAt: new Date().getTime()
        }
      },
      { merge: true }
    );
}

  useEffect(() => {

    const messagesListener = firestore()
    .collection('THREADS')
    .doc(sorted)
    .collection('MESSAGES')
    .orderBy('createdAt', 'desc')
    .onSnapshot(querySnapshot => {
      const messages = querySnapshot.docs.map(doc => {
        const firebaseData = doc.data();

        const data = {
          _id: doc.id,
          text: '',
          
          createdAt: new Date().getTime(),
          ...firebaseData
        };

        if (!firebaseData.system) {
          data.user = {
            ...firebaseData.user,
            name: firebaseData.user.email
          };
        }

        return data;
      });

      setMessages(messages);
      if (loading) {
        setLoading(false);
      }
    });

  // Stop listening for updates whenever the component unmounts
  return () => messagesListener();

  }, []);
  if (loading) {
    return <Loading />;
  }

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#98a988'
          },
          left: {
            backgroundColor: '#bc9855',
          }
        }}
        textStyle={{
          right: {
            color: 'white',
            fontFamily:'SairaSemiCondensed-Regular',
            fontSize:15
          },
          left: {
            color: 'white',
            fontFamily:'SairaSemiCondensed-Regular',
            fontSize:15
          }
        }}
      />
    );
  }

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#98a988' />
      </View>
    );
  }

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon='send-circle' size={35} color='#98a988' />
        </View>
      </Send>
    );
  }
  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon='chevron-double-down' size={36} color='#98a988' />
      </View>
    );
  }
  

  function renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  }

  return (
    <View style={{width:'100%',height:'100%',flex:1,backgroundColor:'#bfcfb2'}}>
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: sender }}
      placeholder='Type your message here'
      alwaysShowSend
      showUserAvatar
      scrollToBottom
      renderBubble={renderBubble}
      renderLoading={renderLoading}
      renderSend={renderSend}
      scrollToBottomComponent={scrollToBottomComponent}
      renderSystemMessage={renderSystemMessage}
      textInputStyle ={{fontFamily:'SairaSemiCondensed-Regular',fontSize:15}}
    />
    </View>
  );

};


const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#bfcfb2',
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  systemMessageWrapper: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 5
  },
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily:'SairaSemiCondensed-Regular'
  },
//   AvatarComponent:{
//     //   width:10,
//     //   height:10,
//       backgroundColor:'#bc9855'
//   }
});
export default ChatScreen;

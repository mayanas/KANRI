// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

//  import React, {Component, useEffect} from 'react';
//  import { KeyboardAvoidingView } from 'react-native';
import { serverLink } from '../serverLink';
//  import {
//    StyleSheet,
//    View,
//    BackHandler,
//  } from 'react-native';
import PushNotification from 'react-native-push-notification';
// import firestore from '@react-native-firebase/firestore';

//  export default Notifications;
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Modal } from 'react-native';
import { List, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../Components/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileForOthers from './ProfileForOthers';
import ProjectChatGroup from './ProjectChatGroup';
import ViewProject from './Projects/ViewProject';

export default function Notifications({ navigation, route }) {
  const [threads, setThreads] = useState([]);
  const [Email, setEmail] = useState(route.params.Email);
  const [NickName, setNicName] = useState('');
  const [loading, setLoading] = useState(true);
  const [ProfileForOthersModal, setProfileForOthersModal] = useState(false);
  const [ChatGroupModal, setChatGroupModal] = useState(false);
  const [ViewProjectModal, setViewProjectModal] = useState(false);
  const [Item, setItem] = useState(null);
  const [Path, setPath] = useState("");
  console.log(Email)
  console.log(NickName)

  /**
   * Fetch threads from Firestore
   */

  const getNickName = async () => {
    const response = await fetch(serverLink + "/getNickName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify(
        {
          Email: Email
        }
      )
    });
    const body = await response.json();
    if (body == "null") {
      this.showAlert("Warning", "Email does not exist!")
    } else {
      console.log(body);
      setNicName(body)
    }
  }
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('NOTIFICATIONS')
      .doc(Email)
      .collection('NOTIFICATIONS')
      // add this
      .orderBy('createdAt', 'desc')
      .onSnapshot(async querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // name: '',
            // add this
            // latestMessage: {
            //   text: ''
            // },
            // ---
            ...documentSnapshot.data()
          };
        });

        setThreads(threads)

        // var j = 0;
        var max;
        var date;
        // var threads1 = []
        //   var max =threads[0]._id.split(':'); //max=11715557:11715558 max[0]=11715557, max[1]=11715558
        for (let i = 0; i < threads.length; i++) {
          max = threads[i].Boolean;
          // date = this.state.threads[i].Date;
          if (max === false) {
            // threads1[j] = this.state.threads[i]
            // j++;
            // console.log(this.state.threads[i].Date.Date)
            PushNotification.localNotification({
              /* Android Only Properties */
              channelId: "channel-id3", // (required) channelId, if the channel doesn't exist, notification will not trigger.
              subText: "", // (optional) default: none
              color: "#bc9855", // (optional) default: system default
              vibrate: true, // (optional) default: true
              vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
              ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
              // actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more

              title: threads[i].SenderNickName, // (optional)
              message: "Started following you", // (required)
              userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
            });
          }
        }
        // console.log(threads1)


        if (loading) {
          await getNickName();
          setLoading(false)
        }
      });

    return () => unsubscribe();
  }, []);


  if (loading) {
    return <Loading />;
  }
  if (ProfileForOthersModal) {
    return (
      <View style={styles.MainView}>
        {/*Profile for others Modal*/}
        <Modal animationType='slide'
          visible={ProfileForOthersModal}
          onRequestClose={async () => {
            setProfileForOthersModal(false)
          }
          }
          style={[styles.ModalView]}>
          <View style={[styles.MainView]}>

            <ProfileForOthers
              Email={Item.user.email}
              GuestEmail={Email}
              GuestNickName={NickName} />

          </View>
        </Modal>
      </View>
    );
  }
  if (ChatGroupModal) {
    return (
      <View style={styles.MainView}>
        {/*Profile for others Modal*/}
        <Modal animationType='slide'
          visible={ChatGroupModal}
          onRequestClose={async () => {
            setChatGroupModal(false)
          }
          }
          style={[styles.ModalView]}>
          <View style={{ backgroundColor: "#bfcfb2", width: '100%', height: "100%" }}>

            <ProjectChatGroup
              ProjectId={Item.projectId}
              ProjectName={Item.ProjectName}
              Email={Email}
              NickName={NickName}
              ProjectChatGroup={() => setChatGroupModal(false)}
            />

          </View>
        </Modal>
      </View>
    );
  }
  if (ViewProjectModal) {
    return (
      <View style={styles.MainView}>
        {/*Profile for others Modal*/}
        <Modal animationType='slide'
          visible={ViewProjectModal}
          onRequestClose={async () => {
            setViewProjectModal(false)
          }
          }
          style={[styles.ModalView]}>
          <View style={{ width: '100%', height: 50, backgroundColor: "#bc9855", justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 20, color: 'black' }}>View project details</Text>
          </View>
          <View style={[styles.MainView]}>

            <ViewProject
              ProjectID={Item.projectId}
              ProjectName={Item.ProjectName}
              Email={Email}
              NickName={NickName}
            />

          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View style={styles.MainView}>
      <SafeAreaView style={styles.MainView}>
        {loading ? <Loading /> :
          <SafeAreaView style={styles.container}>
            <View style={{ width: '100%', height: 50, backgroundColor: "#bc9855", justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 20, color: 'black' }}>Notifications</Text>
            </View>

            <FlatList
              data={threads}
              keyExtractor={item => item._id}
              ItemSeparatorComponent={() => <Divider style={{ height: 3, color: '#98a988' }} />}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setItem(item)
                    switch (item.Type) {
                      case "Follow":
                        setProfileForOthersModal(true);
                        break;
                      case "Join":
                        navigation.navigate('Invitations');
                        break;
                      case "Meeting":
                        navigation.navigate('Profile');
                        break;
                      case "CreatedProject":
                        setProfileForOthersModal(true);
                        break;
                      case "DeleteProject":
                        setProfileForOthersModal(true);
                        break;
                      case "GroupChat":
                        setChatGroupModal(true);
                        break;
                      case "DeleteFromProject":
                        navigation.navigate('Profile');
                        break;
                      case "ApprovedFromProject":
                        setViewProjectModal(true);
                        break;
                      case "ModifiedFromProject":
                        setViewProjectModal(true);
                        break;
                      case "AttachFromProject":
                        setViewProjectModal(true);
                        break;
                      case "TaskStatusUpdated":
                        setViewProjectModal(true);
                        break;
                      case "AddToProject":
                        navigation.navigate('Invitations');
                        break;
                      case "DeleteMemberFromProject":
                        navigation.navigate('Profile');
                        break;
                      case "InviteToDoProject":
                        navigation.navigate('Invitations');
                        break;

                    }

                  }}
                >
                  <List.Item
                    title={item.SenderNickName}
                    description={item.message}
                    titleNumberOfLines={1}
                    titleStyle={styles.listTitle}
                    descriptionStyle={styles.listDescription}
                    descriptionNumberOfLines={2}
                  />

                </TouchableOpacity>
              )
              }
            />

          </SafeAreaView >
        }
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  MainView: {
    display: 'flex',
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#bfcfb2',
    width: '100%',
    height: '100%'
  },
  container: {
    backgroundColor: '#bfcfb2',
    flex: 1,
    width: '100%',
    // height: '100%',
  },
  listTitle: {
    fontSize: 16,
    fontFamily: 'SairaSemiCondensed-Bold'
  },
  listDescription: {
    fontSize: 14,
    fontFamily: 'SairaSemiCondensed-Regular'
  },
  ModalView: {
    display: 'flex',
    flex: 1,
    height: '100%',
    width: '100%',
    // alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bfcfb2',
    marginTop: 0,

  },

});
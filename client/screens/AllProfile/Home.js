
// import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  StyleSheet,
  BackHandler,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import HomeScreen from './HomeScreen';
import Profile from './Profile';
import Messages from './Messages';
import Notifications from './Notifications';
import Invitations from './Invitations';
import firestore from '@react-native-firebase/firestore';
import React, { useState, useEffect } from 'react';
import PushNotification from 'react-native-push-notification';

const Tab = createBottomTabNavigator();

export default function Home({route}) {
  const [threads, setThreads] = useState([]);
  const [Email, setEmail] = useState(route.params.Email);
  // const [loading, setLoading] = useState(true);
  console.log(Email)

  /**
   * Fetch threads from Firestore
   */
//   handleBackButtonClick() {
//     BackHandler.exitApp();
//     return true;
//   }
   useEffect( () => {
    const query = firestore()
    .collection('NOTIFICATIONS')
    .doc(Email)
    .collection('NOTIFICATIONS')
    .orderBy('createdAt', 'desc');

    const getContent = async () => {
      

       await query.get().then(async(docs)=>{
        // setThreads([])
        docs.forEach(async (doc) => {
          // console.log(doc.data())
          // console.log(threads)
          if (!doc.data().Boolean){
            console.log('hello')
            threads.push({_id:doc.id, data:doc.data()});
            // console.log(doc.data().Boolean)
            firestore().
          collection('NOTIFICATIONS')
          .doc(Email)
          .collection('NOTIFICATIONS')
          .doc(doc.id)
          .update({
            Boolean:true
          })
          }
          
        })
      }
      ) 

    }


        const unsubscribe = query.onSnapshot(async querySnapshot => {
        
          await getContent();
          var max;
          

      for (let i = 0; i < threads.length; i++) {
        max = threads[i].data.Boolean;
        // console.log(max)
        
        if (!max) {
          
          PushNotification.localNotification({
            /* Android Only Properties */
            channelId: "channel-id3", // (required) channelId, if the channel doesn't exist, notification will not trigger.
            subText: threads[i].data.Date, // (optional) default: none
            color: "#bc9855", // (optional) default: system default
            vibrate: true, // (optional) default: true
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
            // actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
        
            onlyAlertOnce: true,
            // id: threads[i]._id,
            title: threads[i].data.SenderNickName, // (optional)
            message: threads[i].data.message, // (required)
            userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
          });

          threads[i].data.Boolean=true;
          console.log(threads[i].data.Boolean)
           
        }
      }
        
       
      });

    return () => unsubscribe();
  }, []);
 


  return (
          <Tab.Navigator initialRouteName='Home'


        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person';
            }
            else if (route.name === 'Messages') {
              iconName = focused ? 'md-chatbubbles' : 'md-chatbubbles';
            }
            else if (route.name === 'Notifications') {
              iconName = focused ? 'md-notifications' : 'md-notifications';
            }
            else if (route.name === 'Invitations') {
              iconName = focused ? 'md-person-add-sharp' : 'md-person-add-sharp';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#bfcfb2',
          tabBarInactiveTintColor: 'black',
          tabBarStyle: {
            backgroundColor: "#98a988",
          },
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 10,
            color: "black",
            fontFamily: 'SairaSemiCondensed-Regular'
          },
          tabBarHideOnKeyboard: true,
        // tabBarStyle: [{ display: "flex" }, null]
          // tabBarBadge: threads.length

        })}
      >
        {/* {console.log(this.props.route.params.Email)} */}
        
        <Tab.Screen name="Profile" component={Profile} initialParams={{ Email: route.params.Email }} />
        <Tab.Screen name="Invitations" component={Invitations} initialParams={{ Email: route.params.Email }} />
        <Tab.Screen name="Home" component={HomeScreen} initialParams={{ Email: route.params.Email }}
          // listeners={{
          //   focus: () => BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
          //   , blur: () => BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
          // }} 
          />
        <Tab.Screen name="Notifications" component={Notifications} 
        options={{ 
          tabBarBadge: threads.length
          , tabBarBadgeStyle: {backgroundColor:'#bc9855'}}}
         initialParams={{ Email: route.params.Email }} />
        <Tab.Screen name="Messages" component={Messages} 
        // options={{ tabBarBadge: 3 }} 
        initialParams={{ Email: route.params.Email}} />


      </Tab.Navigator>
  );
}

 const styles = StyleSheet.create({
    MainView: {
        display:'flex',
         flex: 2,
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: '#bfcfb2',
    },
    
});

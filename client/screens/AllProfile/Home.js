/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
 import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

 import {
   StyleSheet,
   View,
   Text,
 } from 'react-native';
 import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import Profile from './Profile';
import Messages from './Messages';
import Notifications from './Notifications';
 const Tab = createBottomTabNavigator();
 class Home extends Component{
  constructor(props){
    super(props);
  }

   state = {
    
  }

 
   render(){
     
     return (

      //  <View style={styles.MainView}>
      //    <Text>Email: {JSON.stringify(this.props.route.params.Email)}</Text>
      //  </View>
    // <NavigationContainer>
      <Tab.Navigator initialRouteName='HomeScreen' 
        
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeScreen') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person';
          }
          else if (route.name === 'Messages') {
            iconName = focused ? 'person' : 'person';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown:false
      })}
          >
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Messages" component={Messages} options={{tabBarBadge: 3}} />
        <Tab.Screen name="Notifications" component={Notifications} options={{tabBarBadge: 3}} />

      </Tab.Navigator>
    // </NavigationContainer>
     );
   }
 }
 
 
 const styles = StyleSheet.create({
    MainView: {
        display:'flex',
        flex:1,
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: '#bfcfb2',
    },
    
});

 
 export default Home;
 
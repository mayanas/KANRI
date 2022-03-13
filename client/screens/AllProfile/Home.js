
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
import MyTasks from './MyTasks';


const Tab = createBottomTabNavigator();
class Home extends Component{
 constructor(props){
   super(props);
 }

  state = {

 }


   render(){
    
    return (
  // <NavigationContainer>
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
         else if (route.name === 'My Tasks') {
           iconName = focused ? 'md-checkmark-circle' : 'md-checkmark-circle';
         }
         // You can return any component that you like here!
         return <Ionicons name={iconName} size={size} color={color} />;
       },
       tabBarActiveTintColor: '#bfcfb2',
       tabBarInactiveTintColor: 'black',
      tabBarStyle:{
        backgroundColor:"#98a988",
      },
       headerShown:false,
      tabBarLabelStyle:{
       fontSize: 10,
       color:"black",
       fontFamily:'SairaSemiCondensed-Regular'
      }
       
     })}
         > 
         {/* {console.log(this.props.route.params.Email)} */}
     
       <Tab.Screen name="Profile" component={Profile} initialParams={{Email: this.props.route.params.Email}}/>
       <Tab.Screen name="My Tasks" component={MyTasks} initialParams={{Email: this.props.route.params.Email}} />
       <Tab.Screen name="Home" component={HomeScreen} initialParams={{Email: this.props.route.params.Email}}/>
       <Tab.Screen name="Notifications" component={Notifications} options={{tabBarBadge: 3}} initialParams={{Email: this.props.route.params.Email}}/>
       <Tab.Screen name="Messages" component={Messages} options={{tabBarBadge: 3}} initialParams={{Email: this.props.route.params.Email}}/>
      
      
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
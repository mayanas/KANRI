/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


 import React, {Component} from 'react';
 import 'react-native-gesture-handler';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import { NavigationContainer } from '@react-navigation/native';

import Kanri from "./screens/Kanri";
import Login from "./screens/Login";
import About from "./screens/About";
import Register from "./screens/Register";
import ForgetPassword from "./screens/ForgetPassword";
import Home from "./screens/AllProfile/Home";
import Start from "./screens/Start";

import { LogBox } from 'react-native';
import FirstTimeRegister from './screens/FirstTimeRegister';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

 
const Stack = createNativeStackNavigator();

 class App extends Component{
 
   constructor(){
     super();
   }

   render(){
     
     return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="start" screenOptions={{headerShown:false}}>
          <Stack.Screen name="start" component={Start}></Stack.Screen>
          <Stack.Screen name="kanri" component={Kanri}></Stack.Screen>
          <Stack.Screen name="about" component={About}></Stack.Screen>
          <Stack.Screen name="login" component={Login}></Stack.Screen>
          <Stack.Screen name="register" component={Register}></Stack.Screen>
          <Stack.Screen name="forgetPassword" component={ForgetPassword}></Stack.Screen>
          <Stack.Screen name="firstTimeRegister" component={FirstTimeRegister}></Stack.Screen>
          <Stack.Screen name="home" component={Home}></Stack.Screen>
      </Stack.Navigator>
      </NavigationContainer>
      
     );
   }
 }
 
 
 
 
 export default App;
 


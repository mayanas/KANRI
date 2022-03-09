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
import AppNavigator from './app/app.navigator';
import { LogBox } from 'react-native';
 


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
       <AppNavigator/>
     );
   }
 }
 
 
 
 
 export default App;
 
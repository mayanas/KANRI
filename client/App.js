/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component} from 'react';
 import 'react-native-gesture-handler';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import Kanri from './screens/Kanri';
 import About from './screens/About';
 import Login from './screens/Login';
 import Register from './screens/Register';
import ForgetPassword from './screens/ForgetPassword';
 
 
 const Stack = createNativeStackNavigator();
 class App extends Component{
 
   constructor(){
     super();
   }
 
   render(){
     
     return (
       <NavigationContainer>
       
         <Stack.Navigator initialRouteName="kanri" >
           <Stack.Screen name="kanri" component={Kanri} 
           options={{
           title: '',
           headerStyle: {
             backgroundColor: '#bc9855',
             height: 100,
           },
           headerTintColor: 'black',
           // headerTitleAlign: 'center',
           
           // headerTitleStyle: {
           //   fontFamily:"ArimaMadurai-Regular",
           //   fontSize: 15
           // },
         }}/>
 
         <Stack.Screen name="about" component={About} 
           options={{
           title: '',
           headerStyle: {
             backgroundColor: '#bc9855',
             height: 100,
           },
           headerTintColor: 'black',
         }}/>
         <Stack.Screen name="login" component={Login} 
           options={{
           title: '',
           headerStyle: {
             backgroundColor: '#bc9855',
             height: 100,
           },
           headerTintColor: 'black',
         }}/>
         <Stack.Screen name="register" component={Register} 
           options={{
           title: '',
           headerStyle: {
             backgroundColor: '#bc9855',
             height: 100,
           },
           headerTintColor: 'black',
         }}/>
         <Stack.Screen name="forgetPassword" component={ForgetPassword} 
           options={{
           title: '',
           headerStyle: {
             backgroundColor: '#bc9855',
             height: 100,
           },
           headerTintColor: 'black',
         }}/>
         
         </Stack.Navigator>
 
       </NavigationContainer>
     );
   }
 }
 
 
 
 
 export default App;
 
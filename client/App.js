/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


 import React, {Component} from 'react';
 import 'react-native-gesture-handler';
//  import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
//  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//  import Kanri from './screens/Kanri';
//  import About from './screens/About';
//  import Login from './screens/Login';
//  import Register from './screens/Register';
// import ForgetPassword from './screens/ForgetPassword';
// import Profile from './screens/AllProfile';

// import Icon from 'react-native-vector-icons/dist/FontAwesome';
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
      //  <NavigationContainer>
      //    <Stack.Navigator initialRouteName="kanri" screenOptions={{
      //       headerStyle: {
      //         backgroundColor: '#bc9855',
      //         height: 100,
      //       },
      //       headerTintColor: 'black',
      //    }}>
      //      <Stack.Screen name="kanri" component={Kanri} 
      //      options={{
      //      title: '',
      //      }}/>
 
      //    <Stack.Screen name="about" component={About} 
      //      options={{
      //      title: '',
      //      }}/>
      //    <Stack.Screen name="login" component={Login} 
      //      options={{
      //      title: '',
      //      }}/>
      //    <Stack.Screen name="register" component={Register} 
      //      options={{
      //      title: '',
      //    }}/>
      //    <Stack.Screen name="forgetPassword" component={ForgetPassword} 
      //      options={{
      //      title: '',
      //    }}/>
      //    <Stack.Screen name="profile" component={Profile} 
      //      options={{
      //      title: '',
      //      headerLeft: () => {
      //        <Icon.Button name="bars" size={25} 
      //          backgroundColor="#bc9855" 
      //         //  onPress={
      //         //    ()=>{
                   
      //         //    }
      //         //  }
      //          />
      //      }
      //      }}/>
         
      //    </Stack.Navigator>
 
      //  </NavigationContainer>
     );
   }
 }
 
 
 
 
 export default App;
 
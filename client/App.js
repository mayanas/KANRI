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
 

import CheckboxList from 'rn-checkbox-list';
import {View} from 'react-native';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

 
const Stack = createNativeStackNavigator();
const checkList = [
  { id: 1, name: 'Applied Technology' },
  { id: 2, name: 'Behavioral Science and Human Services' },
  { id: 3, name: 'Business, Entrepreneurialism, and Management' },
  { id: 4, name: 'Computer and Information Technology' },
  { id: 5, name: 'Culture and Society' },
  { id: 6, name: 'Education' },
  { id: 7, name: 'Health Sciences' },
  { id: 8, name: 'Science, Technology, Engineering, and Mathematics (STEM)' },
  { id: 9, name: 'Visual and Performing Arts' },
 ];
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
      // <View style={{height:300}}>
      //   <CheckboxList
      //           headerStyle={{
      //             padding: 10,
      //             flexDirection: 'row',
      //             alignItems: 'center',
      //             backgroundColor: '#98a988',
      //             text: {
      //               color: 'black',
      //               fontWeight: 'bold',
      //               fontSize: 16,
      //             }
      //           }}
      //           headerName="Select all"
      //           theme="#bc9855"
      //           listItems={checkList}
      //           onChange={({ ids, items }) => console.log('My updated list :: ', ids)}
      //           listItemStyle={{ borderBottomColor: '#bc9855', borderBottomWidth: 1,flex:1,}}
                
      //           checkboxProp={{ boxType: 'square' }} 
      //           onLoading={() => <LoaderComponent />}
      //         />
      // </View>
     );
   }
 }
 
 
 
 
 export default App;
 

// import React from 'react';
// import {
//   View,
//   KeyboardAvoidingView,
//   TextInput,
//   StyleSheet,
//   Text,
//   TouchableWithoutFeedback,
//   Button,
//  Image,
//   Keyboard,
// } from 'react-native';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// const App = () => {
//   return (
//     <KeyboardAwareScrollView>
//       <View style={styles.inner}>
//         <Text style={styles.header}>Header</Text>
//         <Image source={require('./assets/logo/logo1.jpeg')} style={{width:50,
//         height:50,
//        borderRadius:50}}/>
//         <TextInput placeholder="Username" style={styles.textInput} />
//         <View style={styles.btnContainer}>
     
//           <TextInput placeholder="Username 1" style={styles.textInput} />
//           <TextInput placeholder="Username 2" style={styles.textInput} />
//           <TextInput placeholder="Username 3" style={styles.textInput} />
//           <TextInput placeholder="Username 4" style={styles.textInput} />
//           <TextInput placeholder="Username 5" style={styles.textInput} />
//           <TextInput placeholder="Username 6" style={styles.textInput} />
//           <TextInput placeholder="Username 7" style={styles.textInput} />
//           <TextInput placeholder="Username 8" style={styles.textInput} />
//           <TextInput placeholder="Username 9" style={styles.textInput} />
//           <TextInput placeholder="Username 10" style={styles.textInput} />
//           <TextInput placeholder="Username 11" style={styles.textInput} />
//           <TextInput placeholder="Username 12" style={styles.textInput} />
//           <TextInput placeholder="Username 13" style={styles.textInput} />
//           <Button title="Submit" onPress={() => null} />
//         </View>
//       </View>
//     </KeyboardAwareScrollView>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   inner: {
//     padding: 24,
//     flex: 1,
//     justifyContent: 'space-around',
//   },
//   header: {
//     fontSize: 36,
//     marginBottom: 48,
//   },
//   textInput: {
//     height: 40,
//     borderColor: '#000000',
//     borderBottomWidth: 1,
//     marginBottom: 36,
//   },
//   btnContainer: {
//     backgroundColor: 'white',
//     marginTop: 12,
//   },
// });
// export default App;
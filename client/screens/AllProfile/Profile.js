/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component} from 'react';
 import { KeyboardAvoidingView } from 'react-native';
 
 import {
   StyleSheet,
   Text,
   View,
   ScrollView,
   TouchableOpacity,
   TextInput,
   Alert,
 } from 'react-native';
 
 class Profile extends Component{
  constructor(props){
    super(props);
  }

   state = {
    
  }

 
   render(){
     
     return (

       <View style={styles.MainView}>
         
       </View>
     );
   }
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

 
 export default Profile;
 
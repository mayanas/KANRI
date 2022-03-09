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
   View,
 } from 'react-native';
 
 class Notifications extends Component{
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

 
 export default Notifications;
 
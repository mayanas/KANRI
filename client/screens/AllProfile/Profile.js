/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component} from 'react';
 
 import {
   StyleSheet,
   View,
   Text
 } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Avatar} from 'react-native-paper';
 
 class Profile extends Component{
  constructor(props){
    super(props);
  }

   state = {
    
  }

 
   Email = this.props.route.params.Email;
   render(){
     
     return (

       <View style={styles.MainView}>
         <View style={styles.TopView}>
           
         </View>
         <LinearGradient
         colors={['#98a988', '#bfcfb2', '#bfcfb2']}
         style={{
          left:0,
          right:0,
          height:50,
          width:'100%',
          margin:0,
         }}
         ></LinearGradient>
         
       </View>
     );
   }
 }
 
 
 const styles = StyleSheet.create({
    MainView: {
        display:'flex',
         flex: 1,
         flexDirection: 'column',
         alignItems: 'center',
        //  justifyContent: 'center',
         backgroundColor: '#bfcfb2',
    },
    TopView: {
      width:'100%',
      height:'20%',
      backgroundColor:'#98a988',
      paddingVertical:10,
      paddingHorizontal:10,
      flexDirection:'row'
      // borderBottomLeftRadius:0,
      // borderBottomRightRadius:120,
      // alignItems:'center',
      // justifyContent:'center'
    },
    TextStyle: {

    },
    ViewTextStyle: {
      marginLeft: 20,
      marginTop:20
    }
    
});

 
 export default Profile;
 
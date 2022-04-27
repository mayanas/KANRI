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
   Text,
   View,
   TouchableOpacity,
   BackHandler,
 } from 'react-native';
import { Modal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Lottie from '../Components/Lottie';
import About from './About';
 
 class Kanri extends Component{
  constructor(props){
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state={
      AboutUsModal:false,
    }
  }

  UNSAFE_componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
handleBackButtonClick() {
  BackHandler.exitApp();
      return true;
}
 
   render(){
     
     return (

      <SafeAreaView style={styles.MainView}>
       <View style={styles.MainView}>
         <Lottie/>
        
         

         <View style={{marginTop: 250}}>
           <Text style={styles.textstyle}>WELCOME TO</Text>
           <Text style={styles.textstyle}>KANRI</Text>
         </View>
 
         <View style={{marginTop:30}}>
           <TouchableOpacity style={styles.buttonstyle} onPress={
              ()=>this.props.navigation.push('login')
            }>
             
             <Text style={styles.buttontext}>Login</Text>
 
           </TouchableOpacity>
           <TouchableOpacity style={styles.buttonstyle} onPress={
              ()=>this.props.navigation.push('register')
            }>
            
           <Text style={styles.buttontext} >Register</Text>
           </TouchableOpacity>
         </View>
 
         <View style={{marginTop:0}}>
           <Text style={styles.textstyle1} onPress={
              ()=>this.props.navigation.navigate('about')
            }>ABOUT US</Text>
         </View>
         
       </View>

     </SafeAreaView>
     );
   }
 }
 
 
 const styles = StyleSheet.create({
   MainView: {
     backgroundColor: '#bfcfb2',
     flex: 1,
     flexDirection: 'column',
     alignItems: 'center',
     justifyContent: 'center',
   },
     ModalView: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bfcfb2',
  },
   gifView:{
     flex: 1,
     marginBottom: 100
   },
   buttonstyle: {
     width:200,
     height: 60,
     display:'flex',
     allignItems:'center',
     alignContent: 'center', 
     paddingVertical:14,
    backgroundColor:'#bc9855',
     borderRadius: 200 ,
     elevation:2,
     shadowColor: '#bd9c5b',
     shadowOffset: {
       width: 2,
       height: 2,
     },
     marginTop: 10
   },
   buttontext: {
     color: 'black',
     textAlign: 'center',
     // fontWeight: 'bold',
     fontSize: 20,
     fontFamily:"SairaSemiCondensed-Regular",
   },
   textstyle: {
     // marginTop: 50,
     fontFamily:"ArimaMadurai-Regular",
     fontSize: 50,
     color: 'black',
     textAlign: 'center'
     // fontWeight: 'bold',
   },
   textstyle1: {
     marginTop: 60,
     fontFamily:"SairaSemiCondensed-Regular",
     fontSize: 15,
     color: 'black',
     textAlign: 'center'
     // fontWeight: 'bold',
   },
   
 });
 
 export default Kanri;
 
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component, useRef, useEffect } from 'react';
 import AsyncStorage from '@react-native-async-storage/async-storage';
//  import SplashScreen from 'react-native-splash-screen';

 import {
   StyleSheet,
   Image,
   View,
   Animated,
 } from 'react-native';

 const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 1
  
    useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 2000,
          useNativeDriver:true,
        }
      ).start();
    }, [fadeAnim])
    return (
        <Animated.View                 // Special animatable View
          style={{
            ...props.style,
            opacity: fadeAnim,         // Bind opacity to animated value
          }}
        >
          {props.children}
        </Animated.View>
      );
    }
 
 class Start extends Component{
  constructor(props){
    super(props);
    // this.getData();
  }
  async getData(){
    try{
    const value1=await AsyncStorage.getItem('Email');
    // const value2=await AsyncStorage.getItem('Password');
    if(value1!==null){
      this.props.navigation.navigate('firstTimeRegister',{///////////////////////////////////////////////////
        Email: value1,
      });
    }
    else{
        this.props.navigation.navigate('kanri');
    }
    }
    catch(error){
      console.log(error);
    }
}
componentDidMount(){
    setTimeout(()=>{
        this.getData();
    },2000)
}



   render(){
     
     return (

       <View style={styles.MainView}>
        <FadeInView style={{width: '100%', height: '100%', backgroundColor: '#bfcfb2',justifyContent:'center',alignItems:'center'}}>
           <Image style={{width:'50%',height:'30%'}} source = {require('../assets/logo/logo1.jpeg')}/>
        </FadeInView>
         
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
         justifyContent: 'center',
         backgroundColor: '#bfcfb2',
    },
    
});

 
 export default Start;
 
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component} from 'react';
 import { KeyboardAvoidingView } from 'react-native';
 import { serverLink } from '../serverLink';

 import {
   StyleSheet,
   View,
   BackHandler,
 } from 'react-native';
 
 class MyTasks extends Component{
  constructor(props){
    super(props);
    this.state={
      Email:"",
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }


  UNSAFE_componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    this.props.navigation.navigate('Home',{Email:this.props.route.params.Email});
        return true;
  }

  componentDidMount(){
    this.setState({Email : this.props.route.params.Email})
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

 
 export default MyTasks;
 
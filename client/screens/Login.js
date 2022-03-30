/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component} from 'react';
 import Icon from 'react-native-vector-icons/dist/FontAwesome';
 import { BackHandler, KeyboardAvoidingView } from 'react-native';
 import Lottie from '../Components/Lottie';
 import AsyncStorage from '@react-native-async-storage/async-storage';


 
 import {
   StyleSheet,
   Text,
   View,
   ScrollView,
   TouchableOpacity,
   TextInput,
   Alert,
 } from 'react-native';
 import { Base64 } from 'js-base64';

 const serverLink="http://192.168.1.110:3001";
//  const serverLink="http://172.19.15.206:3001";

 class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      secure: true,
      passwordValue:"",
      focus: false,
      Email:"",
      PasswordEncoded:"",
      PasswordDecoded:"",
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
  this.props.navigation.navigate('kanri')
      return true;
}

  
  async getUser(){
    await fetch(serverLink+"/getUser", {
      method: "POST",
      headers: {
       "Content-Type": "application/json"
       },
      body: JSON.stringify(
        {               
                "Email": this.state.Email,
        }
      )
     }).then(resp => {
       return resp.json();
     }).then(jsonresponse => {
        // console.log(jsonresponse);
       if(jsonresponse=="null"){
         this.showAlert("Warning", "Email does not exist!")
       }else{
        this.setState({PasswordEncoded: jsonresponse});
        this.decrypt_password();
       }
     }).catch(error => {
       console.log(error);
     });    
   
  }

  showAlert = (title,field) =>
  Alert.alert(
    title,
    field,
    [
      {
        text: "Cancel",
      
        style: "cancel",
      },
    ],
    {
      cancelable: true,
      
      
    }
  );
  async decrypt_password () {

    var temp2 = Base64.decode(this.state.PasswordEncoded);

    this.setState({ PasswordDecoded: temp2 });
    if(this.state.passwordValue === ""){
      this.showAlert("Warning","Make sure to enter the password")
    }
    else if(this.state.passwordValue !== this.state.PasswordDecoded){
     this.showAlert("Warning","Make sure to enter the correct password")
    }
    else{
      //.............correct password....................

      try{
        await AsyncStorage.setItem('Email',this.state.Email);
        // await AsyncStorage.setItem('Password',this.state.PasswordEncoded);
      }
      catch(error){
        console.log(error);
      }
      this.props.navigation.navigate('home',{
        Email: this.state.Email,
      });
    }
  }

 
   render(){
     
     return (

       <View style={styles.MainView}>


         <Lottie/>

        
        <KeyboardAvoidingView 
          behavior="padding" 
          keyboardVerticalOffset={
            Platform.select({
               ios: () => 0,
               android: () => -140
            })()
          }
          style={ {marginTop: 270, width: '100%', height: 390}}>
        
         <View style={styles.scrollView1}>
         <View style={{marginTop: 40}}>
            <Text style={styles.textstyle}>LOGIN</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 50,marginBottom:50}}>
            
                {/* Email */}
                <View style={styles.RegisterRows}>
                  <Text style={styles.textstyle1}>
                    Email
                  </Text>
                  <View style={styles.inputView}>
                  <Icon
                    color='#333'
                    name='envelope'
                    type='font-awesome'
                    size={20}
                  />
                 <TextInput 
                 onChangeText={text=>this.setState({Email:text})}
                 keyboardType='email-address'
                 placeholder='Email Address'
                textContentType='emailAddress'
                 style={styles.textinputstyle} />
                </View>
                </View>

                {/* password */}
                <View style={styles.RegisterRows}>
                  <Text style={styles.textstyle1}>
                    Password
                  </Text>
                  <View style={styles.inputView}>
                  <Icon
                    color='#333'
                    name='lock'
                    type='font-awesome'
                    size={25}
                  />
                 <TextInput
                    setFocus={this.state.focus}
                    onChangeText={text => this.setState({passwordValue: text})}
                    onFocus={() => this.setState({focus: true})}
                    onBlur={() => this.setState({focus: false})}
                    secureTextEntry={this.state.secure} //we just added this
                    style=
                      {styles.textinputstyle}
                    placeholder={"Enter Password"} />
                    {
                      <Icon style={{ marginLeft:180,position:'absolute' }}
                         name={this.state.secure ? "eye" : 'eye-slash'}
                         size={20} color='#343434' 
                         onPress={() => this.setState({secure : !this.state.secure})} />
                    }
                </View>
                
                
                  
                </View>
                <View style={styles.RegisterRows}>
                  <Text style={styles.textstyle1}>
                    
                  </Text>
                  <View style={{marginTop:0, alignContent:'center'}}>
                     <Text style={styles.textstyle2} onPress={
                         ()=>this.props.navigation.navigate('forgetPassword')
                          }>Forgot Password? Click here</Text>
                 </View>
                </View>

                

                
            </ScrollView>
            
        </View>
        </KeyboardAvoidingView>
        

        <View style={{marginTop:0, marginBottom: 20,paddingTop:0}}>
        <TouchableOpacity style={styles.buttonstyle} onPress={
              ()=>{
                this.props.navigation.navigate('login');
                if(this.state.Email === "" || this.state.passwordValue === ""){
                  this.showAlert("Warning", "Make sure all fields are full!");
                }
                else{
                  this.getUser();
                }
                

              }
            }>
            
           <Text style={styles.buttontext} >Login</Text>
           </TouchableOpacity>
         </View>
         
 
        
 
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

  textstyle: {
    marginTop: 0,
    fontFamily:"ArimaMadurai-Regular",
    fontSize: 50,
    color: 'black',
    textAlign: 'center',
    // fontWeight: 'bold',
  },
  textstyle1: {
   fontSize: 20,
   width: 120,
   color: 'black',
   fontFamily: 'SairaSemiCondensed-Regular',
   
  },
  textstyle2: {
    fontSize: 10,
    width: 180,
    color: 'black',
    fontFamily: 'SairaSemiCondensed-Regular',
    textAlign:'center',
    
   },
  scrollView1: {
   //  padding:0,
   width:'100%',
  //  height:100,
    marginTop:5,
    marginBottom:0,
    display:'flex',
      flex: 11,
      flexDirection: 'column',
      width: 360,
     //  height: 260,
      alignItems: 'center',
      alignSelf: 'center',
  },
  buttonstyle: {
   width:200,
   height: 50,
   display:'flex',
   allignItems:'center',
   alignContent: 'center', 
   paddingVertical:9,
   backgroundColor:'#bc9855',
   borderRadius: 100 ,
   elevation:2,
   shadowColor: '#0000',
   shadowOffset: {
     width: 2,
     height: 2,
   },
   marginTop: 0,
   marginBottom: 80
 },
 buttontext: {
   color: 'black',
   textAlign: 'center',
   // fontWeight: 'bold',
   fontSize: 20,
   fontFamily:"SairaSemiCondensed-Regular",
 },
 inputView:{
   
   Width:180,
   height:40,
   backgroundColor:'#98a988',
   borderRadius:15,
   overflow: 'hidden',
   paddingHorizontal:4,
   display:'flex',
   flex: 3,
   flexDirection:'row',
   alignItems: 'center',
   marginRight: 20,
   // marginLeft: 20
 },
 RegisterRows: {
   display:'flex',
   flex: 2,
   flexDirection:'row',
   marginLeft: 20,
   marginBottom: 15,
   alignItems: 'center',
   width: 350,
 },
 textinputstyle: {
   width: 180,
   paddingHorizontal:4,
   height: 47,
   fontFamily: 'SairaSemiCondensed-Regular',
   fontSize: 15,
   textDecorationLine: 'none',
   backgroundColor: "#98a988"
 }

});

 
 export default Login;
 
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component} from 'react';
 import Icon from 'react-native-vector-icons/dist/FontAwesome';
 import { KeyboardAvoidingView,BackHandler } from 'react-native';
 import Lottie from '../../Components/Lottie';
 import { LogBox } from 'react-native';

 import {Base64} from 'js-base64';

 LogBox.ignoreLogs(['Require cycle:']);


 
 import {
   StyleSheet,
   Text,
   View,
   ScrollView,
   TouchableOpacity,
   TextInput,
   Alert,
   SafeAreaView,
   Image,
 } from 'react-native';
import { Modal } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
 import { serverLink } from '../serverLink';
//  const serverLink="http://192.168.1.110:3001";
//  const serverLink="http://172.19.15.206:3001";

 class ChangePassword extends Component{
  constructor(props){
    super(props);
    this.state = {
      secure: true,
       passwordValue:"",
       focus: false,
       confirmsecure: true,
       confirmfocus: false,
       confirmpasswordValue:"",
      dialogVisible:false,
      Email:"",
      PasswordEncoded:"",
      EnterCode:"",
      Code:"",

    //   where:this.props.route.params.where,
  
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
  if(!this.state.dialogVisible){
    // if(this.state.where==='login')
    this.props.navigation.navigate('Profile',{Email:this.state.Email})
    // else if(this.state.where==='profile')
    // this.props.navigation.navigate('Profile',{Email:this.state.Email})
  }

  else{
    this.setState({
      secure: true,
      passwordValue:"",
      focus: false,
      confirmsecure: true,
      confirmfocus: false,
      confirmpasswordValue:"",
    PasswordEncoded:"",
    dialogVisible:false,}); 
   }
      return true;
}

  componentDidMount(){
    this.setState({
      
        secure: true,
         passwordValue:"",
         focus: false,
         confirmsecure: true,
         confirmfocus: false,
         confirmpasswordValue:"",
        dialogVisible:false,
        Email:"",
        PasswordEncoded:"",
        EnterCode:"",
        Code:"",
    
      
    })
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

  async sendCode(){
    const response = await fetch(serverLink+"/sendCode", {
      method: "POST",

      headers: {
       "Content-Type": "application/json"
       },
      body: JSON.stringify(
        {               
          "Email": this.state.Email,
        }
      )
     });   
   const body = await response.json();
   if(body==="Email does not exist"){
    this.showAlert("Warning", body);
    // console.log("no email")
   }
   else{
    // console.log(body);
    this.showAlert("Email", "Email sent!")
    this.setState({Code:body});
   }
  }

   encrypt_password=async()=> {
    var temp = await Base64.encode(this.state.passwordValue);
 
    this.setState({ PasswordEncoded: temp });
    await this.changePassword();
  }

 changePassword=async()=>{
    const response = await fetch(serverLink+"/changePassword", {
      method: "POST",

      headers: {
       "Content-Type": "application/json"
       },
      body: JSON.stringify(
        {               
          "Email": this.state.Email,
          "Password":this.state.PasswordEncoded,
        }
      )
     });   
   const body = await response.json();
   this.showAlert("^_^", "Password Updated")
   this.setState({dialogVisible:false})
    // console.log(body);
  }
 
   render(){
     
     return (

       <SafeAreaView style={styles.MainView}>

         <Lottie/>

        
        <KeyboardAvoidingView 
          behavior="padding" 
          keyboardVerticalOffset={
            Platform.select({
               ios: () => 0,
               android: () => -60
            })()
          }
          style={ {marginTop: 270, width: '100%', height: 390}}>
        
         <View style={styles.scrollView1}>
         <View style={{marginTop:10}}>
            <Text style={styles.textstyle}>Change Password</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 40,marginBottom:0}}>
            
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
                <View style={styles.RegisterRows}>
                  <Text style={styles.textstyle1}>
                    
                  </Text>
                  <View  style={styles.codebutton}>
                  <TouchableOpacity style={styles.buttonstyle} onPress={
                    //send code via email
                       ()=>
                       {
                         this.sendCode();
                         
                         
                         this.props.navigation.navigate('changePassword');
                       }
                  }>
            
                  <Text style={styles.buttontext} >Send Code</Text>
                 </TouchableOpacity>
                </View>
                </View>

                <View style={styles.RegisterRows}>
                  <Text style={styles.textstyle1}>
                    Code
                  </Text>
                  <View style={styles.inputView}>
                  
                 <TextInput 
                 onChangeText={text=>this.setState({EnterCode:text})}
                 placeholder="Enter Code"
                 style={styles.textinputstyle} />
                </View>
                </View>
                <View style={styles.RegisterRows}>
                  <Text style={styles.textstyle1}>
                    
                  </Text>
                  <View  style={styles.codebutton}>
                  <TouchableOpacity style={styles.buttonstyle} 
                  onPress={() => 
                    {
                      if(this.state.Code===this.state.EnterCode&& this.state.Code!=""){
                     
                        this.setState({ dialogVisible: true });
                      }
                        else{
                          this.setState({ dialogVisible: false });
                          console.log(this.state.EnterCode);
                          console.log(this.state.Code);
                          this.showAlert("Warning","The verification code you entered does not match ")
                        }
                      
                    }}
                          
                  >
            
                  <Text style={styles.buttontext} >Verify Code</Text>
                 </TouchableOpacity>
                 </View>
                </View>
                {/* <View style={styles.RegisterRows}>
                  <Text style={styles.textstyle1}>
                    
                  </Text>
                  <View  style={styles.codebutton}>
                  <TouchableOpacity style={styles.buttonstyle} 
                  onPress={() => 
                    {
                      this.props.navigation.navigate('changePassword')
                      
                    }}
                          
                  >
            
                  <Text style={styles.buttontext} >Login</Text>
                 </TouchableOpacity>
                 </View>
                </View> */}
                
            </ScrollView>

            
         {/* </View> */}

        </View>
        

        

        <Modal 
         animationType='slide'
         visible={this.state.dialogVisible}
                   onRequestClose={()=>{this.setState({dialogVisible:false})}
                                             }
                    style={styles.ModalView}>
                 <View style={styles.cancelicon}>
                     <Icon  name='close' color="black"  size={25} onPress={()=>
                      {
                      
                      this.setState({
                        dialogVisible:false,
                        secure: true,
       passwordValue:"",
       focus: false,
       confirmsecure: true,
       confirmfocus: false,
       confirmpasswordValue:"",
       PasswordEncoded:"",
                      })
                    }
                      } />
                 </View>
                 <View style={styles.modalS}>

                 <View style={{flexDirection:'row',marginBottom:30}}>
          <View style={{width:'20%', alignItems:'flex-start'}}>
          <Image 
               source={require('../../assets/logo/logo1.jpeg')}
               style={{width:60, height:60, borderRadius:0}}
               
               />
          </View>
          <View style={{width:'60%',alignItems:'center',justifyContent:'center'}}>
          <Text style={styles.textAddress}>New Password</Text>
          </View>
          <View style={{width:'20%'}}>
          <Text></Text>
          </View>
          
  </View>
  <KeyboardAwareScrollView style={{height:'40%',}}>
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
                      // <View style={{alignItems:'flex-start'}}>
                      <Icon style={{ marginLeft:180,position:'absolute' }}
                         name={this.state.secure ? "eye" : 'eye-slash'}
                         size={20} color='#343434' 
                         onPress={() => this.setState({secure : !this.state.secure})} />
                    }
                </View>
                </View>
                
                <View style={styles.RegisterRows}>
                  <Text style={styles.textstyle1}>
                    Confirm
                  </Text>
                  <View style={{display:'flex', flex:2,flexDirection:'row', width:180}}>
                  <View style={styles.inputView}>
                  <Icon
                    color='#333'
                    name='lock'
                    type='font-awesome'
                    size={25}
                  />
                 <TextInput
                    setFocus={this.state.confirmfocus}
                    onChangeText={text => this.setState({confirmpasswordValue: text})}
                    onFocus={() => this.setState({confirmfocus: true})}
                    onBlur={() => this.setState({confirmfocus: false})}
                    secureTextEntry={this.state.confirmsecure} //we just added this
                    style=
                      {styles.textinputstyle}
                    placeholder={"Enter Password"} />
                    <Icon style={{ marginLeft:180, position:'absolute'}}
                         name={this.state.confirmsecure ? "eye" : 'eye-slash'}
                         size={20} color='#343434' 
                         onPress={() => this.setState({confirmsecure : !this.state.confirmsecure})} />
                  
                    
                </View>
                
                  </View>
                  
                </View>
                <View style={styles.RegisterRows}>
                  <Text style={styles.textstyle1}>
                    
                  </Text>

                  <View  style={styles.codebutton}>
                  <TouchableOpacity style={styles.buttonstyle} onPress={
                       ()=>{
                         //make sure the password is the same
                         if(this.state.passwordValue === this.state.confirmpasswordValue && this.state.passwordValue !=="" 
                         && this.state.confirmpasswordValue !==""){
                          
                          this.encrypt_password();
                          // this.changePassword();
                          // this.setState({dialogVisible: false});
                          this.props.navigation.push('login')

                         }else{
                          this.showAlert("Warning", "Make sure Password and Confirmed password full and match");
                          this.setState({dialogVisible: true});
                         }
                         
                         
                        }
                  }>
            
                  <Text style={styles.buttontext} >Save</Text>
                 </TouchableOpacity>
                </View>
                  
                </View> 
                </KeyboardAwareScrollView>
                </View>
            </Modal>
        </KeyboardAvoidingView>
        

        

         
 
        
 
       </SafeAreaView>
     );
   }
 }
 
 
 const styles = StyleSheet.create({
  textAddress:{
    fontSize: 20,
    letterSpacing: 1,
    opacity: 0.8,
    color:"black",
    fontFamily:'SairaSemiCondensed-Bold'
  },
  cancelicon:{
    paddingTop:1,
paddingLeft:"94%",
backgroundColor:'#bfcfb2',
  },
  ModalView:{
    flex:1,
    // borderStyle:'dashed',
    // borderColor:'black',
    height:'100%',
    justifyContent:'center',
    // alignContent:'center',
    alignItems:'center',
    backgroundColor:'#bfcfb2',
  },
  modalS:{
    alignItems:"center",
      // alignSelf:"center",
    // justifyContent:'center',
    
    display:'flex',
    backgroundColor:'#bfcfb2',
     height:'100%',
    //  marginVertical:200
    },

  MainView: {
   display:'flex',
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#bfcfb2',
  },
  gifView:{
    flex: 1,
    marginBottom: 100
  },
  
  textstyle: {
    marginTop: 0,
    fontFamily:"ArimaMadurai-Regular",
    fontSize: 30,
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

  scrollView1: {
   //  padding:0,
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
    paddingVertical:5,
    backgroundColor:'#bc9855',
    borderRadius: 100 ,
    elevation:2,
    shadowColor: '#0000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    marginTop: 0,
    marginBottom: 0
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
 codebutton:{
   
    Width:180,
    height:40,
    backgroundColor:'#bc9855',
    borderRadius:15,
    overflow: 'hidden',
    paddingHorizontal:4,
    marginRight: 20,
    fontSize:15,
   allignItems:'center',
   alignContent: 'center', 
//    paddingVertical:9,
   backgroundColor:'#bc9855',
//    borderRadius: 100 ,
    // marginLeft: 20
  },
 RegisterRows: {
   display:'flex',
   height:40,
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

 
 export default ChangePassword;
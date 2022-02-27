/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component} from 'react';
 import Icon from 'react-native-vector-icons/dist/FontAwesome';
 import { KeyboardAvoidingView } from 'react-native';
 import Dialog, { DialogContent } from 'react-native-popup-dialog';
 import Lottie from '../Components/Lottie';
 import { LogBox } from 'react-native';

 LogBox.ignoreLogs(['Require cycle:']);


 
 import {
   StyleSheet,
   Text,
   View,
   ScrollView,
   TouchableOpacity,
   TextInput,
 } from 'react-native';
 
 class ForgetPassword extends Component{
  constructor(props){
    super(props);
  }
   state = {
    secure: true,
     passwordValue:"",
     focus: false,
     confirmsecure: true,
     confirmfocus: false,
     confirmpasswordValue:"",
    dialogVisible:false,

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
               android: () => -60
            })()
          }
          style={styles.MainView, {marginTop: 270, width: '100%', height: 390}}>
        
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
                       ()=>this.props.navigation.navigate('forgetPassword')
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
                  
                 <TextInput placeholder="Enter Code" keyboardType='numeric' style={styles.textinputstyle} />
                </View>
                </View>
                <View style={styles.RegisterRows}>
                  <Text style={styles.textstyle1}>
                    
                  </Text>
                  <View  style={styles.codebutton}>
                  <TouchableOpacity style={styles.buttonstyle} onPress={() => 
                  {
                          this.setState({ dialogVisible: true });
                  }}>
            
                  <Text style={styles.buttontext} >Verify Code</Text>
                 </TouchableOpacity>
                 </View>
                </View>
                 <Dialog
                   visible={this.state.dialogVisible}
                    onTouchOutside={() => {
                    this.setState({ dialogVisible: false });
                    }}
                  >
                  <DialogContent style={{height:300, width:400, backgroundColor:'#bfcfb2',}}>
                  <Text style={styles.textstyle}>
                    New Password
                    </Text>
                      
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
                      // <View style={{alignItems:'flex-start'}}>
                      <Icon style={{ marginLeft:180,position:'absolute' }}
                         name={this.state.secure ? "eye" : 'eye-slash'}
                         size={20} color='#343434' 
                         onPress={() => this.setState({secure : !this.state.secure})} />
                      //  {/* </View> */}
                    }
                </View>
                </View>
                {/* confirm password */}
                <View style={styles.RegisterRows}>
                  <Text style={styles.textstyle1}>
                    Confirm Password
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
                         this.setState({dialogVisible: false});
                         this.props.navigation.navigate('forgetPassword')
                        }
                  }>
            
                  <Text style={styles.buttontext} >Save</Text>
                 </TouchableOpacity>
                </View>
                  
                </View>
                
     
                    </DialogContent>
                  </Dialog>

                {/* </View> */}
                {/* </View> */}

                

              

                

                
            </ScrollView>
            
         {/* </View> */}

        </View>
        </KeyboardAvoidingView>
        

        <View style={{marginTop:0, marginBottom: 20,paddingTop:0}}>
        <TouchableOpacity style={styles.buttonstyle} onPress={
              ()=>this.props.navigation.navigate('login')
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
  gifView:{
    flex: 1,
    marginBottom: 100
  },
  
  textstyle: {
    marginTop: 0,
    fontFamily:"ArimaMadurai-Regular",
    fontSize: 40,
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
   paddingVertical:4,
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

 
 export default ForgetPassword;
 
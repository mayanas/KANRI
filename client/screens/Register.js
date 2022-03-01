/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component, useRef} from 'react';
 import Icon from 'react-native-vector-icons/dist/FontAwesome';
 import SelectDropdown from 'react-native-select-dropdown';
 import PhoneInput from 'react-native-phone-number-input';
 import DateField from 'react-native-datefield';
 import CountryPicker, {
  getAllCountries
} from 'react-native-country-picker-modal';

import { Base64 } from 'js-base64';

import Lottie from '../Components/Lottie';

// import CountrySelectDropdown from "react-native-searchable-country-dropdown";

 const gender = ["Male", "Female", "Prefer not to say"]


 
 import {
   StyleSheet,
   Text,
   View,
   ScrollView,
   TouchableOpacity,
   TextInput,
   Alert,
 } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';


 
 class Register extends Component{
  constructor(props){
    super(props);
    this.phoneinput = React.createRef();

  }
  state = {
    secure: true,
    focus: false,
    confirmsecure: true,
    confirmfocus: false,
    FirstName:"",
    LastName: "",
    Gender: "",
    BDay:0,
    BMonth:0,
    BYear:0,
    Country:"Palestine",
    PhoneNumber:"",
    phonevalid:true,
    phonevalue: "",
    Email:"",
    emailvalid:false,
    PasswordValue:"",
    ConfirmpasswordValue:"",
    PasswordEncoded:"",
    PasswordDecoded:"",
    usersList: [],

  }
  async addUser(){
    const response = await fetch("http://192.168.1.110:3001/addUser", {
      method: "POST",
      headers: {
       "Content-Type": "application/json"
       },
      body: JSON.stringify(
        {
                "FirstName": this.state.FirstName,
                "LastName":this.state.LastName,
                "Gender": this.state.Gender,
                "BirthDate": this.state.BYear+"-"+this.state.BMonth+"-"+this.state.BDay,
                "Country": this.state.Country,
                "PhoneNumber": this.state.PhoneNumber,
                "Email": this.state.Email,
                "Password":this.state.PasswordEncoded,
        }
      )
     });   
   const body = await response.json();
   if(body==='existed'){
    this.showAlert("Email","There is already an account with this email address");
   }
  }

   validate = (text) => {
    
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === true) {
      this.setState({ Email: text ,
      emailvalid:true})

    }
    else{
      this.setState({emailvalid:false})
  
    }
    
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
  encrypt_password = () => {
 
    var temp = Base64.encode(this.state.PasswordValue);
 
    this.setState({ PasswordEncoded: temp });
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
         <View style={{marginTop: 40}}>
            <Text style={styles.textstyle}>REGISTER</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} >
            
                {/* first name */}
                <View style={styles.RegisterRows}>
                  <Text style={styles.textstyle1}>
                      First Name
                  </Text>
                  <View style={styles.inputView}>
                  <Icon
                    color='#333'
                    name='user'
                    type='font-awesome'
                    size={25}
                  />
        
                 <TextInput style={styles.textinputstyle} 
                 onChangeText={(text)=>
                   this.setState({
                     FirstName:text
                   })
                 }
                 placeholder="First Name" />
                </View>

                </View>

                {/* Last name */}
                <View style={styles.RegisterRows}>
                  <Text style={styles.textstyle1}>
                      Last Name
                  </Text>
                  <View style={styles.inputView}>
                  <Icon
                    color='#333'
                    name='user'
                    type='font-awesome'
                    size={25}
                  />
        
                 <TextInput style={styles.textinputstyle}
                  onChangeText={(text)=>
                    this.setState({
                      LastName:text
                    })
                  }
                   placeholder="Last Name"/>
                </View>

                </View>

                {/* Gender name */}
                <View style={styles.RegisterRows}>
                  <Text style={styles.textstyle1}>
                      Gender
                  </Text>
                  <View style={styles.inputView}>
                  <Icon
                    color='#333'
                    name='venus-mars'
                    type='font-awesome'
                    size={14}
                    
                  />

                <SelectDropdown 
                  dropdownBackgroundColor={"#98a988"}
                  buttonStyle={styles.textinputstyle}
                  styleInput={{fontFamily:'SairaSemiCondensed-Regular'}}
                  defaultButtonText={"Select"}
                  rowTextForSelection={""}
	                data={gender}
	                onSelect={(selectedItem, index) => {

	        	        this.setState({
                      Gender:selectedItem
                    })
                   
	                }}
	                buttonTextAfterSelection={(selectedItem, index) => {
	                    return selectedItem
	                }}
	                rowTextForSelection={(item, index) => {
	                    return item
	              }}
                />

                </View>

                </View>

                  {/*   Birthday*/}
                <View style={styles.RegisterRows}>
                  <Text style={styles.textstyle1}>
                    Birth Date
                  </Text>
                  <View style={styles.inputView,{width:180}}>
                 
        
                 <DateField 
                 styleInput={{backgroundColor:'#98a988',fontFamily:'SairaSemiCondensed-Regular',
                height:47}}
                 containerStyle={{backgroundColor:'#98a988', width:210, 
                 borderRadius:15,height:40,overflow: 'hidden'}}
                onSubmit={value=>{
                
                  this.setState({
                    BDay: value.getDate(),
                    BMonth: value.getMonth()+1,
                    BYear: value.getFullYear(),
                  })
                }}
                 
                  />
                </View>

                </View>

                {/* Counrty */}
                <View style={styles.RegisterRows}>
                  <Text style={styles.textstyle1}>
                  Counrty
                  </Text>
                  <View style={styles.inputView}>
                 
     
                  <CountryPicker
                  
                     disable={false}
                     animationType={'slide'}
                     pickerTitle={'Country Picker'}
                     searchBarPlaceHolder={'Search......'}
                     showCountryNameWithFlag={true}
                     
                     onSelect={  (index) => {
                        this.setState({Country: index.name});
                      
                      }}
                      placeholder={this.state.Country}
                      containerStyle={{width:180, textAlign:'center',paddingHorizontal:30}}
                      textContainerStyle={{width:180, textAlign:'center', paddingHorizontal:30}}
                      style={{width:180, textAlign:'center', alignContent:'center'}}
                     
        />
       
                 
                </View>

                </View>




                <View style={styles.RegisterRows}>
                  <Text style={styles.textstyle1}>
                      Phone
                  </Text>
                  <View style={{flex: 1, width: 180}}>
                  {/* <Icon
                    color='#333'
                    name='venus-mars'
                    type='font-awesome'
                    size={14}
                    
                  /> */}

                {/* <KeyboardAvoidingView> */}
                  <PhoneInput 
                     layout="second"
                     defaultCode="PS"         
                     keyboardType="phone-pad"
                     ref={this.phoneinput}
                     onChangeText={text=>{
                        this.setState({phonevalue:text});
                     }}
                     onChangeFormattedText={(text)=>{
                      
                       this.setState({PhoneNumber:text});
                       
                     }

                     }
                     
                    //  withShadow
                     placeholder='Enter'
                     containerStyle={{backgroundColor:'#98a988',height:40, overflow: 'hidden',borderRadius:15, width:210, paddingHorizontal:0}}
                     textContainerStyle={{height:47, backgroundColor:'#98a988',width:200,borderRadius:15}}
                     codeTextStyle={{fontSize: 15,fontFamily:'SairaSemiCondensed-Regular' ,height:30, backgroundColor:'#98a988' }}
                     textInputStyle={{color:'black', fontSize: 15,fontFamily:'SairaSemiCondensed-Regular', backgroundColor: '#98a988', height:47}}
                  />
                  {/* </KeyboardAvoidingView> */}

                </View>

                </View>
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
                onChangeText={(text)=>this.validate(text)}
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
                    onChangeText={text => this.setState({PasswordValue: text})}
                    onSubmitEditing={this.encrypt_password}
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
                    onChangeText={text => this.setState({ConfirmpasswordValue: text})}
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

                
            </ScrollView>
            
         {/* </View> */}

        </View>
        </KeyboardAvoidingView>
        

        <View style={{marginTop:0, marginBottom: 20,paddingTop:0}}>
        <TouchableOpacity style={styles.buttonstyle} onPress={
          ()=>{
              this.props.navigation.navigate('register');
              this.state.phonevalid= this.phoneinput.current?.isValidNumber(this.state.phonevalue);              
              
              if(this.state.FirstName==""){
                 this.showAlert("Empty Field","Make sure First Name field is full ");
              }
              else if(this.state.LastName==""){
                this.showAlert("Empty Field","Make sure Last Name field is full ");
              }
              else if(this.state.Gender==""){
                this.showAlert("Gender","Make sure Gender is selected");
              }
              else if(this.state.BDay==0||this.state.BMonth==0||this.state.BYear==0){
                this.showAlert("BirthDate","Make sure Birth Date field is full");
              }
              else  if(!this.state.phonevalid)
              {
                this.showAlert("Phone Number","Make sure Phone Number field is valid");
              }
              else if(!this.state.emailvalid){
                this.showAlert("Email","Make sure Email field is valid");
              }
              else if(this.state.PasswordValue==""){
                this.showAlert("Email","Make sure Password field is full");
              }
              else if(this.state.ConfirmpasswordValue==""){
                this.showAlert("Email","Make sure Confirm Password field is full");
              }
              else if(this.state.PasswordValue!=this.state.ConfirmpasswordValue){
                this.showAlert("Email","Make sure Password and Confirm password match");
              }
              else{                
                this.addUser();
              }

              //create and enter the profile
              //......................................................

        }
            }>
            
           <Text style={styles.buttontext} >Register</Text>
           </TouchableOpacity>
         </View>
       </View>
     );
   }
 }
 
 
 const styles = StyleSheet.create({

   MainView: {
    display:'flex',
     flex: 3,
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
    paddingVertical:9,
    backgroundColor:'#bc9855',
    borderRadius: 100 ,
    elevation:2,
    shadowColor: '#0000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    marginTop: 20,
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
    width: 350
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
 
 export default Register;
 
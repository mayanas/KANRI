/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component} from 'react';
 import Icon from 'react-native-vector-icons/dist/FontAwesome';
 import SelectDropdown from 'react-native-select-dropdown';
 import PhoneInput from 'react-native-phone-number-input';
 import DateField from 'react-native-datefield';
 import CountryPicker, {
  getAllCountries
} from 'react-native-country-picker-modal';

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
 } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';


 
 class Register extends Component{
  constructor(props){
    super(props);
  }
   state = {
     Country: "Palestine",
     secure: true,
     passwordValue:"",
     focus: false,
     confirmsecure: true,
     confirmfocus: false,
     confirmpasswordValue:"",
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
        
                 <TextInput style={styles.textinputstyle} placeholder="First Name" />
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
        
                 <TextInput style={styles.textinputstyle} placeholder="Last Name"/>
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
                  defaultButtonText={"Select"}
                  // placeholder={"Select"}
                  rowTextForSelection={""}
	                data={gender}
	                onSelect={(selectedItem, index) => {
	        	         console.log(selectedItem, index)
	                }}
	                buttonTextAfterSelection={(selectedItem, index) => {
		                  // text represented after item is selected
		                  // if data array is an array of objects then return selectedItem.property to render after item is selected
	                    return selectedItem
	                }}
	                rowTextForSelection={(item, index) => {
	              	// text represented for each item in dropdown
	               	// if data array is an array of objects then return item.property to represent item in dropdown
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
                 styleInput={{backgroundColor:'#98a988'}}
                 containerStyle={{backgroundColor:'#98a988', width:210, 
                 borderRadius:15,height:40,overflow: 'hidden'}}
                 
                  />
                </View>

                </View>

                {/* Counrty */}
                <View style={styles.RegisterRows}>
                  <Text style={styles.textstyle1}>
                  Counrty
                  </Text>
                  <View style={styles.inputView}>
                  {/* <CountrySelectDropdown
                    //  countrySelect={setCountryCode}
                    //  error={errorMsg}
                     fontFamily={"Nunito-Regular"}
                     textColor={"#f3f3f3"}
                  /> */}
                 
     
                  <CountryPicker
                  
                     disable={false}
                     animationType={'slide'}
                     pickerTitle={'Country Picker'}
                     searchBarPlaceHolder={'Search......'}
                     showCountryNameWithFlag={true}
                     
                     onSelect={  (index) => {
                        this.setState({Country: index.name});
                        console.log(index.name);
                      }}
                      placeholder={this.state.Country}
                      containerStyle={{width:180, textAlign:'center',paddingHorizontal:30}}
                      textContainerStyle={{width:180, textAlign:'center', paddingHorizontal:30}}
                      style={{width:180, textAlign:'center', alignContent:'center'}}
         // selectedCountryTextStyle={}
         // countryNameTextStyle={}
                     
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
                     defaultCode="DM"         
                     keyboardType="phone-pad"
                     
                     
                    //  withShadow
                     placeholder='Enter'
                     containerStyle={{backgroundColor:'#98a988',height:40, overflow: 'hidden',borderRadius:15, width:210, paddingHorizontal:0}}
                     textContainerStyle={{height:40, backgroundColor:'#98a988',width:200,borderRadius:15}}
                     codeTextStyle={{fontSize: 15, height:30, backgroundColor:'#98a988' }}
                     textInputStyle={{color:'black', fontSize: 15, backgroundColor: '#98a988', height:40}}
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
                      {styles.textInputStyle,{paddingRight:50}}
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
                      {styles.textInputStyle,{paddingRight:50}}
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
              ()=>this.props.navigation.navigate('register')
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
    height: 40,
    fontFamily: 'SairaSemiCondensed-Regular',
    fontSize: 15,
    textDecorationLine: 'none',
    backgroundColor: "#98a988"
  }
 
 });
 
 export default Register;
 
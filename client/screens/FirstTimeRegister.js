/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component} from 'react';
 import { KeyboardAvoidingView } from 'react-native';
 import  {launchImageLibrary} from 'react-native-image-picker';
 import LinearGradient from 'react-native-linear-gradient';
 import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
 import SelectDropdown from 'react-native-select-dropdown';
 import CheckboxList from 'rn-checkbox-list';
 import { Modal, Portal, Provider } from 'react-native-paper';

//  import { Picker } from '@react-native-picker/picker';
 import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
  Image, 

  PermissionsAndroid, 
 } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
 
 const serverLink="http://192.168.1.110:3001";
//  const serverLink="http://172.19.15.206:3001";
const Degrees = ["Doctoral Degree","Master's Degree","Bachelor's Degree", "Diploma's Degree","Undergraduate",  "None of the above"]
const checkList = [
                   { id: 1, name: 'Applied Technology' },
                   { id: 2, name: 'Behavioral Science and Human Services' },
                   { id: 3, name: 'Business, Entrepreneurialism, and Management' },
                   { id: 4, name: 'Computer and Information Technology' },
                   { id: 5, name: 'Culture and Society' },
                   { id: 6, name: 'Education' },
                   { id: 7, name: 'Health Sciences' },
                   { id: 8, name: 'Science, Technology, Engineering, and Mathematics (STEM)' },
                   { id: 9, name: 'Visual and Performing Arts' },
                  ];

 class FirstTimeRegister extends Component{
  constructor(props){
    super(props);
    // const Email = this.props.route.params.Email;
    // this.getInformation();
  }

   state = {
    profileImage: '',
    NickName: '',
    bio: "",
    QualificationDegree:"",
    // University:"",
    InterestedIn:"",

    // firstName: '',
    // lastName: '',
  }
  
  // async getInformation(){
  //   const response = await fetch(serverLink+"/getInformation", {
  //     method: "POST",
  //     headers: {
  //      "Content-Type": "application/json"
  //      },
  //     body: JSON.stringify(
  //       {               
  //               "Email": this.props.route.params.Email,
  //       }
  //     )
  //    });   
  //  const body = await response.json();
  //  if(body=="null"){
  //   console.log('not existed')
  //  }else{
  //   this.setState({
  //     firstName: body.FirstName,
  //     lastName:body.LastName,
  // });
  //  }
   
  // }

  

  _requestAcessPermission = async () => {
     try {
       const granted = await PermissionsAndroid.request(
         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
         {
           title: "App Gellery Permission",
           message: "App needs access to your Gellery ",
           buttonNeutral: "Ask Me Later",
           buttonNegative: "Cancel",
           buttonPositive: "OK"
         }
       );
       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         this._galleryLaunch();
       } else {
         console.log("Gellery permission denied");
       }
     } catch (err) {
       console.warn(err);
     }
    }
  _galleryLaunch = () => {

     let options = {
       storageOptions: {
         skipBackup: true,
         path: 'images',
       },
     };

     launchImageLibrary(options, (res) => {

       if (res.didCancel) {
         console.log('User cancelled image picker');
       } else if (res.error) {
         console.log('ImagePicker Error: ', res.error);
       } else if (res.customButton) {
         console.log('User tapped custom button: ', res.customButton);
         alert(res.customButton);
       } else {
         this.setState({
           profileImage: res.assets[0].uri,
         });
       }
     });
   };

  uploadProfileImage=()=>{
    console.log(this.state.profileImage)
  }
   render(){
     
     return (

      <KeyboardAwareScrollView style={{backgroundColor: '#bfcfb2',}}>
       <View style={styles.MainView}>
         {/* <Text>{this.Email}</Text> */}
         
         <View style={styles.TopView}>
         <View style={styles.infoStyle}>
          <Text style={styles.textStyle}>{this.props.route.params.FirstName + ' ' + this.props.route.params.LastName}</Text>
        </View>
         <Image 
               source={require('../assets/logo/logo1.jpeg')}
               style={{width:60, height:60, borderRadius:0}}
               
               />
         </View>
         <LinearGradient
         colors={['#98a988', '#bfcfb2', '#bfcfb2']}
         style={{
          left:0,
          right:0,
          height:'5%',
          width:'100%',
          margin:0,
         }}
         ></LinearGradient>

         {/* ///////////////////////////////Body///////////////////////////////////////////// */}
         
         <View style={styles.iView}>
          <Text style={[styles.textStyle1, {fontFamily:'SairaSemiCondensed-Bold', fontSize:17}]}>Welcome to Kanri </Text>
          <Text style={styles.textStyle1}>Since it's your first visit, please fill the following information:</Text>
          
        </View> 
        
        <View style={styles.container}>
          {/*image view*/}
        <View style={styles.imageView}>
          <TouchableOpacity 
          onPress={this._requestAcessPermission}
          style={styles.button}>
            {this.state.profileImage ? <Image source={{uri: this.state.profileImage}} style={{width:'100%',height:'100%'}}/>:
              <Text style={styles.buttonText}>Upload Profile Image</Text>}
          </TouchableOpacity>
          
        </View> 
        {/*other info view*/}
         
            <View style={styles.otherInfoStyle}>
            {/* <ScrollView  > */}
            
            <View style={styles.RowStyle}>
              <Text style={styles.textstyle1}>Nick Name</Text>
              <View style={styles.inputView}>
                
                 <TextInput style={styles.textinputstyle} 
                 onChangeText={(text)=>
                  // console.log(text)
                   this.setState({
                     NickName:text
                   })
                 }
                 placeholder="Enter your nick name here" />
                

                </View>
            </View>
            <View style={styles.RowStyle}>
              <Text style={styles.textstyle1}>Qualification Degree</Text>
              <View style={styles.inputView}>
              <SelectDropdown 
                  dropdownBackgroundColor={"#98a988"}
                  buttonStyle={styles.textinputstyle}
                  styleInput={{fontFamily:'SairaSemiCondensed-Regular'}}
                  defaultButtonText={"Select"}
                  rowTextForSelection={""}
	                data={Degrees}
	                onSelect={(selectedItem, index) => {

	        	        this.setState({
                      QualificationDegree:selectedItem
                    })
                   
	                }}
	                buttonTextAfterSelection={(selectedItem, index) => {
	                    return selectedItem
	                }}
                />
                

                </View>
            </View>

            
            <View style={[styles.RowStyle,{height:180,}]}>
              <Text style={styles.textstyle1}>Interested in</Text>
              <View style={{width:'60%'}}>
              <CheckboxList
                headerStyle={{
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#98a988',
                  text: {
                    color: 'black',
                    // fontWeight: 'bold',
                    fontFamily:'SairaSemiCondensed-Bold',
                    fontSize: 16,
                  }
                }}
                headerName="Select all"
                theme="#bc9855"
                listItems={checkList}
                onChange={({ ids, items }) => console.log('My updated list :: ', ids)}
                listItemStyle={{ borderBottomColor: '#bc9855', borderBottomWidth: 1,}}
                
                checkboxProp={{ boxType: 'square' }} 
                onLoading={() => <LoaderComponent />}
              />
              </View>
              
            </View>
            
            
            <View style={[styles.RowStyle,{marginBottom:60}]}>
              <Text style={styles.textstyle1}>Bio </Text>
              <View style={{
                Width:'60%',
                height:100,
                backgroundColor:'#98a988',
                borderRadius:15,
                overflow: 'hidden',
                paddingHorizontal:4,
                display:'flex',
                flex: 1,
                flexDirection:'row',
                // alignItems: 'center',
                // justifyContent:'center',
                
              }}>
                
                 <TextInput style={[styles.textinputstyle,{height:100,textAlign:'auto'}]} 
                 multiline={true}
                 numberOfLines={10}
                 onChangeText={(text)=>
                  // console.log(text)
                   this.setState({
                     InterestedIn:text
                   })
                 }
                 placeholder="Enter your Bio here" />
                

                </View>
            </View>
            <View style={styles.RowStyle}>
              <Text style={styles.textstyle1}></Text>
              <View style={[styles.inputView, {backgroundColor:null, borderRadius:0}]}>
                <TouchableOpacity
                style={styles.buttoninputstyle}
                >
                 <Text style={{fontFamily: 'SairaSemiCondensed-Bold',
                               fontSize: 15,
                              textDecorationLine: 'none',
                              textAlign:'center',
                             }}>Save</Text>  
                </TouchableOpacity>
                </View>
            </View>
           
            
            {/* </ScrollView> */}
            </View>
        
        
        
        
        
        {/* <View>
        {////للاخير
            this.state.profileImage? (
              <Text onPress={this.uploadProfileImage} style={[styles.skipbtn,{
                backgroundColor:'green', color:'white', borderRadius:8
              }]}>Save Profile Image</Text>
            ): null
          }
        </View> */}
      </View>
       </View>
       </KeyboardAwareScrollView > 
     );
   }
 }
 
 
 const styles = StyleSheet.create({
    MainView: {
        display:'flex',
         flex: 1,
         flexDirection: 'column',
        //  alignItems: 'center',
        //  justifyContent: 'center',
         backgroundColor: '#bfcfb2',
    },
    TopView: {
      width:'100%',
      height:60,
      flexDirection:'row',
      backgroundColor:'#bfcfb2',
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20,
      paddingHorizontal:20,     
      marginTop:10,
      // position:'absolute'

    },
    infoStyle: {
      backgroundColor:"#98a988",
              borderRadius:50,
              width:'85%',
              height:'90%',
              // fontFamily:'SairaSemiCondensed-Regular',
              justifyContent:'center'
      // alignContent:'center'
    },
    textStyle: {
      fontFamily:'SairaSemiCondensed-Regular',
      fontSize:25,
      color:'black',
      textAlign:'center'
    },
    iView: {
      width:'100%',
      height:'10%',
      backgroundColor:'#bfcfb2',
      justifyContent:'center',
      padding:10,
      // marginTop:-10
    },
    textStyle1: {
      fontFamily:'SairaSemiCondensed-Regular',
      fontSize:13,
      color:'black',
      textAlign:'center'
    },

    container: {

      // flex: 1,
      marginTop:100,
      width:'100%',
      height:'100%',
      backgroundColor:null,
      // padding:15,
      flexDirection:'column',
      justifyContent:'center',
      
      alignItems:'center'
    },
    imageView: {
      // flex:1,
      width:'50%',
      height:'20%',
      backgroundColor:null,
      justifyContent:'center',
      alignItems:'center',
      // padding:10
    } , 
    
    
    button: {
  
      width: 125,
      height: 125,
      backgroundColor: '#bc9855',
      // opacity:0.5,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 125/2,
      borderStyle: 'dashed',
      borderWidth: 0.7,
      // marginBottom:12,
      overflow:'hidden',
      margin:10
      
    },
  
    buttonText: {
  
    color: 'black',
    textAlign: 'center',
    // fontWeight: 'bold',
    opacity:0.3,
    fontSize: 15,
    fontFamily:"SairaSemiCondensed-Bold",
      // color: '#fff'
  
    },
    otherInfoStyle: {
      width:'100%',
      height:'100%',
      backgroundColor: null,
      marginBottom:10
    },

    RowStyle: {
      width:'100%',
      height: 60,
      flexDirection:'row',
      paddingHorizontal: 20,
      paddingVertical:10,
      justifyContent:'flex-start',
      alignContent:'center',
      backgroundColor:null,

    },
    textstyle1: {
      fontSize: 15,
      width: '40%',
      height:'100%',
      color: 'black',
      fontFamily: 'SairaSemiCondensed-Regular',
      marginTop:7,
      
     },
     inputView:{
    
      Width:'60%',
      height:45,
      backgroundColor:'#98a988',
      borderRadius:50,
      overflow: 'hidden',
      paddingHorizontal:4,
      display:'flex',
      flex: 3,
      flexDirection:'row',
      alignItems: 'center',
      justifyContent:'center',
    },
    textinputstyle: {
      width: '100%',
      paddingHorizontal:4,
      // opacity:1,
      // marginVertical:1,
      height: 50,
      fontFamily: 'SairaSemiCondensed-Regular',
      fontSize: 15,
      textDecorationLine: 'none',
      backgroundColor: "#98a988"
    },

    buttoninputstyle: {
      width: '100%',
      paddingHorizontal:4,
      borderRadius:50,
      overflow:'hidden',
      // opacity:1,
      // marginVertical:1,
      height: 50,
      backgroundColor: "#bc9855",
      justifyContent:'center'
    }

    

    
  
    // skipbtn: {
    //   textAlign:'center',
    //   fontSize:10,
    //   padding:10,
    //   fontWeight:'bold',
    //   textTransform:'uppercase',
    //   letterSpacing:2,
    //   opacity:0.5
    
    // }
});

 
 export default FirstTimeRegister;
 
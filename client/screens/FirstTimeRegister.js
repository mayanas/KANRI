/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component} from 'react';
 import  {launchImageLibrary} from 'react-native-image-picker';
 import LinearGradient from 'react-native-linear-gradient';
 import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
 import SelectDropdown from 'react-native-select-dropdown';
 import { Icon } from 'react-native-elements';
 import Loading from '../Components/Loading';
 

 import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
  Image, 
  Alert,
  BackHandler , 
  SafeAreaView ,
  ToastAndroid,
  PermissionsAndroid,
 } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import CheckBoxItem from '../Components/CheckBoxItem';
import { Modal } from 'react-native-paper';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Require cycle:']);
import { serverLink } from './serverLink';
//  const serverLink="http://192.168.1.110:3001";
//  const serverLink="http://172.19.15.206:3001";
const Degrees = ["Doctoral Degree","Master's Degree","Bachelor's Degree", "Diploma's Degree","Undergraduate",  "None of the above"]

const checkList = [
  { id: 1, name: 'Business and Management' },
  { id: 2, name: 'Computer Science and Information Technology'},
  { id: 3, name: 'Education' },////
  { id: 4, name: 'Environmental, Agricultural, and Physical Sciences' },////
  { id: 5, name: 'Government and Law' },
  { id: 6, name: 'Library and Information Science'},////
  { id: 7, name: 'Media and Communications'},////
  { id: 8, name: 'Medical, Healthcare, and Life Sciences' },
  { id: 9, name: 'Science and Engineering' },
  { id: 10, name: 'Security and Forensics' },
  { id: 11, name: 'Social Sciences and Humanities' },

 ];

 class FirstTimeRegister extends Component{
  constructor(props){
    super(props);
    this.state = {
      profileImage: '',
      NickName: '',
      bio: "",
      QualificationDegree:"",
      InterestedIn:[],
      isModalVisible:false,
      // checked:false,
      saved:true,
    }

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }
  UNSAFE_componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
handleBackButtonClick() {
  if(!this.state.isModalVisible)
  BackHandler.exitApp();
  else{
    this.setState({isModalVisible:false})
  }
      return true;
}
componentDidMount(){
  this.setState({
    profileImage: '',
      NickName: '',
      bio: "",
      QualificationDegree:"",
      InterestedIn:[],
      isModalVisible:false,
      // checked:false,
      saved:true,
  });
  
}
  
async saveProfileInfo(){
  this.setState({saved:false})
  const response = await fetch(serverLink+"/saveProfileInfo", {
    method: "POST",
    headers: {
     "Content-Type": "application/json"
     },
    body: JSON.stringify(
      {               
              "Email": this.props.route.params.Email,
              "NickName": this.state.NickName,
              "QualificationDegree": this.state.QualificationDegree,
              "Bio": this.state.bio,
              "ProfileImage": this.state.profileImage,
              "InterestedIn": this.state.InterestedIn,
              "Followers": 0,
              "Following": 0,
              "Projects":0,
              "Views": 0,
      }
    )
   });   
 const body = await response.json();
 if(body=="null"){
  console.log('not existed')
 }else{
  console.log("saved");
  this.setState({saved:true})
  this.props.navigation.push('login',{
    Email: this.state.Email,
    
  });
 }
 
}

onUpdate = (item) => {
  let name=item.name;
  let id=item.id;
  this.setState(previous => {
    let InterestedIn = previous.InterestedIn;
    let index = InterestedIn.map(object => object.name).indexOf(name); // check to see if the name is already stored in the array
    if (index === -1) {
      InterestedIn.push({id, name}) // if it isn't stored add it to the array
    } else {
      InterestedIn.splice(index, 1) // if it is stored then remove it from the array
    }
    return { InterestedIn }; // save the new selectedBoxes value in state
  }, () => console.log(this.state.InterestedIn)); // check that it has been saved correctly by using the callback function of state
}

   

  setToastMessage = (message) => {

    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );

  };


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
  
  requestAcessPermission = async () => {
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
        this.uploadImage();
      } else {
        console.log("Gellery permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
   }
  uploadImage = () => {

    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };

    launchImageLibrary(options, response => {

      if (response.didCancel) {
        this.setToastMessage('Cancelled image selection');
      } else if (response.errorCode == 'permission') {
        this.setToastMessage('Permission not satisfied');
      } else if (response.errorCode == 'others') {
        this.setToastMessage(response.errorMessage);
      } else if (response.assets[0].fileSize > 2097152) {
        this.showAlert(
          'Maximum image size exceeded',
          'Please choose a file under 2 MB',
        );
      } else {
        this.setState({profileImage: response.assets[0].base64});
      }

    });

  };

  
   render(){
    
     return (
      <View style={styles.MainView}>
      {!this.state.saved ? <Loading/> :
      <KeyboardAwareScrollView style={{backgroundColor: '#bfcfb2',}}>
       <SafeAreaView ew style={styles.MainView}>
         {/* <Text>{this.Email}</Text> */}
         
         <View style={styles.TopView}>
         <View style={styles.infoStyle}>
          <Text style={styles.textStyle}></Text>
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
          height:10,
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
        style={styles.button}
        onPress={() => this.requestAcessPermission()}
        underlayColor="rgba(0,0,0,0)">
          {this.state.profileImage ? <Image source={{uri: 'data:image/png;base64,' + this.state.profileImage}} 
          style={{width:'100%',height:'100%'}}/>:
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
                     bio:text
                   })
                 }
                 placeholder="Enter your Bio here" />
                

                </View>
            </View>
            
            <View style={styles.RowStyle}>
              <Text style={styles.textstyle1}>Interested In</Text>
              <View style={[styles.inputView, {backgroundColor:null, borderRadius:0}]}>
                <TouchableOpacity
                style={styles.buttoninputstyle}
                onPress={()=>{
                  this.setState({ 
                    isModalVisible:true,
                     InterestedIn:[] })
                }}
                >
                 <Text style={{fontFamily: 'SairaSemiCondensed-Bold',
                               fontSize: 15,
                              textDecorationLine: 'none',
                              textAlign:'center',
                             }} >Click here to choose</Text>  
                </TouchableOpacity>
                </View>
            </View>

            <View style={styles.RowStyle}>
              <Text style={styles.textstyle1}></Text>
              <View style={[styles.inputView, {backgroundColor:null, borderRadius:0}]}>
                <TouchableOpacity
                style={styles.buttoninputstyle}
                onPress={()=>{
                  if(this.state.NickName==="" || this.state.QualificationDegree==="" ||
                     this.state.bio==="" || this.state.profileImage==""){
                    this.showAlert("Warning", "Make sure all fields are full.")
                  }
                  else if(this.state.InterestedIn.length==0){
                    this.showAlert("Warning", "Make sure to choose at least one interest")
                  }
                  else{

                     this.saveProfileInfo() 
                    
                  }
                }
                }
                >
                 <Text style={{fontFamily: 'SairaSemiCondensed-Bold',
                               fontSize: 15,
                              textDecorationLine: 'none',
                              textAlign:'center',
                             }} >Save</Text>  
                </TouchableOpacity>
                </View>
            </View>
            
            </View>
        

      </View>
      <Modal animationType='slide'
                   visible={this.state.isModalVisible}
                   onRequestClose={()=>{this.setState({isModalVisible:false})}
                                             }
                    style={styles.ModalView}>
                 <View style={styles.cancelicon}>
                     <Icon  name='close' color="black"  size={25} onPress={()=>
                      {
                      if(this.state.InterestedIn.length===0){
                        this.showAlert("Warning","Make sure to choose at least one interest \n\nThank you")
                      }
                      this.setState({isModalVisible:false,})
                    }
                      } />
                 </View>
                 <View style={styles.modalS}>
                    
                    <SafeAreaView  style={{width:'100%', height:'100%'}}>
                    <View style={styles.TopView}>
                       <View style={styles.infoStyle}>
                    <Text></Text>
                    </View>
                    <Image 
                    source={require('../assets/logo/logo1.jpeg')}
                    style={{width:60, height:60, borderRadius:0}}
               
                    />
                 </View>
                 <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
                   <View style={{width:'100%',height:'100%', marginBottom:50, paddingHorizontal:10}}>
                   <View style={{marginBottom:15}}>
                    <Text style={[styles.textStyle1, {fontFamily:'SairaSemiCondensed-Bold', fontSize:17,margin: 20}]}>Choose the fields you are interested in:</Text>
                    {checkList.map(item => <CheckBoxItem  key={item.id} label={item.name} onUpdate={this.onUpdate.bind(this,item)}/>)}
              
                  </View>

                   </View>
                 
              </KeyboardAwareScrollView>
              </SafeAreaView >      

            </View>
   </Modal>
       </SafeAreaView >
       </KeyboardAwareScrollView > }
       </View>
     );
   }
 }
 
 
 const styles = StyleSheet.create({
  cancelicon:{
    paddingTop:1,
paddingLeft:"94%",
backgroundColor:'#bfcfb2',
  },
  modalS:{
    alignItems:"center",
  
    alignItems:"center",
    alignSelf:"center",
    display:'flex',
    backgroundColor:'#bfcfb2',
     height:"100%"},
  ModalView:{
    flex:1,
    height:"100%",
    alignContent:'center',
    alignItems:'center',
    backgroundColor:'#bfcfb2',
  }
  ,
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
    },

    

    textstyle: {
      marginTop: 15,
      marginBottom:20,
      fontFamily:"ArimaMadurai-Regular",
      fontSize: 18,
      color: 'black',
      textAlign: 'center',
      // fontWeight: 'bold',
    },
});

 
 export default FirstTimeRegister;
 
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
   View,
   Text,
   BackHandler,
   Image,
   FlatList,
   Alert,
   Modal,
   PermissionsAndroid,
 } from 'react-native';

 import Loading from '../../Components/Loading';

import LinearGradient from 'react-native-linear-gradient';
// import {Avatar} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity, TextInput  } from 'react-native-gesture-handler';
import {  Portal, Provider } from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';
import SelectDropdown from 'react-native-select-dropdown';
import  {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const serverLink="http://192.168.1.110:3001";
//  const serverLink="http://172.19.15.206:3001";
 class Profile extends Component{
  constructor(props){
    super(props);
    this.state = {
      Email:"",
      profileImage: '',
      NickName: '',
      Bio: "",
      QualificationDegree:"",
      InterestedIn:[],
      loaded:false,

      secure: true,
      focus: false,
      confirmsecure: true,
      confirmfocus: false,


      profileImageUpdated: '',
      UserNameUpdated: '',
      BioUpdated: "",
      QualificationDegreeUpdated:"",
      PhoneNumberUpdated:"",
      phonevalid:false,
      phonevalue: "",
    //   Email:"",
    // emailvalid:false,
      PasswordValueUpdated:"",
      ConfirmpasswordValue:"",
      PasswordEncoded:"",
  //  InterestedIn:"",
   // dialogVisible:false,

//modal
isRender:false,
data :this.Data,
isModalVisible:false,
phoneModal:false,
QDModal:false,
bioModal:false,
passModal:false,
inputText:"",
editItem:""
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.phoneinput = React.createRef();
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

  async componentDidMount(){
    // this.setState({loaded:false})
    await this.setState({Email : this.props.route.params.Email})
    await this.getInfo();
    this.setState({loaded:true})

  }
  async getInfo(){
    await fetch(serverLink+"/getInfo", {
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
      //  console.log(jsonresponse)
       if(jsonresponse!=="null"){
        this.setState({
          profileImage: jsonresponse.ProfileImage,
          NickName: jsonresponse.NickName,
          Bio: jsonresponse.Bio,
          QualificationDegree: jsonresponse.QualificationDegree,
          InterestedIn:jsonresponse.InterestedIn,       
       })
       }
     }).catch(error => {
       console.log(error);
     });  
  }

  onPressItem=(item,index)=>{
    if(index==0){
     this.setState({isModalVisible:true})
    }
    else if(index==1){
     this.setState({phoneModal:true})
    }
    else if(index==2){
     this.setState({QDModal:true})
    }
    else if(index==3){
     this.setState({bioModal:true})
    }
    else if(index==4){
     this.setState({passModal:true})
    }
    this.setState({inputText:item.text})
    this.setState({editItem:item.id})
     
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
  //handle function 
changeName=()=>{
  if(this.state.NickNameUpdated==""){
    this.showAlert("Empty Field","Make sure User Name field is full ");    
  }
    // console.log(this.state.UserName);
}

changeQD=()=>{
  if(this.state.QualificationDegreeUpdated==""){
    this.showAlert("Empty Field","Make sure Qualification Degree  is selected ");     
  }
  console.log(this.state.QualificationDegreeUpdated);
}
changeBio=()=>{
  if(this.state.BioUpdated==""){
    this.showAlert("Empty Field","Make sure Bio field is full ");  
  }
  console.log(this.state.BioUpdated);
}
changePass=()=>{
  if(this.state.PasswordValueUpdated==""){
    this.showAlert("Password","Make sure Password field is full");
  }
  else if(this.state.ConfirmpasswordValue==""){
    this.showAlert("Confirm Password","Make sure Confirm Password field is full");
  }
  else if(this.state.PasswordValueUpdated!=this.state.ConfirmpasswordValue){
    this.showAlert("Warning","Make sure Password and Confirmed password match");
  }
  console.log(this.state.PasswordValueUpdated);
}
changePhone=()=>{
  this.state.phonevalid= this.phoneinput.current?.isValidNumber(this.state.phonevalue); 
  if(!this.state.phonevalid)
  {
    this.showAlert("Phone Number","Make sure Phone Number field is valid");
  }
  console.log(this.state.PhoneNumber)
}
              
Data=[
    {id:0,text:"User Name",value:""},
    {id:1,text:"Phone Number",value:""},
    {id:2,text:"Qualification Degree",value:""},
    {id:3,text:"Bio",value:""},
    {id:4,text:"Password",value:""},
    ] 

    renderItem=({item,index})=>{
 
      return(
      <TouchableOpacity style={styles.item}
       onPress={()=>{
       this.onPressItem(item,index);
       }}
       >
       <Text style={styles.text}
       
       >
         {item.text}
         
       </Text>
       </TouchableOpacity>
       )
    
    
    }
   render(){
     
     return (

      <View style={styles.MainView}>
      {!this.state.loaded ? <Loading/> : 
       <View style={[styles.MainView,{width:'100%', height:'100%'}]}>
         
         <View style={styles.TopView}>
           <View style={{flexDirection:'column', justifyContent:'center',alignItems:'center', width:'40%',backgroundColor:'yellow'}}>
           <Text style={{}}>{this.state.NickName}</Text>
            <TouchableOpacity
            style={styles.button}
            underlayColor="rgba(0,0,0,0)">
            {this.state.profileImage ? <Image source={{uri: 'data:image/png;base64,' + this.state.profileImage}} 
            style={{width:'100%',height:'100%'}}/>:
            <Text style={styles.buttonText}></Text>}
           </TouchableOpacity>
           </View>

           <View style={{flexDirection:'column', justifyContent:'center',alignItems:'center', width:'60%',backgroundColor:'pink'}}>
           <Text>Maya</Text>
            <TouchableOpacity
            style={styles.button}
            underlayColor="rgba(0,0,0,0)">
            {this.state.profileImage ? <Image source={{uri: 'data:image/png;base64,' + this.state.profileImage}} 
            style={{width:'100%',height:'100%'}}/>:
            <Text style={styles.buttonText}></Text>}
        </TouchableOpacity>
           </View>
         </View>
         <LinearGradient
         colors={['#98a988', '#bfcfb2', '#bfcfb2']}
         style={{
          left:0,
          right:0,
          height:50,
          width:'100%',
          margin:0,
         }}
         ></LinearGradient>
         <KeyboardAwareScrollView 
         showsVerticalScrollIndicator={false}
         showsHorizontalScrollIndicator={false}
         >
           <TouchableOpacity 
           style={styles.buttoninputstyle}
           onPress={this.showEditModal}
           >
             <Text>Edit</Text>
           </TouchableOpacity>
         </KeyboardAwareScrollView>
         
       </View>
        }
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
        //  justifyContent: 'center',
         backgroundColor: '#bfcfb2',
    },
    TopView: {
      width:'100%',
      height:'30%',
      backgroundColor:'#98a988',
      paddingVertical:10,
      paddingHorizontal:10,
      flexDirection:'row'
      // borderBottomLeftRadius:0,
      // borderBottomRightRadius:120,
      // alignItems:'center',
      // justifyContent:'center'
    },
    ViewTextStyle: {
      marginLeft: 20,
      marginTop:20
    },
    button: {
  
      width: 125,
      height: 125,
      backgroundColor: '#bc9855',
      // opacity:0.5,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 125/2,
      // borderStyle: '',
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
    
});

 
 export default Profile;
 
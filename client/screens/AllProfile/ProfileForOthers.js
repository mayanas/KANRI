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
   ToastAndroid,
   ScrollView,
   TouchableOpacity,
   SafeAreaView
 } from 'react-native';

 import Loading from '../../Components/Loading';
//  import ProfileOwenerDetails from '../../Components/ProfileOwenerDetails';
//  import VisitorDetails from '../../Components/VisitorDetails';
//  import MainViewProfile from '../../Components/MainViewProfile';

import LinearGradient from 'react-native-linear-gradient';
// import {Avatar} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { TextInput  } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/dist/FontAwesome';


import { serverLink } from '../serverLink';

 class ProfileForOthers extends Component{
  constructor(props){
    super(props);
    this.state = {
      Email:"",
      profileImage: '',
      NickName: '',
      Bio: "",
      QualificationDegree:"",
      InterestedIn:[],
      FullName:"",
      PhoneNumber:"",
      Country:"",
      loaded:false,      

      views:1200,
      // userName:"sara_a",
      numProject:20,
      followers:1000,
      following:2000,

      GuestEmail:this.props.route.params.GuestEmail,
      followtext:"Follow",
      color:"#bc9855",
      IsFollowed:false,    
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
    // if(this.state.isModalVisible&&!this.state.Edited) {this.setState({isModalVisible:true});return true;}
    if(this.props.route.params.where==='AddPersonToProject')
    this.props.navigation.navigate('AddPersonToProject',{Email:this.props.route.params.GuestEmail});
    else this.props.navigation.navigate('Home',{Email:this.props.route.params.GuestEmail});
        return true;
  }


  async componentDidMount(){
    await this.setState({
      Email : this.props.route.params.Email,
      GuestEmail:this.props.route.params.GuestEmail,
      loaded:false
    })
    await this.getInfo();
    // await this.getProfileImage();
    await this.getUserInfo();
    if(this.state.InterestedIn.length!=0)
    this.setState({loaded:true,})
      // console.log(this.state.BioUpdated)
    
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
          followers:jsonresponse.Followers, 
          following: jsonresponse.Following,
          numProject: jsonresponse.Projects,
          views: jsonresponse.Views,
       })
       
      
       }
       
     }).catch(error => {
       console.log(error);
     });  
     
  }
  async getUserInfo(){
    await fetch(serverLink+"/getUserInfo", {
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
          FullName:jsonresponse.FirstName+' '+jsonresponse.LastName,
          Country:jsonresponse.Country,
          PhoneNumber:jsonresponse.PhoneNumber,
          Password:jsonresponse.Password,

       })
      
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


  func=({item,index})=>{

    return(
      <View style={{
        height:'90%',
        width:250,
        backgroundColor:'#bc9855',
        margin:15,
        // paddingHorizontal:15,
        borderRadius:15,
        overflow:'hidden',
        // justifyContent:'center',
        alignItems:'center'
        }}>
          {
            item.id==1? <Image source={require('../../assets/interestedIn/1.jpg')} style={styles.interestedInimage}/>:
            item.id==2? <Image source={require('../../assets/interestedIn/2.jpg')} style={styles.interestedInimage}/>:  
            item.id==3? <Image source={require('../../assets/interestedIn/3.jpg')} style={styles.interestedInimage}/>:
            item.id==4? <Image source={require('../../assets/interestedIn/4.jpg')} style={styles.interestedInimage}/>:
            item.id==5? <Image source={require('../../assets/interestedIn/5.jpg')} style={styles.interestedInimage}/>:
            item.id==6? <Image source={require('../../assets/interestedIn/6.jpg')} style={styles.interestedInimage}/>:
            item.id==7? <Image source={require('../../assets/interestedIn/7.jpg')} style={styles.interestedInimage}/>:
            item.id==8? <Image source={require('../../assets/interestedIn/8.jpg')} style={styles.interestedInimage}/>:
            item.id==9? <Image source={require('../../assets/interestedIn/9.jpg')} style={styles.interestedInimage}/>:  
            item.id==10? <Image source={require('../../assets/interestedIn/10.jpg')} style={styles.interestedInimage}/>:
            item.id==11? <Image source={require('../../assets/interestedIn/11.jpg')} style={styles.interestedInimage}/>:  
            <Image source={require('../../assets/interestedIn/11.jpg')} style={styles.interestedInimage}/>
          }
          
        <Text style={styles.textinterest}>{item.name}</Text>
      </View>

     )
  
  
  }

  
  FollowButtonPressed=()=>{
    console.log('follow')
  }
  UnFollowButtonPressed=()=>{
    console.log('unfollow')
  }
  MessegeButtonPressed=()=>{
    console.log('messege')
  }
  CallButtonPressed=()=>{
    console.log('call')
  }

  

   render(){
     
     return (




      <SafeAreaView style={styles.MainView}>
      {!this.state.loaded ? <Loading/> : 
      
       <View style={[styles.MainView,{width:'100%', height:'100%'}]}>
         
         <View style={{width: '100%'}}>
         <View style={{paddingHorizontal:10, paddingTop:10}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                // fontWeight: 'bold',
                color:"black",
                fontFamily:'SairaSemiCondensed-Bold'
              }}>
              {this.state.FullName}
            </Text>
            
          </View>
          
        </View>
        

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingTop: 10,
          marginBottom:0,
          marginTop:10,
          // marginLeft:10,
          // marginHorizontal:10
        }}>
        <View
          style={{
            alignItems: 'center',width:'30%', paddingHorizontal:10
          }}>
          <TouchableOpacity
          disabled
            style={styles.button}
            underlayColor="rgba(0,0,0,0)">
            {this.state.profileImage ? <Image source={{uri: 'data:image/png;base64,' + this.state.profileImage}} 
            style={{width:'100%',height:'100%'}}/>:
            <Text></Text>}
           </TouchableOpacity>
          
        </View>

        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', }}>
          <View style={{alignItems: 'center', paddingHorizontal:10}}>
          <Text style={{fontWeight: 'bold',color:"black", fontSize: 18}}>{this.state.numProject}</Text>
          <Text style={styles.text}>Projects</Text>
          </View>
        <View style={{alignItems: 'center', paddingHorizontal:10}}>
          <Text style={{fontWeight: 'bold', fontSize: 18,color:"black",}}>{this.state.followers}</Text>
          <Text style={styles.text}>Followers</Text>
        </View>
        <View style={{alignItems: 'center', paddingHorizontal:10}}>
          <Text style={{fontWeight: 'bold', fontSize: 18,color:"black",}}>{this.state.following}</Text>
          <Text style={styles.text}>Following</Text>
        </View>
        </View>
      
      </View>
      <View style={{width:'30%',  paddingHorizontal:20, alignItems:'center'}}>
        <Text
            style={{
              paddingVertical: 5,
              fontWeight: 'bold',
              fontSize:10,
              color:"black",
              opacity:0.6,
              marginRight:10
            }}>
          <Icon  name='eye' color="black"  size={10} />
            {this.state.views}
          </Text> 
          
      </View>
     <View style={{width:'100%', height:150,paddingHorizontal: 10,}}>
     <Text
            style={styles.text}>
            {this.state.NickName}
          </Text>
          <Text style={styles.text}>Qualification Degree: {this.state.QualificationDegree}</Text>
          
     <ScrollView
          // showsVerticalScrollIndicator={false}
          // showsHorizontalScrollIndicator={false}
          vertical ={true}
          style={{
            paddingVertical: 0,
            
            width:'100%', height:100,
          }}>
      {/* <View style={{}}> */}
        <Text
          style={styles.textBio}>
       {this.state.Bio}
        </Text>
                
      {/* </View> */}
      </ScrollView>

     </View>
    
     <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingVertical: 5,
        }}>
        <TouchableOpacity
           onPress={() =>{
            if(this.state.color=="#98a988"){
              this.setState({
                color:"#bc9855",
                followtext:"Follow"
              })
              this.UnFollowButtonPressed()
            }
              else{
                this.setState({
                  color:"#98a988",
                  followtext:"Following"
                });
                this.FollowButtonPressed()
              }
            }
                        
           }
          style={{
            width: '33%',
            paddingHorizontal:1,
          }}>
          <View
            style={{   height: 35,
              borderRadius: 5,
              borderColor: 'black',
              backgroundColor:this.state.color,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',}}>
            <Text
              style={styles.text}>
            {this.state.followtext}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>this.MessegeButtonPressed()}
          style={{
            width: '34%',
            paddingHorizontal:1,
          }}>
          <View
            style={styles.sview}>
            <Text
              style={styles.text}>
             Message
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>this.CallButtonPressed()}
          style={{
            width: '33%',
            paddingHorizontal:1,
          }}>
          <View
            style={styles.sview}>
            <Text
            style={styles.text}
             >
         Call
            </Text>
          </View>
        </TouchableOpacity>
      </View>
     
   
   {/* {console.log(ProfileOwenerDetails.props)} */}
            
    </View>
    <LinearGradient
         colors={['#bfcfb2', '#98a988', '#bfcfb2']}
         style={{
          left:0,
          right:0,
          height:10,
          width:'100%',
          marginTop:5,
         }}
         ></LinearGradient> 
         
    
         </View>

<SafeAreaView style={{height:'100%',flex:1}}>
    <ScrollView vertical showsVerticalScrollIndicator={false} style={{height:'100%'}}>
         {/* InterestedIn Cards */}
         <View style={{width:'100%', height:320, }}>
           <Text style={[styles.text, {paddingHorizontal:20}]}>Interested In</Text>
           <FlatList

           scrollEnabled={true}
           showsHorizontalScrollIndicator={false}
                   horizontal
                   width={'100%'}
                   height={'100%'}
                   keyExtractor={(item)=>item.id.toString()}
                   data={this.state.InterestedIn}
                   renderItem={this.func}
                   
                   />
            <LinearGradient
             colors={['#bfcfb2', '#98a988', '#bfcfb2']}
             style={{
             left:0,
             right:0,
             height:10,
             width:'100%',
             marginTop:5,
             }}
         ></LinearGradient> 
         </View>

         <View style={{width:'100%', height:320, }}>
           <Text style={[styles.text, {paddingHorizontal:20}]}>Interested In</Text>
           <FlatList

           showsHorizontalScrollIndicator={false}
                   horizontal
                   width={'100%'}
                   height={'100%'}
                   keyExtractor={(item)=>item.id.toString()}
                   data={this.state.InterestedIn}
                   renderItem={this.func}
                   
                   />
            <LinearGradient
             colors={['#bfcfb2', '#98a988', '#bfcfb2']}
             style={{
             left:0,
             right:0,
             height:10,
             width:'100%',
             marginTop:5,
             }}
         ></LinearGradient> 
         </View>

         <View style={{width:'100%', height:320, }}>
           <Text style={[styles.text, {paddingHorizontal:20}]}>Interested In</Text>
           <FlatList
          
           showsHorizontalScrollIndicator={false}
                   horizontal
                   width={'100%'}
                   height={'100%'}
                   keyExtractor={(item)=>item.id.toString()}
                   data={this.state.InterestedIn}
                   renderItem={this.func}
                   
                   />
            <LinearGradient
             colors={['#bfcfb2', '#98a988', '#bfcfb2']}
             style={{
             left:0,
             right:0,
             height:10,
             width:'100%',
             marginTop:5,
             }}
         ></LinearGradient> 
         </View>

         </ScrollView>
         </SafeAreaView>

       </View>
       
        }
        </SafeAreaView>
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


    button: {
  
      width: 120,
      height: 120,
      backgroundColor: '#bc9855',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 125/2,
      borderWidth: 0.7,
      overflow:'hidden',
      
    },
    
    text:{  
        // fontWeight: 'bold',
        fontSize: 14,
        letterSpacing: 1,
        opacity: 0.8,
        color:"black",
        fontFamily:'SairaSemiCondensed-Bold'
        
      },
    
    textBio: {
      fontSize: 14,
      letterSpacing: 0.5,
      // opacity: 0.8,
      color:"black",
      fontFamily:'SairaSemiCondensed-Regular'
    },
    interestedInimage:{
      width:'100%',
      height:'70%'
    },
    textinterest:{
      fontSize: 14,
      // opacity: 0.8,
      color:"black",
      fontFamily:'SairaSemiCondensed-Regular',
      marginTop:10
      
    },

    sview:{             
      height: 35,
      borderRadius: 5,
      borderColor: 'black',
      backgroundColor:"#bc9855",
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },



});

 
 export default ProfileForOthers;
 
import React, {Component} from 'react';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Icon from "react-native-vector-icons/MaterialIcons";


import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  BackHandler,
  FlatList,

} from 'react-native';
import moment from "moment";

import { serverLink } from '../../serverLink';
import Loading from '../../../Components/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modal } from 'react-native-paper';

class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Email:this.props.route.params.Email,
      ProjectID:this.props.route.params.ProjectID,

      ProjectName:"",
      CustomerEmail: "",
      ProjectMission:"",
      ProjectDescription: "",
      ProjectBudget: "",
      ProjectDeadLine: "",
      // Details:[],
      loaded:false,

      MissionUpdated:"",
      DescriptionUpdated:"",
      BudgetUpdated:"",
      DeadLineUpdated:"",

      MissionUpdateModal:false,
      DescriptionUpdatedModal:false,
      DescriptionShowModal:false,
      BudgetUpdatedModal:false,
      DeadLineUpdatedModal:false,

      TeamMembers:[],
      MissionSaved:true,
      DescriptionSaved:true,
      BudgetSaved:true,
      DeadLineSaved:true,
      TeamMembersSaved:true,
      TasksSaved:true,
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

  }

  
  UNSAFE_componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.navigate('Profile',{Email:this.props.route.params.Email});
        return true;
  }

  getProjectInfo=async()=>{
      
    await fetch(serverLink+"/getProjectInfo", {
        method: "POST",
        headers: {
         "Content-Type": "application/json"
         },
        body: JSON.stringify(
          {               
            "Email": this.state.Email,
            "ProjectID": this.state.ProjectID,
          }
        )
       }).then(resp => {
         return resp.json();
       }).then(jsonresponse => {
         console.log(jsonresponse.ProjectName)
         if(jsonresponse!=="null"){
          this.setState({
            ProjectName:jsonresponse.ProjectName,
            CustomerEmail: jsonresponse.CustomerEmail,
            ProjectMission:jsonresponse.ProjectMission,
            ProjectDescription: jsonresponse.ProjectDescription,
            ProjectBudget: jsonresponse.ProjectBudget,
            ProjectDeadLine: jsonresponse.DeadLine,

         }) 
        //  console.log(jsonresponse)
        
         }
         
       }).catch(error => {
         console.log(error);
       }); 
  }
  getTeamMembers=async()=>{
      
    await fetch(serverLink+"/getTeamMembers", {
        method: "POST",
        headers: {
         "Content-Type": "application/json"
         },
        body: JSON.stringify(
          {               
            "ProjectID": this.state.ProjectID,
          }
        )
       }).then(resp => {
         return resp.json();
       }).then(jsonresponse => {
         console.log(jsonresponse.ProjectName)
         if(jsonresponse!=="null"){
          this.setState({
            ProjectName:jsonresponse.ProjectName,
            CustomerEmail: jsonresponse.CustomerEmail,
            ProjectMission:jsonresponse.ProjectMission,
            ProjectDescription: jsonresponse.ProjectDescription,
            ProjectBudget: jsonresponse.ProjectBudget,
            ProjectDeadLine: jsonresponse.DeadLine,

         }) 
        
         }
         
       }).catch(error => {
         console.log(error);
       }); 
  }
  async componentDidMount(){
     this.setState({
      Email : this.props.route.params.Email,
      ProjectID:this.props.route.params.ProjectID,
      ProjectName:"",
      CustomerEmail: "",
      ProjectMission:"",
      ProjectDescription: "",
      ProjectBudget: "",
      ProjectDeadLine: "",
      // Details:[],
      loaded:false,

      MissionUpdated:"",
      DescriptionUpdated:"",
      BudgetUpdated:"",
      DeadLineUpdated:"",

      MissionUpdateModal:false,
      DescriptionUpdatedModal:false,
      DescriptionShowModal:false,
      BudgetUpdatedModal:false,
      DeadLineUpdatedModal:false,
      TeamMembers:[],

      MissionSaved:true,
      DescriptionSaved:true,
      BudgetSaved:true,
      DeadLineSaved:true,
      TeamMembersSaved:true,
      TasksSaved:true,

      datetimevisible:false,
    })

    await this.getProjectInfo();
    this.setState({loaded:true})
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

UpdateMission= async()=>{
  this.setState({ProjectMission:this.state.MissionUpdated})
  await fetch(serverLink+'/UpdateProjectMission',{
    method: "POST",
    headers: {
     "Content-Type": "application/json"
    },
    body: JSON.stringify(
    {        
      "Email": this.state.Email,   
      "ProjectID": this.state.ProjectID,
      "Mission":this.state.MissionUpdated,
    }
    )
    }).then(response=>{return response.json()}).then(resp=>{
      console.log(resp);
    
  })
}
UpdateDescription= async()=>{
  this.setState({ProjectDescription:this.state.DescriptionUpdated})
  await fetch(serverLink+'/UpdateProjectDescription',{
    method: "POST",
    headers: {
     "Content-Type": "application/json"
    },
    body: JSON.stringify(
    {        
      "Email": this.state.Email,   
      "ProjectID": this.state.ProjectID,
      "Description":this.state.DescriptionUpdated,
    }
    )
    }).then(response=>{return response.json()}).then(resp=>{
      console.log(resp);
    
  })
}
UpdateBudget= async()=>{
  this.setState({ProjectBudget:this.state.BudgetUpdated})
  await fetch(serverLink+'/UpdateProjectBudget',{
    method: "POST",
    headers: {
     "Content-Type": "application/json"
    },
    body: JSON.stringify(
    {        
      "Email": this.state.Email,   
      "ProjectID": this.state.ProjectID,
      "Budget":this.state.BudgetUpdated,
    }
    )
    }).then(response=>{return response.json()}).then(resp=>{
      console.log(resp);
    
  })
}
UpdateDeadLine= async()=>{
  this.setState({ProjectDeadLine:this.state.DeadLineUpdated})
  await fetch(serverLink+'/UpdateProjectDeadLine',{
    method: "POST",
    headers: {
     "Content-Type": "application/json"
    },
    body: JSON.stringify(
    {        
      "Email": this.state.Email,   
      "ProjectID": this.state.ProjectID,
      "DeadLine":this.state.DeadLineUpdated,
    }
    )
    }).then(response=>{return response.json()}).then(resp=>{
      console.log(resp);
    
  })
}

handlePicker = (date) => {
  const dateFormat = moment(date).format("YYYY-MM-DD");
 this.setState({
   DeadLineUpdated:dateFormat,
  //  time:time,
   datetimevisible:false,
 })
 console.log(this.state.DeadLineUpdated)
}
showPicker = () => {
  this.setState({
    datetimevisible:true,
  })
}
hidePicker = () => {
 this.setState({
   datetimevisible:false,
 })
}

EditMission=async()=>{
  this.setState({MissionUpdateModal:true});
}
showDescription=()=>{
  this.setState({DescriptionShowModal:true});
}
EditDescription=async()=>{
  this.setState({DescriptionUpdated:this.state.ProjectDescription,DescriptionUpdatedModal:true});
}
EditBudget=async()=>{
  this.setState({BudgetUpdatedModal:true});
}
EditDeadLine=async()=>{
  this.setState({DeadLineUpdatedModal:true});
}
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
          item.id==1? <Image source={require('../../../assets/interestedIn/1.jpg')} style={styles.interestedInimage}/>:
          item.id==2? <Image source={require('../../../assets/interestedIn/2.jpg')} style={styles.interestedInimage}/>:  
          item.id==3? <Image source={require('../../../assets/interestedIn/3.jpg')} style={styles.interestedInimage}/>:
          item.id==4? <Image source={require('../../../assets/interestedIn/4.jpg')} style={styles.interestedInimage}/>:
          item.id==5? <Image source={require('../../../assets/interestedIn/5.jpg')} style={styles.interestedInimage}/>:
          item.id==6? <Image source={require('../../../assets/interestedIn/6.jpg')} style={styles.interestedInimage}/>:
          item.id==7? <Image source={require('../../../assets/interestedIn/7.jpg')} style={styles.interestedInimage}/>:
          item.id==8? <Image source={require('../../../assets/interestedIn/8.jpg')} style={styles.interestedInimage}/>:
          item.id==9? <Image source={require('../../../assets/interestedIn/9.jpg')} style={styles.interestedInimage}/>:  
          item.id==10? <Image source={require('../../../assets/interestedIn/10.jpg')} style={styles.interestedInimage}/>:
          item.id==11? <Image source={require('../../../assets/interestedIn/11.jpg')} style={styles.interestedInimage}/>:  
          <Image source={require('../../../assets/interestedIn/11.jpg')} style={styles.interestedInimage}/>
        }
        
      <Text style={styles.textinterest}>{item.name}</Text>
    </View>

   )


}

render() {
    return (
      <SafeAreaView style={styles.MainView}>
      {!this.state.loaded? <Loading/>:<KeyboardAwareScrollView style={[styles.MainView,]}>

      <View style={{flexDirection:'row',marginTop:10}}>
          <View style={{width:'20%', alignItems:'flex-start'}}>
          <Image 
               source={require('../../../assets/logo/logo1.jpeg')}
               style={{width:60, height:60, borderRadius:0}}
               
               />
          </View>
          <View style={{width:'60%',alignItems:'center',justifyContent:'center'}}>
          <Text style={styles.textAddress}>{this.state.ProjectName}</Text>
          </View>
          <View style={{width:'20%',alignItems:'center',justifyContent:'center'}}>
          
          </View>
          
          </View>

        <View style={{width:'100%',height:'100%'}}>
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
{/* Mission */}
        <View style={{width:'100%', }}>
          <View style={{flexDirection:'row'}}>
           <View style={{width:'20%'}}></View>
           <View style={{width:'60%', justifyContent:'center'}}>
           <Text style={[styles.text,{textAlign:'center',fontSize:16, }]}>Mission</Text>
           
            </View>
           <View style={{width:'20%', justifyContent:'flex-start', alignItems:'flex-end', paddingRight:10}}>
           <Icon
              name="edit"
              style={styles.trailing}
              size={20}
              color="#666666"
              onPress={() =>{this.EditMission()}}
            /></View>
            </View>
           <Text style={styles.textinterest}>{this.state.ProjectMission}</Text>
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

{/* Desc */}
         <View style={{width:'100%' }}>
         <View style={{flexDirection:'row'}}>
         <View style={{width:'20%', flexDirection:'row',
           justifyContent:'flex-start', alignItems:'flex-end',paddingLeft:10 }}>
           <Icon
              name="open-in-full"
              style={styles.trailing}
              size={20}
              color="#666666"
              onPress={() =>{this.showDescription()}}
            />
            
            </View>
           <View style={{width:'60%', justifyContent:'center'}}>
           <Text style={[styles.text,{textAlign:'center',fontSize:16, }]}>Description</Text>
           
            </View>
           <View style={{width:'20%', flexDirection:'row',
           justifyContent:'flex-end', alignItems:'flex-end',paddingRight:10 }}>
           <Icon
              name="edit"
              style={styles.trailing}
              size={20}
              color="#666666"
              onPress={() =>{this.EditDescription()}}
            />
            
            </View>
            </View>
           {/* <Text style={styles.textinterest}>{this.state.ProjectMission}</Text> */}
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
{/* Budget */}
         <View style={{width:'100%', }}>
          <View style={{flexDirection:'row'}}>
           <View style={{width:'20%'}}></View>
           <View style={{width:'60%', justifyContent:'center'}}>
           <Text style={[styles.text,{textAlign:'center',fontSize:16, }]}>Budget</Text>
           
            </View>
           <View style={{width:'20%', justifyContent:'flex-start', alignItems:'flex-end', paddingRight:10}}>
             <Icon
              name="edit"
              style={styles.trailing}
              size={20}
              color="#666666"
              onPress={() =>{this.EditBudget()}}
            /></View>
            </View>
           <Text style={[styles.textinterest,{textAlign:'center'}]}>{this.state.ProjectBudget} $</Text>
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
{/* deadline */}
         <View style={{width:'100%', }}>
          <View style={{flexDirection:'row'}}>
           <View style={{width:'20%'}}></View>
           <View style={{width:'60%', justifyContent:'center'}}>
           <Text style={[styles.text,{textAlign:'center',fontSize:16, }]}>DeadLine</Text>
           
            </View>
           <View style={{width:'20%', justifyContent:'flex-start', alignItems:'flex-end', paddingRight:10}}>
             <Icon
              name="edit"
              style={styles.trailing}
              size={20}
              color="#666666"
              onPress={() =>{this.EditDeadLine()}}
            /></View>
            </View>
           <Text style={[styles.textinterest,{textAlign:'center'}]}>{this.state.ProjectDeadLine} </Text>
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
{/* team members */}
         <View style={{width:'100%', }}>
          <View style={{flexDirection:'row'}}>
           <View style={{width:'20%'}}></View>
           <View style={{width:'60%', justifyContent:'center'}}>
           <Text style={[styles.text,{textAlign:'center',fontSize:16, }]}>Team Members</Text>
           
            </View>
           <View style={{width:'20%', justifyContent:'flex-start', alignItems:'flex-end', paddingRight:10}}>
             <Icon
              name="edit"
              style={styles.trailing}
              size={20}
              color="#666666"
              onPress={() =>{this.props.navigation.navigate('AddPersonToProject',{Email:this.state.Email, ProjectID:this.state.ProjectID})}}
            /></View>
            </View>
            <View style={{width:'100%', height:250}}>
            <FlatList
          
          showsHorizontalScrollIndicator={false}
                  horizontal
                  width={'100%'}
                  height={'100%'}
                  keyExtractor={(item)=>item.id.toString()}
                  data={this.state.TeamMembers}
                  renderItem={this.func}
                  
                  />
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


{/* Tasks */}
         <View style={{width:'100%', }}>
          <View style={{flexDirection:'row'}}>
           <View style={{width:'20%'}}></View>
           <View style={{width:'60%', justifyContent:'center'}}>
           <Text style={[styles.text,{textAlign:'center',fontSize:16, }]}>Tasks</Text>
           
            </View>
           <View style={{width:'20%', justifyContent:'flex-start', alignItems:'flex-end', paddingRight:10}}>
             <Icon
              name="edit"
              style={styles.trailing}
              size={20}
              color="#666666"
              onPress={() =>{this.EditMission()}}
            /></View>
            </View>
            <View style={{width:'100%', height:250}}>
            <FlatList
          
          showsHorizontalScrollIndicator={false}
                  horizontal
                  width={'100%'}
                  height={'100%'}
                  keyExtractor={(item)=>item.id.toString()}
                  data={this.state.TeamMembers}
                  renderItem={this.func}
                  
                  />
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

        </View>
          {/*Mission Modal*/}
  <Modal animationType='slide'
   visible={this.state.MissionUpdateModal}
   onRequestClose={()=>{this.setState({MissionUpdateModal:false})}
  }
   style={styles.ModalView}>
     <View style={styles.cancelicon}>
<Icon  name='close' color="black"  size={25} onPress={()=>{
  this.setState({MissionUpdateModal:false})
  }} />
</View>
  {this.state.MissionSaved?<View style={styles.modalS}>
  <View style={{flexDirection:'row',marginBottom:10}}>
          <View style={{width:'20%', alignItems:'flex-start'}}>
          
          </View>
          <View style={{width:'60%',alignItems:'center',justifyContent:'center'}}>
          <Text style={styles.textAddress}>Edit Mission</Text>
          </View>
          <View style={{width:'20%'}}>
          <Text></Text>
          </View>
          
  </View>
  

    <KeyboardAwareScrollView style={{}}>
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
    <View style={[styles.RegisterRows,{height:'100%',flexDirection:'column'}]}>
                  <Text style={styles.textstyle1}>
                   Old value
                  </Text>
                  {/* <View style={{display:'flex', flex:2,flexDirection:'column', width:180}}> */}
                  <View style={[styles.inputView,{height:200,width:'100%'}]}>
                  
                 <Text>
                   {this.state.ProjectMission}
                 </Text>
                                     
                </View>
                  {/* </View>     */}
                  
                           
                </View> 

                <View style={[styles.RegisterRows,{height:'100%',flexDirection:'column'}]}>
                  <Text style={styles.textstyle1}>
                   New Value
                  </Text>
                  {/* <View style={{display:'flex', flex:2,flexDirection:'row', width:180}}> */}
                  <View style={[styles.inputView,{height:200,width:'100%'}]}>
                  
                  <TextInput
                 multiline={true}
                 numberOfLines={5}
                 onChangeText={(text)=>this.setState({MissionUpdated:text})}
                 style=
                      {[styles.textinputstyle,{height:'100%',width:'100%', textAlign:'center'}]}
                    placeholder={'New Project Mission'} 
                    // value={this.state.MissionUpdated}
                    />
                                     
                </View>
                  {/* </View>              */}
                </View> 

                <View style={[styles.RegisterRows]}>
                  <TouchableOpacity style={{width:'100%',height:50, backgroundColor:'#bc9855',
                    marginTop:10, borderRadius:15, justifyContent:'center',alignItems:'center'}}
                    
                    onPress={async()=>{
                      if(this.state.MissionUpdated===''){
                        this.showAlert('Mission','Nothing Updated')
                        this.setState({MissionUpdateModal:false})
                      }
                      else{
                        this.setState({MissionSaved:false})
                        await this.UpdateMission();
                        this.showAlert('Mission','Mission Updated')
                        this.setState({MissionUpdateModal:false,MissionSaved:true})
                      }
                      
                    }}
                    >
                    <Text style={[styles.text,{fontSize:15}]}>Save</Text>
                  </TouchableOpacity>
                </View> 
                </KeyboardAwareScrollView>
  </View>:<Loading/>}
</Modal>

{/* show desc */}
<Modal animationType='slide'
   visible={this.state.DescriptionShowModal}
   onRequestClose={()=>{this.setState({DescriptionShowModal:false})}
  }
   style={styles.ModalView}>
     <View style={styles.cancelicon}>
<Icon  name='close' color="black"  size={25} onPress={()=>{
  this.setState({DescriptionShowModal:false})
  }} />
</View>
  <View style={styles.modalS}>
  <View style={{flexDirection:'row',marginBottom:10}}>
          <View style={{width:'20%', alignItems:'flex-start'}}>
          
          </View>
          <View style={{width:'60%',alignItems:'center',justifyContent:'center'}}>
          <Text style={styles.textAddress}>Description</Text>
          </View>
          <View style={{width:'20%'}}>
          <Text></Text>
          </View>
          
  </View>

    <KeyboardAwareScrollView >
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
    <View style={[{height:'100%',flexDirection:'column', width:'100%', marginTop:20}]}>
                  <Text style={{fontFamily:'SairaSemiCondensed-Regular', fontSize:14, color:'black'}}>
                   {this.state.ProjectDescription}
                  </Text>
    </View>
                </KeyboardAwareScrollView>
  </View>
</Modal>

{/*Edit Desc Modal*/}
<Modal animationType='slide'
   visible={this.state.DescriptionUpdatedModal}
   onRequestClose={()=>{this.setState({DescriptionUpdatedModal:false})}
  }
   style={styles.ModalView}>
     <View style={styles.cancelicon}>
<Icon  name='close' color="black"  size={25} onPress={()=>{
  this.setState({DescriptionUpdatedModal:false})
  }} />
</View>
  {this.state.DescriptionSaved?<View style={styles.modalS}>
  <View style={{flexDirection:'row',marginBottom:10}}>
          <View style={{width:'20%', alignItems:'flex-start'}}>
          
          </View>
          <View style={{width:'60%',alignItems:'center',justifyContent:'center'}}>
          <Text style={styles.textAddress}>Edit Description</Text>
          </View>
          <View style={{width:'20%'}}>
          <Text></Text>
          </View>
          
  </View>

    <KeyboardAwareScrollView style={{}}>
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
                <View style={{height:'80%',flexDirection:'column', width:'100%',marginTop:20}}>
                  
                  <View style={[styles.inputView,{height:550,width:'100%'}]}>
                  
                  <TextInput
                  scrollEnabled
                 multiline={true}
                 numberOfLines={10}
                 onChangeText={(text)=>this.setState({DescriptionUpdated:text})}
                 style=
                      {[styles.textinputstyle,{height:'100%',width:'100%',}]}
                    // placeholder={'New Project Mission'} 
                    value={this.state.DescriptionUpdated}
                    />
                                     
                </View>
                  {/* </View>              */}
               

                <View style={[{height:'30%',width:'100%',marginTop:15}]}>
                  <TouchableOpacity style={{width:'100%',height:50, backgroundColor:'#bc9855',
                    marginTop:10, borderRadius:15, justifyContent:'center',alignItems:'center'}}
                    
                    onPress={async()=>{
                      if(this.state.DescriptionUpdated===this.state.ProjectDescription){
                        this.showAlert('Description','Nothing Updated')
                        this.setState({DescriptionUpdatedModal:false})
                      }
                      else{
                        this.setState({DescriptionSaved:false})
                        await this.UpdateDescription();
                        this.showAlert('Description','Description Updated')
                        this.setState({DescriptionUpdatedModal:false,DescriptionSaved:true})
                      }
                      
                    }}
                    >
                    <Text style={[styles.text,{fontSize:15}]}>Save</Text>
                  </TouchableOpacity>
                  </View> 
                </View> 
                </KeyboardAwareScrollView>
  </View>:<Loading/>}
</Modal>

{/*Budget Modal*/}
<Modal animationType='slide'
   visible={this.state.BudgetUpdatedModal}
   onRequestClose={()=>{this.setState({BudgetUpdatedModal:false})}
  }
   style={styles.ModalView}>
     <View style={styles.cancelicon}>
<Icon  name='close' color="black"  size={25} onPress={()=>{
  this.setState({BudgetUpdatedModal:false})
  }} />
</View>
  {this.state.BudgetSaved?<View style={styles.modalS}>
  <View style={{flexDirection:'row',marginBottom:10}}>
          <View style={{width:'20%', alignItems:'flex-start'}}>
          
          </View>
          <View style={{width:'60%',alignItems:'center',justifyContent:'center'}}>
          <Text style={styles.textAddress}>Edit Budget</Text>
          </View>
          <View style={{width:'20%'}}>
          <Text></Text>
          </View>
          
  </View>

    <KeyboardAwareScrollView style={{}}>
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
    <View style={[styles.RegisterRows,{height:'100%',flexDirection:'row'}]}>
                  <Text style={styles.textstyle1}>
                   Old value
                  </Text>
                  {/* <View style={{display:'flex', flex:2,flexDirection:'column', width:180}}> */}
                  <View style={[styles.inputView,]}>
                  
                 <Text>
                   {this.state.ProjectBudget}
                 </Text>
                                     
                </View>
                  {/* </View>     */}
                  
                           
                </View> 

                <View style={[styles.RegisterRows,{height:'100%',flexDirection:'row'}]}>
                  <Text style={styles.textstyle1}>
                   New Value
                  </Text>
                  {/* <View style={{display:'flex', flex:2,flexDirection:'row', width:180}}> */}
                  <View style={[styles.inputView]}>
                  <TextInput
                 keyboardType='number-pad'
                 onChangeText={(text)=>this.setState({BudgetUpdated:text})}
                 style=
                      {[styles.textinputstyle]}
                    placeholder={'New Project Budget'} 
                    // value={this.state.Budget}
                    />
                  
                                     
                </View>
                  {/* </View>              */}
                </View> 

                <View style={[styles.RegisterRows,{height:'100%',flexDirection:'row'}]}>
                  <Text style={styles.textstyle1}></Text>
                  <TouchableOpacity style={[styles.inputView,{
                    width:'100%', backgroundColor:'#bc9855',
                    borderRadius:15, justifyContent:'center',alignItems:'center'}]}
                    
                    onPress={async()=>{
                      if(this.state.BudgetUpdated===''){
                        this.showAlert('Budget','Nothing Updated')
                        this.setState({BudgetSaved:false})
                      }
                      else{
                        this.setState({BudgetSaved:false})
                        await this.UpdateBudget();
                        this.showAlert('Budget','Budget Updated')
                        this.setState({BudgetUpdatedModal:false,BudgetSaved:true})
                      }
                      
                    }}
                    >
                    <Text style={[styles.text,{fontSize:15}]}>Save</Text>
                  </TouchableOpacity>
                </View> 
                </KeyboardAwareScrollView>
  </View>:<Loading/>}
</Modal>

{/*DeadLine Modal*/}
<Modal animationType='slide'
   visible={this.state.DeadLineUpdatedModal}
   onRequestClose={()=>{this.setState({DeadLineUpdatedModal:false})}
  }
   style={styles.ModalView}>
     <View style={styles.cancelicon}>
<Icon  name='close' color="black"  size={25} onPress={()=>{
  this.setState({DeadLineUpdatedModal:false})
  }} />
</View>
  {this.state.DeadLineSaved?<View style={styles.modalS}>
  <View style={{flexDirection:'row',marginBottom:10}}>
          <View style={{width:'20%', alignItems:'flex-start'}}>
          
          </View>
          <View style={{width:'60%',alignItems:'center',justifyContent:'center'}}>
          <Text style={styles.textAddress}>Edit DeadLine</Text>
          </View>
          <View style={{width:'20%'}}>
          <Text></Text>
          </View>
          
  </View>

    <KeyboardAwareScrollView style={{}}>
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
    <View style={[styles.RegisterRows,{height:'100%',flexDirection:'row'}]}>
                  <Text style={styles.textstyle1}>
                   Old value
                  </Text>
                  {/* <View style={{display:'flex', flex:2,flexDirection:'column', width:180}}> */}
                  <View style={[styles.inputView,]}>
                  
                 <Text>
                   {this.state.ProjectDeadLine}
                 </Text>
                                     
                </View>
                  {/* </View>     */}
                  
                           
                </View> 

                <View style={[styles.RegisterRows,{height:'100%',flexDirection:'row'}]}>
                  <Text style={styles.textstyle1}>
                   New Value
                  </Text>
                  {/* <View style={{display:'flex', flex:2,flexDirection:'row', width:180}}> */}
                  <View style={[styles.inputView]}>
                  
                  < TouchableOpacity style={styles.inputView}
                  onPress={this.showPicker}
                  >
                     <Text>
                    
                    {this.state.DeadLineUpdated !== ""
                            ? moment(this.state.DeadLineUpdated).calendar()
                            : "Click to choose Date"}
                     </Text>
                     </TouchableOpacity>
                  
                
                <DateTimePickerModal
                    isVisible={this.state.datetimevisible}
                     onConfirm={this.handlePicker}
                    onCancel={this.hidePicker}
                    mode="date"
                    is24Hour={false}
                />
                                     
                </View>
                  {/* </View>              */}
                </View> 

                <View style={[styles.RegisterRows,{height:'100%',flexDirection:'row'}]}>
                  <Text style={styles.textstyle1}></Text>
                  <TouchableOpacity style={[styles.inputView,{
                    width:'100%', backgroundColor:'#bc9855',
                    borderRadius:15, justifyContent:'center',alignItems:'center'}]}
                    
                    onPress={async()=>{
                      if(this.state.DeadLineUpdated===''){
                        this.showAlert('DeadLine','Nothing Updated')
                        this.setState({DeadLineUpdatedModal:false})
                      }
                      else{
                        this.setState({DeadLineSaved:false})
                        await this.UpdateDeadLine();
                        this.showAlert('DeadLine','DeadLine Updated')
                        this.setState({DeadLineUpdatedModal:false,DeadLineSaved:true})
                      }
                      
                    }}
                    >
                    <Text style={[styles.text,{fontSize:15}]}>Save</Text>
                  </TouchableOpacity>
                </View> 
                </KeyboardAwareScrollView>
  </View>:<Loading/>}
</Modal>

      </KeyboardAwareScrollView>}
      </SafeAreaView>
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
text:{  
  // fontWeight: 'bold',
  fontSize: 14,
  letterSpacing: 1,
  opacity: 0.8,
  color:"black",
  fontFamily:'SairaSemiCondensed-Bold'
  
},
textAddress:{
  fontSize: 20,
  letterSpacing: 1,
  opacity: 0.8,
  color:"black",
  fontFamily:'SairaSemiCondensed-Bold'
},
textinterest:{
  fontSize: 14,
  // opacity: 0.8,
  color:"black",
  fontFamily:'SairaSemiCondensed-Regular',
  marginTop:10,
  paddingHorizontal:10
  
},
interestedInimage:{
  width:'100%',
  height:'80%'
},

cancelicon:{
  paddingTop:1,
paddingLeft:"94%",
backgroundColor:'#bfcfb2',
},

modalS:{
  alignItems:"center",
  alignSelf:"center",
  display:'flex',
  backgroundColor:'#bfcfb2',
   height:"100%",
   width:'100%',
  //  justifyContent:'center'
  padding:20
  },
  ModalView:{
    flex:1,
    height:'100%',
    width:'100%',
    alignContent:'center',
    alignItems:'center',
    backgroundColor:'#bfcfb2',
  },
  RegisterRows: {
    display:'flex',
    height:40,
    flex: 2,
    flexDirection:'row',
    marginLeft: 20,
    marginVertical: 15,
    alignItems: 'center',
    width: 350,
  },

   inputView:{
    Width:'70%',
    height:40,
    backgroundColor:'#98a988',
    borderRadius:15,
    overflow: 'hidden',
    paddingHorizontal:4,
    display:'flex',
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center'

  },
  textinputstyle: {
    width: 180,
    paddingHorizontal:4,
    height: 47,
    fontFamily: 'SairaSemiCondensed-Regular',
    fontSize: 15,
    textDecorationLine: 'none',
    backgroundColor: "#98a988"
  },
  textstyle1: {

    width:'30%',
    height:40, 
    fontFamily:'SairaSemiCondensed-Regular',
    fontSize:15, 
    color:'black',
    justifyContent:'center',
    alignItems:'center'
   },

});

export default Project;
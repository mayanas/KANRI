import React, {Component} from 'react';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import 'react-native-gesture-handler';
// import Form from 'react-native-form';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  BackHandler

} from 'react-native';
import moment from "moment";
// import Icon from 'react-native-vector-icons/dist/FontAwesome';//filter-variant-plus
// import { Button } from 'react-native-elements';

import { serverLink } from '../../serverLink';
import Loading from '../../../Components/Loading';

class AddProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Email:this.props.route.params.Email,
      isValid: false,
      errors: false,
      datetimevisible:false,
      date:"",
      ProjectName:"",
      ProjectMission:"",
      ProjectDescription:"",
      CustomerEmail:"",
      Budget:"",
      savedInfo:true,
      emailvalid:true,
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
    // if(this.state.isModalVisible&&!this.state.Edited) {this.setState({isModalVisible:true});return true;}
    this.props.navigation.navigate('Profile',{Email:this.props.route.params.Email});
        return true;
  }

  async componentDidMount(){
     this.setState({
      Email : this.props.route.params.Email,
      savedInfo:true,
      emailvalid:true,
    })
    
  }


//     // Date & time picker

saveProjectInfo=async()=>{

await fetch(serverLink+"/saveProjectInfo",{
    method: "POST",
    headers: {
     "Content-Type": "application/json"
    },
   body: JSON.stringify(
    {        
      "Email": this.state.Email,   
      "CustomerEmail": this.state.CustomerEmail,
      "ProjectName": this.state.ProjectName,
      "ProjectMission": this.state.ProjectMission,
      "ProjectDescription": this.state.ProjectDescription,
      "ProjectBudget": this.state.Budget,
      "DeadLine": this.state.date,
    }
)
  }).then(response=>{return response.json()}).then(resp=>{
    this.setState({ProjectID:resp.insertedId})
    console.log(this.state.ProjectID)
  })


return;

}
 handlePicker = (date) => {
  const dateFormat = moment(date).format("YYYY-MM-DD");
 this.setState({
   date:dateFormat,
  //  time:time,
   datetimevisible:false,
 })
 console.log(this.state.date)
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
  onNextStep = () => {
    if (!this.state.isValid) {
      this.setState({ errors: true });
    } else {
      this.setState({ errors: false });
    }
};
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

 validate = (text) => {
 
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === true) {
    this.setState({emailvalid:true,CustomerEmail:text})
  }
  else{
    this.setState({emailvalid:false,CustomerEmail:text})

  }
  
}
render() {
    return (
      <KeyboardAwareScrollView style={[styles.MainView,]}>

      <View style={{flexDirection:'row',marginTop:10}}>
          <View style={{width:'20%', alignItems:'flex-start'}}>
          <Image 
               source={require('../../../assets/logo/logo1.jpeg')}
               style={{width:60, height:60, borderRadius:0}}
               
               />
          </View>
          <View style={{width:'60%',alignItems:'center',justifyContent:'center'}}>
          <Text style={styles.textAddress}>Add Project</Text>
          </View>
          <View style={{width:'20%',alignItems:'center',justifyContent:'center'}}>
          
          </View>
          
          </View>
       {this.state.savedInfo?
        <View style={{width:'100%',height:700}}>
        <ProgressSteps progressBarColor="#98a988" completedProgressBarColor="#bc9855"
        activeStepIconColor="#bfcfb2" completedStepIconColor="#bc9855" 
        activeStepIconBorderColor="#98a988" 
        labelFontFamily="SairaSemiCondensed-Regular" labelColor="black"
        activeLabelColor="black" completedLabelColor="black"
        disabledStepIconColor="#98a988" disabledStepNumColor="black" >
        {/* onNext={this.onNextStep} errors={this.state.errors} */}
         
          <ProgressStep label="First Step"
          nextBtnStyle={{backgroundColor:'#bc9855', borderRadius:15,width:100, alignItems:'center'}}
          nextBtnTextStyle={{fontFamily:'SairaSemiCondensed-Bold', fontSize:15, color:"black"}}
          >
          <View style={styles.RegisterRows}>
                  <Text style={styles.textstyle1}>
                    Project Name
                  </Text>
                  <View style={{display:'flex', flex:2,flexDirection:'row', width:180}}>
                  <View style={styles.inputView}>
                  
                 <TextInput
                    style=
                      {styles.textinputstyle}
                    placeholder='Project Name' 
                    onChangeText={(text)=>this.setState({ProjectName:text})}
                    value={this.state.ProjectName}
                    />
                    
                    
                </View>
                
                  </View>

                </View> 

                <View style={[styles.RegisterRows,{height:100}]}>
                  <Text style={styles.textstyle1}>
                   Project Mission
                  </Text>
                  <View style={{display:'flex', flex:2,flexDirection:'row', width:180}}>
                  <View style={[styles.inputView,{height:100}]}>
                  
                 <TextInput
                 multiline={true}
                 numberOfLines={5}
                 onChangeText={(text)=>this.setState({ProjectMission:text})}
                 style=
                      {[styles.textinputstyle,{height:100}]}
                    placeholder={'Project Mission'} 
                    value={this.state.ProjectMission}
                    />
                                     
                </View>
                  </View>    
                  
                           
                </View> 

                <View style={[styles.RegisterRows,{height:150}]}>
                  <Text style={styles.textstyle1}>
                   Project Description
                  </Text>
                  <View style={{display:'flex', flex:2,flexDirection:'row', width:180}}>
                  <View style={[styles.inputView,{height:150}]}>
                  
                 <TextInput
                 multiline={true}
                 numberOfLines={10}
                    onChangeText={(text)=>{this.setState({ProjectDescription:text})}}
                    style=
                      {[styles.textinputstyle,{height:150}]}
                    placeholder={'Project Description'}
                    value={this.state.ProjectDescription} />
                                     
                </View>
                  </View>    
                  
                           
                </View> 
          </ProgressStep>
          
          <ProgressStep label="Second Step" onSubmit={async ()=>{
            if(this.state.CustomerEmail===""||
               this.state.date===""||
               this.state.Budget===""||
               this.state.ProjectName===""||
               this.state.ProjectMission===""||
               this.state.ProjectDescription==="") this.showAlert('Second Step',"Make sure all fields are full")
            else {
              
              if(this.state.emailvalid){
                this.setState({savedInfo:false})
                await this.saveProjectInfo();
                this.setState({savedInfo:true})
                this.props.navigation.push('Project',{Email:this.state.Email,ProjectID:this.state.ProjectID})
              }
              else{
                this.setState({emailvalid:true})
                this.showAlert('Customer Email', 'Make sure customer email is a valid email')
              }
            }
          }}
          previousBtnStyle={{backgroundColor:'#bc9855', borderRadius:15,width:100, alignItems:'center'}}
          previousBtnTextStyle={{fontFamily:'SairaSemiCondensed-Bold', fontSize:15, color:"black"}}
          nextBtnStyle={{backgroundColor:'#bc9855', borderRadius:15,width:100, alignItems:'center'}}
          nextBtnTextStyle={{fontFamily:'SairaSemiCondensed-Bold', fontSize:15, color:"black"}}
          >
          <View style={styles.RegisterRows}>
                  <Text style={styles.textstyle1}>
                    Customer Email
                  </Text>
                  <View style={{display:'flex', flex:2,flexDirection:'row', width:180}}>
                  <View style={styles.inputView}>
                  
                 <TextInput
                    style=
                      {styles.textinputstyle}
                    placeholder='Customer Email' 
                    onChangeText={(text)=>this.validate(text)}
                    value={this.state.CustomerEmail}
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    />
                    
                    
                </View>
                
                  </View>

                </View> 

                <View style={[styles.RegisterRows]}>
                  <Text style={styles.textstyle1}>
                   Project Budget ($)
                  </Text>
                  <View style={{display:'flex', flex:2,flexDirection:'row', width:180}}>
                  <View style={styles.inputView}>
                  
                 <TextInput
                 keyboardType='number-pad'
                 onChangeText={(text)=>this.setState({Budget:text})}
                 style=
                      {[styles.textinputstyle]}
                    placeholder={'Project Budget'} 
                    value={this.state.Budget}
                    />
                                     
                </View>
                  </View>    
                  
                           
                </View> 

                <View style={[styles.RegisterRows]}>
                  <Text style={styles.textstyle1}>
                   Project Deadline
                  </Text>
                  <View style={{display:'flex', flex:2,flexDirection:'row', width:180}}>
                  <View style={[styles.inputView]}>
                  
                  < TouchableOpacity style={styles.inputView}
                  onPress={this.showPicker}
                  >
                     <Text>
                    
                    {this.state.date !== ""
                            ? moment(this.state.date).calendar()
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
                  </View>    
                  
                           
                </View> 
          </ProgressStep>
        </ProgressSteps>
        </View>
        :
        <Loading/>
        }
      </KeyboardAwareScrollView>
    );
    }}

const styles = StyleSheet.create({

  MainView: {
    display:'flex',
     flex: 1,
     flexDirection: 'column',
    //  alignItems: 'center',
    //  justifyContent: 'center',
     backgroundColor: '#bfcfb2',
},
textAddress:{
  fontSize: 20,
  letterSpacing: 1,
  opacity: 0.8,
  color:"black",
  fontFamily:'SairaSemiCondensed-Bold'
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
  Width:'60%',
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

  width:'40%',
  height:40, 
  fontFamily:'SairaSemiCondensed-Regular',
  fontSize:15, 
  color:'black',
  justifyContent:'center',
  alignItems:'center',
  paddingHorizontal:4
 },
});

export default AddProject;


import React , {Component}  from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BottomSheet from "rn-sliding-up-panel";
import { RadioButton } from 'react-native-paper';
//  import RadioGroup from 'react-native-radio-buttons-group';
import Loading from '../../../Components/Loading';
import {
 SafeAreaView,
 Text,
 StyleSheet,
 View,
 FlatList,
 TextInput,
 TouchableOpacity,
 Button,
 Modal,
 TouchableRipple,
 Switch,
 BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Add from "./Add";
import { serverLink } from '../../serverLink';
class AddPersonToPreject extends Component {

 constructor(props) {
       super(props);
       this.state = {
         search:"",
         filteredDataSource:[],
         masterDataSource:[],
         added:[],
         added1:[],
         addedToDB:[],
         ShowModal:false,
         searchby:"first",
         Email:this.props.route.params.Email,
         ProjectID:this.props.route.params.ProjectID,
         counter:0,
         enableSearch:false,
         loadedSearch:false,
         loadSave:true,
         iconColor:'black',

         flag:false
       };
       this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
     }
     componentDidMount=async()=>{
       this.setState({loadSave:false})
      await this.getData();
      await this.getAddedMembers();
      
      this.state.added.map(item => {
       const _id=item._id
       const items = this.state.masterDataSource.filter(item1 => item1._id !== _id)
       this.setState({ 
           filteredDataSource:[],
           masterDataSource:items, //simple value
           
       });
      }      
       
      )
      this.setState({loadSave:true})
     }
     UNSAFE_componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
  
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
  
    handleBackButtonClick() {
      this.props.navigation.push('Project',{Email:this.props.route.params.Email});
          return true;
    }
   
    
  // function to delete 
deleteTodo = (_id,NickName)=> {
   this.setState({ masterDataSource: [...this.state.masterDataSource, {_id:_id
       ,NickName:NickName}]
   
   })
   const items = this.state.added.filter(item => item._id !== _id);
   this.setState({ added: items });

   this.deleteTeamMember(_id)

  
 };

 OpenProfile=(_id,Email)=>{
   this.props.navigation.navigate('profileForOthers',{Email:Email,GuestEmail:this.state.Email,where:'AddPersonToProject'})
 }

 searchFilterFunction =async (text) => {  
  this.setState({loadedSearch:false})
  await this.getData();
  await this.getAddedMembers();
  if(this.state.added.length)
  console.log(this.state.added[0]._id)
  this.state.added.map((item) => {

    console.log(this.state.added[0]._id)
   const items = this.state.masterDataSource.filter(item1 => item1._id !== item._id)
   
   this.setState({ 
       filteredDataSource:[],
       masterDataSource:items, //simple value
   });
   console.log(this.state.masterDataSource)
   
  })
   if (text) {
     if(this.state.searchby=="second"){
       const newData =this.state.masterDataSource.filter(
         function (item) {
           const itemData = item.NickName
             ? item.NickName.toUpperCase()
             : ''.toUpperCase();
           const textData = text.toUpperCase();
           return itemData.indexOf(textData) > -1;
       });
       this.setState({filteredDataSource:newData,
         search:text});
         }  
     
     else if(this.state.searchby=="first"){
       const newData =this.state.masterDataSource.filter(
         function (item) {
           const itemData = item.Email
             ? item.Email.toUpperCase()
             : ''.toUpperCase();
           const textData = text.toUpperCase();
           return itemData.indexOf(textData) > -1;
       });
       this.setState({filteredDataSource:newData,
        // added:newData,
         search:text});
         }  
     
      //    else if(this.state.searchby=="third"){
      //      const newData =this.state.masterDataSource.filter(
      //        function (item) {
      //          const itemData = item.Email
      //            ? item.Email.toUpperCase()
      //            : ''.toUpperCase();
      //          const textData = text.toUpperCase();
      //          return itemData.indexOf(textData) > -1;
      //      });
      //      this.setState({filteredDataSource:newData,
      //        search:text});
      //        } 
      //      }
      //      else {
      //        // Inserted text is blank
      //        // Update FilteredDataSource with masterDataSource
      //        this.setState({
      //          filteredDataSource:[],
      //        search:text,
          
      //  });
          
           
           }
           this.setState({loadedSearch:true})
    
 };

ItemView = ({item}) => {
  if(this.state.searchby=="second"){
   return (
     // Flat List Item
     <View style={[styles.item,{flexDirection:'row'}]}>
       <TouchableOpacity style={{width:'90%'}} onPress={() => {
        ///go to profile
        this.props.navigation.navigate('profileForOthers', {Email:item.Email, GuestEmail:this.state.Email,where:'AddPersonToProject'})
      }}>
      <Text style={styles.textItems}>{item.NickName}</Text>
      </TouchableOpacity>
      <View style={{justifyContent:'center',alignItems:'center', 
      width:'10%',borderColor:'#bc9855', borderWidth:1,
      borderBottomColor:'#bfcfb2'
      }}>
      <Icon
              name="add-sharp"
              size={20}
              color="black"
              onPress={() =>{this.getItem(item)}}
            />
      </View>
     </View>
   );
  }
  else if(this.state.searchby=="first"){
   return (
     // Flat List Item
     <View style={[styles.item,{flexDirection:'row'}]}>
       <TouchableOpacity style={{width:'90%'}} onPress={() => {
        ///go to profile
        this.props.navigation.navigate('profileForOthers', {Email:item.Email, GuestEmail:this.state.Email,where:'AddPersonToProject'})

      }}>
      <Text style={styles.textItems}>{item.Email}</Text>
      </TouchableOpacity>
      <View style={{justifyContent:'center',alignItems:'center', 
      width:'10%',borderColor:'#bc9855', borderWidth:1,
      borderBottomColor:'#bfcfb2'
      }}>
      <Icon
              name="add-sharp"
              size={20}
              color="black"
              onPress={() =>{this.getItem(item)}}
            />
      </View>
     </View>
   );
  }
  else if(this.state.searchby=="third"){
    return (
      // Flat List Item
      <View style={[styles.item,{flexDirection:'row'}]}>
        <TouchableOpacity style={{width:'90%'}} onPress={() => {
         ///go to profile
         this.props.navigation.navigate('profileForOthers', {Email:item.Email, GuestEmail:this.state.Email,where:'AddPersonToProject'})

       }}>
       <Text style={styles.textItems}>{item.Email}</Text>
       </TouchableOpacity>
       <View style={{justifyContent:'center',alignItems:'center', 
       width:'10%',borderColor:'#bc9855', borderWidth:1,
       borderBottomColor:'#bfcfb2'
       }}>
       <Icon
               name="add-sharp"
               size={20}
               color="black"
               onPress={() =>{this.getItem(item)}}
             />
       </View>
      </View>
    );
   }
 };

ItemSeparatorView = () => {
   return (
     // Flat List Item Separator
     <View
       style={{
         height: 0.5,
         width: '100%',
         backgroundColor: '#C8C8C8',
       }}
     />
   );
 };

getItem =async (item) => {

  
   this.setState({ added: [...this.state.added, {_id:item._id
       ,NickName:item.NickName,Email:item.Email}], loadSave:false
   })
   const _id=item._id;
   const items = this.state.masterDataSource.filter(item => item._id !== _id);
   this.setState({
       search:"",
       masterDataSource:items, //simple value
       enableSearch:false,
       loadedSearch:false,
       loadSave:true

 });
 await this.saveMemeber(item._id)
}

getData=async () =>  {
 const response = await fetch(serverLink+"/getData", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   
    },
    body: JSON.stringify(
     {               
           
     }
    )
  });   
  const body = await response.json();
  if(body=="null"){
    // this.showAlert("Warning", "Email does not exist!")
  }else{
this.setState({masterDataSource:body})

}
}
getAddedMembers=async()=>{
  const response = await fetch(serverLink+"/getAddedMembers", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    
     },
     body: JSON.stringify(
      {               
            ProjectID:this.state.ProjectID
      }
     )
   });   
   const body = await response.json();
   if(body=="null"){
   }else{
    this.setState({ added: [],added1:body})
 body.map(item => {
  const _id=item.MemberID
  const items = this.state.masterDataSource.filter(item1 => item1._id === _id)
  this.setState({ added: [...this.state.added,items[0]]})
  }) 
  
}
}
saveMemeber=async(MemberID)=>{
  const response = await fetch(serverLink+"/saveMember", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    
     },
     body: JSON.stringify(
      {               
            ProjectID:this.state.ProjectID,
            MemberID:MemberID,
      }
     )
   });   
   const body = await response.json();
}
deleteTeamMember=async(MemberID)=>{
  const response = await fetch(serverLink+"/deleteTeamMember", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    
     },
     body: JSON.stringify(
      {               
            ProjectID:this.state.ProjectID,
            MemberID:MemberID,
      }
     )
   });   
   const body = await response.json();
}


render(){
 return (
 
   <SafeAreaView ew style={[styles.MainView,]}>
     {/* <KeyboardAwareScrollView scrollEnabled style={[styles.MainView,]}> */}
     <View style={{flexDirection:'row',marginTop:10}}>
          <View style={{width:'20%', alignItems:'flex-start'}}>
          </View>
          <View style={{width:'60%',alignItems:'center',justifyContent:'center'}}>
          <Text style={styles.textAddress}>Add Team Members</Text>
          </View>
          <View style={{width:'20%',alignItems:'center',justifyContent:'center'}}>
          
          </View>
          
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
       { !this.state.loadSave?<Loading/>:
       <View style={{width:'100%',height:'100%'}}>
        <View style={{flexDirection:"row", marginTop:20, height:50}} >
        <View style={{width:'80%', height:40, marginHorizontal:15}}>
        <TextInput
         style={styles.textInputStyle}
         onChangeText={(text) => {
           if(text=='')this.setState({enableSearch:false})
         else this.setState({enableSearch:true})
         this.setState({search:text,ShowModal:false})
         this.searchFilterFunction(text)}}
       
       value={this.state.search}
         underlineColorAndroid="transparent"
         placeholder="Choose method of search -> By :"
       />
        </View>
        <View style={{width:'20%', height:40}}>
        <Icon
        color={this.state.iconColor}
        name='md-filter'
        type='font-awesome'
       size={25}
       style={{paddingTop:10}}
       onPress={()=>{
        if(!this.state.ShowModal)
        {
          this.setState({ShowModal:true,iconColor:'#bc9855'})
        }
        else this.setState({ShowModal:false,iconColor:'black'})
        }
        }
          />
        </View>
   

       </View>
       {this.state.enableSearch? 
           this.state.loadedSearch?
        <SafeAreaView  style={{width:'100%', height:'100%',flex:1}}>
           <FlatList
              scrollEnabled
              vertical
              showsVerticalScrollIndicator={false}
              width={'100%'}
              height={'100%'}
              data={this.state.filteredDataSource}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={this.ItemSeparatorView}
              renderItem={this.ItemView}
         />
         
         </SafeAreaView>:<Loading/>
         :
    <KeyboardAwareScrollView style={{backgroundColor:'#bfcfb2', marginTop:30}}>
    <View style={{width:'100%', justifyContent:'center'}}>
    {
       
    this.state.added.map(name => (
      
         <Add
           key={name._id}
           todo={name}
           deleteTodo={this.deleteTodo}
           OpenProfile={this.OpenProfile}
           Flag= {this.state.added1[this.state.added.indexOf(name)].Accepted}
         />
       ))
    }
    </View>

   </KeyboardAwareScrollView>}
         </View>}

         {this.state.ShowModal? 
<BottomSheet
           

draggableRange={{ top: 200, bottom: 200 }}
snappingPoints={[55, 100, 180]}
showBackdrop={false}
           >

<View style={styles.bottomSheetContainer}>
       
<RadioButton.Group onValueChange={value =>{this.setState({searchby:value,ShowModal:!this.state.ShowModal});

}} value={this.state.searchby}>
     <RadioButton.Item label="Email" value="first" 
     uncheckedColor={"black"}
     color={'black'} />
     <RadioButton.Item label="Nick Name" value="second"
     uncheckedColor={"black"}
     color={'black'} />
     <RadioButton.Item label="Fields of interest " value="third"
     uncheckedColor={"black"}
     color={'black'} />
     {/* <Button title="Search" onPress={()=>this.getData()}></Button> */}
   </RadioButton.Group>   
               
</View>
        
             
           </BottomSheet> 
           : null}
    </SafeAreaView>
 );

};
};

const styles = StyleSheet.create({
  MainView: {
    display:'flex',
     flex: 1,
     flexDirection: 'column',
    //  alignItems: 'center',
    //  justifyContent: 'center',
     backgroundColor: '#bfcfb2',
},
 itemStyle: {
   padding: 10,
 },
 textInputStyle: {
   height: '100%',
   width:'100%',
   borderWidth: 1,
   paddingLeft: 20,
   margin: 5,
   borderRadius:15,
   borderColor: '#bc9855',
   backgroundColor: '#98a988',
   fontFamily:'SairaSemiCondensed-Regular'
 },
 ModalView:{
   flex:1,
   height:"100%",
   alignContent:'center',
   alignItems:'center',
   backgroundColor:'#bfcfb2',
 },
 bottomSheetContainer: {
   flex: 1,
   paddingTop: 20,
   paddingBottom: 8,
   borderTopLeftRadius: 15,
   borderTopRightRadius: 15,
   elevation: 4,
},
textAddress:{
  fontSize: 20,
  letterSpacing: 1,
  opacity: 0.8,
  color:"black",
  fontFamily:'SairaSemiCondensed-Bold'
},
item:{
  borderBottomWidth:1,
  borderBottomColor:"#bc9855",
  alignItems:'flex-start',
  width:'80%',
  marginTop:15,
  marginHorizontal:20,
    },

textItems:{
      fontSize:15,
      color:'black',
      fontFamily:'SairaSemiCondensed-Regular',
},  
RadioButtonStyle:{
  fontFamily:'SairaSemiCondensed-Regular'
}  ,
text:{
  fontSize: 15,
  // opacity: 0.8,
  color:"black",
  fontFamily:'SairaSemiCondensed-Regular',
  // marginTop:10,
  paddingHorizontal:10,
  textAlign:'center'
  
},
});

export default AddPersonToPreject;
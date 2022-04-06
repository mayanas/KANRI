
import React, {Component,useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
 import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import Icon from "react-native-vector-icons/MaterialIcons";
 import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ToastAndroid,
  Animated,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  TouchableRipple,
  Portal,
  Dialog,
  Provider,
  Button,

  TextInput as PaperInput,
  Chip,
  Switch,
  RadioButton,
} from "react-native-paper";
import { Appbar } from "react-native-paper";
import SelectDropdown from 'react-native-select-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isSymbolObject } from 'util/types';
class AddTask extends Component{
 constructor(props){
   super(props);

 }
  state = {
   tasks:[{_id:1,Name:"task1",approved:false}
   ,{_id:2,Name:"task2",approved:false}
   ,{_id:3,Name:"task3",approved:false},
   {_id:4,Name:"task4",approved:false}]
 }
 getItem = (item) => {
 
//   this.setState({ added: [...this.state.added, {_id:item._id
//       ,NickName:item.NickName,Email:item.Email}]
//   })

//   const _id=item._id;
// const items = this.state.masterDataSource.filter(item => item._id !== _id);
//   this.setState({ filteredDataSource:[],
//       search:"",
//       masterDataSource:items //simple value

// });
}

update=async(_id,Name)=>{

  let newMarkers = this.state.tasks.map(el => (
    el._id===_id? {Name:Name, _id: _id,approved:true}: el
))
this.setState({ tasks:newMarkers });

}
 ItemView = ({item}) => {

   return (
     // Flat List Item
     <View style={{ flexDirection: "row",
     width: "100%",
           }}>
<View style={styles.listTile}>
     <Icon
       name={item.approved ? "check-circle" : "radio-button-unchecked"}
       style={styles.leading}
       size={20}
       color="#666666"
       
       onPress={() => {
  this.update(item._id,item.Name);
}}
     />
     <Text style={styles.title}>{item.Name}</Text>
     <Icon
       name="edit"
       style={styles.trailing}
       size={20}
       color="#666666"
       onPress={() =>{}}
     />
   </View>
<View  style={{paddingLeft:"50%",flexDirection: "row"}}>
<View>
    <Button title="Add" color="#7F39FB"    

onPress={() => this.getItem(item) }
/>
     </View>

   
</View>


      </View>
   );
  
 
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

render(){

 return (
  <SafeAreaView style={{flex: 1}}>
  <View style={styles.container}>
    
  
  <FlatList
  data={this.state.tasks}
  keyExtractor={(item, index) => index.toString()}
  ItemSeparatorComponent={this.ItemSeparatorView}
  renderItem={this.ItemView}
/>  
    
  </View>
  <KeyboardAwareScrollView>





    <View style={{marginTop:"150%"}}>
  <TouchableOpacity onPress={() => {}}  style={styles.fab}>
      <Text style={styles.fabIcon}>+</Text>
   </TouchableOpacity>
  </View>


 </KeyboardAwareScrollView>
 </SafeAreaView>
  

  
 );
}
};



const styles = StyleSheet.create({
  fab: { 
    position: 'absolute', 
    width: 56, 
    height: 56, 
    alignItems: 'center', 
    justifyContent: 'center', 
    right: 20, 
    bottom: 20, 
    backgroundColor: '#bc9855', 
    borderRadius: 30, 
    elevation: 8 
    }, 
    fabIcon: { 
     
      fontSize: 40, 
      color: 'white' 
    },
  listTile: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#666666"
  },
  leading: {
    width: "20%"
  },
  title: {
    width: "60%",
    fontSize: 18
  },
  trailing: {
    width: "20%"
  }
});

export default AddTask;

import React, { Component, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ToastAndroid,
  Animated,
  TouchableOpacity
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
import { serverLink } from '../../serverLink';
class Meeting extends Component {
  constructor(props) {
    super(props);

  }
  state = {
    // ProjectID: this.props.ProjectID,
    // MemberID: "",
    // showPicker: false,
    // showPicker1: false,
    // showDialog: false,
    // newTaskTitle: "",
    // dialogVisible: true,
    // TeamMembers: this.props.TeamMembers,
    // // emails:[],
    // emails: [],
    // content: "",
    // isVisible: false,
    // date: "",
    // startDate: "",
    // email: "",
    // Priorities: [
    //   "Urgent",
    //   "Importatnt",
    //   "Medium",
    //   "Low"
    // ],
    // Priority: ""
  }
  //for backend code 
//   handleAddTask = async () => {
//     await fetch(serverLink + '/AddTask', {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(
//         {
//           "ProjectID": this.state.ProjectID,
//           "MemberEmail":this.state.email,
//           "Title":this.state.newTaskTitle,
//           "StartDate": this.state.startDate,
//           "DeadLine":this.state.date,
//           "Content": this.state.content,
//           "Priority":this.state.Priority,
//         }
//       )
//     }).then(resp => {
//       return resp.json();
//     }).then(async (jsonresponse) => {
//       console.log(jsonresponse)

//     }).catch(error => {
//       console.log(error);
//     });
//     this.props.ModalVisible();

//   }

//   handlePicker = (date) => {
//     const dateFormat = moment(date).format("YYYY-MM-DD");
//     this.setState({ date: dateFormat, showPicker: false });
//   };
//   showPicker = () => {
//     this.setState({ showPicker: true });
//   }

//   hidePicker = () => {
//     this.setState({ showPicker: false });
//   }
//   handlePicker1 = (date) => {
//     const dateFormat = moment(date).format("YYYY-MM-DD");
//     this.setState({ startDate: dateFormat, showPicker1: false });
//   };
//   showPicker1 = () => {
//     this.setState({ showPicker1: true });
//   }

//   hidePicker1 = () => {
//     this.setState({ showPicker1: false });
//   }
//   hideDialog = () => {
//     this.setState({ showDialog: false });
//   }
//   showDialog = () => {

//     for (var i = 0; i < this.state.TeamMembers.length; i++) {
//       this.state.emails[i] = this.state.TeamMembers[i].Email
//     }
//     this.setState({ showDialog: true });
//   }

//   setNewTaskContent = (text) => {
//     this.setState({ content: text });
//   }

  render() {

    return (
      <SafeAreaView style={{ width: '100%', height: '100%' }} >
        {/* <KeyboardAwareScrollView style={{ width: '100%', height: '100%' }}> */}
        <Provider>
          <Appbar.Header style={{ backgroundColor: "#bc9855" }}>

            <Appbar.Content title="Add meeting link" titleStyle={{ fontFamily: 'SairaSemiCondensed-Bold' }} />
            {/* <Appbar.Action icon="alarm" onPress={this.showPicker} />
            <Appbar.Action icon="account-multiple-plus" onPress={() => {
              this.showDialog()
            }
            } /> */}
            {/* <Appbar.Action
              icon="check"
              onPress={this.handleAddTask}
              disabled={this.state.newTaskTitle === "" || this.state.startDate === "" ||
                this.state.date === "" || this.state.content === "" || this.state.Priority === ""
                ? true : false}
            /> */}
          </Appbar.Header>
          <View style={[styles.mainContainer]}>
              <Text>Add zoom link</Text>
          </View>



          {/* <DateTimePickerModal
            isVisible={this.state.showPicker}
            onConfirm={this.handlePicker}
            onCancel={this.hidePicker}
            mode="date"
            is24Hour={false}
          />
          <DateTimePickerModal
            isVisible={this.state.showPicker1}
            onConfirm={this.handlePicker1}
            onCancel={this.hidePicker1}
            mode="date"
            is24Hour={false}
          />

 */}


        </Provider>
        {/* </KeyboardAwareScrollView> */}
      </SafeAreaView>

    );
  }
};



const styles = StyleSheet.create({
  textinputstyle: {
    width: 300,
    paddingHorizontal: 4,
    height: 47,
    fontFamily: 'SairaSemiCondensed-Regular',
    fontSize: 15,
    borderRadius: 20,
    textDecorationLine: 'none',
    backgroundColor: "#bc9855"
  },
  mainContainer: {
    flex: 1,

    width: '100%',
    height: '100%',
    padding: 10,
  },
  dateInput:
  {
    marginHorizontal: 10,
    fontFamily: 'SairaSemiCondensed-Regular',
    paddingTop: 5
  },
  titleInput: {
    fontSize: 18,
    // fontWeight: "bold",
    fontFamily: 'SairaSemiCondensed-Regular',
    paddingVertical: 20,
    marginHorizontal: 10,
    borderBottomWidth: 1.2,
    borderBottomColor: "#bc9855",
  },
  contentInput: {
    fontFamily: 'SairaSemiCondensed-Regular',
    paddingTop: 20,
    marginHorizontal: 10,
    fontSize: 18,
    lineHeight: 29,
    // height:'50%'
  },


  mainContainer: {
    flex: 1,

    padding: 10,
  },


});

export default Meeting;
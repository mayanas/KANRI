/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';

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
  SafeAreaView,
  Linking,
  LogBox,
  RefreshControl,
} from 'react-native';

import Loading from '../../Components/Loading';
import AddPersonToPreject from './Projects/AddPersonToProject';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-gesture-handler';
import PhoneInput from 'react-native-phone-number-input';
import SelectDropdown from 'react-native-select-dropdown';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryPicker, {
  getAllCountries
} from 'react-native-country-picker-modal';
import CheckBoxItem from '../../Components/CheckBoxItem';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import email from 'react-native-email'
LogBox.ignoreLogs(['Require cycle:']);

import { serverLink } from '../serverLink';
import AddTask from './Projects/AddTask';
import AddTask1 from './AddTask1';
import EditTask from './Projects/EditTask';
import About from '../About';
import ChangePassword from './ChangePassword';
import ProfileForOthers from './ProfileForOthers';
import AskAsCustomer from './AskAsCutomer';
import ViewProject from './Projects/ViewProject';
import ChatScreen from './ChatScreen';
import ProjectChatGroup from './ProjectChatGroup';
import PushNotification from 'react-native-push-notification';
import firestore from '@react-native-firebase/firestore';

const Degrees = ["Doctoral Degree", "Master's Degree", "Bachelor's Degree", "Diploma's Degree", "Undergraduate", "None of the above"]
const checkList = [
  { id: 1, name: 'Business and Management' },
  { id: 2, name: 'Computer Science and Information Technology' },
  { id: 3, name: 'Education' },////
  { id: 4, name: 'Environmental, Agricultural, and Physical Sciences' },////
  { id: 5, name: 'Government and Law' },
  { id: 6, name: 'Library and Information Science' },////
  { id: 7, name: 'Media and Communications' },////
  { id: 8, name: 'Medical, Healthcare, and Life Sciences' },
  { id: 9, name: 'Science and Engineering' },
  { id: 10, name: 'Security and Forensics' },
  { id: 11, name: 'Social Sciences and Humanities' },

];

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      profileImage: '',
      NickName: '',
      Bio: "",
      QualificationDegree: "",
      InterestedIn: [],
      FullName: "",
      PhoneNumber: "",
      Country: "",
      Password: "",
      BirthDate: '',
      loaded: false,
      Edited: true,
      deleted: false,


      // views: 1200,
      // userName:"sara_a",
      numProject: 20,
      followers: 1000,
      following: 2000,

      followtext: "Follow",
      color: "#bc9855",
      IsFollowed: false,

      isModalVisible: false,
      Data: [
        { id: 0, text: "Profile Image", value: "" },
        { id: 1, text: "Nick Name", value: "" },
        { id: 2, text: "Phone Number", value: "" },
        { id: 3, text: "Country", value: "" },
        { id: 4, text: "Qualification Degree", value: "" },
        { id: 5, text: "Bio", value: "" },
        { id: 6, text: "Fields Of Interest", value: "" },
        // {id:7,text:"Password",value:""},
      ],

      DataSettings: [
        { id: 0, text: "Change Password", value: "" },
        { id: 1, text: "About us", value: "" },
        { id: 2, text: "Log Out", value: "" },
      ],
      isRender: false,
      ProfileImageModal: false,
      NickNameModal: false,
      PhoneModal: false,
      CountryModal: false,
      QDModal: false,
      BioModal: false,
      InterestedInModal: false,
      SettingsModal: false,
      AddProjectModal: false,
      ProjectModal: false,
      AboutUsModal: false,
      ChangePasswordModal: false,

      profileImageUpdated: '',
      NickNameUpdated: '',
      BioUpdated: "",
      QualificationDegreeUpdated: "",
      InterestedInUpdated: [],
      PhoneNumberUpdated: "",
      CountryUpdated: "Select",

      phonevalid: false,
      phonevalue: "",

      Projects: [],
      isValid: false,
      errors: false,
      datetimevisible: false,
      date: "",
      ProjectName: "",
      ProjectMission: "",
      ProjectDescription: "",
      CustomerEmail: "",
      Budget: "",
      savedInfo: true,
      emailvalid: true,

      ProjectID: "",
      ProjectName1: "",
      CustomerEmail1: "",
      ProjectMission1: "",
      ProjectDescription1: "",
      ProjectBudget1: "",
      ProjectDeadLine1: "",

      MissionUpdated: "",
      DescriptionUpdated: "",
      BudgetUpdated: "",
      DeadLineUpdated: "",

      MissionUpdateModal: false,
      DescriptionUpdatedModal: false,
      DescriptionShowModal: false,
      BudgetUpdatedModal: false,
      DivideBudgetModal: false,
      DeadLineUpdatedModal: false,
      TeamMembersUpdateModal: false,
      TaskUpdateModal: false,
      AddTaskModal: false,
      EditTaskModal: false,
      TaskItem: null,
      TeamMembers: [],
      TeamMembersEmail: [],
      Tasks: null,
      Tasks1: [],

      projectLoaded: false,
      MissionSaved: true,
      DescriptionSaved: true,
      BudgetSaved: true,
      DeadLineSaved: true,
      loadTasks: false,
      DivideBudgetSaved: true,
      // TeamMembersSaved: true,
      // TasksSaved: true,

      PhoneNumber_Whatsapp: '',
      ProfileForOthersModal: false,
      ProfileForOthersEmail: "",
      ProjectsJoined: null,
      ProjectsJoinedInfo: [],

      AskAsCustomerModal: false,

      Age: 0,
      stepColor: '#bc9855',
      TaskBudget: "0",
      RemainingBudget: "",
      AddMeetingModal: false,
      ShowMeetingModal: false,
      MeetingSaved: true,
      MeetingLink: '',
      ProjectIDFromMeeting: '',

      FollowingsList: null,

      ViewModal: false,
      ProjectIDView: '',
      ProjectNameView: '',
      ChatScreenModal: false,
      dstEmail: '',
      dstNickName: '',

      ProjectChatModal: false,
      ProjectIDChat: '',
      ProjectNameChat: '',
      showPickerMeeting: false,
      MeetingDate: "",
      TeamMembersMeeting: [],
      ProjectNameMeeting: '',
      refreshing: false,
      FollowersList: [],
      FollowingsList: [],
      CustomerEmailMeeting:'',
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
    this.props.navigation.navigate('Home', { Email: this.props.route.params.Email });
    return true;
  }

  async fetchdata() {

    this.setState({
      profileImageUpdated: this.state.profileImage,
      NickNameUpdated: this.NickName,
      BioUpdated: this.Bio,
      QualificationDegreeUpdated: this.QualificationDegree,
      InterestedInUpdated: [],
      PhoneNumberUpdated: this.PhoneNumber,
      CountryUpdated: this.Country,

    })
  }
  async loadProfile() {
    await this.setState({
      Email: this.props.route.params.Email,
      loaded: false,
      // refreshing:true
    })
    await this.getInfo();
    await this.getUserInfo();
    await this.getProjectsInfo();
    await this.getProjectsJoined();
    console.log(this.state.ProjectsJoinedInfo)
    if (this.state.InterestedIn.length != 0)
      await this.setState({

        // refreshing:false,
        loaded: true,
        phonevalid: false,
        phonevalue: "",
        isValid: false,
        errors: false,
        datetimevisible: false,
        date: "",
        ProjectName: "",
        ProjectMission: "",
        ProjectDescription: "",
        CustomerEmail: "",
        Budget: "",
        savedInfo: true,
        emailvalid: true,
        ProjectsJoinedInfo: [],
        Age: moment().diff(this.state.BirthDate, 'years')
      })
    // await AsyncStorage.setItem('Followings', this.state.following.toString());
    // await AsyncStorage.setItem('FollowingsList', this.state.FollowingsList);
  }
  async componentDidMount() {
    await this.loadProfile();

  }
  EditButtonPressed = () => {
    this.setState({ isModalVisible: true })
  }
  AddProjectButtonPressed = () => {
    // this.props.navigation.push('addProject', { Email: this.state.Email })
    this.setState({ AddProjectModal: true })
  }
  AskForProjectButtonPressed = () => {
    this.setState({ AskAsCustomerModal: true })
  }
  saveProjectInfo = async () => {

    await fetch(serverLink + "/saveProjectInfo", {
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
          "RemainingBudget": this.state.Budget,
          "DeadLine": this.state.date,
          "Projects": this.state.numProject + 1,
          "CreationTime": new Date()
        }
      )
    }).then(response => { return response.json() }).then(resp => {
      this.setState({ ProjectID: resp.insertedId })
      console.log(this.state.ProjectID)
    })

    if (this.state.CustomerEmail !== this.state.Email) {
      firestore()
        .collection('NOTIFICATIONS')
        .doc(this.state.CustomerEmail)
        .collection('NOTIFICATIONS')
        .add({
          Boolean: false,
          Type: "CreatedProject",
          SenderNickName: this.state.NickName,
          message: "Project " + this.state.ProjectName + " has been created",
          projectId: this.state.ProjectID,
          ProjectName: this.state.ProjectName,
          // leaderEmail: item.Email,
          Date: new Date().toDateString(),
          createdAt: new Date().getTime(),
          user: {
            _id: this.state.Email,
            email: this.state.Email
          }
        });
    }

    // if(this.state.FollowersList.length)
    this.state.FollowersList.map((follower) => {
      firestore()
        .collection('NOTIFICATIONS')
        .doc(follower)
        .collection('NOTIFICATIONS')
        .add({
          Boolean: false,
          Type: "CreatedProject",
          SenderNickName: this.state.NickName,
          message: "Project " + this.state.ProjectName + " has been created",
          projectId: this.state.ProjectID,
          ProjectName: this.state.ProjectName,
          // leaderEmail: item.Email,
          Date: new Date().toDateString(),
          createdAt: new Date().getTime(),
          user: {
            _id: this.state.Email,
            email: this.state.Email
          }
        });
    })


    return;

  }
  handlePicker = (date) => {
    const dateFormat = moment(date).format("YYYY-MM-DD");
    this.setState({
      date: dateFormat,
      DeadLineUpdated: dateFormat,
      //  time:time,
      datetimevisible: false,
    })
  };
  onNextStep = () => {
    if (!this.state.isValid) {
      this.setState({ errors: true });
    } else {
      this.setState({ errors: false });
    }
  };
  showPicker = () => {
    this.setState({
      datetimevisible: true,
    })
  }
  hidePicker = () => {
    this.setState({
      datetimevisible: false,
    })
  }

  validate = (text) => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === true) {
      this.setState({ emailvalid: true, CustomerEmail: text })
    }
    else {
      this.setState({ emailvalid: false, CustomerEmail: text })

    }

  }

  async getInfo() {
    await fetch(serverLink + "/getInfo", {
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
      if (jsonresponse !== "null") {
        this.setState({
          profileImage: jsonresponse.ProfileImage,
          NickName: jsonresponse.NickName,
          Bio: jsonresponse.Bio,
          QualificationDegree: jsonresponse.QualificationDegree,
          InterestedIn: jsonresponse.InterestedIn,
          followers: jsonresponse.Followers,
          following: jsonresponse.Following,
          numProject: jsonresponse.Projects,
          // views: jsonresponse.Views,

          profileImageUpdated: jsonresponse.ProfileImage,
          NickNameUpdated: jsonresponse.NickName,
          BioUpdated: jsonresponse.Bio,
          QualificationDegreeUpdated: jsonresponse.QualificationDegree,
          InterestedInUpdated: [],
          FollowingsList: jsonresponse.FollowingsList,
          FollowersList: jsonresponse.FollowersList,

        })


      }

    }).catch(error => {
      console.log(error);
    });

  }
  async getUserInfo() {
    await fetch(serverLink + "/getUserInfo", {
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
      if (jsonresponse !== "null") {
        this.setState({
          FullName: jsonresponse.FirstName + ' ' + jsonresponse.LastName,
          Country: jsonresponse.Country,
          PhoneNumber: jsonresponse.PhoneNumber,
          Password: jsonresponse.Password,
          BirthDate: jsonresponse.BirthDate,
          CountryUpdated: jsonresponse.Country,
          PhoneNumberUpdated: jsonresponse.PhoneNumber,
        })

      }

    }).catch(error => {
      console.log(error);
    });
  }
  async getProjectsInfo() {
    await fetch(serverLink + "/getProjectsInfo", {
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
      if (jsonresponse !== "null") {
        this.setState({
          Projects: jsonresponse
        })

      }

    }).catch(error => {
      console.log(error);
    });

  }
  async getProjectsJoined() {
    await fetch(serverLink + "/getProjectsJoined", {
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
    }).then(async jsonresponse => {
      if (jsonresponse !== "null") {
        await this.setState({
          ProjectsJoined: jsonresponse,
          ProjectsJoinedInfo: []
        })
        jsonresponse.map(async item => {
          await this.getProjectInfoJoined(item.ProjectID)
        })

      }

    }).catch(error => {
      console.log(error);
    });
  }
  async getProjectInfoJoined(ProjectID) {
    await fetch(serverLink + "/getProjectInfoJoined", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          // "Email": this.state.Email,
          "ProjectID": ProjectID,
        }
      )
    }).then(resp => {
      return resp.json();
    }).then(jsonresponse => {
      if (jsonresponse !== "null") {
        this.setState({
          ProjectsJoinedInfo: [...this.state.ProjectsJoinedInfo, jsonresponse]
        })

      }

    }).catch(error => {
      console.log(error);
    });
  }
  async saveImage() {

    await fetch(serverLink + "/updateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "Email": this.state.Email,
          "ProfileImage": this.state.profileImageUpdated,
        }
      )
    }).then(response => { return response.json() }).then(resp => {
      console.log(resp);
    })


    return;
  }
  async saveNickName() {

    await fetch(serverLink + "/updateNickName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "Email": this.state.Email,
          "NickName": this.state.NickNameUpdated,
        }
      )
    }).then(response => { return response.json() }).then(resp => {
      console.log(resp);
    })


    return;
  }
  async saveQualificationDegree() {

    await fetch(serverLink + "/updateQualificationDegree", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "Email": this.state.Email,
          "QualificationDegree": this.state.QualificationDegreeUpdated,
        }
      )
    }).then(response => { return response.json() }).then(resp => {
      console.log(resp);
    })


    return;
  }
  async saveBio() {

    await fetch(serverLink + "/updateBio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "Email": this.state.Email,
          "Bio": this.state.BioUpdated,
        }
      )
    }).then(response => { return response.json() }).then(resp => {
      console.log(resp);
    })


    return;
  }
  async saveCountry() {

    await fetch(serverLink + "/updateCountry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "Email": this.state.Email,
          "Country": this.state.CountryUpdated,
        }
      )
    }).then(response => { return response.json() }).then(resp => {
      console.log(resp);
    })


    return;
  }
  async saveInterestedIn() {

    await fetch(serverLink + "/updateInterestedIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "Email": this.state.Email,
          "InterestedIn": this.state.InterestedInUpdated,
        }
      )
    }).then(response => { return response.json() }).then(resp => {
      console.log(resp);
    })


    return;
  }
  async savePhoneNumber() {

    await fetch(serverLink + "/updatePhoneNumber", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "Email": this.state.Email,
          "PhoneNumber": this.state.PhoneNumberUpdated,
        }
      )
    }).then(response => { return response.json() }).then(resp => {
      console.log(resp);
    })


    return;
  }
  objectsAreSame(x, y) {
    var objectsAreSame = true;
    for (var propertyName in x) {
      if (x[propertyName] !== y[propertyName]) {
        objectsAreSame = false;
        break;
      }
    }
    return objectsAreSame;
  }
  async saveEdited() {
    ////////////////////////////////////////////////////////////////////////////
    this.setState({ Edited: false })
    if (this.state.profileImageUpdated !== this.state.profileImage && this.state.profileImageUpdated !== null) {
      await this.saveImage();
      this.setState({ profileImage: this.state.profileImageUpdated })
    }
    if (this.state.NickNameUpdated !== this.state.NickName && this.state.NickNameUpdated != null) {
      this.setState({ NickName: this.state.NickNameUpdated })
      await this.saveNickName();
    }
    if (this.state.QualificationDegreeUpdated !== this.state.QualificationDegree && this.state.QualificationDegreeUpdated != null) {
      this.setState({ QualificationDegree: this.state.QualificationDegreeUpdated })
      await this.saveQualificationDegree();
    }
    if (this.state.BioUpdated !== this.state.Bio && this.state.BioUpdated != null) {
      this.setState({ Bio: this.state.BioUpdated })
      await this.saveBio();
    }
    if (this.state.CountryUpdated !== this.state.Country && this.state.CountryUpdated != null) {
      this.setState({ Country: this.state.CountryUpdated })
      await this.saveCountry();
    }
    if (!this.objectsAreSame(this.state.InterestedInUpdated, this.state.InterestedIn) && this.state.InterestedInUpdated !== null) {
      this.setState({ InterestedIn: this.state.InterestedInUpdated })
      await this.saveInterestedIn();
    }
    if (this.state.PhoneNumberUpdated !== this.state.PhoneNumber && this.state.PhoneNumberUpdated != null) {

      if (!this.state.phonevalid) {
        this.showAlert("Phone Number", "Make sure new 'Phone Number' field is valid");
      }
      else {
        this.setState({
          PhoneNumber: this.state.PhoneNumberUpdated, phonevalid: false,
          phonevalue: "",
        })
        await this.savePhoneNumber();
      }

    }
    this.fetchdata()
    this.setState({ Edited: true, isModalVisible: false })


  }
  async closeEditModal() {
    await this.fetchdata();
  }
  setToastMessage = (message) => {

    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );

  };
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
        this.setState({ profileImageUpdated: response.assets[0].base64 });
      }

    });

  };

  showAlert = (title, field) =>
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


  func = ({ item, index }) => {

    return (
      <View style={{
        height: '90%',
        width: 250,
        backgroundColor: '#bc9855',
        margin: 15,
        // paddingHorizontal:15,
        borderRadius: 15,
        overflow: 'hidden',
        // justifyContent:'center',
        alignItems: 'center'
      }}>
        {
          item.id == 1 ? <Image source={require('../../assets/interestedIn/1.jpg')} style={styles.interestedInimage} /> :
            item.id == 2 ? <Image source={require('../../assets/interestedIn/2.jpg')} style={styles.interestedInimage} /> :
              item.id == 3 ? <Image source={require('../../assets/interestedIn/3.jpg')} style={styles.interestedInimage} /> :
                item.id == 4 ? <Image source={require('../../assets/interestedIn/4.jpg')} style={styles.interestedInimage} /> :
                  item.id == 5 ? <Image source={require('../../assets/interestedIn/5.jpg')} style={styles.interestedInimage} /> :
                    item.id == 6 ? <Image source={require('../../assets/interestedIn/6.jpg')} style={styles.interestedInimage} /> :
                      item.id == 7 ? <Image source={require('../../assets/interestedIn/7.jpg')} style={styles.interestedInimage} /> :
                        item.id == 8 ? <Image source={require('../../assets/interestedIn/8.jpg')} style={styles.interestedInimage} /> :
                          item.id == 9 ? <Image source={require('../../assets/interestedIn/9.jpg')} style={styles.interestedInimage} /> :
                            item.id == 10 ? <Image source={require('../../assets/interestedIn/10.jpg')} style={styles.interestedInimage} /> :
                              item.id == 11 ? <Image source={require('../../assets/interestedIn/11.jpg')} style={styles.interestedInimage} /> :
                                <Image source={require('../../assets/interestedIn/11.jpg')} style={styles.interestedInimage} />
        }

        <Text style={styles.textinterest}>{item.name}</Text>
      </View>

    )


  }
  getMeetingLink = async (ProjectID) => {
    await fetch(serverLink + "/getMeetingLink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "ID": ProjectID,
        }
      )
    }).then(resp => {
      return resp.json();
    }).then(async jsonresponse => {
      if (jsonresponse !== "null") {
        await this.setState({
          MeetingLink: jsonresponse.MeetingLink,
          MeetingDate: jsonresponse.MeetingDate,
        })
        console.log(this.state.MeetingDate)

      }

    }).catch(error => {
      console.log(error);
    });

  }

  funcProjects = ({ item, index }) => {

    return (
      <View style={{
        height: 270,
        width: 250,
        backgroundColor: '#98a988',
        margin: 15,
        // paddingHorizontal:15,
        borderRadius: 15,
        overflow: 'hidden',
        // justifyContent:'center',
        alignItems: 'center'
      }}>

        <View style={{
          width: '100%',
          height: '20%', alignItems: 'center', justifyContent: 'center', marginTop: 5,
        }}>
          <Text style={[styles.text, { fontSize: 20 }]}>{item.ProjectName}</Text>
        </View>

        <View style={{ width: '100%', height: '40%', paddingHorizontal: 5, }}>
          <Text style={styles.text}>Project Mission </Text>
          <Text style={styles.textinterest}>" {item.ProjectMission} "</Text>
        </View>

        <View style={{
          width: '100%', height: '20%',
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        }}>
          <TouchableOpacity style={{
            backgroundColor: '#bc9855', width: '30%', height: '70%',
            alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginHorizontal: '2.5%',
            borderWidth: 0.5, flexDirection: 'row'
          }}
            onPress={async () => {
              await this.setState({ ProjectIDChat: item._id, ProjectNameChat: item.ProjectName })
              this.setState({ ProjectChatModal: true })
            }}>
            <Ionicons
              name="chatbubbles-outline"
              size={15}
              color={'black'} />
            <Text style={styles.text1}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: '#bc9855', width: '30%', height: '70%',
            alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginRight: '2.5%',
            borderWidth: 0.5, flexDirection: 'row'
          }}
            onPress={async () => {

              
              await this.getMeetingLink(item._id)
              if (this.state.MeetingLink === "")
                this.showAlert('Meeting Link', 'No availabe link')
              else {
                this.showAlert('Meeting Date', this.state.MeetingDate)
                Linking.openURL(this.state.MeetingLink)
              }



            }}>
            <Icon
              name="link"
              size={15}
              color={'black'} />
            <Text style={styles.text1}>Meeting</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: '#bc9855', width: '30%', height: '70%',
            alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginRight: '2.5%',
            borderWidth: 0.5, flexDirection: 'row'
          }}
            onPress={async () => {

              let newMarkers = this.state.Projects.map(el => (
                el._id === item._id ? {
                  ...el, MeetingDate: this.state.MeetingDate
                } : el
              ))
              this.setState({ Projects: newMarkers });
              await this.setState({
                // MeetingDate: item.MeetingDate,
                MeetingLink: item.MeetingLink,
                ProjectIDFromMeeting: item._id,
                ProjectNameMeeting: item.ProjectName,
                CustomerEmailMeeting:item.CustomerEmail,
              })
              await this.getTeamMembers(item._id)
              this.setState({ AddMeetingModal: true, })

            }}>
            <Icon
              name="link-plus"
              size={15}
              color={'black'} />
            <Text style={styles.text1}>Meeting</Text>
          </TouchableOpacity>

        </View>
        <View style={{
          width: '100%', height: '20%',
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 2,
        }}>
          <TouchableOpacity style={{
            backgroundColor: '#bc9855', width: '30%', height: '70%',
            alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginHorizontal: '2.5%',
            borderWidth: 0.5, flexDirection: 'row'
          }}
            onPress={async () => {
              this.setState({
                ProjectModal: true,
              })
              await this.getProjectInfo(item._id);
              this.setState({ loadProject: true })
            }}>
            <Icon
              name="details"
              size={15}
              color={'black'} />
            <Text style={styles.text1}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: '#bc9855', width: '30%', height: '70%',
            alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginRight: '2.5%',
            borderWidth: 0.5, flexDirection: 'row'
          }}
            onPress={async () => {
              this.setState({ ViewModal: true, ProjectIDView: item._id, ProjectNameView: item.ProjectName })
            }}>
            <Icon
              name="chart-timeline"
              size={15}
              color={'black'} />
            <Text style={styles.text1}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: '#bc9855', width: '30%', height: '70%',
            alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginRight: '2.5%',
            borderWidth: 0.5, flexDirection: 'row'
          }}
            onPress={async () => {
              this.setState({ projectdeleted: false })
              await this.deleteProject(item._id, item.CustomerEmail);
              this.setState({ projectdeleted: true })
              // this.props.navigation.navigate('Project', { Email: this.state.Email, ProjectID: item._id.toString() })
            }}>
            <Icon
              name="minus-circle-outline"
              size={15}
              color={'black'} />
            <Text style={styles.text1}>Delete</Text>
          </TouchableOpacity>
        </View>

      </View>

    )


  }

  funcProjectsJoined = ({ item, index }) => {

    return (
      <View style={{
        height: 270,
        width: 250,
        backgroundColor: '#98a988',
        margin: 15,
        // paddingHorizontal:15,
        borderRadius: 15,
        overflow: 'hidden',
        // justifyContent:'center',
        alignItems: 'center'
      }}>

        <View style={{
          width: '100%',
          height: '20%', alignItems: 'center', justifyContent: 'center', marginTop: 5,
        }}>
          <Text style={[styles.text, { fontSize: 20 }]}>{item.ProjectName}</Text>
        </View>

        <View style={{ width: '100%', height: '50%', paddingHorizontal: 5, }}>
          <Text style={styles.text}>Project Mission </Text>
          <Text style={styles.textinterest}>" {item.ProjectMission} "</Text>
        </View>

        <View style={{
          width: '100%', height: '30%',
          flexDirection: 'row', alignItems: 'center', alignItems: 'center', marginBottom: 2,
        }}>

          <TouchableOpacity style={{
            backgroundColor: '#bc9855', width: '30%', height: '50%',
            alignItems: 'center', justifyContent: 'center', borderRadius: 15,
            borderWidth: 0.5, flexDirection: 'row', marginHorizontal: '2.5%'
          }}
            onPress={async () => {
              this.setState({ ViewModal: true, ProjectIDView: item._id, ProjectNameView: item.ProjectName })
            }}>
            <Icon
              name="chart-timeline"
              size={15}
              color={'black'} />
            <Text style={styles.text1}>View</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            backgroundColor: '#bc9855', width: '30%', height: '50%',
            alignItems: 'center', justifyContent: 'center', borderRadius: 15,
            borderWidth: 0.5, flexDirection: 'row', marginRight: '2.5%'
          }}
            onPress={async () => {
              await this.setState({ ProjectIDChat: item._id, ProjectNameChat: item.ProjectName })
              this.setState({ ProjectChatModal: true })
            }}>
            <Ionicons
              name="chatbubbles-outline"
              size={15}
              color={'black'} />
            <Text style={styles.text1}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            backgroundColor: '#bc9855', width: '30%', height: '50%',
            alignItems: 'center', justifyContent: 'center', borderRadius: 15,
            borderWidth: 0.5, flexDirection: 'row', marginRight: '2.5%'
          }}
            onPress={async () => {
              await this.getMeetingLink(item._id)
              if (this.state.MeetingLink === "")
                this.showAlert('Meeting Link', 'No availabe link')
              else {
                this.showAlert('Meeting Date', this.state.MeetingDate)
                Linking.openURL(this.state.MeetingLink)
              }
            }}>
            <Icon
              name="link"
              size={15}
              color={'black'} />
            <Text style={styles.text1}>Meeting</Text>
          </TouchableOpacity>


        </View>

      </View>

    )


  }

  onUpdate = (item) => {
    let name = item.name;
    let id = item.id;
    this.setState(previous => {
      let InterestedInUpdated = previous.InterestedInUpdated;
      let index = InterestedInUpdated.map(object => object.name).indexOf(name); // check to see if the name is already stored in the array
      if (index === -1) {
        InterestedInUpdated.push({ id, name }) // if it isn't stored add it to the array
      } else {
        InterestedInUpdated.splice(index, 1) // if it is stored then remove it from the array
      }
      return { InterestedInUpdated }; // save the new selectedBoxes value in state
    }, () => console.log(this.state.InterestedInUpdated)); // check that it has been saved correctly by using the callback function of state
  }



  onPressItem = (item, index) => {
    this.fetchdata
    if (index == 0) {
      this.setState({ ProfileImageModal: true, profileImageUpdated: this.state.profileImage })
    }
    else if (index == 1) {
      this.setState({ NickNameModal: true, NickNameUpdated: this.state.NickName })
    }
    else if (index == 2) {
      this.setState({ PhoneModal: true, PhoneNumberUpdated: this.state.PhoneNumber })
    }
    else if (index == 3) {
      this.setState({ CountryModal: true, CountryUpdated: this.state.Country })
    }
    else if (index == 4) {
      this.setState({ QDModal: true, QualificationDegreeUpdated: this.state.QualificationDegree })
    }
    else if (index == 5) {
      this.setState({ BioModal: true })
    }
    else if (index == 6) {
      this.setState({ InterestedInModal: true, InterestedInUpdated: [] })
    }
    //  else if(index==7){
    //   this.setState({PassModal:true})
    //  }
  }
  renderItem = ({ item, index }) => {

    return (
      <TouchableOpacity style={styles.item}
        onPress={() => {
          this.onPressItem(item, index);
        }}
      >
        <Text style={styles.textItems}>
          {item.text}
        </Text>
      </TouchableOpacity>
    )


  }
  SettingsIconPressed = () => {
    this.setState({ SettingsModal: true })
  }
  ChangePassword = () => {
    this.setState({ SettingsModal: false })
    this.props.navigation.push('changePassword', { Email: this.state.Email })
  }
  AboutUS = () => {
    this.setState({ AboutUsModal: true })
    // this.props.navigation.navigate('about', { where: 'profile' })
  }
  async Logout() {
    try {
      this.setState({ SettingsModal: false })
      await AsyncStorage.setItem('Email', '');
      await AsyncStorage.setItem('Password', '');
      await AsyncStorage.setItem('fcmToken', '');
      this.props.navigation.push("kanri");
      PushNotification.deleteChannel("channel-id3")
    }
    catch (error) {
      console.log(error);
    }
  }


  onPressItemSettings = (item, index) => {
    // this.fetchdata
    if (index == 0) {
      this.ChangePassword();
    }
    else if (index == 1) {
      this.AboutUS();
    }
    else if (index == 2) {
      this.Logout();
    }


  }
  renderItemSettings = ({ item, index }) => {

    return (
      <TouchableOpacity style={styles.item}
        onPress={() => {
          this.onPressItemSettings(item, index);
        }}
      >
        <Text style={styles.textItems}>
          {item.text}
        </Text>
      </TouchableOpacity>
    )


  }
  UpdateMission = async () => {
    this.setState({ ProjectMission1: this.state.MissionUpdated })
    await fetch(serverLink + '/UpdateProjectMission', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "Email": this.state.Email,
          "ProjectID": this.state.ProjectID,
          "Mission": this.state.MissionUpdated,
        }
      )
    }).then(response => { return response.json() }).then(resp => {
      console.log(resp);

    })
  }
  UpdateDescription = async () => {
    this.setState({ ProjectDescription1: this.state.DescriptionUpdated })
    await fetch(serverLink + '/UpdateProjectDescription', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "Email": this.state.Email,
          "ProjectID": this.state.ProjectID,
          "Description": this.state.DescriptionUpdated,
        }
      )
    }).then(response => { return response.json() }).then(resp => {
      console.log(resp);

    })
  }
  UpdateBudget = async () => {
    this.setState({ ProjectBudget1: this.state.BudgetUpdated })
    await fetch(serverLink + '/UpdateProjectBudget', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "Email": this.state.Email,
          "ProjectID": this.state.ProjectID,
          "Budget": this.state.BudgetUpdated,
          "RemainingBudget": this.state.BudgetUpdated,
        }
      )
    }).then(response => { return response.json() }).then(resp => {
      console.log(resp);

    })
  }
  UpdateDeadLine = async () => {
    this.setState({ ProjectDeadLine1: this.state.DeadLineUpdated })
    await fetch(serverLink + '/UpdateProjectDeadLine', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "Email": this.state.Email,
          "ProjectID": this.state.ProjectID,
          "DeadLine": this.state.DeadLineUpdated,
        }
      )
    }).then(response => { return response.json() }).then(resp => {
      console.log(resp);

    })
  }
  EditMission = async () => {
    this.setState({ MissionUpdateModal: true });
  }
  showDescription = () => {
    this.setState({ DescriptionShowModal: true });
  }
  EditDescription = async () => {
    this.setState({ DescriptionUpdated: this.state.ProjectDescription1, DescriptionUpdatedModal: true });
  }
  EditBudget = async () => {
    this.setState({ BudgetUpdatedModal: true });
  }
  divideBudget = async () => {
    this.setState({ DivideBudgetModal: true });
  }
  EditDeadLine = async () => {
    this.setState({ DeadLineUpdatedModal: true });
  }
  EditTeamMembers = async () => {
    this.setState({ TeamMembersUpdateModal: true })
  }
  EditTasks = async () => {
    this.setState({ loadTasks: false })
    await this.loadTasks()
    this.setState({ loadTasks: true, TaskUpdateModal: true })
  }
  handleEmail = (to) => {
    email(to, {
      subject: 'From Kanri',
      body: ''
    }).catch(console.error)
  }
  getPhoneNumber = async (Email) => {
    await fetch(serverLink + '/getPhoneNumber', {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "Email": Email,
        }
      )
    }).then(response => { return response.json() }).then(resp => {
      this.setState({ PhoneNumber_Whatsapp: resp })
    })
  }
  initiateWhatsApp = () => {
    //  console.log(this.state.PhoneNumber_Whatsapp)
    let url =
      'whatsapp://send?text=' +
      '' +
      '&phone=' + this.state.PhoneNumber_Whatsapp;
    Linking.openURL(url)
      .then((data) => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        alert('Make sure Whatsapp installed on your device');
      });
  };
  funcProject = ({ item, index }) => {

    return (
      <View style={{
        height: 250,
        width: 380,
        backgroundColor: '#98a988',
        margin: 15,
        // paddingHorizontal:15,
        borderRadius: 15,
        overflow: 'hidden',
        // justifyContent:'center',
        alignItems: 'flex-start',
        // overflow:'scroll'

      }}>

        <View style={{ flexDirection: 'row', paddingLeft: 10, width: '100%', height: '25%' }}>
          <Text style={[styles.textinterest, { fontFamily: 'SairaSemiCondensed-Bold', width: '50%' }]}>Nick Name </Text>

          <View style={{ flexDirection: 'row', paddingHorizontal: 2, width: '50%' }}>
            <Text style={[styles.textinterest, { width: '70%' }]}>{item.NickName}</Text>
            <TouchableOpacity style={{ alignItems: 'flex-end', justifyContent: 'flex-start', marginTop: 10, marginRight: 10, width: '30%' }}
              onPress={async () => {
                this.setState({ ProfileForOthersModal: true, ProfileForOthersEmail: item.Email })
              }}
            >
              <Icon
                name='account-arrow-left-outline'
                color='black'
                size={22}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'row', paddingLeft: 10, width: '100%', height: '25%' }}>
          <Text style={[styles.textinterest, { fontFamily: 'SairaSemiCondensed-Bold', width: '50%' }]}>Email </Text>
          <Text style={[styles.textinterest, { width: '50%' }]}>{item.Email}</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingLeft: 10, width: '100%', height: '25%' }}>
          <Text style={[styles.textinterest, { fontFamily: 'SairaSemiCondensed-Bold', width: '50%' }]}>Qualification Degree </Text>
          <Text style={[styles.textinterest, { width: '50%' }]}>{item.QualificationDegree}</Text>

        </View>
        <View style={{ flexDirection: 'row', paddingLeft: 10, width: '100%', height: '25%' }}>
          <Text style={[styles.textinterest, { fontFamily: 'SairaSemiCondensed-Bold', width: '50%' }]}>Communications through </Text>
          <View style={{ marginTop: 10, flexDirection: 'row', paddingHorizontal: 2, width: '50%' }}>
            <TouchableOpacity style={{ marginHorizontal: 4 }}
              onPress={async () => {
                await this.getPhoneNumber(item.Email)
                this.initiateWhatsApp()
              }}
            >
              <Icon
                name='whatsapp'
                color='black'
                size={22}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginHorizontal: 4 }}
              onPress={() => this.handleEmail(item.Email)}
            >
              <Icon
                name='email-outline'
                color='black'
                size={22}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginHorizontal: 4 }}
              onPress={async () => {
                await this.setState({ dstEmail: item.Email, dstNickName: item.NickName });
                this.setState({ ChatScreenModal: true })
              }}
            >
              <Icon
                name='chat-outline'
                color='black'
                size={22}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

    )


  }
  getProjectInfo = async (ProjectID) => {
    this.setState({ loadProject: false, TeamMembers: [] })
    await this.getTeamMembers(ProjectID)
    await this.loadTasks1(ProjectID)
    // await this.getTeamMembersEmails();
    await fetch(serverLink + "/getProjectInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "Email": this.state.Email,
          "ProjectID": ProjectID,
        }
      )
    }).then(resp => {
      return resp.json();
    }).then(jsonresponse => {
      // console.log(jsonresponse.ProjectName)
      if (jsonresponse !== "null") {
        this.setState({
          ProjectID: ProjectID,
          ProjectName1: jsonresponse.ProjectName,
          CustomerEmail1: jsonresponse.CustomerEmail,
          ProjectMission1: jsonresponse.ProjectMission,
          ProjectDescription1: jsonresponse.ProjectDescription,
          ProjectBudget1: jsonresponse.ProjectBudget,
          RemainingBudget: jsonresponse.RemainingBudget,
          ProjectDeadLine1: jsonresponse.DeadLine,
        })
        //  console.log(this.state.ProjectID)

      }

    }).catch(error => {
      console.log(error);
    });

  }
  loadMembers = async (MemberID) => {

    await fetch(serverLink + "/loadMembers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "MemberID": MemberID,
        }
      )
    }).then(resp => {
      return resp.json();
    }).then(async (jsonresponse) => {
      // console.log(jsonresponse.ProjectName)
      if (jsonresponse !== "null") {
        this.setState({ TeamMembers: [...this.state.TeamMembers, jsonresponse[0]] })
        // console.log(this.state.TeamMembers)
      }

    }).catch(error => {
      console.log(error);
    });

  }
  getTeamMembers = async (ProjectID) => {

    this.setState({ TeamMembers: [] })
    await fetch(serverLink + "/getTeamMembers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "ProjectID": ProjectID,
        }
      )
    }).then(resp => {
      return resp.json();
    }).then(async (jsonresponse) => {
      // console.log(jsonresponse.ProjectName)
      if (jsonresponse !== "null") {
        this.setState({
          TeamMembersMeeting: jsonresponse
        })
        jsonresponse.map(async item => {
          await this.loadMembers(item.MemberID);
        })

      }

    }).catch(error => {
      console.log(error);
    });
  }

  loadTasks = async (ProjectID) => {
    this.setState({ Tasks: null })
    await fetch(serverLink + "/loadTasks", {
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
    }).then(async (jsonresponse) => {
      if (jsonresponse !== "null") {
        this.setState({ Tasks: jsonresponse })
        console.log(jsonresponse)
      }

    }).catch(error => {
      console.log(error);
    });
  }
  loadTasks1 = async (ProjectID) => {
    this.setState({ Tasks1: null })
    await fetch(serverLink + "/loadTasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "ProjectID": ProjectID,
        }
      )
    }).then(resp => {
      return resp.json();
    }).then(async (jsonresponse) => {
      if (jsonresponse !== "null") {
        this.setState({ Tasks1: jsonresponse })
        console.log(jsonresponse)
      }

    }).catch(error => {
      console.log(error);
    });
  }

  funcProjectTasks = ({ item, index }) => {

    return (
      <View style={{
        height: 250,
        width: 380,
        backgroundColor: '#98a988',
        margin: 15,
        // paddingHorizontal:15,
        borderRadius: 15,
        overflow: 'hidden',
        // justifyContent:'center',
        alignItems: 'flex-start',
        // overflow:'scroll'

      }}>

        <View style={{ flexDirection: 'row', paddingLeft: 10, width: '100%', height: '20%' }}>
          <Text style={[styles.textinterest, { fontFamily: 'SairaSemiCondensed-Bold' }]}>Task title: </Text>
          <Text style={styles.textinterest}>{item.Title}</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingLeft: 10, width: '100%', height: '20%' }}>
          <Text style={[styles.textinterest, { fontFamily: 'SairaSemiCondensed-Bold' }]}>Content: </Text>
          <Text style={styles.textinterest}>{item.Content}</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingLeft: 10, width: '100%', height: '20%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '45%' }}>
            <Text style={[styles.textinterest, { fontFamily: 'SairaSemiCondensed-Bold' }]}>Start date: </Text>
            <Text style={styles.textinterest}>{item.StartDate}</Text>
          </View>
          <View style={{ width: '10%' }}><Text></Text></View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '45%' }}>
            <Text style={[styles.textinterest, { fontFamily: 'SairaSemiCondensed-Bold' }]}>DeadLine: </Text>
            <Text style={styles.textinterest}>{item.DeadLine}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', paddingLeft: 10, width: '100%', height: '20%' }}>
          <Text style={[styles.textinterest, { fontFamily: 'SairaSemiCondensed-Bold' }]}>Budget: </Text>
          <Text style={styles.textinterest}>{item.Budget}</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingLeft: 10, width: '100%', height: '20%' }}>
          <Text style={[styles.textinterest, { fontFamily: 'SairaSemiCondensed-Bold' }]}>Member Email: </Text>
          <Text style={styles.textinterest}>{item.MemberEmail}</Text>
          <View style={{ marginTop: 10, flexDirection: 'row', paddingHorizontal: 2 }}>

            <TouchableOpacity style={{ marginHorizontal: 4 }}
              onPress={() => this.handleEmail(item.MemberEmail)}
            >
              <Icon
                name='email-outline'
                color='black'
                size={22}
              // onPress={()=>this.chat()}
              />
            </TouchableOpacity>

          </View>
        </View>

      </View>

    )


  }
  EditTask = async (item) => {
    this.setState({ TaskItem: item, EditTaskModal: true });

  }
  deleteFromProjects = async (ProjectID, Email) => {
    await fetch(serverLink + "/deleteFromProjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "ProjectID": ProjectID,
          "Email": Email,
          "Projects": this.state.numProject,
        }
      )
    }).then(response => { return response.json() }).then(resp => {
      console.log(resp);
    })
  }
  deleteFromProjectsTasks = async (ProjectID) => {
    await fetch(serverLink + "/deleteFromProjectsTasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {

          "ProjectID": ProjectID,
        }
      )
    }).then(response => { return response.json() }).then(resp => {
      console.log(resp);
    })
  }
  deleteFromProjectsTeamMembers = async (ProjectID) => {
    await fetch(serverLink + "/deleteFromProjectsTeamMembers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {

          "ProjectID": ProjectID,

        }
      )
    }).then(response => { return response.json() }).then(resp => {
      console.log(resp);
    })
  }
  deleteProject = async (ProjectID, CustomerEmail) => {
    this.setState({ loaded: false })
    await this.deleteFromProjects(ProjectID, this.state.Email)
    await this.deleteFromProjectsTasks(ProjectID)
    await this.deleteFromProjectsTeamMembers(ProjectID)
    await this.getInfo();
    await this.getUserInfo();
    await this.getProjectsInfo();
    await this.getProjectsJoined();
    await this.getTeamMembers(ProjectID);
    this.setState({ loaded: true })
    this.state.TeamMembersMeeting.map(member => {

      if (member.Accepted) {
        firestore()
          .collection('NOTIFICATIONS')
          .doc(member.MemberEmail)
          .collection('NOTIFICATIONS')
          .add({
            Boolean: false,
            Type: "DeleteProject",
            SenderNickName: this.state.NickName,
            message: "Project " + this.state.ProjectName1 + " has been deleted",
            projectId: member.ProjectID,
            ProjectName: this.state.ProjectName,
            // leaderEmail: item.Email,
            Date: new Date().toDateString(),
            createdAt: new Date().getTime(),
            user: {
              _id: this.state.Email,
              email: this.state.Email,
            }
          });
      }


    })
    if (CustomerEmail !== this.state.Email) {
      firestore()
        .collection('NOTIFICATIONS')
        .doc(CustomerEmail)
        .collection('NOTIFICATIONS')
        .add({
          Boolean: false,
          Type: "DeleteProject",
          SenderNickName: this.state.NickName,
          message: "Project " + this.state.ProjectName1 + " has been deleted",
          projectId: this.state.ProjectID,
          ProjectName: this.state.ProjectName,
          // leaderEmail: item.Email,
          Date: new Date().toDateString(),
          createdAt: new Date().getTime(),
          user: {
            _id: this.state.Email,
            email: this.state.Email
          }
        });
    }
  }
  saveTaskBudget = async (TaskID, ProjectID) => {
    await fetch(serverLink + "/saveTaskBudget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {

          "TaskID": TaskID,
          "Budget": this.state.TaskBudget,
          "RemainingBudget": this.state.RemainingBudget,
          "ProjectID": ProjectID
        }
      )
    }).then(response => { return response.json() }).then(resp => {
      console.log(resp);
    })
  }

  ItemView = ({ item }) => {

    return (

      <View style={{height:110}}>
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'flex-start', marginTop: 15 }}>
          <Text style={styles.title1}>{item.Title}</Text>
        </View>
        <View style={[styles.listTile]}>

          <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Text style={[styles.text, { width: '40%' }]}>Budget value </Text>
            <TextInput keyboardType='decimal-pad'
              placeholder={item.Budget.toString()}
              style={{
                backgroundColor: '#98a988', width: '60%', height: 40,
                borderRadius: 10, fontFamily: 'SairaSemiCondensed-Regular',
              }}
              onChangeText={(text) => {
                this.setState({ TaskBudget: text })
              }} />
          </View>
          <View style={styles.trailing1}>
            <Icon
              name="content-save"
              style={{ paddingHorizontal: 10 }}
              size={20}
              color="#666666"
              onPress={async () => {
                await this.setState({
                  RemainingBudget: (parseInt(this.state.RemainingBudget) - (parseInt(this.state.TaskBudget) - parseInt(item.Budget))).toString(),
                })
                let newMarkers = this.state.Tasks1.map(el => (
                  el._id === item._id ? {
                    ...el, Budget: this.state.TaskBudget
                  } : el
                ))
                this.setState({ Tasks1: newMarkers });
                await this.saveTaskBudget(item._id, item.ProjectID)
                this.showAlert('Task Budget', 'Saved')
              }}
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
  updateMeetingLink = async () => {

    let newMarkers = this.state.Projects.map(el => (
      el._id === this.state.ProjectIDFromMeeting ? {
        ...el, MeetingLink: this.state.MeetingLink
      } : el
    ))
    await this.setState({ Projects: newMarkers });
    await fetch(serverLink + '/UpdateMeetingLink', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "ProjectID": this.state.ProjectIDFromMeeting,
          "ZoomLink": this.state.MeetingLink,
          "MeetingDate": this.state.MeetingDate,
        }
      )
    }).then(response => { return response.json() }).then(resp => {
      console.log(resp);


    })
  }
  isValidURL = async (string) => {
    let Regex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    console.log(Regex.test(string))
    return Regex.test(string)

  };

  handlePicker1 = async (date) => {
    // console.log(date)
    const dateFormat = moment(date).format("YYYY-MM-DD HH:mm:ss");
    await this.setState({ MeetingDate: dateFormat, });
    this.setState({ showPickerMeeting: false })
  };
  showPicker1 = () => {
    this.setState({ showPickerMeeting: true });
  }

  hidePicker1 = () => {
    this.setState({ showPickerMeeting: false });
  }
  wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.loadProfile();

    this.setState({ refreshing: false })
  }
  render() {

    return (
      <SafeAreaView style={styles.MainView}>
        {!this.state.loaded ? <Loading /> :

          <View style={[styles.MainView, { width: '100%', height: '100%' }]}>

            <View style={{ width: '100%' }}>
              <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
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
                        color: "black",
                        fontFamily: 'SairaSemiCondensed-Bold'
                      }}>
                      {this.state.FullName}
                    </Text>
                    <Feather
                      name="chevron-down"
                      style={{
                        fontSize: 20,
                        color: 'black',
                        paddingHorizontal: 5,
                        opacity: 0.5,
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* <View ena></View> */}

                    {/* <Feather
                      name="plus-square"
                      style={{
                        fontSize: 25,
                        color: 'black',
                        paddingHorizontal: 15,
                      }}


                    /> */}
                    <Feather
                      name="menu"
                      color="black"
                      style={{
                        fontSize: 25,
                      }}
                      onPress={() => this.SettingsIconPressed()}
                    />
                  </View>
                </View>


                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    paddingTop: 10,
                    marginBottom: 0,
                    marginTop: 10,
                    // marginLeft:10,
                    // marginHorizontal:10
                  }}>
                  <View
                    style={{
                      alignItems: 'center', width: '30%', paddingHorizontal: 10
                    }}>
                    <TouchableOpacity
                      disabled
                      style={styles.button}
                      underlayColor="rgba(0,0,0,0)">
                      {this.state.profileImage ? <Image source={{ uri: 'data:image/png;base64,' + this.state.profileImage }}
                        style={{ width: '100%', height: '100%' }} /> :
                        <Text></Text>}
                    </TouchableOpacity>

                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '70%' }}>
                    <View style={{ alignItems: 'center', paddingHorizontal: 10 }}>
                      <Text style={{ fontWeight: 'bold', color: "black", fontSize: 18 }}>{this.state.numProject}</Text>
                      <Text style={styles.text}>Projects</Text>
                    </View>
                    <View style={{ alignItems: 'center', paddingHorizontal: 10 }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 18, color: "black", }}>{this.state.followers}</Text>
                      <Text style={styles.text}>Followers</Text>
                    </View>
                    <View style={{ alignItems: 'center', paddingHorizontal: 10 }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 18, color: "black", }}>{this.state.following}</Text>

                      {/* <Text style={{ fontWeight: 'bold', fontSize: 18, color: "black", }}>{AsyncStorage.getItem('Followings').toString()}</Text> */}
                      <Text style={styles.text}>Followings</Text>
                    </View>
                  </View>

                </View>
                <View style={{ width: '30%', paddingHorizontal: 20, alignItems: 'center' }}>
                  <Text
                    style={{
                      paddingVertical: 5,
                      fontWeight: 'bold',
                      fontSize: 10,
                      color: "black",
                      opacity: 0.6,
                      marginRight: 10
                    }}>
                    {/* <Icon name='eye' color="black" size={10} />
                    {this.state.views} */}
                  </Text>

                </View>
                <View style={{ width: '100%', height: 150, paddingHorizontal: 10, }}>
                  <View style={{ flexDirection: 'row', paddingRight: 10 }}>
                    <Text
                      style={[styles.text, { paddingRight: 10 }]}>
                      {this.state.NickName}
                    </Text>
                    <Text
                      style={styles.text}>
                      ( {this.state.Age} years old )
                    </Text>
                  </View>
                  <Text style={styles.text}>Qualification Degree: {this.state.QualificationDegree}</Text>

                  <ScrollView
                    // showsVerticalScrollIndicator={false}
                    // showsHorizontalScrollIndicator={false}
                    vertical={true}
                    style={{
                      paddingVertical: 0,

                      width: '100%', height: 100,
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

                    onPress={() => this.EditButtonPressed()}
                    style={{
                      width: '33%',
                      paddingHorizontal: 4,
                    }}>
                    <View
                      style={styles.sview}>
                      <Text
                        style={styles.text}>
                        Edit Profile
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.AddProjectButtonPressed()}
                    style={{
                      width: '34%',
                      paddingHorizontal: 4,
                    }}>
                    <View
                      style={styles.sview}>
                      <Text
                        style={styles.text}>
                        Add Project
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.AskForProjectButtonPressed()}
                    style={{
                      width: '33%',
                      paddingHorizontal: 4,
                    }}>
                    <View
                      style={styles.sview}>
                      <Text
                        style={styles.text}
                      >
                        As customer
                      </Text>
                    </View>
                  </TouchableOpacity>

                </View>


              </View>
              <LinearGradient
                colors={['#bc9855', '#bc9855', '#bc9855']}
                style={{
                  left: 0,
                  right: 0,
                  height: 10,
                  width: '100%',
                  marginTop: 5,
                  marginBottom:5
                }}
              ></LinearGradient>


            </View>

            <SafeAreaView style={{ height: '100%', width: '100%', flex: 1 }}>
              <ScrollView vertical showsVerticalScrollIndicator={false} style={{ height: '100%' }}
                refreshControl={
                  <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
                }
              >
                {/* InterestedIn Cards */}
                {/* <View style={{ width: '100%', height: 320, }}> */}
                <View style={{ width: '100%', height: 320, }}>
                  <Text style={[styles.text, { paddingHorizontal: 20 }]}>Interested In</Text>
                  <FlatList
                    contentContainerStyle={this.state.InterestedIn.length <= 1 ? { width: '100%' } : {}}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    width={'100%'}
                    // height={'100%'}
                    keyExtractor={(item) => item.id.toString()}
                    data={this.state.InterestedIn}
                    renderItem={this.func}

                  />

                </View>
                <LinearGradient
                  colors={['#bc9855', '#bc9855', '#bc9855']}
                  style={{
                    left: 0,
                    right: 0,
                    height: 1,
                    width: '100%',
                    marginTop: 5,
                    marginBottom:5
                  }}
                ></LinearGradient>
                {/* Projects created */}
                <View style={{ width: '100%',  }}>
                  <Text style={[styles.text, { paddingHorizontal: 20 }]}>Created Projects</Text>
                  <FlatList
                    contentContainerStyle={this.state.Projects.length <= 1 ? { width: '100%' } : {}}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    width={'100%'}
                    // height={'100%'}
                    keyExtractor={(item) => item._id.toString()}
                    data={this.state.Projects}
                    renderItem={this.funcProjects}

                  />

                </View>
                <LinearGradient
                  colors={['#bc9855', '#bc9855', '#bc9855']}
                  style={{
                    left: 0,
                    right: 0,
                    height: 1,
                    width: '100%',
                    marginTop: 5,
                    marginBottom:5
                  }}
                ></LinearGradient>
                {/* Projects joined */}
                <View style={{ width: '100%',  }}>
                  <Text style={[styles.text, { paddingHorizontal: 20 }]}>Joined Projects</Text>
                  <FlatList
                    contentContainerStyle={this.state.ProjectsJoinedInfo.length <= 1 ? { width: '100%' } : {}}

                    showsHorizontalScrollIndicator={false}
                    horizontal
                    width={'100%'}
                    // height={'100%'}
                    keyExtractor={(item) => item._id.toString()}
                    data={this.state.ProjectsJoinedInfo}
                    renderItem={this.funcProjectsJoined}

                  />

                </View>
                <LinearGradient
                  colors={['#bc9855', '#bc9855', '#bc9855']}
                  style={{
                    left: 0,
                    right: 0,
                    height: 1,
                    width: '100%',
                    marginTop: 5,
                  }}
                ></LinearGradient>
              </ScrollView>
            </SafeAreaView>

          </View>

        }


        {/* Edit Modal */}
        <Modal animationType='slide'
          visible={this.state.isModalVisible}
          onRequestClose={() => {
            this.closeEditModal();
            this.setState({ isModalVisible: false })
          }}
          style={styles.ModalView}>

          <View style={styles.modalS}>
            <View style={{ flexDirection: 'row', marginBottom: 30 }}>
              <View style={{ width: '20%', alignItems: 'flex-start' }}>
                <Image
                  source={require('../../assets/logo/logo1.jpeg')}
                  style={{ width: 60, height: 60, borderRadius: 0 }}

                />
              </View>
              <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.textAddress}>Edit Profile</Text>
              </View>
              <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={{
                  backgroundColor: '#bc9855',
                  borderRadius: 15,
                  width: '100%',
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',

                }}
                  onPress={() => {

                    this.saveEdited();
                  }
                  }

                >
                  <Text style={[styles.textItems, { fontFamily: 'SairaSemiCondensed-Bold' }]}>Save</Text>
                </TouchableOpacity>
              </View>

            </View>

            {!this.state.Edited ? <Loading /> : <SafeAreaView style={{ width: '100%', height: '100%', flex: 1 }}>
              {/* <ScrollView vertical showsVerticalScrollIndicator={false} style={{height:'100%'}}> */}

              <FlatList
                scrollEnabled
                vertical
                showsVerticalScrollIndicator={false}
                width={'100%'}
                height={'100%'}
                data={this.state.Data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={this.renderItem}

                extraData={this.state.isRender}
              />



              {/* </ScrollView> */}

            </SafeAreaView >}

          </View>
        </Modal>


        {/* Image Modal*/}
        <Modal animationType='slide'
          visible={this.state.ProfileImageModal}
          onRequestClose={() => { this.setState({ ProfileImageModal: false }) }
          }
          style={styles.ModalView}>

          <View style={styles.modalS}>
            <View style={{ flexDirection: 'row', marginBottom: 30 }}>
              <View style={{ width: '20%', alignItems: 'flex-start' }}>
                <Image
                  source={require('../../assets/logo/logo1.jpeg')}
                  style={{ width: 60, height: 60, borderRadius: 0 }}

                />
              </View>
              <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.textAddress}>Edit Profile Image</Text>
              </View>
              <View style={{ width: '20%' }}>
                <Text></Text>
              </View>

            </View>

            <SafeAreaView style={{ width: '100%', height: '100%', flex: 1 }}>
              <View style={styles.imageView}>
                <Text style={[styles.textItems, { marginBottom: 50 }]}>Click on the image below and choose another one</Text>
                <TouchableOpacity
                  style={[styles.button, { width: 200, height: 200 }]}
                  onPress={() => this.requestAcessPermission()}
                  underlayColor="rgba(0,0,0,0)">
                  {this.state.profileImageUpdated ? <Image source={{ uri: 'data:image/png;base64,' + this.state.profileImageUpdated }}
                    style={{ width: '100%', height: '100%' }} /> :
                    <Text style={styles.buttonText}>Upload Profile Image</Text>}
                </TouchableOpacity>

              </View>

            </SafeAreaView >

          </View>
        </Modal>

        {/* Nick Name Modal*/}
        <Modal animationType='slide'
          visible={this.state.NickNameModal}
          onRequestClose={() => { this.setState({ NickNameModal: false }) }
          }
          style={styles.ModalView}>

          <View style={styles.modalS}>
            <View style={{ flexDirection: 'row', marginBottom: 30 }}>
              <View style={{ width: '20%', alignItems: 'flex-start' }}>
                <Image
                  source={require('../../assets/logo/logo1.jpeg')}
                  style={{ width: 60, height: 60, borderRadius: 0 }}

                />
              </View>
              <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.textAddress}>Edit Nick Name</Text>
              </View>
              <View style={{ width: '20%' }}>
                <Text></Text>
              </View>

            </View>

            <KeyboardAwareScrollView style={{}}>
              <View style={styles.RegisterRows}>
                <Text style={styles.textstyle1}>
                  Old Value
                </Text>
                <View style={{ display: 'flex', flex: 2, flexDirection: 'row', width: 180 }}>
                  <View style={styles.inputView}>

                    <TextInput
                      editable={false}
                      style=
                      {styles.textinputstyle}
                      placeholder={this.state.NickName} />


                  </View>

                </View>

              </View>

              <View style={styles.RegisterRows}>
                <Text style={styles.textstyle1}>
                  New Value
                </Text>
                <View style={{ display: 'flex', flex: 2, flexDirection: 'row', width: 180 }}>
                  <View style={styles.inputView}>

                    <TextInput
                      onChangeText={(text) => { this.setState({ NickNameUpdated: text }) }}
                      style=
                      {styles.textinputstyle}
                      placeholder={'Enter new Nick Name'} />

                  </View>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </View>
        </Modal>


        {/* Phone Modal*/}
        <Modal animationType='slide'
          visible={this.state.PhoneModal}
          onRequestClose={() => {
            this.setState({ PhoneModal: false })
            this.state.phonevalid = this.phoneinput.current?.isValidNumber(this.state.phonevalue);
          }
          }
          style={styles.ModalView}>

          <View style={styles.modalS}>
            <View style={{ flexDirection: 'row', marginBottom: 30 }}>
              <View style={{ width: '20%', alignItems: 'flex-start' }}>
                <Image
                  source={require('../../assets/logo/logo1.jpeg')}
                  style={{ width: 60, height: 60, borderRadius: 0 }}

                />
              </View>
              <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.textAddress}>Edit Phone Number</Text>
              </View>
              <View style={{ width: '20%' }}>
                <Text></Text>
              </View>

            </View>

            <KeyboardAwareScrollView style={{}}>
              <View style={styles.RegisterRows}>
                <Text style={styles.textstyle1}>
                  Old Value
                </Text>
                <View style={{ display: 'flex', flex: 2, flexDirection: 'row', width: 180 }}>
                  <View style={styles.inputView}>

                    <TextInput
                      editable={false}
                      style=
                      {styles.textinputstyle}
                      placeholder={this.state.PhoneNumber} />


                  </View>

                </View>

              </View>

              <View style={styles.RegisterRows}>
                <Text style={styles.textstyle1}>
                  New Value
                </Text>
                <View style={{ display: 'flex', flex: 2, flexDirection: 'row', width: 180 }}>
                  <View style={styles.inputView}>

                    <PhoneInput
                      layout="second"
                      defaultCode="PS"
                      keyboardType="phone-pad"
                      ref={this.phoneinput}
                      onChangeText={text => {
                        this.setState({ phonevalue: text });
                      }}
                      onChangeFormattedText={(text) => {

                        this.setState({ PhoneNumberUpdated: text });


                      }

                      }


                      //  withShadow
                      placeholder='Enter'
                      containerStyle={{ backgroundColor: '#98a988', height: 40, overflow: 'hidden', borderRadius: 15, width: 210, paddingHorizontal: 0 }}
                      textContainerStyle={{ height: 47, backgroundColor: '#98a988', width: 200, borderRadius: 15 }}
                      codeTextStyle={{ fontSize: 15, fontFamily: 'SairaSemiCondensed-Regular', height: 30, backgroundColor: '#98a988' }}
                      textInputStyle={{ color: 'black', fontSize: 15, fontFamily: 'SairaSemiCondensed-Regular', backgroundColor: '#98a988', height: 47 }}
                    />


                  </View>

                </View>



              </View>
              <View style={[styles.RegisterRows, { height: 50 }]}>
                <Text style={styles.textstyle1}>

                </Text>
                <View style={[styles.inputView, { backgroundColor: '#bc9855', height: 50 }]}>
                  <TouchableOpacity style={[styles.buttonstyle, { paddingVertical: 10 }]}
                    onPress={() => {
                      this.state.phonevalid = this.phoneinput.current?.isValidNumber(this.state.phonevalue);
                      if (!this.state.phonevalid) {
                        this.showAlert("Phone Number", "Make sure Phone Number field is valid");
                      }
                      else {
                        this.showAlert("Phone Number", "Valid phone number");
                      }
                    }}

                  >

                    <Text style={styles.buttontext} >Check the validity</Text>
                  </TouchableOpacity>
                </View>
              </View>


            </KeyboardAwareScrollView>

          </View>
        </Modal>


        {/* Country Modal*/}
        <Modal animationType='slide'
          visible={this.state.CountryModal}
          onRequestClose={() => { this.setState({ CountryModal: false }) }
          }
          style={styles.ModalView}>
          {/* <View style={styles.cancelicon}>
            <Icon name='close' color="black" size={25} onPress={() => {
              this.setState({ CountryModal: false })
            }} />
          </View> */}
          <View style={styles.modalS}>
            <View style={{ flexDirection: 'row', marginBottom: 30 }}>
              <View style={{ width: '20%', alignItems: 'flex-start' }}>
                <Image
                  source={require('../../assets/logo/logo1.jpeg')}
                  style={{ width: 60, height: 60, borderRadius: 0 }}

                />
              </View>
              <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.textAddress}>Edit Country</Text>
              </View>
              <View style={{ width: '20%' }}>
                <Text></Text>
              </View>

            </View>

            <KeyboardAwareScrollView >
              <View style={styles.RegisterRows}>
                <Text style={styles.textstyle1}>
                  Old Value
                </Text>
                <View style={{ display: 'flex', flex: 2, flexDirection: 'row', width: 180 }}>
                  <View style={styles.inputView}>

                    <TextInput
                      editable={false}
                      style=
                      {styles.textinputstyle}
                      placeholder={this.state.Country} />


                  </View>

                </View>

              </View>

              <View style={styles.RegisterRows}>
                <Text style={styles.textstyle1}>
                  New Value
                </Text>
                <View style={{ display: 'flex', flex: 2, flexDirection: 'row', width: 180 }}>
                  <View style={styles.inputView}>

                    <CountryPicker

                      disable={false}
                      animationType={'slide'}
                      pickerTitle={'Country Picker'}
                      searchBarPlaceHolder={'Search......'}
                      showCountryNameWithFlag={true}

                      onSelect={(index) => {
                        this.setState({ CountryUpdated: index.name });
                      }}
                      placeholder={this.state.CountryUpdated}
                      containerStyle={{ width: '100%', textAlign: 'center', paddingHorizontal: 30, }}
                      textContainerStyle={{ width: '100%', textAlign: 'center', paddingHorizontal: 30, }}
                      style={{ width: 180, textAlign: 'center', alignContent: 'center' }}

                    />

                  </View>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </View>
        </Modal>

        {/* QD Modal*/}
        <Modal animationType='slide'
          visible={this.state.QDModal}
          onRequestClose={() => { this.setState({ QDModal: false }) }
          }
          style={styles.ModalView}>
          {/* <View style={styles.cancelicon}>
            <Icon name='close' color="black" size={25} onPress={() => {
              this.setState({ QDModal: false })
            }} />
          </View> */}
          <View style={styles.modalS}>
            <View style={{ flexDirection: 'row', marginBottom: 30 }}>
              <View style={{ width: '20%', alignItems: 'flex-start' }}>
                <Image
                  source={require('../../assets/logo/logo1.jpeg')}
                  style={{ width: 60, height: 60, borderRadius: 0 }}

                />
              </View>
              <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.textAddress}>Edit Qualification Degree</Text>
              </View>
              <View style={{ width: '20%' }}>
                <Text></Text>
              </View>

            </View>

            <KeyboardAwareScrollView >
              <View style={styles.RegisterRows}>
                <Text style={styles.textstyle1}>
                  Old Value
                </Text>
                <View style={{ display: 'flex', flex: 2, flexDirection: 'row', width: 180 }}>
                  <View style={styles.inputView}>

                    <TextInput
                      editable={false}
                      style=
                      {styles.textinputstyle}
                      placeholder={this.state.QualificationDegree} />


                  </View>

                </View>

              </View>

              <View style={styles.RegisterRows}>
                <Text style={styles.textstyle1}>
                  New Value
                </Text>
                <View style={{ display: 'flex', flex: 2, flexDirection: 'row', width: 180 }}>
                  <View style={styles.inputView}>

                    <SelectDropdown
                      dropdownBackgroundColor={"#98a988"}
                      buttonStyle={styles.textinputstyle}
                      styleInput={{ fontFamily: 'SairaSemiCondensed-Regular' }}
                      defaultButtonText={"Select"}
                      rowTextForSelection={""}
                      data={Degrees}
                      onSelect={(selectedItem, index) => {

                        this.setState({
                          QualificationDegreeUpdated: selectedItem
                        })

                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                      }}
                    />

                  </View>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </View>
        </Modal>


        {/* Bio Modal*/}
        <Modal animationType='slide'
          visible={this.state.BioModal}
          onRequestClose={() => { this.setState({ BioModal: false }) }
          }
          style={styles.ModalView}>
          {/* <View style={styles.cancelicon}>
            <Icon name='close' color="black" size={25} onPress={() => {
              this.setState({ BioModal: false })
            }} />
          </View> */}
          <View style={styles.modalS}>
            <View style={{ flexDirection: 'row', marginBottom: 30 }}>
              <View style={{ width: '20%', alignItems: 'flex-start' }}>
                <Image
                  source={require('../../assets/logo/logo1.jpeg')}
                  style={{ width: 60, height: 60, borderRadius: 0 }}

                />
              </View>
              <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.textAddress}>Edit Bio</Text>
              </View>
              <View style={{ width: '20%' }}>
                <Text></Text>
              </View>

            </View>

            <KeyboardAwareScrollView >
              <View style={[styles.RegisterRows, { height: 150 }]}>
                <Text style={styles.textstyle1}>
                  Old Value
                </Text>
                <View style={{ display: 'flex', flex: 2, flexDirection: 'row', width: 180 }}>
                  <View style={[styles.inputView, { height: 150 }]}>

                    <TextInput
                      editable={false}
                      multiline={true}
                      numberOfLines={10}
                      style=
                      {[styles.textinputstyle, { height: 150 }]}
                      value={this.state.Bio}
                    />


                  </View>

                </View>

              </View>

              <View style={[styles.RegisterRows, { height: 150 }]}>
                <Text style={styles.textstyle1}>
                  New Value
                </Text>
                <View style={{ display: 'flex', flex: 2, flexDirection: 'row', width: 180 }}>
                  <View style={[styles.inputView, { height: 150 }]}>

                    <TextInput style={[styles.textinputstyle, { height: 100, textAlign: 'auto' }]}
                      multiline={true}
                      numberOfLines={10}
                      onChangeText={(text) =>
                        // console.log(text)
                        this.setState({
                          BioUpdated: text
                        })
                      }
                      placeholder="Enter your Bio here" />

                  </View>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </View>
        </Modal>

        {/* Interested in Modal*/}
        <Modal animationType='slide'
          visible={this.state.InterestedInModal}
          onRequestClose={() => { this.setState({ InterestedInModal: false }) }
          }
          style={styles.ModalView}>
          {/* <View style={styles.cancelicon}>
            <Icon name='close' color="black" size={25} onPress={() => {
              this.setState({ InterestedInModal: false })
            }} />
          </View> */}
          <View style={styles.modalS1}>
            <View style={{ flexDirection: 'row', marginBottom: 30 }}>
              <View style={{ width: '20%', alignItems: 'flex-start' }}>
                <Image
                  source={require('../../assets/logo/logo1.jpeg')}
                  style={{ width: 60, height: 60, borderRadius: 0 }}

                />
              </View>
              <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.textAddress}>Edit Interests</Text>
              </View>
              <View style={{ width: '20%' }}>
                <Text></Text>
              </View>

            </View>

            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
              <View style={{ width: '100%', height: '100%', marginBottom: 50, paddingHorizontal: 10 }}>
                <View style={{ marginBottom: 15 }}>
                  <Text style={[styles.textStyle1, { fontFamily: 'SairaSemiCondensed-Bold', fontSize: 17, margin: 20 }]}>Choose the fields you are interested in:</Text>
                  {checkList.map(item => <CheckBoxItem key={item.id} label={item.name} onUpdate={this.onUpdate.bind(this, item)} />)}

                </View>

              </View>

            </KeyboardAwareScrollView>
          </View>
        </Modal>

        {/* Settings Modal */}
        <Modal animationType='slide'
          visible={this.state.SettingsModal}
          onRequestClose={() => { this.setState({ SettingsModal: false }) }}
          style={styles.ModalView}>
          {/* <View style={styles.cancelicon}>
            <Icon name='close' color="black" size={25} onPress={() => {
              // this.closeEditModal();
              this.setState({ SettingsModal: false, })
            }} />
          </View> */}
          <View style={styles.modalS}>
            <View style={{ flexDirection: 'row', marginBottom: 30 }}>
              <View style={{ width: '20%', alignItems: 'flex-start' }}>
                <Image
                  source={require('../../assets/logo/logo1.jpeg')}
                  style={{ width: 60, height: 60, borderRadius: 0 }}

                />
              </View>
              <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.textAddress}>Settings</Text>
              </View>
              <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>

              </View>

            </View>

            <SafeAreaView style={{ width: '100%', height: '100%', flex: 1 }}>
              {/* <ScrollView vertical showsVerticalScrollIndicator={false} style={{height:'100%'}}> */}

              <FlatList
                scrollEnabled
                vertical
                showsVerticalScrollIndicator={false}
                width={'100%'}
                height={'100%'}
                data={this.state.DataSettings}
                keyExtractor={(item) => item.id.toString()}
                renderItem={this.renderItemSettings}

                extraData={this.state.isRender}
              />



              {/* </ScrollView> */}

            </SafeAreaView >

          </View>
        </Modal>
        {/*About us Modal*/}
        <Modal animationType='slide'
          visible={this.state.AboutUsModal}
          onRequestClose={async () => {
            this.setState({ AboutUsModal: false })
          }
          }
          style={[styles.ModalView]}>
          <View style={[styles.MainView]}>

            <About />
          </View>
        </Modal>

        {/*Change Password Modal*/}
        <Modal animationType='slide'
          visible={this.state.ChangePasswordModal}
          onRequestClose={async () => {
            this.setState({ ChangePasswordModal: false })
          }
          }
          style={[styles.ModalView]}>
          <View style={[styles.MainView]}>

            <ChangePassword />
          </View>
        </Modal>

        {/* Add project Modal */}
        <Modal animationType='slide'
          visible={this.state.AddProjectModal}
          onRequestClose={() => {
            this.setState({
              AddProjectModal: false,
              isValid: false,
              errors: false,
              datetimevisible: false,
              date: "",
              ProjectName: "",
              ProjectMission: "",
              ProjectDescription: "",
              CustomerEmail: "",
              Budget: "",
              savedInfo: true,
              emailvalid: true,
            })
          }}
          style={styles.ModalView}>

          <View style={styles.modalS}>
            <View style={{ flexDirection: 'row', marginBottom: 30 }}>
              <View style={{ width: '20%', alignItems: 'flex-start' }}>
                <Image
                  source={require('../../assets/logo/logo1.jpeg')}
                  style={{ width: 60, height: 60, borderRadius: 0 }}

                />
              </View>
              <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.textAddress}>Add Project</Text>
              </View>
              <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>

              </View>

            </View>

            <SafeAreaView style={{ width: '100%', height: '100%', flex: 1 }}>
              {this.state.savedInfo ?
                // <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                  <View style={{ width: '100%', height: 600 }}>
                    <ProgressSteps progressBarColor="#98a988" completedProgressBarColor="#bc9855"
                      activeStepIconColor="#bfcfb2" completedStepIconColor="#bc9855"
                      activeStepIconBorderColor="#98a988"
                      labelFontFamily="SairaSemiCondensed-Regular" labelColor="black"
                      activeLabelColor="black" completedLabelColor="black"
                      disabledStepIconColor="#98a988" disabledStepNumColor="black"
                      completedCheckColor={this.state.stepColor}>
                      {/* onNext={this.onNextStep} errors={this.state.errors} */}

                      <ProgressStep label="Information"
                        nextBtnStyle={{ backgroundColor: '#bc9855', borderRadius: 15, width: 100, alignItems: 'center' }}
                        nextBtnTextStyle={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 15, color: "black" }}
                        onNext={() => {
                          if (
                            this.state.ProjectName !== "" &&
                            this.state.ProjectMission !== "" &&
                            this.state.ProjectDescription !== "") this.setState({ stepColor: 'white' })
                          else { this.setState({ stepColor: '#bc9855' }) }

                        }}
                      >
                        <KeyboardAwareScrollView enableOnAndroid
                                                    showsVerticalScrollIndicator={false}
                                                    behavior="padding" >
                        <View style={styles.RegisterRows}>
                          <Text style={[styles.textstyle1, { width: '40%', paddingHorizontal: 4 }]}>
                            Project Name
                          </Text>
                          <View style={{ display: 'flex', flex: 2, flexDirection: 'row', width: 180 }}>
                            <View style={[styles.inputView, { width: '60%' }]}>

                              <TextInput
                                style=
                                {styles.textinputstyle}
                                placeholder='Project Name'
                                onChangeText={(text) => this.setState({ ProjectName: text })}
                                value={this.state.ProjectName}
                              />


                            </View>

                          </View>

                        </View>

                        <View style={[styles.RegisterRows, { height: 100 }]}>
                          <Text style={[styles.textstyle1, { width: '40%', paddingHorizontal: 4 }]}>
                            Project Mission
                          </Text>
                          <View style={{ display: 'flex', flex: 2, flexDirection: 'row', width: 180 }}>
                            <View style={[styles.inputView, { height: 100, width: '60%' }]}>

                              <TextInput
                                multiline={true}
                                numberOfLines={5}
                                onChangeText={(text) => this.setState({ ProjectMission: text })}
                                style=
                                {[styles.textinputstyle, { height: 100 }]}
                                placeholder={'Project Mission'}
                                value={this.state.ProjectMission}
                              />

                            </View>
                          </View>


                        </View>

                        <View style={[styles.RegisterRows, { height: 150 }]}>
                          <Text style={[styles.textstyle1, { width: '40%', paddingHorizontal: 4 }]}>
                            Project Description
                          </Text>
                          <View style={{ display: 'flex', flex: 2, flexDirection: 'row', width: 180 }}>
                            <View style={[styles.inputView, { height: 150, width: '60%' }]}>

                              <TextInput
                                multiline={true}
                                numberOfLines={10}
                                onChangeText={(text) => { this.setState({ ProjectDescription: text }) }}
                                style=
                                {[styles.textinputstyle, { height: 150 }]}
                                placeholder={'Project Description'}
                                value={this.state.ProjectDescription} />

                            </View>
                          </View>


                        </View>
                        </KeyboardAwareScrollView>
                      </ProgressStep>

                      <ProgressStep label="Details" onSubmit={async () => {
                        if (this.state.CustomerEmail === "" ||
                          this.state.date === "" ||
                          this.state.Budget === "" ||
                          this.state.ProjectName === "" ||
                          this.state.ProjectMission === "" ||
                          this.state.ProjectDescription === "") this.showAlert('Add Project', "Make sure all fields are full")
                        else {

                          if (this.state.emailvalid) {
                            this.setState({ savedInfo: false })
                            ///////send notification to the admin to approve before creation
                            ///if accepted then add immedietly
                            await this.saveProjectInfo();
                            this.setState({
                              numProject: this.state.numProject + 1,
                              savedInfo: true,
                              isValid: false,
                              errors: false,
                              datetimevisible: false,
                              date: "",
                              ProjectName: "",
                              ProjectMission: "",
                              ProjectDescription: "",
                              CustomerEmail: "",
                              Budget: "",
                              emailvalid: true,
                              AddProjectModal: false,
                            })
                            await this.loadProfile()
                            // this.props.navigation.push('Project', { Email: this.state.Email, ProjectID: this.state.ProjectID })
                          }
                          else {
                            this.setState({ emailvalid: true })
                            this.showAlert('Customer Email', 'Make sure customer email is a valid email')
                          }
                        }
                      }}
                        previousBtnStyle={{ backgroundColor: '#bc9855', borderRadius: 15, width: 100, alignItems: 'center' }}
                        previousBtnTextStyle={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 15, color: "black" }}
                        nextBtnStyle={{ backgroundColor: '#bc9855', borderRadius: 15, width: 100, alignItems: 'center' }}
                        nextBtnTextStyle={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 15, color: "black" }}
                      >
                        <KeyboardAwareScrollView enableOnAndroid
                                                    showsVerticalScrollIndicator={false}
                                                    behavior="padding" >
                        <View style={styles.RegisterRows}>
                          <Text style={[styles.textstyle1, { width: '40%', paddingHorizontal: 4 }]}>
                            Customer Email
                          </Text>
                          <View style={{ display: 'flex', flex: 2, flexDirection: 'row', width: 180 }}>
                            <View style={[styles.inputView, { width: '60%' }]}>

                              <TextInput
                                style=
                                {styles.textinputstyle}
                                placeholder='Customer Email'
                                onChangeText={(text) => this.validate(text)}
                                value={this.state.CustomerEmail}
                                keyboardType='email-address'
                                textContentType='emailAddress'
                              />


                            </View>

                          </View>

                        </View>

                        <View style={[styles.RegisterRows]}>
                          <Text style={[styles.textstyle1, { width: '40%', paddingHorizontal: 4 }]}>
                            Project Budget ($)
                          </Text>
                          <View style={{ display: 'flex', flex: 2, flexDirection: 'row', width: 180 }}>
                            <View style={[styles.inputView, { width: '60%' }]}>

                              <TextInput
                                keyboardType='number-pad'
                                onChangeText={(text) => this.setState({ Budget: text })}
                                style=
                                {[styles.textinputstyle]}
                                placeholder={'Project Budget'}
                                value={this.state.Budget}
                              />

                            </View>
                          </View>


                        </View>

                        <View style={[styles.RegisterRows]}>
                          <Text style={[styles.textstyle1, { width: '40%', paddingHorizontal: 4 }]}>
                            Project Deadline
                          </Text>
                          <View style={{ display: 'flex', flex: 2, flexDirection: 'row', width: 180 }}>
                            <View style={[styles.inputView, { width: '60%' }]}>

                              < TouchableOpacity style={[styles.inputView, { width: '60%' }]}
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
                        </KeyboardAwareScrollView>
                      </ProgressStep>
                    </ProgressSteps>
                  </View>
                // </KeyboardAwareScrollView>
                :
                <Loading />
              }
            </SafeAreaView >

          </View>
        </Modal>

        {/* Project Modal */}
        <Modal animationType='slide'
          visible={this.state.ProjectModal}
          onRequestClose={async () => {
            this.setState({ ProjectModal: false, loaded: false })
            await this.loadProfile();
            this.setState({ loaded: true })
          }}
          style={[styles.ModalView]}>
          {/* <View style={styles.cancelicon}>
            <Icon name='close' color="black" size={25} onPress={() => {
              // this.closeEditModal();
              this.setState({ ProjectModal: false, })
            }} />
          </View> */}
          <View style={[styles.MainView, { width: '100%', marginHorizontal: 0, paddingTop: 20 }]}>
            {!this.state.loadProject ? <Loading /> :

              <View style={[styles.MainView1, { padding: 0 }]}>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                  <View style={{ width: '20%', alignItems: 'flex-start' }}>
                  </View>
                  <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.textAddress}>{this.state.ProjectName1}</Text>
                  </View>
                  <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>

                  </View>

                </View>
                <KeyboardAwareScrollView style={[styles.MainView1,]}>
                  <SafeAreaView style={{ width: '100%', height: '100%', flex: 1 }}>
                    <View style={{ width: '100%', height: '100%' }}>
                      <LinearGradient
                        colors={['#bc9855', '#bc9855', '#bc9855']}
                        style={{
                          left: 0,
                          right: 0,
                          height: 10,
                          width: '100%',
                          marginTop: 5,
                          marginBottom:5,
                        }}
                      ></LinearGradient>
                      {/* Mission */}
                      <View style={{ width: '100%' }}>
                        <View style={{ flexDirection: 'row' }}>
                          <View style={{ width: '20%' }}></View>
                          <View style={{ width: '60%', justifyContent: 'center' }}>
                            <Text style={[styles.text, { textAlign: 'center', fontSize: 16, }]}>Mission</Text>

                          </View>
                          <View style={{ width: '20%', justifyContent: 'flex-start', alignItems: 'flex-end', paddingRight: 10 }}>
                            <Icon
                              name="square-edit-outline"
                              style={styles.trailing}
                              size={20}
                              color="#666666"
                              onPress={() => { this.EditMission() }}
                            /></View>
                        </View>
                        <Text style={[styles.textinterest, { paddingHorizontal: 10 }]}>{this.state.ProjectMission1}</Text>
                        <LinearGradient
                          colors={['#bc9855', '#bc9855', '#bc9855']}
                          style={{
                            left: 0,
                            right: 0,
                            height: 1,
                            width: '100%',
                            marginTop: 5,
                          }}
                        ></LinearGradient>
                      </View>

                      {/* Desc */}
                      <View style={{ width: '100%' }}>
                        <View style={{ flexDirection: 'row' }}>
                          <View style={{
                            width: '20%', flexDirection: 'row',
                            justifyContent: 'flex-start', alignItems: 'flex-end', paddingLeft: 10
                          }}>
                            <Icon
                              name="arrow-expand"
                              style={styles.trailing}
                              size={20}
                              color="#666666"
                              onPress={() => { this.showDescription() }}
                            />

                          </View>
                          <View style={{ width: '60%', justifyContent: 'center' }}>
                            <Text style={[styles.text, { textAlign: 'center', fontSize: 16, }]}>Description</Text>

                          </View>
                          <View style={{
                            width: '20%', flexDirection: 'row',
                            justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: 10
                          }}>
                            <Icon
                              name="square-edit-outline"
                              style={styles.trailing}
                              size={20}
                              color="#666666"
                              onPress={() => { this.EditDescription() }}
                            />

                          </View>
                        </View>
                        {/* <Text style={styles.textinterest}>{this.state.ProjectMission}</Text> */}
                        <LinearGradient
                          colors={['#bc9855', '#bc9855', '#bc9855']}
                          style={{
                            left: 0,
                            right: 0,
                            height: 1,
                            width: '100%',
                            marginTop: 5,
                          }}
                        ></LinearGradient>
                      </View>
                      {/* Budget */}
                      <View style={{ width: '100%', }}>
                        <View style={{ flexDirection: 'row' }}>
                          <View style={{
                            width: '20%', flexDirection: 'row',
                            justifyContent: 'flex-start', alignItems: 'flex-end', paddingLeft: 10
                          }}>
                            <Feather
                              name="divide-square"
                              style={styles.trailing}
                              size={20}
                              color="#666666"
                              onPress={() => { this.divideBudget() }}
                            />

                          </View>
                          <View style={{ width: '60%', justifyContent: 'center' }}>
                            <Text style={[styles.text, { textAlign: 'center', fontSize: 16, }]}>Budget</Text>

                          </View>
                          <View style={{ width: '20%', justifyContent: 'flex-start', alignItems: 'flex-end', paddingRight: 10 }}>
                            <Icon
                              name="square-edit-outline"
                              style={styles.trailing}
                              size={20}
                              color="#666666"
                              onPress={() => { this.EditBudget() }}
                            /></View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={[styles.text, { marginTop: 10 }]}>Total = </Text>
                          <Text style={[styles.textinterest, { textAlign: 'center' }]}>{this.state.ProjectBudget1} $</Text>
                          <Text style={[styles.text, { marginTop: 10 }]}>   Remaining = </Text>
                          <Text style={[styles.textinterest, { textAlign: 'center' }]}>{this.state.RemainingBudget} $</Text>
                        </View>


                      </View>
                      <LinearGradient
                        colors={['#bc9855', '#bc9855', '#bc9855']}
                        style={{
                          left: 0,
                          right: 0,
                          height: 1,
                          width: '100%',
                          marginTop: 5,
                        }}
                      ></LinearGradient>
                      {/* deadline */}
                      <View style={{ width: '100%', }}>
                        <View style={{ flexDirection: 'row' }}>
                          <View style={{ width: '20%' }}></View>
                          <View style={{ width: '60%', justifyContent: 'center' }}>
                            <Text style={[styles.text, { textAlign: 'center', fontSize: 16, }]}>DeadLine</Text>

                          </View>
                          <View style={{ width: '20%', justifyContent: 'flex-start', alignItems: 'flex-end', paddingRight: 10 }}>
                            <Icon
                              name="square-edit-outline"
                              style={styles.trailing}
                              size={20}
                              color="#666666"
                              onPress={() => { this.EditDeadLine() }}
                            /></View>
                        </View>
                        <Text style={[styles.textinterest, { textAlign: 'center' }]}>{this.state.ProjectDeadLine1} </Text>
                        <LinearGradient
                          colors={['#bc9855', '#bc9855', '#bc9855']}
                          style={{
                            left: 0,
                            right: 0,
                            height: 1,
                            width: '100%',
                            marginTop: 5,
                          }}
                        ></LinearGradient>
                      </View>
                      {/* team members */}
                      <View style={{ width: '100%', }}>
                        <View style={{ flexDirection: 'row' }}>
                          <View style={{ width: '20%' }}></View>
                          <View style={{ width: '60%', justifyContent: 'center' }}>
                            <Text style={[styles.text, { textAlign: 'center', fontSize: 16, }]}>Team Members</Text>

                          </View>
                          <View style={{ width: '20%', justifyContent: 'flex-start', alignItems: 'flex-end', paddingRight: 10 }}>
                            <Icon
                              name="square-edit-outline"
                              style={styles.trailing}
                              size={20}
                              color="#666666"
                              onPress={() => this.EditTeamMembers()}
                            // onPress={() => { this.props.navigation.navigate('AddPersonToProject', { Email: this.state.Email, ProjectID: this.state.ProjectID }) }}
                            /></View>
                        </View>
                        <View style={{ width: '100%',  flex: 1 }}>
                          <FlatList

                            showsHorizontalScrollIndicator={false}
                            horizontal
                            width={'100%'}
                            // height={'100%'}
                            keyExtractor={(item) => item._id.toString()}
                            data={this.state.TeamMembers}
                            renderItem={this.funcProject}

                          />
                        </View>
                        <LinearGradient
                          colors={['#bc9855', '#bc9855', '#bc9855']}
                          style={{
                            left: 0,
                            right: 0,
                            height: 1,
                            width: '100%',
                            marginTop: 5,
                          }}
                        ></LinearGradient>
                      </View>


                      {/* Tasks */}
                      <View style={{ width: '100%', }}>
                        <View style={{ flexDirection: 'row' }}>
                          <View style={{ width: '20%' }}></View>
                          <View style={{ width: '60%', justifyContent: 'center' }}>
                            <Text style={[styles.text, { textAlign: 'center', fontSize: 16, }]}>Tasks</Text>

                          </View>
                          <View style={{ width: '20%', justifyContent: 'flex-start', alignItems: 'flex-end', paddingRight: 10 }}>
                            <Icon
                              name="square-edit-outline"
                              style={styles.trailing}
                              size={20}
                              color="#666666"
                              onPress={() => { this.EditTasks() }}
                            /></View>
                        </View>
                        <View style={{ width: '100%',  flex: 1 }}>
                          <FlatList

                            showsHorizontalScrollIndicator={false}
                            horizontal
                            width={'100%'}
                            // height={'100%'}
                            keyExtractor={(item) => item._id.toString()}
                            data={this.state.Tasks1}
                            renderItem={this.funcProjectTasks}

                          />
                        </View>
                        <LinearGradient
                          colors={['#bc9855', '#bc9855', '#bc9855']}
                          style={{
                            left: 0,
                            right: 0,
                            height: 1,
                            width: '100%',
                            marginTop: 5,
                          }}
                        ></LinearGradient>
                      </View>

                    </View>
                  </SafeAreaView >
                </KeyboardAwareScrollView>

              </View>

            }

          </View>
        </Modal>

        {/*Mission Modal*/}
        <Modal animationType='slide'
          visible={this.state.MissionUpdateModal}
          onRequestClose={() => { this.setState({ MissionUpdateModal: false }) }
          }
          style={styles.ModalView}>
          {/* <View style={styles.cancelicon}>
            <Icon name='close' color="black" size={25} onPress={() => {
              this.setState({ MissionUpdateModal: false })
            }} />
          </View> */}
          <View style={styles.MainView}>
            {this.state.MissionSaved ? <View style={styles.modalS}>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ width: '20%', alignItems: 'flex-start' }}>

                </View>
                <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.textAddress}>Edit Mission</Text>
                </View>
                <View style={{ width: '20%' }}>
                  <Text></Text>
                </View>

              </View>
              <LinearGradient
                colors={['#bc9855', '#bc9855', '#bc9855']}
                style={{
                  left: 0,
                  right: 0,
                  height: 10,
                  width: '100%',
                  marginTop: 5,
                  marginBottom:5,
                }}
              ></LinearGradient>

              <KeyboardAwareScrollView style={{}}>

                <View style={[styles.RegisterRows, { height: '100%', flexDirection: 'column' }]}>
                  <Text style={styles.textstyle1}>
                    Old value
                  </Text>
                  {/* <View style={{display:'flex', flex:2,flexDirection:'column', width:180}}> */}
                  <View style={[styles.inputView, { height: 200, width: '100%' }]}>

                    <Text>
                      {this.state.ProjectMission1}
                    </Text>

                  </View>
                  {/* </View>     */}


                </View>

                <View style={[styles.RegisterRows, { height: '100%', flexDirection: 'column' }]}>
                  <Text style={styles.textstyle1}>
                    New Value
                  </Text>
                  {/* <View style={{display:'flex', flex:2,flexDirection:'row', width:180}}> */}
                  <View style={[styles.inputView, { height: 200, width: '100%' }]}>

                    <TextInput
                      multiline={true}
                      numberOfLines={5}
                      onChangeText={(text) => this.setState({ MissionUpdated: text })}
                      style=
                      {[styles.textinputstyle, { height: '100%', width: '100%', textAlign: 'center' }]}
                      placeholder={'New Project Mission'}
                    // value={this.state.MissionUpdated}
                    />

                  </View>
                  {/* </View>              */}
                </View>

                <View style={[styles.RegisterRows]}>
                  <TouchableOpacity style={{
                    width: '100%', height: 50, backgroundColor: '#bc9855',
                    marginTop: 10, borderRadius: 15, justifyContent: 'center', alignItems: 'center'
                  }}

                    onPress={async () => {
                      if (this.state.MissionUpdated === '') {
                        this.showAlert('Mission', 'Nothing Updated')
                        this.setState({ MissionUpdateModal: false })
                      }
                      else {
                        this.setState({ MissionSaved: false })
                        await this.UpdateMission();
                        this.showAlert('Mission', 'Mission Updated')
                        this.setState({ MissionUpdateModal: false, MissionSaved: true })
                      }

                    }}
                  >
                    <Text style={[styles.text, { fontSize: 15 }]}>Save</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAwareScrollView>
            </View> : <Loading />}
          </View>
        </Modal>

        {/* show desc */}
        <Modal animationType='slide'
          visible={this.state.DescriptionShowModal}
          onRequestClose={() => { this.setState({ DescriptionShowModal: false }) }
          }
          style={styles.ModalView}>
          {/* <View style={styles.cancelicon}>
            <Icon name='close' color="black" size={25} onPress={() => {
              this.setState({ DescriptionShowModal: false })
            }} />
          </View> */}
          <View style={styles.modalS}>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <View style={{ width: '20%', alignItems: 'flex-start' }}>

              </View>
              <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.textAddress}>Description</Text>
              </View>
              <View style={{ width: '20%' }}>
                <Text></Text>
              </View>

            </View>
            <LinearGradient
              colors={['#bc9855', '#bc9855', '#bc9855']}
              style={{
                left: 0,
                right: 0,
                height: 10,
                width: '100%',
                marginTop: 5,
                marginBottom:5
              }}
            ></LinearGradient>
            <KeyboardAwareScrollView style={{ width: '100%', marginBottom: 5 }}>

              <View style={[{ height: '100%', flexDirection: 'column', width: '100%', marginTop: 20 }]}>
                <Text style={{ fontFamily: 'SairaSemiCondensed-Regular', fontSize: 14, color: 'black' }}>
                  {this.state.ProjectDescription1}
                </Text>
              </View>
            </KeyboardAwareScrollView>
          </View>
        </Modal>

        {/*Edit Desc Modal*/}
        <Modal animationType='slide'
          visible={this.state.DescriptionUpdatedModal}
          onRequestClose={() => { this.setState({ DescriptionUpdatedModal: false }) }
          }
          style={styles.ModalView}>
          {/* <View style={styles.cancelicon}>
            <Icon name='close' color="black" size={25} onPress={() => {
              this.setState({ DescriptionUpdatedModal: false })
            }} />
          </View> */}
          <View style={styles.MainView}>
            {this.state.DescriptionSaved ? <View style={styles.modalS}>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ width: '20%', alignItems: 'flex-start' }}>

                </View>
                <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.textAddress}>Edit Description</Text>
                </View>
                <View style={{ width: '20%' }}>
                  <Text></Text>
                </View>

              </View>
              <LinearGradient
                colors={['#bc9855', '#bc9855', '#bc9855']}
                style={{
                  left: 0,
                  right: 0,
                  height: 10,
                  width: '100%',
                  marginTop: 5,
                  marginBottom:5
                }}
              ></LinearGradient>
              <KeyboardAwareScrollView style={{}}>

                <View style={{ height: '80%', flexDirection: 'column', width: '100%', marginTop: 20 }}>

                  <View style={[styles.inputView, { height: 550, width: '100%' }]}>

                    <TextInput
                      scrollEnabled
                      multiline={true}
                      numberOfLines={10}
                      onChangeText={(text) => this.setState({ DescriptionUpdated: text })}
                      style=
                      {[styles.textinputstyle, { height: '100%', width: '100%', }]}
                      // placeholder={'New Project Mission'} 
                      value={this.state.DescriptionUpdated}
                    />

                  </View>
                  {/* </View>              */}


                  <View style={[{ height: '30%', width: '100%', marginTop: 15 }]}>
                    <TouchableOpacity style={{
                      width: '100%', height: 50, backgroundColor: '#bc9855',
                      marginTop: 10, borderRadius: 15, justifyContent: 'center', alignItems: 'center'
                    }}

                      onPress={async () => {
                        if (this.state.DescriptionUpdated === this.state.ProjectDescription1) {
                          this.showAlert('Description', 'Nothing Updated')
                          this.setState({ DescriptionUpdatedModal: false })
                        }
                        else {
                          this.setState({ DescriptionSaved: false })
                          await this.UpdateDescription();
                          this.showAlert('Description', 'Description Updated')
                          this.setState({ DescriptionUpdatedModal: false, DescriptionSaved: true })
                        }

                      }}
                    >
                      <Text style={[styles.text, { fontSize: 15 }]}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </View> : <Loading />}
          </View>
        </Modal>

        {/*Budget Modal*/}
        <Modal animationType='slide'
          visible={this.state.BudgetUpdatedModal}
          onRequestClose={() => { this.setState({ BudgetUpdatedModal: false }) }
          }
          style={styles.ModalView}>
          {/* <View style={styles.cancelicon}>
            <Icon name='close' color="black" size={25} onPress={() => {
              this.setState({ BudgetUpdatedModal: false })
            }} />
          </View> */}
          <View style={styles.MainView}>
            {this.state.BudgetSaved ? <View style={styles.modalS}>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ width: '20%', alignItems: 'flex-start' }}>

                </View>
                <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.textAddress}>Edit Budget</Text>
                </View>
                <View style={{ width: '20%' }}>
                  <Text></Text>
                </View>

              </View>
              <LinearGradient
                colors={['#bc9855', '#bc9855', '#bc9855']}
                style={{
                  left: 0,
                  right: 0,
                  height: 10,
                  width: '100%',
                  marginTop: 5,
                  marginBottom:5
                }}
              ></LinearGradient>
              <KeyboardAwareScrollView style={{}}>

                <View style={[styles.RegisterRows, { height: '100%', flexDirection: 'row' }]}>
                  <Text style={styles.textstyle1}>
                    Old value
                  </Text>
                  {/* <View style={{display:'flex', flex:2,flexDirection:'column', width:180}}> */}
                  <View style={[styles.inputView,]}>

                    <Text>
                      {this.state.ProjectBudget1}
                    </Text>

                  </View>
                  {/* </View>     */}


                </View>

                <View style={[styles.RegisterRows, { height: '100%', flexDirection: 'row' }]}>
                  <Text style={styles.textstyle1}>
                    New Value
                  </Text>
                  {/* <View style={{display:'flex', flex:2,flexDirection:'row', width:180}}> */}
                  <View style={[styles.inputView]}>
                    <TextInput
                      keyboardType='number-pad'
                      onChangeText={(text) => this.setState({ BudgetUpdated: text })}
                      style=
                      {[styles.textinputstyle]}
                      placeholder={'New Project Budget'}
                    // value={this.state.Budget}
                    />


                  </View>
                  {/* </View>              */}
                </View>

                <View style={[styles.RegisterRows, { height: '100%', flexDirection: 'row' }]}>
                  <Text style={styles.textstyle1}></Text>
                  <TouchableOpacity style={[styles.inputView, {
                    width: '100%', backgroundColor: '#bc9855',
                    borderRadius: 15, justifyContent: 'center', alignItems: 'center'
                  }]}

                    onPress={async () => {
                      if (this.state.BudgetUpdated === '') {
                        this.showAlert('Budget', 'Nothing Updated')
                        this.setState({ BudgetUpdatedModal: false })
                      }
                      else {
                        this.setState({ BudgetSaved: false })
                        await this.UpdateBudget();
                        this.showAlert('Budget', 'Budget Updated')
                        this.setState({ BudgetUpdatedModal: false, BudgetSaved: true })
                      }

                    }}
                  >
                    <Text style={[styles.text, { fontSize: 15 }]}>Save</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAwareScrollView>
            </View> : <Loading />}
          </View>
        </Modal>

        {/*Divide Budget Modal*/}
        <Modal animationType='slide'
          visible={this.state.DivideBudgetModal}
          onRequestClose={() => { this.setState({ DivideBudgetModal: false }) }
          }
          style={styles.ModalView}>

          <View style={styles.MainView}>
            {this.state.DivideBudgetSaved ? <View style={styles.modalS}>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ width: '20%', alignItems: 'flex-start' }}>

                </View>
                <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.textAddress}>Divide Budget</Text>
                </View>
                <View style={{ width: '20%' }}>
                  <Text></Text>
                </View>

              </View>
              <LinearGradient
                colors={['#bc9855', '#bc9855', '#bc9855']}
                style={{
                  left: 0,
                  right: 0,
                  height: 10,
                  width: '100%',
                  marginTop: 5,
                  marginBottom:5
                }}
              ></LinearGradient>
              {/* <KeyboardAwareScrollView style={{}}> */}
              <SafeAreaView style={[styles.MainView, { width: '100%', height: '100%', marginBottom: 0 }]}>
                <View style={{ alignItems: 'center', width: '100%' }}>

                  <Text style={[styles.textstyle1, { width: '100%', textAlign: 'center' }]}>
                    Divide the project budget on the tasks
                  </Text>
                </View>

                {/* <View style={{ paddingTop: 0, height: '85%', width: '100%', marginHorizontal: 0 }}> */}
                <View style={{ paddingTop: 0,width: '100%', marginHorizontal: 0 }}>
                  <FlatList
                    // height={'50%'}
                    showsVerticalScrollIndicator={false}
                    data={this.state.Tasks1}
                    keyExtractor={(item) => item._id.toString()}
                    ItemSeparatorComponent={this.ItemSeparatorView}
                    renderItem={this.ItemView}
                  />

                </View>



                {/* <View style={{ height: 40, flexDirection: 'row',justifyContent:'center',alignItems:'center' }}>
                  <TouchableOpacity style={[styles.inputView, {
                    width: '100%', backgroundColor: '#bc9855',
                    borderRadius: 15, justifyContent: 'center', alignItems: 'center'
                  }]}

                    onPress={async () => {
                      console.log(this.state.Tasks1)

                    }}
                  >
                    <Text style={[styles.text, { fontSize: 15 }]}>Save</Text>
                  </TouchableOpacity>
                </View> */}
              </SafeAreaView>
              {/* </KeyboardAwareScrollView> */}
            </View> : <Loading />}
          </View>
        </Modal>

        {/*DeadLine Modal*/}
        <Modal animationType='slide'
          visible={this.state.DeadLineUpdatedModal}
          onRequestClose={() => { this.setState({ DeadLineUpdatedModal: false }) }
          }
          style={styles.ModalView}>
          {/* <View style={styles.cancelicon}>
            <Icon name='close' color="black" size={25} onPress={() => {
              this.setState({ DeadLineUpdatedModal: false })
            }} />
          </View> */}
          <View style={styles.MainView}>
            {this.state.DeadLineSaved ? <View style={[styles.modalS,{marginHorizontal:0}]}>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ width: '20%', alignItems: 'flex-start' }}>

                </View>
                <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.textAddress}>Edit DeadLine</Text>
                </View>
                <View style={{ width: '20%' }}>
                  <Text></Text>
                </View>

              </View>

              <KeyboardAwareScrollView style={{}}>
                <LinearGradient
                  colors={['#bc9855', '#bc9855', '#bc9855']}
                  style={{
                    left: 0,
                    right: 0,
                    height: 10,
                    width: '100%',
                    marginTop: 5,
                    marginBottom:5
                  }}
                ></LinearGradient>
                <View style={[styles.RegisterRows, { height: '100%', flexDirection: 'row' }]}>
                  <Text style={styles.textstyle1}>
                    Old value
                  </Text>
                  {/* <View style={{display:'flex', flex:2,flexDirection:'column', width:180}}> */}
                  <View style={[styles.inputView,]}>

                    <Text>
                      {this.state.ProjectDeadLine1}
                    </Text>

                  </View>
                  {/* </View>     */}


                </View>

                <View style={[styles.RegisterRows, { height: '100%', flexDirection: 'row' }]}>
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

                <View style={[styles.RegisterRows, { height: '100%', flexDirection: 'row' }]}>
                  <Text style={styles.textstyle1}></Text>
                  <TouchableOpacity style={[styles.inputView, {
                    width: '100%', backgroundColor: '#bc9855',
                    borderRadius: 15, justifyContent: 'center', alignItems: 'center'
                  }]}

                    onPress={async () => {
                      if (this.state.DeadLineUpdated === '') {
                        this.showAlert('DeadLine', 'Nothing Updated')
                        this.setState({ DeadLineUpdatedModal: false })
                      }
                      else {
                        this.setState({ DeadLineSaved: false })
                        await this.UpdateDeadLine();
                        this.showAlert('DeadLine', 'DeadLine Updated')
                        this.setState({ DeadLineUpdatedModal: false, DeadLineSaved: true })
                      }

                    }}
                  >
                    <Text style={[styles.text, { fontSize: 15 }]}>Save</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAwareScrollView>
            </View> : <Loading />}
          </View>
        </Modal>

        {/*Add person to project Modal*/}
        <Modal animationType='slide'
          visible={this.state.TeamMembersUpdateModal}
          onRequestClose={async () => {
            this.setState({ TeamMembersUpdateModal: false })
            await this.getProjectInfo(this.state.ProjectID);

            this.setState({ loadProject: true })
          }
          }
          style={[styles.ModalView, { marginLeft: 20 }]}>
          <View style={[styles.MainView, { paddingLeft: 10, paddingTop: 20 }]}>
            {/* {console.log("ds"+this.state.ProjectName)} */}
            <AddPersonToPreject
              Email={this.state.Email}
              ProjectID={this.state.ProjectID}
              NickName={this.state.NickName}
              ProjectName={this.state.ProjectName1}
              ProjectMission={this.state.ProjectMission1}
            />
          </View>
        </Modal>

        {/*update Task to project Modal*/}
        <Modal animationType='slide'
          visible={this.state.TaskUpdateModal}
          onRequestClose={async () => {
            this.setState({ TaskUpdateModal: false, loadProject: false })
            await this.loadTasks()
            await this.loadTasks1(this.state.ProjectID);
            this.setState({ loadProject: true })
          }
          }
          style={[styles.ModalView]}>
          <View style={styles.ModalView}>
            {!this.state.loadTasks ? <Loading /> : <View style={[styles.MainView]}>
              <AddTask1
                Email={this.state.Email}
                CustomerEmail={this.state.CustomerEmail1}
                NickName={this.state.NickName}
                ProjectName={this.state.ProjectName1}
                ProjectID={this.state.ProjectID}
                setStateModal={() => {
                  // await this.getTeamMembers();
                  this.setState({ AddTaskModal: true })
                }}
                loadTasks={this.state.Tasks}
                EditTasks={this.EditTask}
                ModalVisible={async () => {
                  this.setState({ loadTasks: false })
                  await this.loadTasks();
                  await this.loadTasks1(this.state.ProjectID);
                  this.setState({ loadTasks: true })
                }}
              />
            </View>}
          </View>

        </Modal>

        {/*Add Task to project sub Modal*/}
        <Modal animationType='slide'
          visible={this.state.AddTaskModal}
          onRequestClose={async () => {
            this.setState({ AddTaskModal: false })
          }
          }
          style={[styles.ModalView]}>
          <View style={[styles.MainView]}>
            <AddTask
              Email={this.state.Email}
              NickName={this.state.NickName}
              ProjectName={this.state.ProjectName1}
              ProjectID={this.state.ProjectID}
              setStateModal={() => this.setState({ AddTaskModal: true })}
              TeamMembers={this.state.TeamMembers}
              ModalVisible={async () => {
                this.setState({ AddTaskModal: false, loadTasks: false })
                await this.loadTasks();
                this.setState({ loadTasks: true })
              }}
            />
          </View>
        </Modal>

        {/*Edit Task Modal*/}
        <Modal animationType='slide'
          visible={this.state.EditTaskModal}
          onRequestClose={async () => {
            this.setState({ EditTaskModal: false })
          }
          }
          style={[styles.ModalView]}>
          <View style={[styles.MainView]}>

            <EditTask
              Email={this.state.Email}
              NickName={this.state.NickName}
              ProjectName={this.state.ProjectName1}
              ProjectID={this.state.ProjectID}
              Task={this.state.TaskItem}
              TeamMembers={this.state.TeamMembers}
              ModalVisible={async () => {
                this.setState({ EditTaskModal: false, loadTasks: false })
                await this.loadTasks();
                this.setState({ loadTasks: true })
              }}
            />
          </View>
        </Modal>

        {/*Profile for others Modal*/}
        <Modal animationType='slide'
          visible={this.state.ProfileForOthersModal}
          onRequestClose={async () => {
            this.setState({ ProfileForOthersModal: false })
          }
          }
          style={[styles.ModalView]}>
          <View style={[styles.MainView]}>

            <ProfileForOthers
              Email={this.state.ProfileForOthersEmail}
              GuestEmail={this.state.Email}
              GuestNickName={this.state.NickName}
            />
          </View>
        </Modal>

        <DateTimePickerModal
          isVisible={this.state.showPickerMeeting}
          onConfirm={this.handlePicker1}
          onCancel={this.hidePicker1}
          mode="datetime"
          is24Hour={false}
        />
        {/*Add meeting Modal*/}
        <Modal animationType='slide'
          visible={this.state.AddMeetingModal}
          onRequestClose={() => { this.setState({ AddMeetingModal: false }) }
          }
          style={styles.ModalView}>
          <View style={styles.MainView}>
            {this.state.MeetingSaved ? <View style={[styles.MainView, { width: '100%' }]}>

              <View style={{ width: '100%', height: 50, backgroundColor: "#bc9855", justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 20, color: 'black' }}>Add Meeting Link</Text>
              </View>

              <KeyboardAwareScrollView style={{}}>

                <View style={[styles.RegisterRows, { height: '100%', flexDirection: 'row' }]}>
                  <Text style={styles.textstyle1}>
                    Date
                  </Text>
                  {/* <View style={{display:'flex', flex:2,flexDirection:'row', width:180}}> */}
                  <View style={[styles.inputView, { height: 50 }]}>
                    <Text
                      onPress={this.showPicker1}
                      style={[styles.dateInput,]}>

                      {this.state.MeetingDate !== ""
                        ? moment(this.state.MeetingDate).calendar()
                        : "Meeting date"}
                      {/* {console.log(this.state.MeetingDate)} */}
                    </Text>


                  </View>
                  {/* </View>              */}
                </View>
                <View style={[styles.RegisterRows, { height: '100%', flexDirection: 'row' }]}>
                  <Text style={styles.textstyle1}>
                    Zoom Link
                  </Text>
                  {/* <View style={{display:'flex', flex:2,flexDirection:'row', width:180}}> */}
                  <View style={[styles.inputView, { height: 200 }]}>
                    <TextInput
                      value={this.state.MeetingLink}
                      onChangeText={(text) => {

                        this.setState({ MeetingLink: text })
                        // console.log(this.state.MeetingLink)
                      }
                      }
                      style=
                      {[styles.textinputstyle, { height: '100%', width: '100%' }]}
                      placeholder={'Zoom Meeting Link'}
                      multiline={true}
                      numberOfLines={20}
                    // value={this.state.Budget}
                    />


                  </View>
                  {/* </View>              */}
                </View>


                <View style={[styles.RegisterRows, { height: '100%', flexDirection: 'row' }]}>
                  <Text style={styles.textstyle1}></Text>
                  <TouchableOpacity style={[styles.inputView, {
                    width: '100%', backgroundColor: '#bc9855',
                    borderRadius: 15, justifyContent: 'center', alignItems: 'center'
                  }]}

                    onPress={async () => {
                      if (this.state.MeetingLink === "" || this.state.MeetingDate === "") {
                        this.showAlert('Meeting Link', 'Make sure all information are filled')
                        // this.setState({ AddMeetingModal: false })
                      }
                      else {
                        
                        console.log(this.state.CustomerEmailMeeting)
                        if (await this.isValidURL(this.state.MeetingLink)) {
                          // this.showAlert('j',this.isValidURL(this.state.MeetingLink))
                          this.setState({ MeetingSaved: false })
                          await this.updateMeetingLink();
                          console.log("save" + this.state.MeetingDate)
                          this.showAlert('Meeting Link', 'Meeting Added')
                          this.setState({ AddMeetingModal: false, MeetingSaved: true })
                          // this.getTeamMembers()
                          this.state.TeamMembersMeeting.map(member => {

                            if (member.Accepted) {
                              firestore()
                                .collection('NOTIFICATIONS')
                                .doc(member.MemberEmail)
                                .collection('NOTIFICATIONS')
                                .add({
                                  Boolean: false,
                                  Type: "Meeting",
                                  SenderNickName: this.state.NickName,
                                  message: "Meeting link added to " + this.state.ProjectNameMeeting + ", Date " + this.state.MeetingDate,
                                  projectId: member.ProjectID,
                                  // leaderEmail: item.Email,
                                  Date: new Date().toDateString(),
                                  createdAt: new Date().getTime(),
                                  user: {
                                    _id: this.state.Email,
                                    email: this.state.Email
                                  }
                                });
                            }

                          })
                          if(this.state.CustomerEmailMeeting!==this.state.Email){
                            firestore()
                                .collection('NOTIFICATIONS')
                                .doc(this.state.CustomerEmailMeeting)
                                .collection('NOTIFICATIONS')
                                .add({
                                  Boolean: false,
                                  Type: "Meeting",
                                  SenderNickName: this.state.NickName,
                                  message: "Meeting link added to your project " + this.state.ProjectNameMeeting + ", Date " + this.state.MeetingDate,
                                  projectId: this.state.ProjectIDFromMeeting,
                                  // leaderEmail: item.Email,
                                  Date: new Date().toDateString(),
                                  createdAt: new Date().getTime(),
                                  user: {
                                    _id: this.state.Email,
                                    email: this.state.Email
                                  }
                                });
                          }

                        }
                        else {
                          this.showAlert('Link', 'This is not a Link')
                        }


                      }

                    }}
                  >
                    <Text style={[styles.text, { fontSize: 15 }]}>Save</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAwareScrollView>
            </View> : <Loading />}
          </View>
        </Modal>
        {/* As Customer Modal */}
        <Modal animationType='slide'
          visible={this.state.AskAsCustomerModal}
          onRequestClose={() => {
            this.setState({ AskAsCustomerModal: false, })
          }}
          style={styles.ModalView}>

          <View style={styles.MainView}>

            <AskAsCustomer 
            Email={this.state.Email}
            NickName={this.state.NickName}
            />

          </View>
        </Modal>
        {/* View Modal */}
        <Modal animationType='slide'
          visible={this.state.ViewModal}
          onRequestClose={() => { this.setState({ ViewModal: false }) }
          }
          style={styles.ModalView}>

          <View style={[styles.modalS, { padding: 0, paddingTop: 0 }]}>
            <View style={{ width: '100%', height: 50, backgroundColor: "#bc9855", justifyContent: 'center', alignItems: 'center', }}>
              <Text style={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 20, color: 'black' }}>View project details</Text>
            </View>
            <View style={[{ height: '100%', flexDirection: 'column', width: '100%', }]}>
              <ViewProject
                ProjectID={this.state.ProjectIDView}
                ProjectName={this.state.ProjectNameView}
                Email={this.state.Email}
                NickName={this.state.NickName}
              />
            </View>
            {/* </KeyboardAwareScrollView> */}
          </View>
        </Modal>


        {/* real Chat Modal */}
        <Modal animationType='slide'
          visible={this.state.ChatScreenModal}
          onRequestClose={() => { this.setState({ ChatScreenModal: false }) }
          }
          style={styles.ModalView}>

          <View style={{ backgroundColor: "#bfcfb2", width: '100%', height: "100%" }}>
            <View style={{
              width: '100%', height: 50, backgroundColor: '#bc9855', justifyContent: 'center',
              alignItems: 'center', flexDirection: 'row'
            }}>
              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', width: '15%', paddingLeft: 10 }}>
                <Icon
                  name='backburger'
                  size={30}
                  color={'black'}
                  onPress={() => this.setState({ ChatScreenModal: false })}
                />
              </View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', width: '85%' }}>
                <Text
                  // onPress={() => this.setState({ chatModal: false })}
                  style={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 18, color: 'black' }}>{this.state.dstNickName}</Text>

              </View>
            </View>
            <ChatScreen
              srcEmail={this.state.Email}
              dstEmail={this.state.dstEmail}
              srcNickName={this.NickName}
              dstNickName={this.state.dstNickName}
            />
          </View>
        </Modal>

        {/* Group Chat Modal */}
        <Modal animationType='slide'
          visible={this.state.ProjectChatModal}
          onRequestClose={() => { this.setState({ ProjectChatModal: false }) }
          }
          style={styles.ModalView}>

          <View style={{ backgroundColor: "#bfcfb2", width: '100%', height: "100%" }}>

            <ProjectChatGroup
              ProjectId={this.state.ProjectIDChat}
              ProjectName={this.state.ProjectNameChat}
              Email={this.state.Email}
              NickName={this.state.NickName}
              ProjectChatGroup={() => this.setState({ ProjectChatModal: false })}
            //  messages = 
            />
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({

  MainView: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    //  justifyContent: 'center',
    backgroundColor: '#bfcfb2',
  },
  MainView1: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    //  alignItems: 'center',
    //  justifyContent: 'center',
    backgroundColor: '#bfcfb2',
  },


  button: {

    width: 120,
    height: 120,
    backgroundColor: '#bc9855',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 125 / 2,
    borderWidth: 0.7,
    overflow: 'hidden',

  },
  dateInput:
  {
    marginHorizontal: 10,
    fontFamily: 'SairaSemiCondensed-Regular',
    paddingTop: 5
  },

  text: {
    // fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
    opacity: 0.8,
    color: "black",
    fontFamily: 'SairaSemiCondensed-Bold'

  },
  text1: {
    // fontWeight: 'bold',
    fontSize: 10,
    letterSpacing: 1,
    opacity: 0.8,
    color: "black",
    fontFamily: 'SairaSemiCondensed-Regular',
    marginLeft: 4

  },
  textAddress: {
    fontSize: 20,
    letterSpacing: 1,
    opacity: 0.8,
    color: "black",
    fontFamily: 'SairaSemiCondensed-Bold'
  },

  textBio: {
    fontSize: 14,
    letterSpacing: 0.5,
    // opacity: 0.8,
    color: "black",
    fontFamily: 'SairaSemiCondensed-Regular'
  },
  interestedInimage: {
    width: '100%',
    height: '70%'
  },
  textinterest: {
    fontSize: 14,
    // opacity: 0.8,
    color: "black",
    fontFamily: 'SairaSemiCondensed-Regular',
    marginTop: 10

  },
  textItems: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'SairaSemiCondensed-Regular',
  },
  sview: {
    height: 35,
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: "#bc9855",
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cancelicon: {
    paddingTop: 1,
    paddingLeft: "94%",
    backgroundColor: '#bfcfb2',
  },

  modalS: {
    alignItems: "center",
    alignSelf: "center",
    display: 'flex',
    backgroundColor: '#bfcfb2',
    height: "100%",
    width: '100%',
    //  justifyContent:'center'
    padding: 20
  },
  modalS1: {
    alignItems: "center",
    alignSelf: "center",
    display: 'flex',
    backgroundColor: '#bfcfb2',
    height: "100%",
    paddingTop: 20
  },

  ModalView: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bfcfb2',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#bc9855",
    alignItems: 'flex-start',
    width: '100%',
    // height:'100%'
    marginBottom: 25
  },
  imageView: {
    // flex:1,
    width: '100%',
    height: '100%',
    backgroundColor: null,
    // justifyContent:'center',
    alignItems: 'center',
    // padding:10
  },



  buttonText: {

    color: 'black',
    textAlign: 'center',
    // fontWeight: 'bold',
    opacity: 0.3,
    fontSize: 15,
    fontFamily: "SairaSemiCondensed-Bold",
    // color: '#fff'

  },
  textStyle1: {
    fontFamily: 'SairaSemiCondensed-Regular',
    fontSize: 13,
    color: 'black',
    textAlign: 'center'
  },
  textstyle1: {

    width: '30%',
    height: 40,
    fontFamily: 'SairaSemiCondensed-Regular',
    fontSize: 15,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  RegisterRows: {
    display: 'flex',
    height: 40,
    flex: 2,
    flexDirection: 'row',
    marginLeft: 20,
    marginVertical: 15,
    alignItems: 'center',
    width: 350,
  },

  inputView: {
    Width: '70%',
    height: 40,
    backgroundColor: '#98a988',
    borderRadius: 15,
    overflow: 'hidden',
    paddingHorizontal: 4,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'

  },
  textinputstyle: {
    width: 180,
    paddingHorizontal: 4,
    height: 47,
    fontFamily: 'SairaSemiCondensed-Regular',
    fontSize: 15,
    textDecorationLine: 'none',
    backgroundColor: "#98a988"
  },


  buttonstyle: {
    width: '100%',
    height: '100%',
    display: 'flex',
    allignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    // paddingVertical:5,
    backgroundColor: '#bc9855',
    borderRadius: 100,
    elevation: 2,
    shadowColor: '#0000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    marginTop: 0,
    marginBottom: 0
  },
  buttontext: {
    color: 'black',
    textAlign: 'center',
    // fontWeight: 'bold',
    fontSize: 15,
    fontFamily: "SairaSemiCondensed-Regular",
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    // alignContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#bc9855',
    borderRadius: 30,
    elevation: 5
  },
  fabIcon: {

    fontSize: 40,
    color: 'white',
    fontFamily: 'SairaSemiCondensed-Regular',
    textAlign: 'center'
  },
  listTile: {
    marginTop: 10,
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // marginHorizontal: 2,
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: "#bfcfb2",
    // padding: 10,
    borderWidth: 1,
    borderColor: "#98a988",
    paddingHorizontal: 5
  },
  leading1: {
    width: "20%",
    alignItems: 'flex-start'
  },
  title1: {
    // width: "60%",
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'SairaSemiCondensed-Regular'
  },
  trailing1: {
    width: "20%",
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // paddingRight: 10,
    flexDirection: 'row',

  }

});


export default Profile;

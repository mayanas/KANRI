
import { serverLink } from '../serverLink';
import React, { Component } from 'react';
import {
  View, StyleSheet, FlatList, TouchableOpacity,
  Text,
  LogBox,
  BackHandler,
  SafeAreaView,
  RefreshControl,
  Modal,
  Alert
} from 'react-native';
import { List, Divider } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../Components/Loading';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
// import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Require cycle:']);
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import ProfileForOthers from './ProfileForOthers';
import email from 'react-native-email'
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import ChatScreen from './ChatScreen';
import moment from "moment";
class Invitations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: this.props.route.params.Email,
      NickName: '',
      id: '',
      loading: false,
      RequestToJoin: [],
      InviteToProject: [],
      InviteToDoProject: [],
      refreshing: false,
      ProfileForOthersEmail: '',
      ProfileForOthersModal: false,
      dstNickName: '',
      dstEmail: '',
      ChatScreenModal: false,
      DescModal: false,
      DescCustomer: '',
      ProjectNameCustomer: ''

    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  UNSAFE_componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {

    this.props.navigation.navigate('Home', { Email: this.props.route.params.Email });
    return true;
  }

  loadInvitations = async () => {

    const response = await fetch(serverLink + "/getNickName1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify(
        {
          Email: this.state.Email
        }
      )
    });
    const body = await response.json();
    if (body == "null") {
      this.showAlert("Warning", "Email does not exist!")
    } else {
      // console.log(body);
      this.setState({ NickName: body.NickName, id: body._id })
    }

    // console.log(this.state.Email)
    await fetch(serverLink + "/getInvitations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          RecieverEmail: this.state.Email,
        }
      )
    }).then(resp => {

      return resp.json();
    }).then(async jsonresponse => {
      console.log("hhhjjhh" + jsonresponse)
      if (jsonresponse !== "null") {
        await this.setState(
          {
            RequestToJoin: [],
            InviteToProject: [],
            InviteToDoProject: [],
          }
        )
        jsonresponse.map(item => {
          if (item.Type === "RequestToJoin") {
            console.log("re")
            this.setState({ RequestToJoin: [...this.state.RequestToJoin, item] })
          }
          else if (item.Type === "InviteToProject") {
            console.log("to")
            this.setState({ InviteToProject: [...this.state.InviteToProject, item] })
          }
          else if (item.Type === "InviteToDoProject") {
            console.log("fghjkl;")
            this.setState({ InviteToDoProject: [...this.state.InviteToDoProject, item] })
          }
        })


      }
      else {
        console.log('null')
      }

    }).catch(error => {
      console.log(error);
    });

    console.log(this.state.InviteToProject)




  }
  async componentDidMount() {
    this.setState({ loading: true })
    await this.loadInvitations();
    this.setState({ loading: false })

  }
  wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.loadInvitations();
    this.setState({ refreshing: false });
  }
  ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: '100%',
          width: 11,
          backgroundColor: '#bfcfb2',
        }}
      />
    );
  };
  handleEmail = (to) => {
    email(to, {
      subject: 'From Kanri',
      body: ''
    }).catch(console.error)
  }
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
  acceptRequest = async (item) => {
    let arr = [];
    this.state.InviteToProject.map(
      item1 => {
        if (item1._id !== item._id) {
          arr = [...arr, item1]
        }
      }

    )
    this.setState({ InviteToProject: arr })
    await fetch(serverLink + "/InviteToJoinDone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          item: item
        }
      )
    }).then(resp => {
      return resp.json();
    }).then(jsonresponse => {
      if (jsonresponse === "done") {
        this.showAlert(this.state.NickName, "You are part of " + item.ProjectName + " team")
      }

    }).catch(error => {
      console.log(error);
    });
    ////////////////////////////Notification////////////////////////////////
    firestore()
      .collection('NOTIFICATIONS')
      .doc(item.SenderEmail)
      .collection('NOTIFICATIONS')
      .add({
        Boolean: false,
        Type: "AcceptInviteToJoin",
        SenderNickName: this.state.NickName,
        message: "Accepted your invitation to join " + item.ProjectName + "",
        projectId: item.ProjectID,
        // leaderEmail: item.Email,
        Date: new Date().toDateString(),
        createdAt: new Date().getTime(),
        user: {
          _id: this.state.Email,
          email: this.state.Email
        }
      });


  }
  DeclineRequest = async (item) => {
    let arr = [];
    this.state.InviteToProject.map(
      item1 => {
        if (item1._id !== item._id) {
          arr = [...arr, item1]
        }
      }

    )
    this.setState({ InviteToProject: arr })
    await fetch(serverLink + "/InviteToJoinDecline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          item: item
        }
      )
    }).then(resp => {
      return resp.json();
    }).then(jsonresponse => {
      if (jsonresponse === "done") {
        this.showAlert(this.state.NickName, "The invitation to " + item.ProjectName + " has been declined")
      }

    }).catch(error => {
      console.log(error);
    });
    ////////////////////////////Notification////////////////////////////////
    firestore()
      .collection('NOTIFICATIONS')
      .doc(item.SenderEmail)
      .collection('NOTIFICATIONS')
      .add({
        Boolean: false,
        Type: "DeclineInviteToJoin",
        SenderNickName: this.state.NickName,
        message: "Declined your invitation to join " + item.ProjectName + "",
        projectId: item.ProjectID,
        // leaderEmail: item.Email,
        Date: new Date().toDateString(),
        createdAt: new Date().getTime(),
        user: {
          _id: this.state.Email,
          email: this.state.Email
        }
      });

  }
  ItemInviteToJoin = ({ item }) => {
    // console.log('hello')

    return (
      // Flat List Item
      <View style={{
        width: 360,
        height: 250,
        backgroundColor: '#98a988',
        borderColor: "#bc9855",
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingTop: 10,
        // flexDirection:''
      }}>
        <View style={{ flexDirection: 'row', paddingBottom: 4 }}>
          <Text style={styles.maintext}>Nick Name</Text>
          <Text style={styles.subtext}>{item.SenderNickName}</Text>
          <TouchableOpacity style={styles.ItemIcon}
            onPress={async () => {
              await this.setState({ ProfileForOthersEmail: item.SenderEmail })
              this.setState({ ProfileForOthersModal: true, })
              // console.log(this.state.ProfileForOthersEmail)
            }}
          >
            <Icon
              name='account-arrow-left-outline'
              color='black'
              size={22}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
          <Text style={styles.maintext}>Email</Text>
          <Text style={styles.subtext}>{item.SenderEmail}</Text>
          <TouchableOpacity style={styles.ItemIcon}
            onPress={async () => {
              this.handleEmail(item.SenderEmail)
            }}
          >
            <Icon
              name='email-outline'
              color='black'
              size={22}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', paddingBottom: 4 }}>
          <Text style={styles.maintext}>Project</Text>
          <Text style={styles.subtext}>{item.ProjectName}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 30, height: 50 }}>
          <Text style={styles.maintext}>Mission</Text>
          <Text style={[styles.subtext, { width: '75%' }]}>{item.ProjectMission}</Text>
        </View>

        <View style={{ flexDirection: 'row', paddingBottom: 4, alignItems: 'flex-end' }}>
          <Text style={{ width: '25%' }}></Text>
          <TouchableOpacity style={{
            backgroundColor: '#bc9855', width: '23%', height: 30,
            alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginRight: '2%',
            borderWidth: 0.5, flexDirection: 'row'
          }}
            onPress={async () => {
              await this.setState({ dstEmail: item.SenderEmail, dstNickName: item.SenderNickName });
              this.setState({ ChatScreenModal: true })
            }}>
            <Ionicons
              name="chatbubbles-outline"
              size={15}
              color={'black'} />
            <Text style={[styles.subtext, { textAlign: 'center' }]}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            backgroundColor: '#bc9855', width: '23%', height: 30,
            alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginRight: '2%',
            borderWidth: 0.5, flexDirection: 'row'
          }}
            onPress={async () => {
              await this.acceptRequest(item)
            }}>
            <Ionicons
              name="checkmark-done"
              size={15}
              color={'black'} />
            <Text style={[styles.subtext, { textAlign: 'center' }]}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: '#bc9855', width: '23%', height: 30,
            alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginRight: '2%',
            borderWidth: 0.5, flexDirection: 'row'
          }}
            onPress={async () => {
              await this.DeclineRequest(item)
            }}>
            <Icon
              name="minus-circle-outline"
              size={15}
              color={'black'} />
            <Text style={[styles.subtext, { textAlign: 'center' }]}>Decline</Text>
          </TouchableOpacity>
        </View>

      </View>

    );


  };
  acceptRequestToJoin = async (item) => {
    let arr = [];
    this.state.RequestToJoin.map(
      item1 => {
        if (item1._id !== item._id) {
          arr = [...arr, item1]
        }
      }

    )
    this.setState({ RequestToJoin: arr })
    await fetch(serverLink + "/RequestToJoinDone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          item: item,
          id: this.state.id,
        }
      )
    }).then(resp => {
      return resp.json();
    }).then(jsonresponse => {
      if (jsonresponse === "done") {
        this.showAlert(this.state.NickName, "is now part of " + item.ProjectName + " team")
      }

    }).catch(error => {
      console.log(error);
    });
    ////////////////////////////Notification////////////////////////////////
    firestore()
      .collection('NOTIFICATIONS')
      .doc(item.SenderEmail)
      .collection('NOTIFICATIONS')
      .add({
        Boolean: false,
        Type: "AcceptRequestToJoin",
        SenderNickName: this.state.NickName,
        message: "Accepted your request to join " + item.ProjectName + "",
        projectId: item.ProjectID,
        // leaderEmail: item.Email,
        Date: new Date().toDateString(),
        createdAt: new Date().getTime(),
        user: {
          _id: this.state.Email,
          email: this.state.Email
        }
      });


  }
  DeclineRequestToJoin = async (item) => {
    let arr = [];
    this.state.RequestToJoin.map(
      item1 => {
        if (item1._id !== item._id) {
          arr = [...arr, item1]
        }
      }

    )
    this.setState({ RequestToJoin: arr })
    await fetch(serverLink + "/RequestToJoinDecline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          _id: item._id
        }
      )
    }).then(resp => {
      return resp.json();
    }).then(jsonresponse => {
      // console.log("fffffffffffffffffffffffffffffff" + jsonresponse)
      if (jsonresponse === "done") {
        this.showAlert(this.state.NickName, item.SenderNickName + " request to join " + item.ProjectName + " has been declined")
      }

    }).catch(error => {
      console.log(error);
    });
    ////////////////////////////Notification////////////////////////////////
    firestore()
      .collection('NOTIFICATIONS')
      .doc(item.SenderEmail)
      .collection('NOTIFICATIONS')
      .add({
        Boolean: false,
        Type: "DeclineRequestToJoin",
        SenderNickName: this.state.NickName,
        message: "Declined your request to join " + item.ProjectName + "",
        projectId: item.ProjectID,
        // leaderEmail: item.Email,
        Date: new Date().toDateString(),
        createdAt: new Date().getTime(),
        user: {
          _id: this.state.Email,
          email: this.state.Email
        }
      });

  }
  ItemRequestToJoin = ({ item }) => {
    // console.log('hello')

    return (
      // Flat List Item
      <View style={{
        width: 360,
        height: 250,
        backgroundColor: '#98a988',
        borderColor: "#bc9855",
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingTop: 10,
        // flexDirection:''
      }}>
        <View style={{ flexDirection: 'row', paddingBottom: 4 }}>
          <Text style={styles.maintext}>Nick Name</Text>
          <Text style={styles.subtext}>{item.SenderNickName}</Text>
          <TouchableOpacity style={styles.ItemIcon}
            onPress={async () => {
              await this.setState({ ProfileForOthersEmail: item.SenderEmail })
              this.setState({ ProfileForOthersModal: true, })
              // console.log(this.state.ProfileForOthersEmail)
            }}
          >
            <Icon
              name='account-arrow-left-outline'
              color='black'
              size={22}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
          <Text style={styles.maintext}>Email</Text>
          <Text style={styles.subtext}>{item.SenderEmail}</Text>
          <TouchableOpacity style={styles.ItemIcon}
            onPress={async () => {
              this.handleEmail(item.SenderEmail)
            }}
          >
            <Icon
              name='email-outline'
              color='black'
              size={22}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', paddingBottom: 4, marginBottom: 30, height: 70 }}>
          <Text style={styles.maintext}>Project</Text>
          <Text style={styles.subtext}>{item.ProjectName}</Text>
        </View>
        {/* <View style={{ flexDirection: 'row', marginBottom: 30, height: 50 }}>
          <Text style={styles.maintext}>Mission</Text>
          <Text style={[styles.subtext, { width: '75%' }]}>{item.ProjectMission}</Text>
        </View> */}

        <View style={{ flexDirection: 'row', paddingBottom: 4, alignItems: 'flex-end', }}>
          <Text style={{ width: '25%' }}></Text>
          <TouchableOpacity style={{
            backgroundColor: '#bc9855', width: '23%', height: 30,
            alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginRight: '2%',
            borderWidth: 0.5, flexDirection: 'row'
          }}
            onPress={async () => {
              await this.setState({ dstEmail: item.SenderEmail, dstNickName: item.SenderNickName });
              this.setState({ ChatScreenModal: true })
            }}>
            <Ionicons
              name="chatbubbles-outline"
              size={15}
              color={'black'} />
            <Text style={[styles.subtext, { textAlign: 'center' }]}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            backgroundColor: '#bc9855', width: '23%', height: 30,
            alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginRight: '2%',
            borderWidth: 0.5, flexDirection: 'row'
          }}
            onPress={async () => {
              await this.acceptRequestToJoin(item)
            }}>
            <Ionicons
              name="checkmark-done"
              size={15}
              color={'black'} />
            <Text style={[styles.subtext, { textAlign: 'center' }]}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: '#bc9855', width: '23%', height: 30,
            alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginRight: '2%',
            borderWidth: 0.5, flexDirection: 'row'
          }}
            onPress={async () => {
              await this.DeclineRequestToJoin(item)
            }}>
            <Icon
              name="minus-circle-outline"
              size={15}
              color={'black'} />
            <Text style={[styles.subtext, { textAlign: 'center' }]}>Decline</Text>
          </TouchableOpacity>
        </View>

      </View>

    );


  };
  acceptCustomer = async (item) => {
    let arr = [];
    this.state.InviteToDoProject.map(
      item1 => {
        if (item1._id !== item._id) {
          arr = [...arr, item1]
        }
      }

    )
    this.setState({ InviteToDoProject: arr })
    await fetch(serverLink + "/InviteToDoProjectDone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          item: item,
          CreationTime: new Date()
        }
      )
    }).then(resp => {
      return resp.json();
    }).then(jsonresponse => {
      if (jsonresponse === "done") {
        this.showAlert(this.state.NickName, "Project" + item.ProjectName + " has been created")
      }

    }).catch(error => {
      console.log(error);
    });
    ////////////////////////////Notification////////////////////////////////
    firestore()
      .collection('NOTIFICATIONS')
      .doc(item.SenderEmail)
      .collection('NOTIFICATIONS')
      .add({
        Boolean: false,
        Type: "AcceptInviteToDoJoin",
        SenderNickName: this.state.NickName,
        message: "Accepted your invitation to be the leader of your project" + item.ProjectName + ", the project has been created",
        // projectId: item.ProjectID,
        // leaderEmail: item.Email,
        Date: new Date().toDateString(),
        createdAt: new Date().getTime(),
        user: {
          _id: this.state.Email,
          email: this.state.Email
        }
      });

  }
  DeclineCustomer = async (item) => {
    let arr = [];
    this.state.InviteToDoProject.map(
      item1 => {
        if (item1._id !== item._id) {
          arr = [...arr, item1]
        }
      }

    )
    this.setState({ InviteToDoProject: arr })
    await fetch(serverLink + "/InviteToDoProjectDecline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          _id: item._id
        }
      )
    }).then(resp => {
      return resp.json();
    }).then(jsonresponse => {
      if (jsonresponse === "done") {
        this.showAlert(this.state.NickName, "The invitation to " + item.ProjectName + " has been declined")
      }

    }).catch(error => {
      console.log(error);
    });
    ////////////////////////////Notification////////////////////////////////
    firestore()
      .collection('NOTIFICATIONS')
      .doc(item.SenderEmail)
      .collection('NOTIFICATIONS')
      .add({
        Boolean: false,
        Type: "DeclineInviteToDoProject",
        SenderNickName: this.state.NickName,
        message: "Declined your invitation to be the leader of project " + item.ProjectName + "",
        // leaderEmail: item.Email,
        Date: new Date().toDateString(),
        createdAt: new Date().getTime(),
        user: {
          _id: this.state.Email,
          email: this.state.Email
        }
      });

  }
  ItemInviteToDoProject = ({ item }) => {
    return (
      // Flat List Item
      <View style={{
        width: 360,
        height: 270,
        backgroundColor: '#98a988',
        borderColor: "#bc9855",
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingTop: 10,
        // flexDirection:''
      }}>
        <View style={{ flexDirection: 'row', paddingBottom: 4 }}>
          <Text style={styles.maintext}>Nick Name</Text>
          <Text style={styles.subtext}>{item.SenderNickName}</Text>
          <TouchableOpacity style={styles.ItemIcon}
            onPress={async () => {
              await this.setState({ ProfileForOthersEmail: item.SenderEmail })
              this.setState({ ProfileForOthersModal: true, })
              // console.log(this.state.ProfileForOthersEmail)
            }}
          >
            <Icon
              name='account-arrow-left-outline'
              color='black'
              size={22}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
          <Text style={styles.maintext}>Email</Text>
          <Text style={styles.subtext}>{item.SenderEmail}</Text>
          <TouchableOpacity style={styles.ItemIcon}
            onPress={async () => {
              this.handleEmail(item.SenderEmail)
            }}
          >
            <Icon
              name='email-outline'
              color='black'
              size={22}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', paddingBottom: 4 }}>
          <Text style={styles.maintext}>Project</Text>
          <Text style={styles.subtext}>{item.ProjectName}</Text>
          <TouchableOpacity style={styles.ItemIcon}
            onPress={async () => {
              this.setState({ DescModal: true, DescCustomer: item.ProjectDescription, ProjectNameCustomer: item.ProjectName })
            }}
          >
            <Ionicons
              name='expand'
              color='black'
              size={22}
            />
          </TouchableOpacity>

        </View>
        <View style={{ flexDirection: 'row', marginBottom: 4, height: 50 }}>
          <Text style={styles.maintext}>Mission</Text>
          <Text style={[styles.subtext, { width: '75%' }]}>{item.ProjectMission}</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingBottom: 4 }}>
          <Text style={styles.maintext}>Budget</Text>
          <Text style={styles.subtext}>{item.ProjectBudget} $</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingBottom: 4 }}>
          <Text style={styles.maintext}>DeadLine</Text>
          <Text style={styles.subtext}>{item.ProjectDeadLine} </Text>
        </View>

        <View style={{ flexDirection: 'row', paddingBottom: 4, alignItems: 'flex-end' }}>
          <Text style={{ width: '25%' }}></Text>
          <TouchableOpacity style={{
            backgroundColor: '#bc9855', width: '23%', height: 30,
            alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginRight: '2%',
            borderWidth: 0.5, flexDirection: 'row'
          }}
            onPress={async () => {
              await this.setState({ dstEmail: item.SenderEmail, dstNickName: item.SenderNickName });
              this.setState({ ChatScreenModal: true })
            }}>
            <Ionicons
              name="chatbubbles-outline"
              size={15}
              color={'black'} />
            <Text style={[styles.subtext, { textAlign: 'center' }]}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            backgroundColor: '#bc9855', width: '23%', height: 30,
            alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginRight: '2%',
            borderWidth: 0.5, flexDirection: 'row'
          }}
            onPress={async () => {
              await this.acceptCustomer(item)
            }}>
            <Ionicons
              name="checkmark-done"
              size={15}
              color={'black'} />
            <Text style={[styles.subtext, { textAlign: 'center' }]}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: '#bc9855', width: '23%', height: 30,
            alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginRight: '2%',
            borderWidth: 0.5, flexDirection: 'row'
          }}
            onPress={async () => {
              await this.DeclineCustomer(item)
            }}>
            <Icon
              name="minus-circle-outline"
              size={15}
              color={'black'} />
            <Text style={[styles.subtext, { textAlign: 'center' }]}>Decline</Text>
          </TouchableOpacity>
        </View>

      </View>

    );
  }
  render() {

    return (
      <View style={styles.MainView}>
        <SafeAreaView style={styles.MainView}>

          <SafeAreaView style={styles.container}>
            <View style={{ width: '100%', height: 50, backgroundColor: "#bc9855", justifyContent: 'center', alignItems: 'center', }}>
              <Text style={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 20, color: 'black' }}>Invitations</Text>
            </View>
            {this.state.loading ? <Loading /> :
              <SafeAreaView style={{ height: '100%', width: '100%', flex: 1, alignItems: 'center' }}>
                <ScrollView
                  vertical
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled
                  style={{ height: '100%' }}
                  refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
                  }>
                  {/* requests to join */}
                  <SafeAreaView>
                    <View style={[styles.AddressView, { borderBottomWidth: this.state.RequestToJoin.length ? 0 : 1, }]}>
                      <Text style={styles.AddressText}>Requests to join your projects</Text>
                    </View>
                    <View style={{ width: '90%', flex: 1, alignItems: 'center', marginHorizontal: '5%' }}>
                      <FlatList
                        contentContainerStyle={this.state.RequestToJoin.length <= 1 ? { width: '100%' } : {}}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        width={'100%'}
                        data={this.state.RequestToJoin}
                        keyExtractor={(item, index) => item._id.toString()}
                        ItemSeparatorComponent={this.ItemSeparatorView}
                        enableEmptySections={true}
                        renderItem={this.ItemRequestToJoin}

                      />
                    </View>
                  </SafeAreaView>
                  {/* invitations to join projects */}
                  <SafeAreaView>
                    <View style={[styles.AddressView, { borderBottomWidth: this.state.InviteToProject.length ? 0 : 1, }]}>
                      <Text style={styles.AddressText}>Invitations to join projects</Text>
                    </View>
                    <View style={{ width: '90%', flex: 1, alignItems: 'center', marginLeft: '5%', marginRight: '5%' }}>
                      <FlatList
                        contentContainerStyle={this.state.InviteToProject.length <= 1 ? { width: '100%' } : {}}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        width={'100%'}
                        data={this.state.InviteToProject}
                        keyExtractor={(item, index) => item._id.toString()}
                        ItemSeparatorComponent={this.ItemSeparatorView}
                        enableEmptySections={true}
                        renderItem={this.ItemInviteToJoin}

                      />
                    </View>
                  </SafeAreaView>
                  {/* invitations from cunstomers */}
                  <SafeAreaView style={{ paddingBottom: 20 }}>
                    <View style={[styles.AddressView, { borderBottomWidth: this.state.InviteToDoProject.length ? 0 : 1, }]}>
                      <Text style={styles.AddressText}>Invitations from customers</Text>
                    </View>
                    <View style={{ width: '90%', flex: 1, alignItems: 'center', marginHorizontal: '5%' }}>
                      <FlatList
                        contentContainerStyle={this.state.InviteToDoProject.length <= 1 ? { width: '100%' } : {}}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        width={'100%'}
                        data={this.state.InviteToDoProject}
                        keyExtractor={(item, index) => item._id.toString()}
                        ItemSeparatorComponent={this.ItemSeparatorView}
                        enableEmptySections={true}
                        renderItem={this.ItemInviteToDoProject}

                      />
                    </View>
                  </SafeAreaView>
                </ScrollView>
              </SafeAreaView>}
          </SafeAreaView>



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

          {/* chat screen modal */}
          <Modal animationType='slide'
            visible={this.state.ChatScreenModal}

            transparent={true}
            onRequestClose={async () => {
              console.log('onrequest')
              this.setState({ ChatScreenModal: false })
            }}
            style={styles.ModalView}>


            <View style={{ backgroundColor: "#bfcfb2", width: '100%', height: "100%", }}>
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
                srcNickName={this.state.NickName}
                dstNickName={this.state.dstNickName}
              />
            </View>
          </Modal>

          {/* desc modal */}
          <Modal
            animationType='slide'
            visible={this.state.DescModal}
            onRequestClose={async () => {
              this.setState({ DescModal: false })
            }
            }
            style={[styles.ModalView]}
          >
            <SafeAreaView style={[styles.ModalView]}>
              <View style={{ width: '100%', height: 50, backgroundColor: "#bc9855", justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 20, color: 'black' }}>{this.state.ProjectNameCustomer} Description</Text>
              </View>
              <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', height: '100%', paddingHorizontal: '5%' }}>
                <Text style={styles.textItems}>{this.state.DescCustomer}</Text>
              </ScrollView>
            </SafeAreaView>

          </Modal>
        </SafeAreaView>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  MainView: {
    // display: 'flex',
    // flex: 1,
    backgroundColor: '#bfcfb2',
    width: '100%',
    height: '100%',
  },
  container: {
    backgroundColor: '#bfcfb2',
    flex: 1,
    width: '100%',
    // height: '100%',
  },
  listTitle: {
    fontSize: 18,
    fontFamily: 'SairaSemiCondensed-Bold'
  },
  listDescription: {
    fontSize: 15,
    fontFamily: 'SairaSemiCondensed-Regular'
  },
  ModalView: {
    display: 'flex',
    flex: 1,
    height: '100%',
    width: '100%',
    // alignContent: 'center',
    // justifyContent:'center',
    // alignItems: 'center',
    backgroundColor: '#bfcfb2',
    marginTop: 0,

  },
  textItems: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'SairaSemiCondensed-Regular',
  },
  AddressView: {
    width: '100%',
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 10,
    borderColor: '#bc9855',
  },
  AddressText: {
    fontFamily: 'ArimaMadurai-Bold',
    // fontFamily: 'SairaSemiCondensed-Bold',
    fontSize: 15,
    color: 'black',
    marginLeft: '7%',
  },
  maintext: {
    fontFamily: 'SairaSemiCondensed-Bold',
    fontSize: 15,
    color: 'black',
    width: '25%'
  },
  subtext: {
    fontFamily: 'SairaSemiCondensed-Regular',
    fontSize: 14,
    color: 'black',
    width: '65%'
  },
  ItemIcon: {
    // alignItems: 'center',
    justifyContent: 'flex-start',
    // marginTop: 10,
    marginRight: 10,
    width: '10%',
  }

});


export default Invitations;
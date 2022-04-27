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
} from 'react-native';

import Loading from '../../Components/Loading';
//  import ProfileOwenerDetails from '../../Components/ProfileOwenerDetails';
//  import VisitorDetails from '../../Components/VisitorDetails';
//  import MainViewProfile from '../../Components/MainViewProfile';

import LinearGradient from 'react-native-linear-gradient';
// import {Avatar} from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import moment from 'moment';

import { serverLink } from '../serverLink';
import ChatScreen from './ChatScreen';
LogBox.ignoreLogs(['Require cycle:']);
class ProfileForOthers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: this.props.Email,
      profileImage: '',
      NickName: '',
      Bio: "",
      QualificationDegree: "",
      InterestedIn: [],
      FullName: "",
      PhoneNumber: "",
      Country: "",
      BirthDate: '',
      Age: 0,
      loaded: false,

      // views: 1200,
      // userName:"sara_a",
      numProject: 20,
      followers: 1000,
      following: 2000,

      GuestEmail: this.props.GuestEmail,
      GuestNickName: this.props.GuestNickName,
      followtext: "Follow",
      color: "#bc9855",
      Projects: [],
      ProjectsJoined: null,
      ProjectsJoinedInfo: [],
      DescModal: false,
      ProjectDesc: '',
      FollowEnable: true,
      FollowingsList: null,
      FollowersList: null,
      Followed: false,
      ChatScreenModal:false,

    }
    this.phoneinput = React.createRef();
  }


  async loadProfile() {
    await this.setState({
      Email: this.props.Email,
      GuestEmail: this.props.GuestEmail,
      loaded: false
    })
    await this.getInfo();
    await this.getUserInfo();
    await this.getProjectsInfo();
    await this.getProjectsJoined();
    if (this.state.InterestedIn.length != 0)
      this.setState({
        loaded: true,
        Age: moment().diff(this.state.BirthDate, 'years')
      })
    if (this.state.Followed) {
      this.setState({ followtext: "Following", color: "#98a988" })
    }
    else {
      this.setState({ followtext: "Follow", color: "#bc9855" })
    }
  }
  async componentDidMount() {
    if (this.state.Email === this.state.GuestEmail) this.setState({ FollowEnable: false })
    await this.loadProfile();

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
      //  console.log(jsonresponse)
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
          FollowingsList: jsonresponse.FollowingsList,
          FollowersList: jsonresponse.FollowersList,
          Followed: jsonresponse.Followed
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
      //  console.log(jsonresponse)
      if (jsonresponse !== "null") {
        this.setState({
          FullName: jsonresponse.FirstName + ' ' + jsonresponse.LastName,
          Country: jsonresponse.Country,
          PhoneNumber: jsonresponse.PhoneNumber,
          Password: jsonresponse.Password,
          BirthDate: jsonresponse.BirthDate,

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
        // console.log(jsonresponse)
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
    }).then(jsonresponse => {
      if (jsonresponse !== "null") {
        this.setState({
          ProjectsJoined: jsonresponse,
          ProjectsJoinedInfo: []
        })
        jsonresponse.map(async item => {
          await this.getProjectInfoJoined(item.ProjectID)
        })
        // console.log(this.state.ProjectsJoined)

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
      console.log(jsonresponse.ProjectName)
      if (jsonresponse !== "null") {
        this.setState({
          ProjectsJoinedInfo: [...this.state.ProjectsJoinedInfo, jsonresponse]
        })
        //  console.log(this.state.ProjectID)

      }

    }).catch(error => {
      console.log(error);
    });
  }
  funcProjects = ({ item, index }) => {

    return (
      <View style={{
        height: '90%',
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
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 2,
        }}>
          <TouchableOpacity style={{
            backgroundColor: '#bc9855', width: '30%', height: '50%',
            alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginHorizontal: '2.5%',
            borderWidth: 0.5, flexDirection: 'row'
          }}
            onPress={async () => {
              /////////////////////////request to join///////////////////////
              
            }}>
            <Icon
              name="plus-circle-outline"
              size={15}
              color={'black'} />
            <Text style={styles.text1}>Join</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            backgroundColor: '#bc9855', width: '30%', height: '50%',
            alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginHorizontal: '2.5%',
            borderWidth: 0.5, flexDirection: 'row'
          }}
            onPress={async () => {
              /////////////////////////show desc///////////////////////
              // console.log(item.ProjectDescription)
              await this.setState({ ProjectDesc: item.ProjectDescription })
              this.setState({ DescModal: true })
            }}>
            <Icon
              name="information-outline"
              size={15}
              color={'black'} />
            <Text style={styles.text1}>Info</Text>
          </TouchableOpacity>

        </View>


      </View>

    )


  }
  funcProjectsJoined = ({ item, index }) => {

    return (
      <View style={{
        height: '90%',
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
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 2,
        }}>
          <TouchableOpacity style={{
            backgroundColor: '#bc9855', width: '30%', height: '50%',
            alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginHorizontal: '2.5%',
            borderWidth: 0.5, flexDirection: 'row'
          }}
            onPress={async () => {
              /////////////////////////request to join///////////////////////
            }}>
            <Icon
              name="plus-circle-outline"
              size={15}
              color={'black'} />
            <Text style={styles.text1}>Join</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            backgroundColor: '#bc9855', width: '30%', height: '50%',
            alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginHorizontal: '2.5%',
            borderWidth: 0.5, flexDirection: 'row'
          }}
            onPress={async () => {
              /////////////////////////show desc///////////////////////
              // console.log(item.ProjectDescription)
              await this.setState({ ProjectDesc: item.ProjectDescription })
              this.setState({ DescModal: true })
            }}>
            <Icon
              name="information-outline"
              size={15}
              color={'black'} />
            <Text style={styles.text1}>Info</Text>
          </TouchableOpacity>

        </View>

      </View>

    )


  }
  call = () => {
    console.log("+++++++++callNumber ", this.state.PhoneNumber);
    let phoneNumber = `tel:${this.state.PhoneNumber}`;


    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert("Number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
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


  Follow = async () => {
    await fetch(serverLink + "/Follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "Email": this.state.Email,
          "GuestEmail": this.state.GuestEmail,
          "Followers": this.state.followers,
          "Followed": this.state.Followed,
          "FollowersList": this.state.FollowersList,
        }
      )
    }).then(resp => {
      return resp.json();
    }).then(jsonresponse => {
      if (jsonresponse !== "null") {
        console.log(jsonresponse)

      }

    }).catch(error => {
      console.log(error);
    });
  }
  FollowButtonPressed = async () => {
    console.log('follow')
   await this.setState({
      color: "#98a988",
      followtext: "Following",
      Followed:true,
      FollowersList:[...this.state.FollowersList,this.state.GuestEmail],
      followers:this.state.followers+1,
    });
    await this.Follow()
    console.log(this.state.FollowersList)
    /////notification /////////////////////////////////////////////////////////////
  }
  UnFollowButtonPressed = async () => {
    console.log('unfollow')
    await this.setState({
      color: "#bc9855",
      followtext: "Follow",
      Followed:false,
      followers:this.state.followers-1,
    });
    const items = await this.state.FollowersList.filter(item => item !== this.state.GuestEmail);
    await this.setState({ FollowersList: items });
    console.log(this.state.FollowersList)
    await this.Follow()
  }
  MessegeButtonPressed = async () => {
    console.log('messege')
    this.setState({ChatScreenModal:true})
  }
  CallButtonPressed = () => {
    this.call()
    console.log('call')
  }



  render() {

    return (

      <SafeAreaView style={styles.MainView}>
        {!this.state.loaded ? <Loading /> :

          <View style={[styles.MainView, { width: '100%', height: '100%' }]}>

            <View style={{ width: '100%' }}>
              <View style={{ paddingHorizontal: 0, paddingTop: 10 }}>
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
                      paddingHorizontal: 10,
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

                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
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
                  {/* {this.state.FollowEnable ? */}
                    <TouchableOpacity
                      disabled={!this.state.FollowEnable}
                      onPress={async () => {
                        if (this.state.Followed) {
                          await this.UnFollowButtonPressed();
                        }
                        else {
                          await this.FollowButtonPressed();
                        }
                       
                      }

                      }
                      style={{
                        width: '33%',
                        paddingHorizontal: 4,
                      }}>
                      <View
                        style={{
                          height: 35,
                          borderRadius: 5,
                          borderColor: 'black',
                          backgroundColor: this.state.color,
                          borderWidth: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={styles.text}>
                          {this.state.followtext}
                        </Text>
                      </View>
                    </TouchableOpacity> 
                    {/* : */}
                    {/* <View style={{ width: '18%', paddingHorizontal: 4 }}></View> */}
                    {/* } */}
                  <TouchableOpacity
                    onPress={async () => await this.MessegeButtonPressed()}
                    style={{
                      width: '34%',
                      paddingHorizontal: 4,
                    }}>
                    <View
                      style={styles.sview}>
                      <View style={{ width: '80%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.text}>Message</Text>
                      </View>
                      <View style={{ width: '20%', justifyContent: 'flex-end', }}>
                        <Icon
                          name="message"
                          size={15}
                          color={'black'} />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.CallButtonPressed()}
                    style={{
                      width: '33%',
                      paddingHorizontal: 4,
                    }}>
                    <View
                      style={styles.sview}>
                      <View style={{ width: '80%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.text}>Call</Text>
                      </View>

                      <View style={{ width: '20%', justifyContent: 'flex-end', }}>
                        <Icon
                          name="phone"
                          size={15}
                          color={'black'} />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <LinearGradient
                  colors={['#bfcfb2', '#98a988', '#bfcfb2']}
                  style={{
                    left: 0,
                    right: 0,
                    height: 10,
                    width: '100%',
                    marginTop: 5,
                  }}
                ></LinearGradient>
                
                {/* {console.log(ProfileOwenerDetails.props)} */}

              </View>
              
              
            </View>
            
            <SafeAreaView style={{ height: '100%', width: '100%', flex: 1 }}>
              
              <ScrollView vertical showsVerticalScrollIndicator={false} style={{ height: '100%' }}>
                {/* InterestedIn Cards */}
                <View style={{ width: '100%', height: 320, }}>
                  <Text style={[styles.text, { paddingHorizontal: 20 }]}>Interested In</Text>
                  <FlatList

                    scrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    width={'100%'}
                    height={'100%'}
                    keyExtractor={(item) => item.id.toString()}
                    data={this.state.InterestedIn}
                    renderItem={this.func}

                  />

                </View>
                <LinearGradient
                  colors={['#bfcfb2', '#98a988', '#bfcfb2']}
                  style={{
                    left: 0,
                    right: 0,
                    height: 10,
                    width: '100%',
                    marginTop: 5,
                  }}
                ></LinearGradient>
                {/* Projects created */}
                <View style={{ width: '100%', height: 320, }}>
                  <Text style={[styles.text, { paddingHorizontal: 20 }]}>Created Projects</Text>
                  <FlatList

                    showsHorizontalScrollIndicator={false}
                    horizontal
                    width={'100%'}
                    height={'100%'}
                    keyExtractor={(item) => item._id.toString()}
                    data={this.state.Projects}
                    renderItem={this.funcProjects}

                  />

                </View>
                <LinearGradient
                  colors={['#bfcfb2', '#98a988', '#bfcfb2']}
                  style={{
                    left: 0,
                    right: 0,
                    height: 10,
                    width: '100%',
                    marginTop: 5,
                  }}
                ></LinearGradient>
                {/* Projects joined */}
                <View style={{ width: '100%', height: 320, }}>
                  <Text style={[styles.text, { paddingHorizontal: 20 }]}>Joined Projects</Text>
                  <FlatList

                    showsHorizontalScrollIndicator={false}
                    horizontal
                    width={'100%'}
                    height={'100%'}
                    keyExtractor={(item) => item._id.toString()}
                    data={this.state.ProjectsJoinedInfo}
                    renderItem={this.funcProjectsJoined}

                  />

                </View>
                <LinearGradient
                  colors={['#bfcfb2', '#98a988', '#bfcfb2']}
                  style={{
                    left: 0,
                    right: 0,
                    height: 10,
                    width: '100%',
                    marginTop: 5,
                  }}
                ></LinearGradient>
              </ScrollView>
            </SafeAreaView>

          </View>

        }
        <Modal animationType='slide'
          visible={this.state.DescModal}
          onRequestClose={() => { this.setState({ DescModal: false }) }
          }
          style={styles.ModalView}>

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
              colors={['#bfcfb2', '#98a988', '#bfcfb2']}
              style={{
                left: 0,
                right: 0,
                height: 10,
                width: '100%',
                marginTop: 5,
              }}
            ></LinearGradient>
            <KeyboardAwareScrollView style={{ width: '100%', marginBottom: 5 }}>

              <View style={[{ height: '100%', flexDirection: 'column', width: '100%', marginTop: 20 }]}>
                <Text style={{ fontFamily: 'SairaSemiCondensed-Regular', fontSize: 14, color: 'black' }}>
                  {this.state.ProjectDesc}
                </Text>
              </View>
            </KeyboardAwareScrollView>
          </View>
        </Modal>


        <Modal animationType='slide'
          visible={this.state.ChatScreenModal}
          onRequestClose={() => { this.setState({ ChatScreenModal: false }) }
          }
          style={styles.ModalView}>

          <View style={{backgroundColor:"#bfcfb2",width:'100%',height:"100%"}}>
            <View style={{width:'100%',height:50,backgroundColor:'#bc9855',justifyContent:'center',
             alignItems:'flex-start',paddingLeft:40}}>
              <Text style={{fontFamily:'SairaSemiCondensed-Bold',fontSize:18,color:'black'}}>{this.state.NickName}</Text>
            </View>
            <ChatScreen 
            srcEmail={this.state.GuestEmail} 
            dstEmail={this.state.Email}
            srcNickName={this.state.GuestNickName}
            dstNickName={this.state.NickName}
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
  ModalView: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
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
  textAddress: {
    fontSize: 20,
    letterSpacing: 1,
    opacity: 0.8,
    color: "black",
    fontFamily: 'SairaSemiCondensed-Bold'
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

  text: {
    // fontWeight: 'bold',
    // textAlign:'center',
    fontSize: 14,
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

  sview: {
    height: 35,
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor: "#bc9855",
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },

  text1: {
    // fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1,
    opacity: 0.8,
    color: "black",
    fontFamily: 'SairaSemiCondensed-Regular',
    marginLeft: 4

  },

});


export default ProfileForOthers;

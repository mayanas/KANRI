/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { Alert, KeyboardAvoidingView, LogBox } from 'react-native';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { serverLink } from '../serverLink';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
LogBox.ignoreLogs(['Require cycle:']);

import {
  StyleSheet,
  View,
  Text,
  BackHandler,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal,
  RefreshControl,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loading from '../../Components/Loading';
import ProfileForOthers from './ProfileForOthers';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
//
import PushNotification, { Importance } from 'react-native-push-notification';
import firestore from '@react-native-firebase/firestore';
//  import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: this.props.route.params.Email,
      Token: '',
      NickName: '',
      search: "",
      filteredDataSource: [],
      masterDataSource: [],
      enableSearch: false,
      loadedSearch: false,
      ProfileImages: [],
      ProfileForOthersModal: false,
      ProfileForOthersEmail: "",
      refreshing: false,
      Projects: null,
      ProjectDescription1: "",
      DescModal: false,
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  async componentDidMount() {

    this.setState({ Email: this.props.route.params.Email })
    this.setState({ refreshing: true });
    await this.getProjectsHome();
    await this.getNickName();
    this.setState({ refreshing: false });


  }
  getNickName = async () => {
    const response = await fetch(serverLink + "/getNickName", {
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
      console.log(body);
      this.setState({ NickName: body })


    }
  }



  UNSAFE_componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }

  getProjectsHome = async () => {
    await fetch(serverLink + '/getProjectsHome', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {

        }
      )
    }).then(resp => {
      return resp.json();
    }).then(jsonresponse => {
      if (jsonresponse !== "null") {
        this.setState({
          Projects: []
        })
        jsonresponse.map(pro=>{
          if(pro.Email!==this.state.Email)
          {
            this.setState({Projects:[...this.state.Projects,pro]})
          }
        })

      }

    }).catch(error => {
      console.log(error);

    })
  }
  wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.getProjectsHome();
    this.wait(2000).then(() => this.setState({ refreshing: false }))
  }
  searchFilterFunction = async (text) => {

    // Check if searched text is not blank
    this.setState({ loadedSearch: false })
    await this.getData();
    if (text) {

      const newData = this.state.masterDataSource.filter(
        (item) => {

          const itemData = item.NickName
            ? item.NickName.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          if (item.Email === this.state.Email) return false;
          return itemData.indexOf(textData) > -1;
        });
      this.setState({ filteredDataSource: newData, });
    }
    else {
      this.setState({
        filteredDataSource: [],

      });
    }
    this.setState({ loadedSearch: true })
  };

  ItemView = ({ item }) => {

    return (
      // Flat List Item
      <TouchableOpacity style={styles.item}
        onPress={() => this.getItem(item)}
      >
        <Text
          style={styles.textItems}
        >
          {item.NickName}

        </Text>
      </TouchableOpacity>

    );


  };

  ItemViewProjects = ({ item }) => {
    return (
      // Flat List Item
      <View style={{
        width: 350,
        height: 250,
        borderColor: "#bc9855",
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingTop: 10
      }}
      >
        <View style={{ flexDirection: 'row', height: '20%' }}>
          <Text style={styles.boldText}>Project Name </Text>
          <Text style={styles.textItems1}> {item.ProjectName} </Text>
        </View>
        <View style={{ flexDirection: 'column', height: '55%' }}>
          <Text style={styles.boldText}>Project Mission </Text>
          <Text style={styles.textItems1}>{item.ProjectMission} </Text>
        </View>
        <View style={{ height: '25%' }}>
          <View style={{ flexDirection: 'row', height: '60%' }}>
            <TouchableOpacity style={{
              backgroundColor: '#bc9855', width: '30%', height: '100%',
              alignItems: 'center', justifyContent: 'center', borderRadius: 15,
              borderWidth: 0, flexDirection: 'row'
            }}
              onPress={async () => {
                /////////////////////////show desc///////////////////////
                // console.log(item.ProjectDescription)
                await this.setState({ ProjectDescription1: item.ProjectDescription })
                this.setState({ DescModal: true })
              }}>
              <Icon
                name="information-outline"
                size={15}
                color={'black'} />
              <Text style={styles.textItems1}>Info</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              backgroundColor: '#bc9855', width: '30%', height: '100%',
              alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginHorizontal: '4%',
              borderWidth: 0, flexDirection: 'row'
            }}
              onPress={async () => {
                this.getItem(item)
              }}>
              <Ionicons
                name="person-circle-outline"
                size={15}
                color={'black'} />
              <Text style={styles.textItems1}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              backgroundColor: '#bc9855', width: '30%', height: '100%',
              alignItems: 'center', justifyContent: 'center', borderRadius: 15,
              borderWidth: 0, flexDirection: 'row'
            }}
              disabled={item.Email == this.state.Email}
              onPress={async () => {
                /////////////////////////request to join///////////////////////
                this.joinProject(item)
              }}>
              <Icon
                name="plus-circle-outline"
                size={15}
                color={'black'} />
              <Text style={styles.textItems1}>Join</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: '40%', alignItems: 'flex-start', justifyContent: 'flex-end', paddingLeft: 5, paddingTop: 0 }}>
            <Text style={{ fontSize: 10, fontFamily: 'SairaSemiCondensed-Regular' }}>Leader's Email: {item.Email}</Text>
          </View>

        </View>

      </View>

    );
  }

  ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#bfcfb2',
        }}
      />
    );
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
  getItem = (item) => {
    // this.setState({ search: '', filteredDataSource: [] })
    this.setState({ ProfileForOthersModal: true, ProfileForOthersEmail: item.Email })
    // this.props.navigation.navigate('profileForOthers',{Email:item.Email,GuestEmail:this.state.Email})
  }

  getData = async () => {
    const response = await fetch(serverLink + "/getData", {
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
    if (body == "null") {
      this.showAlert("Warning", "Email does not exist!")
    } else {
      console.log(body);
      this.setState({ masterDataSource: body })

    }
  }

  joinProject = async(item) => {
    
    await fetch(serverLink + "/getJoin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          Type:"RequestToJoin",
          SenderNickName: this.state.NickName,
          SenderEmail:this.state.Email,
          ProjectID: item._id,
          ProjectName: item.ProjectName,
          RecieverEmail: item.Email,
          // CreationTime: new Date()
        }
      )
    }).then(resp => {
      return resp.json();
    }).then(async jsonresponse => {
      if (jsonresponse === "null") {
        firestore()
            .collection('NOTIFICATIONS')
            .doc(item.Email)
            .collection('NOTIFICATIONS')
            // .doc(item.Email)
            .add({
              Boolean: false,
              Type: "Join",
              SenderNickName: this.state.NickName,
              message: "Requested to join your project " + item.ProjectName,
              projectId: item._id,
              // leaderEmail: item.Email,
              Date: new Date().toDateString(),
              createdAt: new Date().getTime(),
              user: {
                _id: this.state.Email,
                email: this.state.Email
              }
            });
            this.showAlert(this.state.NickName, "Your request has been sent")

            await fetch(serverLink + "/Invitations", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(
                  {
                    Type:"RequestToJoin",
                    SenderNickName: this.state.NickName,
                    SenderEmail:this.state.Email,
                    ProjectID: item._id,
                    ProjectName: item.ProjectName,
                    RecieverEmail: item.Email,
                    CreationTime: new Date()
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
      else {
        this.showAlert(this.state.NickName, jsonresponse)
      }

    }).catch(error => {
      console.log(error);
    });

  }
  render() {

    return (


      <View style={styles.MainView}>


        <SafeAreaView ew style={styles.MainView}>
          <View style={styles.TopView}>

            <Searchbar
              placeholder="Search"
              placeholderTextColor="black"

              selectionColor={'black'}
              // selectTextOnFocus={{fontSize:15}}
              iconColor='black'

              //backgroundColor="black"

              style={{
                backgroundColor: "#98a988",
                borderRadius: 50,
                width: '85%',
                height: '90%',


              }}
              inputStyle={{
                fontFamily: 'SairaSemiCondensed-Regular',
                fontSize: 15,

              }}


              onChangeText={(text) => {
                if (text == '') this.setState({ enableSearch: false })
                else this.setState({ enableSearch: true })
                this.setState({ search: text })
                this.searchFilterFunction(text)
              }}


              value={this.state.search}
            />
            {/* {console.log(this.state.search)} */}
            <Image
              source={require('../../assets/logo/logo1.jpeg')}
              style={{ width: 60, height: 60, borderRadius: 0 }}

            />



          </View>

          {this.state.enableSearch ?
            this.state.loadedSearch ?
              <SafeAreaView style={{ width: '100%', height: '100%', flex: 1 }}>
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
              </SafeAreaView> : <Loading />
            :
            <SafeAreaView style={{
              backgroundColor: '#bfcfb2', width: '100%',
              height: '90%'
            }}

            >

              <FlatList
              vertical
              showsVerticalScrollIndicator={false}
                width={'100%'}
                height={'100%'}
                data={this.state.Projects}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={this.ItemSeparatorView}
                enableEmptySections={true}
                renderItem={this.ItemViewProjects}
                refreshControl={
                  <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
                }
              />


            </SafeAreaView>
          }



          {/* <Text>{this.props.route.params.Email}</Text> */}
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
        {/*Desc Modal*/}
        <Modal animationType='slide'
          visible={this.state.DescModal}
          onRequestClose={async () => {
            this.setState({ DescModal: false })
          }
          }
          style={[styles.ModalView]}>
          <View style={[styles.modalS]}>

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
                  {this.state.ProjectDescription1}
                </Text>
              </View>
            </KeyboardAwareScrollView>
          </View>
        </Modal>
      </View>

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
  TopView: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#bfcfb2',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,

    marginTop: 10,
    // shadowRadius: 50,
    // shadowColor:'#bfcfb2'
    // alignItems:'center',
    // justifyContent:'center'
  },
  FirstinnerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    width: '100%',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#bc9855",
    alignItems: 'flex-start',
    // justifyContent:'flex-start',
    width: 300,
    // height:'100%'
    marginTop: 15
  },
  textItems: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'SairaSemiCondensed-Regular',
  },
  textItems1: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'SairaSemiCondensed-Regular',
  },
  boldText: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'SairaSemiCondensed-Bold',
  },
  textAddress: {
    fontSize: 20,
    letterSpacing: 1,
    opacity: 0.8,
    color: "black",
    fontFamily: 'SairaSemiCondensed-Bold'
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



});


export default HomeScreen;

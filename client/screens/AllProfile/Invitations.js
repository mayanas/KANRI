
import { serverLink } from '../serverLink';
import React, { Component } from 'react';
import {
  View, StyleSheet, FlatList, TouchableOpacity,
  Text,
  LogBox,
  BackHandler,
  SafeAreaView
} from 'react-native';
import { List, Divider, Modal } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../Components/Loading';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
// import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Require cycle:']);
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

class Invitations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: this.props.route.params.Email,
      NickName:'',
      loading: false,
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

  loadInvitations =async()=>{
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
      this.setState({NickName:body})
    }


    
  }
  async componentDidMount() {
    await this.loadInvitations();
  }

  render() {

    return (
      <View style={styles.MainView}>
        <SafeAreaView style={styles.MainView}>
          {this.state.loading ? <Loading /> :
            <SafeAreaView style={styles.container}>
              <View style={{ width: '100%', height: 50, backgroundColor: "#bc9855", justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 20, color: 'black' }}>Invitations</Text>
              </View>
            </SafeAreaView>


          }

          {/* <Modal animationType='slide'
            visible={this.state.chatModal}

            transparent={true}
            onRequestClose={ async() => {
              console.log('onrequest')
              this.setState({ chatModal: false })
            }}
            style={styles.ModalView}>


            <View style={{ backgroundColor: "#bfcfb2", width: '100%', height: "100%", }}>
              <View style={{
                width: '100%', height: 50, backgroundColor: '#bc9855', justifyContent: 'center',
                alignItems: 'center',flexDirection:'row'
              }}>
                <View style={{justifyContent:'flex-start',alignItems:'flex-start',width:'15%',paddingLeft:10}}>
                  <Icon
                  name='backburger'
                  size={30}
                  color={'black'}
                  onPress={()=>this.setState({chatModal:false})}
                  />
                </View>
                <View style={{justifyContent:'flex-start',alignItems:'flex-start',width:'85%'}}>
                <Text
                  // onPress={() => this.setState({ chatModal: false })}
                  style={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 18, color: 'black' }}>{this.state.dstNickName}</Text>
              
                </View>
                </View>
              <ChatScreen
                srcEmail={this.state.Email}
                dstEmail={this.state.dstEmail}
                srcNickName={this.state.srcNickName}
                dstNickName={this.state.dstNickName}
              />
            </View>
          </Modal> */}

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

});


export default Invitations;
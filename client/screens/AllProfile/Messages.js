
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
import ChatScreen from './ChatScreen';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
// import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Require cycle:']);
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: this.props.route.params.Email.toUpperCase(),
      threads: [],
      threads1: [],
      loading: true,
      chatModal: false,
      dstEmail: '',
      dstNickName: '',
      srcNickName: '',
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
    console.log('hello')
    if (this.state.chatModal) this.setState({ chatModal: false })
    else
      this.props.navigation.navigate('Home', { Email: this.props.route.params.Email });
    return true;
  }

  componentDidMount() {
    const unsubscribe = firestore()
      .collection('THREADS')
      // add this
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // name: '',
            // add this
            latestMessage: {
              text: ''
            },
            // ---
            ...documentSnapshot.data()
          };
        });

        this.setState({ threads: threads });

        var j = 0;
        var max;
        var threads1 = []
        //   var max =threads[0]._id.split(':'); //max=11715557:11715558 max[0]=11715557, max[1]=11715558
        for (let i = 0; i < this.state.threads.length; i++) {
          max = this.state.threads[i]._id.split(':');
          if (max[0] === this.state.Email || max[1] === this.state.Email) {
            threads1[j] = this.state.threads[i]
            j++;
          }
        }
        // console.log(threads1)
        this.setState({ threads1: threads1 });

        if (this.state.loading) {
          this.setState({ loading: false });
        }
      });

    return () => unsubscribe();
  }

  render() {

    return (
      <View style={styles.MainView}>
        <SafeAreaView style={styles.MainView}>
          {this.state.loading ? <Loading /> :
            <SafeAreaView style={styles.container}>
              <View style={{ width: '100%', height: 50, backgroundColor: "#bc9855", justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 20, color: 'black' }}>Chats</Text>
              </View>

              <FlatList
                data={this.state.threads1}
                keyExtractor={item => item._id}
                ItemSeparatorComponent={() => <Divider style={{ height: 3, color: '#98a988' }} />}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      if (item.email1 === this.state.Email) {
                        this.setState({ dstEmail: item.email2, dstNickName: item.nickName2, srcNickName: item.nickName1 })
                      } else {
                        this.setState({ dstEmail: item.email1, dstNickName: item.nickName1, srcNickName: item.nickName2 })

                      }

                       this.setState({ chatModal: true })
                    }}
                  >
                    <List.Item
                      title={item.email1 === this.state.Email ? item.nickName2 : item.nickName1}
                      description={item.latestMessage.text}
                      titleNumberOfLines={1}
                      titleStyle={styles.listTitle}
                      descriptionStyle={styles.listDescription}
                      descriptionNumberOfLines={1}
                    />
                  </TouchableOpacity>
                )
                }
              />

            </SafeAreaView >
          }

          <Modal animationType='slide'
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
                  onPress={() => this.setState({ chatModal: false })}
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

});


export default Messages;
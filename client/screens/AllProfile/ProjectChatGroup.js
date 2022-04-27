

import React, { useState, useEffect, useCallback, Component } from 'react';
import { View, ActivityIndicator, StyleSheet, LogBox, Text, StatusBar,RefreshControl } from 'react-native';
import { Bubble, GiftedChat, Send, SystemMessage, Avatar, } from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';
import { serverLink } from '../serverLink';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../Components/Loading';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

LogBox.ignoreLogs(["EventEmitter.removeListener"]);
LogBox.ignoreLogs(['Require cycle:']);

class ProjectChatGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.Email,
            userName: this.props.Email,
            ProjectId: this.props.ProjectId,
            messages: [],
            loaded: true,
            NickName:this.props.NickName

        }
    }

    getMessagesLoad = async () => {
        this.setState({ loaded: false })
        await this.getMessages();
        this.setState({ loaded: true })
    }
    componentDidMount = async () => {
        await this.getMessagesLoad();
    }

    renderBubble = props => {

        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#98a988'
                    },
                    left: {
                        backgroundColor: '#bc9855',
                    }
                }}
                textStyle={{
                    right: {
                        color: 'white',
                        fontFamily: 'SairaSemiCondensed-Regular',
                        fontSize: 15
                    },
                    left: {
                        color: 'white',
                        fontFamily: 'SairaSemiCondensed-Regular',
                        fontSize: 15
                    }
                }}
            />
        );
    }

    renderSend = props => {
        return (
            <Send {...props}>
                <View style={styles.sendingContainer}>
                    <IconButton icon='send-circle' size={35} color='#98a988' />
                </View>
            </Send>
        );
    }
    scrollToBottomComponent = () => {
        return (
            <View style={styles.bottomComponentContainer}>
                <IconButton icon='chevron-double-down' size={36} color='#98a988' />
            </View>
        );
    }
    renderSystemMessage = (props) => {
        return (
            <SystemMessage
                {...props}
                wrapperStyle={styles.systemMessageWrapper}
                textStyle={styles.systemMessageText}
            />
        );
    }
    renderLoading = () => {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color='#98a988' />
            </View>
        );
    }

    getMessages = async () => {
        await fetch(serverLink + '/getMessages', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "ProjectID": this.state.ProjectId,

                }
            )
        }
        ).then(response => { return response.json() }).then(async resp => {

            await this.setState({
                messages: resp,
            })
            this.state.messages.reverse();

        })

    };
    async onSend(messages = []) {

        await this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),

        }));

        console.log(messages[0])
        await this.saveMessages(messages[0]);


    }
    saveMessages = async (messages) => {
        await fetch(serverLink + '/saveMessages', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "ProjectID": this.state.ProjectId,
                    "messages": messages,

                }
            )
        }
        )
    }

    render() {


        return (
            <View
            style={{ backgroundColor: '#bfcfb2', flex: 1 }}>
                <View style={{
              width: '100%', height: 50, backgroundColor: '#bc9855', justifyContent: 'center',
              alignItems: 'center', flexDirection: 'row'
            }}>
              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', width: '15%', paddingLeft: 10 }}>
                <Icon
                  name='backburger'
                  size={30}
                  color={'black'}
                  onPress={()=>this.props.ProjectChatGroup()}
                />
              </View>
              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', width: '70%' }}>
                <Text
                  // onPress={() => this.setState({ chatModal: false })}
                  style={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 18, color: 'black' }}>{this.state.NickName}</Text>

              </View>
              <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', width: '15%',paddingRight:20}}>
                <Icon
                  name='refresh'
                  size={30}
                  color={'black'}
                  onPress={async () => {await this.getMessagesLoad()}}
                />
              </View>
            </View>
            {!this.state.loaded? <Loading />:
                <GiftedChat

                    

                    alwaysShowSend={true}
                    messages={this.state.messages}
                    scrollToBottom
                    renderBubble={this.renderBubble}
                    renderLoading={this.renderLoading}

                    renderUsernameOnMessage={true}
                    renderSend={this.renderSend}
                    onSend={messages => this.onSend(messages)}
                    scrollToBottomComponent={this.scrollToBottomComponent}
                    renderSystemMessage={this.renderSystemMessage}
                    textInputStyle={{ fontFamily: 'SairaSemiCondensed-Regular', fontSize: 15 }}
                    user={{
                        _id: this.state.userId,
                        name: this.state.userName,
                    }}
                />}

            </View>

        );
    }
}


const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#bfcfb2',
    },
    sendingContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomComponentContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    systemMessageWrapper: {
        backgroundColor: '#fff',
        borderRadius: 4,
        padding: 5
    },
    systemMessageText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'SairaSemiCondensed-Regular'
    },
});
export default ProjectChatGroup;

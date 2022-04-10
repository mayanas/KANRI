
import React, { Component, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
    Modal,
    TextInput as PaperInput,
    Chip,
    Switch,
    RadioButton,
} from "react-native-paper";
import { Appbar } from "react-native-paper";
import SelectDropdown from 'react-native-select-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isSymbolObject } from 'util/types';
import AddTask from './Projects/AddTask';
import { serverLink } from '../serverLink';
class AddTask1 extends Component {
    constructor(props) {
        super(props);

    }
    state = {
        AddTaskModal: false,
        tasks: null
    }
    componentDidMount() {
        // console.log("hello")
        this.setState({ tasks: this.props.loadTasks })
    }

    DeleteTask=async(item)=>{
        await fetch(serverLink + "/DeleteTask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {

                    "id": item._id,
                }
            )
        }).then(response => { return response.json() }).then(resp => {
            console.log(resp);
        })

        this.props.ModalVisible();
    }

    update = async (item) => {
        if (!item.Approved) {
            let newMarkers = this.state.tasks.map(el => (
                el._id === item._id ? {
                    Content: item.Content, DeadLine: item.DeadLine, MemberEmail: item.MemberEmail, Priority: item.Priority,
                    ProjectID: item.ProjectID,
                    StartDate: item.StartDate, Title: item.Title, _id: item._id, Approved: true
                } : el
            ))
            this.setState({ tasks: newMarkers });
            await this.updateApproved(item._id);
        }

    }
    async updateApproved(id) {

        await fetch(serverLink + "/updateApproved", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {

                    "id": id,
                }
            )
        }).then(response => { return response.json() }).then(resp => {
            console.log(resp);
        })


        return;
    }

    ItemView = ({ item }) => {

        return (
            // Flat List Item
            // <View style={{
            //     flexDirection: "row",
            //     width: '80%',
            //     // justifyContent:"center",
            //     alignItems:"center",


            // }}>
            <View style={styles.listTile}>
                <View style={styles.leading}>
                    <Icon
                        name={item.Approved ? "check-circle" : "radio-button-unchecked"}

                        size={20}
                        color="#666666"

                        onPress={() => {
                            this.update(item);
                        }}
                    />
                </View>

                <View style={{ width: '60%', alignItems: 'center' }}>
                    <Text style={styles.title}>{item.Title}</Text>
                </View>
                <View style={styles.trailing}>
                    <Icon
                        name="edit"
                        style={{paddingHorizontal:10}}
                        size={20}
                        color="#666666"
                        onPress={() => { this.props.EditTasks(item) }}
                    />
                     <Icon
                        name="delete"
                        style={{paddingHorizontal:10}}
                        size={20}
                        color="#666666"
                        onPress={async() => { await this.DeleteTask(item) }}
                    />
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

    render() {

        return (
            <SafeAreaView style={styles.MainView}>
                <View style={[{ marginTop: 40 }]}>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <View style={{ width: '20%', alignItems: 'flex-start' }}>

                        </View>
                        <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.textAddress}>Tasks</Text>
                        </View>
                        <View style={{ width: '20%' }}>
                            <Text></Text>
                        </View>

                    </View>
                </View>
                <View style={styles.MainView}>

                    <View style={{paddingTop:0,height:'85%'}}>
                    <FlatList
                    // height={'50%'}
                    showsVerticalScrollIndicator={false}
                        data={this.state.tasks}
                        keyExtractor={(item) => item._id.toString()}
                        ItemSeparatorComponent={this.ItemSeparatorView}
                        renderItem={this.ItemView}
                    />
                    
                </View>
                
                </View>
                <View style={{left:190,bottom:5,justifyContent:'flex-end'}}>
                    <TouchableOpacity onPress={() => { this.props.setStateModal() }} style={styles.fab}>
                       <Icon 
                       size={30}
                       name ="add-task"/>
                    </TouchableOpacity>
                    </View>
                {/* </View> */}



            </SafeAreaView>



        );
    }
};



const styles = StyleSheet.create({
    textAddress: {
        fontSize: 20,
        letterSpacing: 1,
        opacity: 0.8,
        color: "black",
        fontFamily: 'SairaSemiCondensed-Bold'
    },
    ModalView: {
        flex: 1,
        height: '100%',
        width: '100%',
        // alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#bfcfb2',
    },
    MainView: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        //  justifyContent: 'center',
        backgroundColor: '#bfcfb2',
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
        width: "90%",
        height: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
        borderRadius: 15,
        marginBottom: 15,
        backgroundColor: "#bfcfb2",
        // padding: 10,
        borderWidth: 1,
        borderColor: "#98a988",
        paddingHorizontal: 10
    },
    leading: {
        width: "20%",
        alignItems: 'flex-start'
    },
    title: {
        // width: "60%",
        fontSize: 18,
        fontFamily: 'SairaSemiCondensed-Regular'
    },
    trailing: {
        width: "20%",
        alignItems: 'flex-end',
        // paddingRight: 10,
        flexDirection:'row',
        
    }
});

export default AddTask1;
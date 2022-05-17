
import React, { Component } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import Icon from 'react-native-vector-icons/dist/Ionicons';

import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    Alert,
    SafeAreaView,
    Modal,
    Linking,
    RefreshControl
} from "react-native";

import { serverLink } from '../serverLink';
import Loading from '../../Components/Loading';
import { ProgressStep, ProgressSteps } from 'react-native-progress-steps';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LottieCustomer from '../../Components/LottieCustomer';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BottomSheet } from 'react-native-elements';
import { Dialog, Portal, Provider, RadioButton } from 'react-native-paper';
import Add from './Projects/Add';
import SelectDropdown from 'react-native-select-dropdown';
import ProfileForOthers from './ProfileForOthers';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import email from 'react-native-email'
import ViewProject from './Projects/ViewProject';

const FieldsOfInterest = [
    'Business and Management',
    'Computer Science and Information Technology',
    'Education',
    'Environmental, Agricultural, and Physical Sciences',
    'Government and Law',
    'Library and Information Science',
    'Media and Communications',
    'Medical, Healthcare, and Life Sciences',
    'Science and Engineering',
    'Security and Forensics',
    'Social Sciences and Humanities',

];
class AskAsCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datetimevisible: false,
            showPicker: false,
            date: "",
            ProjectName: "",
            ProjectMission: "",
            ProjectDescription: "",
            Budget: "",
            savedInfo: true,
            AddProjectModal: false,
            MyProjectsModal: false,
            MyProjectsLoaded: true,
            filteredDataSource: [],
            masterDataSource: [],
            search: '',
            enableSearch: false,
            searchby: 'Nick Name',
            loadedSearch: true,
            searchbyInterest: '',
            ProfileForOthersEmail: '',
            ProfileForOthersModal: false,
            enableSearchInput: true,

            MemberChoosen: '',
            MemberChoosenEmail: '',
            ShowModal: false,
            showFieldsOfInterset: false,
            AddPersonModal: false,

            Email: this.props.Email,
            NickName: this.props.NickName,
            loadProjects: true,
            MyProjects: [],
            refreshing: false,
            ProjectInfo: '',
            InfoModal: false,
            DescModal: false,
            meetingDate: '',
            Tasks: [],
            loadProjectsInfo: true,
            ViewModal: false,
        }

    }


    handlePicker = async (date) => {
        // console.log(date)
        const dateFormat = moment(date).format("YYYY-MM-DD");
        await this.setState({ date: dateFormat, });
        this.setState({ datetimevisible: false })
        // console.log(this.state.date)
    };
    showPicker = () => {
        this.setState({ datetimevisible: true });
    }

    hidePicker = () => {
        this.setState({ datetimevisible: false });
    }

    searchFilterFunction = async (text) => {
        this.setState({ loadedSearch: false })
        await this.getData();
        console.log(text)
        if (text) {
            if (this.state.searchby == "Nick Name") {
                const newData = this.state.masterDataSource.filter(
                    (item) => {
                        const itemData = item.NickName
                            ? item.NickName.toUpperCase()
                            : ''.toUpperCase();
                        const textData = text.toUpperCase();
                        if (item.Email === this.state.Email) return false;
                        return itemData.indexOf(textData) > -1;
                    });
                this.setState({
                    filteredDataSource: newData,
                    search: text
                });
            }

            else if (this.state.searchby == "Email") {
                const newData = this.state.masterDataSource.filter(
                    (item) => {
                        const itemData = item.Email
                            ? item.Email.toUpperCase()
                            : ''.toUpperCase();
                        const textData = text.toUpperCase();
                        if (item.Email === this.state.Email) return false;
                        return itemData.indexOf(textData) > -1;
                    });
                this.setState({
                    filteredDataSource: newData,
                    // added:newData,
                    search: text
                });
            }
        }
        else if (this.state.searchby == "Fields of Interest") {
            var flag = false;
            const newData = this.state.masterDataSource.filter(
                item => {
                    flag = false;
                    if (item.Email === this.state.Email) return false;
                    item.InterestedIn.map(interest => {
                        if (interest.name === this.state.searchbyInterest) {
                            flag = true;
                        }
                    })
                    return flag;
                }
            );
            this.setState({
                filteredDataSource: newData,
                search: text,
                enableSearch: true,

            });
            console.log(this.state.filteredDataSource)

        }

        else {
            this.setState({
                filteredDataSource: [],
                search: text,
                enableSearch: false,
            });
        }

        console.log(this.state.filteredDataSource)

        this.setState({ loadedSearch: true })

    };

    ItemView = ({ item }) => {
        if (this.state.searchby == "Nick Name") {
            return (

                <View style={[styles.item, { flexDirection: 'row' }]}>
                    <TouchableOpacity style={{ width: '90%' }} onPress={() => {
                        ///go to profile
                        this.setState({ ProfileForOthersModal: true, ProfileForOthersEmail: item.Email })
                    }}>
                        <Text style={styles.textItems}>{item.NickName}</Text>
                    </TouchableOpacity>
                    <View style={{
                        justifyContent: 'center', alignItems: 'center',
                        width: '10%', borderColor: '#bc9855', borderWidth: 1,
                        borderBottomColor: '#bfcfb2'
                    }}>
                        <Ionicons
                            name="add"
                            size={20}
                            color="black"
                            onPress={() => { this.getItem(item) }}
                        />
                    </View>
                </View>
            );
        }
        else if (this.state.searchby == "Email") {
            return (
                // Flat List Item
                <View style={[styles.item, { flexDirection: 'row' }]}>
                    <TouchableOpacity style={{ width: '90%' }} onPress={() => {
                        ///go to profile
                        this.setState({ ProfileForOthersModal: true, ProfileForOthersEmail: item.Email })
                    }}>
                        <Text style={styles.textItems}>{item.Email}</Text>
                    </TouchableOpacity>
                    <View style={{
                        justifyContent: 'center', alignItems: 'center',
                        width: '10%', borderColor: '#bc9855', borderWidth: 1,
                        borderBottomColor: '#bfcfb2'
                    }}>
                        <Icon
                            name="add-sharp"
                            size={20}
                            color="black"
                            onPress={() => { this.getItem(item) }}
                        />
                    </View>
                </View>
            );
        }
        else if (this.state.searchby == "Fields of Interest") {
            return (
                // Flat List Item
                <View style={[styles.item, { flexDirection: 'row' }]}>
                    <TouchableOpacity style={{ width: '90%' }} onPress={() => {
                        ///go to profile
                        this.setState({ ProfileForOthersModal: true, ProfileForOthersEmail: item.Email })
                        // this.props.ProfileForOthers(item.Email, this.state.Email, 'AddPersonToProject' )
                    }}>
                        <Text style={styles.textItems}>{item.Email}</Text>
                    </TouchableOpacity>
                    <View style={{
                        justifyContent: 'center', alignItems: 'center',
                        width: '10%', borderColor: '#bc9855', borderWidth: 1,
                        borderBottomColor: '#bfcfb2'
                    }}>
                        <Icon
                            name="add-sharp"
                            size={20}
                            color="black"
                            onPress={() => { this.getItem(item) }}
                        />
                    </View>
                </View>
            );
        }
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

    getItem = async (item) => {

        this.setState({
            enableSearch: false,
            MemberChoosen: item.NickName,
            MemberChoosenEmail: item.Email,
        })

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
            // this.showAlert("Warning", "Email does not exist!")
        } else {
            this.setState({ masterDataSource: body })

        }
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

    saveInfo = async () => {

        firestore()
            .collection('NOTIFICATIONS')
            .doc(this.state.MemberChoosenEmail)
            .collection('NOTIFICATIONS')
            // .doc(item.Email)
            .add({
                Boolean: false,
                Type: "InviteToDoProject",
                SenderNickName: this.state.NickName,
                message: "Inviting you to lead his/her project " + this.state.ProjectName,
                Date: new Date().toDateString(),
                createdAt: new Date().getTime(),
                user: {
                    _id: this.state.Email,
                    email: this.state.Email
                }
            });

        await fetch(serverLink + "/InvitationsCustomer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    Type: "InviteToDoProject",
                    SenderNickName: this.state.NickName,
                    SenderEmail: this.state.Email,
                    ProjectName: this.state.ProjectName,
                    ProjectMission: this.state.ProjectMission,
                    ProjectDescription: this.state.ProjectDescription,
                    ProjectBudget: this.state.Budget,
                    ProjectDeadLine: this.state.date,

                    RecieverEmail: this.state.MemberChoosenEmail,
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


        this.setState({ AddProjectModal: false })



    }
    loadMyProjects = async () => {
        await fetch(serverLink + "/getProjectsCustomer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    Email: this.state.Email
                }
            )
        }).then(resp => {
            return resp.json();
        }).then(jsonresponse => {
            if (jsonresponse !== "null") {
                console.log(jsonresponse)
                this.setState({ MyProjects: jsonresponse })
            }

        }).catch(error => {
            console.log(error);
        });
    }

    loadTasks = async () => {
        this.setState({ Tasks: null })
        await fetch(serverLink + "/loadTasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "ProjectID": this.state.ProjectInfo._id,
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
    handleEmail = (to) => {
        email(to, {
            subject: 'From Kanri',
            body: ''
        }).catch(console.error)
    }
    funcProjectTasks = ({ item, index }) => {

        return (
            <View style={{
                height: '90%',
                width: 350,
                backgroundColor: '#98a988',
                margin: 15,
                // paddingHorizontal:15,
                borderRadius: 15,
                overflow: 'hidden',
                // justifyContent:'center',
                alignItems: 'flex-start',
                // overflow:'scroll'
                paddingTop: 7

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

                                let date = item.MeetingDate.split(" ")
                                // console.log(date[0])
                                await this.setState({ ProjectInfo: item, meetingDate: date[0] })
                                this.setState({ InfoModal: true })
                                this.setState({ loadProjectsInfo: false })
                                // await this.loadProjectsInfoMemders()
                                await this.loadTasks()
                                this.setState({ loadProjectsInfo: true })
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
                                this.setState({ ProfileForOthersEmail: item.Email, ProfileForOthersModal: true })
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
                            onPress={async () => {
                               await  this.setState({ ProjectInfo: item})
                                this.setState({ ViewModal: true })
                            }}>
                            <Icon
                                name="chart-timeline"
                                size={15}
                                color={'black'} />
                            <Text style={styles.textItems1}>View</Text>
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
    wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    _onRefresh = async () => {
        this.setState({ refreshing: true });
        await this.loadMyProjects();
        this.setState({ refreshing: false })
    }
    render() {
        return (
            <SafeAreaView style={styles.MainView}>
                <SafeAreaView style={styles.MainView}>
                    <LottieCustomer />
                    <KeyboardAwareScrollView
                        style={{ marginTop: hp(50) }}
                        behavior="padding"
                    >
                        <SafeAreaView style={styles.MainView}>
                            <View style={{ marginTop: 0 }}>
                                <Text style={styles.customerAddress}>
                                    As a customer
                                </Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                                <TouchableOpacity style={styles.Buttonstyle}
                                    onPress={async () => {

                                        this.setState({ MyProjectsModal: true, loadProjects: false })
                                        await this.loadMyProjects();
                                        this.setState({ loadProjects: true })
                                    }}>
                                    <Text style={styles.ButtonTextStyle}>My projects</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.Buttonstyle}
                                    onPress={() => {
                                        this.setState({
                                            AddProjectModal: true,
                                            ProjectName: '',
                                            ProjectMission: '',
                                            ProjectDescription: '',
                                            Budget: '',
                                            date: '',
                                            MemberChoosen: '',
                                            MemberChoosenEmail: '',
                                            ShowModal: false,
                                            showFieldsOfInterset: false,
                                            filteredDataSource: [],
                                            masterDataSource: [],
                                            search: '',
                                            enableSearch: false,
                                            searchby: 'Nick Name',
                                            loadedSearch: true,
                                            searchbyInterest: '',
                                            ProfileForOthersEmail: '',
                                            ProfileForOthersModal: false,
                                            enableSearchInput: true,

                                        })
                                    }}>
                                    <Text style={styles.ButtonTextStyle}>Add project</Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </KeyboardAwareScrollView>
                </SafeAreaView>
                {/* my Project Modal */}

                <Modal
                    animationType='slide'
                    visible={this.state.MyProjectsModal}
                    onRequestClose={async () => {
                        this.setState({ MyProjectsModal: false })
                    }
                    }
                    style={[styles.ModalView]}
                >
                    <SafeAreaView style={[styles.ModalView]}>
                        {this.state.loadProjects ?
                            <View style={styles.ModalView}>
                                <View style={{ width: '100%', height: 50, backgroundColor: "#bc9855", justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                                    <Text style={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 20, color: 'black' }}>My Projects</Text>
                                </View>
                                <FlatList
                                    width={'100%'}
                                    height={'100%'}
                                    data={this.state.MyProjects}
                                    keyExtractor={(item, index) => index.toString()}
                                    ItemSeparatorComponent={this.ItemSeparatorView}
                                    enableEmptySections={true}
                                    renderItem={this.ItemViewProjects}
                                    refreshControl={
                                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
                                    }
                                />
                            </View> :
                            <Loading />}
                    </SafeAreaView>

                </Modal>

                <Modal
                    animationType='slide'
                    visible={this.state.InfoModal}
                    onRequestClose={async () => {
                        this.setState({ InfoModal: false })
                    }
                    }
                    style={[styles.ModalView]}
                >
                    {!this.state.loadProjectsInfo ? <Loading /> : <SafeAreaView style={[styles.ModalView]}>
                        <View style={{ width: '100%', height: 50, backgroundColor: "#bc9855", justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                            <Text style={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 20, color: 'black' }}>{this.state.ProjectInfo.ProjectName}</Text>
                        </View>
                        <ScrollView style={{ width: '100%', height: '100%' }}>
                            {/* mission */}
                            <View style={{
                                width: '90%',
                                marginHorizontal: '5%',
                                // position:'relative',
                                height: 100,
                                borderColor: "#bc9855",
                                borderWidth: 1,
                                marginVertical: 10,
                                borderRadius: 15,
                                paddingHorizontal: 10,
                                paddingTop: 10,
                                flexDirection: 'row'
                            }}>
                                <Text style={[styles.boldText, { width: '30%' }]}>Mission</Text>
                                <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                    <Text style={styles.textItems1}>{this.state.ProjectInfo.ProjectMission}</Text>
                                </View>
                            </View>
                            {/* desc */}
                            <View style={{
                                width: '90%',
                                marginHorizontal: '5%',
                                // position:'relative',
                                height: 50,
                                borderColor: "#bc9855",
                                borderWidth: 1,
                                marginVertical: 10,
                                borderRadius: 15,
                                paddingHorizontal: 10,
                                paddingTop: 12,
                                flexDirection: 'row',
                                // alignItems:'center',
                                // justifyContent:'center'
                            }}>
                                <Text style={[styles.boldText, { width: '30%' }]}>Description</Text>
                                <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                    <Ionicons
                                        name='expand-outline'
                                        size={20}
                                        color='black'
                                        onPress={() => {
                                            this.setState({ DescModal: true })
                                        }}
                                    />
                                </View>
                                {/* <Text style={styles.textItems1}>{this.state.ProjectInfo.ProjectMission}</Text> */}
                            </View>
                            {/* deadLine */}
                            <View style={{
                                width: '90%',
                                marginHorizontal: '5%',
                                // position:'relative',
                                height: 50,
                                borderColor: "#bc9855",
                                borderWidth: 1,
                                marginVertical: 10,
                                borderRadius: 15,
                                paddingHorizontal: 10,
                                paddingTop: 12,
                                flexDirection: 'row',
                            }}>
                                <Text style={[styles.boldText, { width: '30%' }]}>DeadLine</Text>
                                <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                    <Text style={styles.textItems1}>{this.state.ProjectInfo.DeadLine}</Text>
                                </View>
                            </View>
                            {/* Budget */}
                            <View style={{
                                width: '90%',
                                marginHorizontal: '5%',
                                // position:'relative',
                                height: 50,
                                borderColor: "#bc9855",
                                borderWidth: 1,
                                marginVertical: 10,
                                borderRadius: 15,
                                paddingHorizontal: 10,
                                paddingTop: 12,
                                flexDirection: 'row',
                            }}>
                                <Text style={[styles.boldText, { width: '30%' }]}>Budget</Text>
                                <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                    <Text style={styles.textItems1}>{this.state.ProjectInfo.ProjectBudget} $</Text>
                                </View>


                            </View>
                            {/* Remaining */}
                            <View style={{
                                width: '90%',
                                marginHorizontal: '5%',
                                // position:'relative',
                                height: 50,
                                borderColor: "#bc9855",
                                borderWidth: 1,
                                marginVertical: 10,
                                borderRadius: 15,
                                paddingHorizontal: 10,
                                paddingTop: 12,
                                flexDirection: 'row',
                            }}>

                                <Text style={[styles.boldText, { width: '30%' }]}>Remaining</Text>
                                <View style={{ alignItems: 'flex-start', width: '70%' }}>
                                    <Text style={styles.textItems1}>{this.state.ProjectInfo.RemainingBudget} $</Text>
                                </View>


                            </View>
                            {/* Meeting */}
                            <View style={{
                                width: '90%',
                                marginHorizontal: '5%',
                                // position:'relative',
                                height: 50,
                                borderColor: "#bc9855",
                                borderWidth: 1,
                                marginVertical: 10,
                                borderRadius: 15,
                                paddingHorizontal: 10,
                                // paddingTop: 12,
                                flexDirection: 'row',
                            }}>

                                <Text style={[styles.boldText, { width: '30%', paddingTop: 12, }]}>Meeting</Text>
                                <View style={{ width: '70%', height: '85%', justifyContent: 'center', paddingTop: 9, flexDirection: 'row' }}>
                                    <Text style={[styles.textItems1, { width: '50%' }]}>{this.state.meetingDate}</Text>
                                    <TouchableOpacity style={{
                                        backgroundColor: '#bc9855', width: '50%', height: '100%',
                                        alignItems: 'center', justifyContent: 'center', borderRadius: 15,
                                        borderWidth: 0.5, flexDirection: 'row', marginRight: '2.5%'
                                    }}
                                        onPress={async () => {
                                            // await this.getMeetingLink(item._id)
                                            if (this.state.MeetingLink === "")
                                                this.showAlert('Meeting Link', 'No availabe link')
                                            else {
                                                this.showAlert('Meeting Date', this.state.ProjectInfo.MeetingDate)
                                                Linking.openURL(this.state.ProjectInfo.MeetingLink)
                                            }
                                        }}>
                                        <Ionicons
                                            name="link-outline"
                                            size={15}
                                            color={'black'} />
                                        <Text style={[styles.textItems1, { paddingLeft: 4 }]}>Link</Text>
                                    </TouchableOpacity>

                                </View>


                            </View>
                            {/* Tasks */}
                            <View style={{
                                width: '90%',
                                marginHorizontal: '5%',
                                // position:'relative',
                                height: 270,
                                borderColor: "#bc9855",
                                borderWidth: 1,
                                marginVertical: 10,
                                borderRadius: 15,
                                paddingHorizontal: 10,
                                paddingTop: 12,
                                // flexDirection: 'row',
                            }}>

                                <Text style={[styles.boldText, { width: '30%', height: '10%' }]}>Tasks</Text>
                                <View style={{ height: '90%', }}>
                                    <FlatList

                                        showsHorizontalScrollIndicator={false}
                                        horizontal
                                        width={'100%'}
                                        height={'100%'}
                                        keyExtractor={(item) => item._id.toString()}
                                        data={this.state.Tasks}
                                        renderItem={this.funcProjectTasks}

                                    /></View>


                            </View>

                        </ScrollView>

                    </SafeAreaView>}

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
                            <Text style={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 20, color: 'black' }}>{this.state.ProjectInfo.ProjectName} Description</Text>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', height: '100%', paddingHorizontal: '5%' }}>
                            <Text style={styles.textItems2}>{this.state.ProjectInfo.ProjectDescription}</Text>
                        </ScrollView>
                    </SafeAreaView>

                </Modal>
                {/* add project */}
                <Modal
                    animationType='slide'
                    visible={this.state.AddProjectModal}
                    onRequestClose={async () => {
                        this.setState({ AddProjectModal: false })
                    }
                    }
                    style={[styles.ModalView]}
                >
                    <SafeAreaView style={[styles.ModalView]}>
                        <View style={[{ marginTop: 50, marginHorizontal: 20 }]}>
                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                <View style={{ width: '20%', alignItems: 'flex-start' }}>
                                    <Image
                                        source={require('../../assets/logo/logo1.jpeg')}
                                        style={{ width: 60, height: 60, borderRadius: 0 }}

                                    />
                                </View>
                                <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={styles.textAddress}>Add Project</Text>
                                </View>
                                <View style={{ width: '20%' }}>
                                    <Text></Text>
                                </View>

                            </View>
                        </View>
                        <View style={styles.MainView}>
                            <SafeAreaView style={{ width: '100%', height: '100%', flex: 1 }}>
                                {this.state.savedInfo ?

                                    <View style={{ width: '100%', height: 600 }}>
                                        <ProgressSteps progressBarColor="#98a988" completedProgressBarColor="#bc9855"
                                            activeStepIconColor="#bfcfb2" completedStepIconColor="#bc9855"
                                            activeStepIconBorderColor="#98a988"
                                            labelFontFamily="SairaSemiCondensed-Regular" labelColor="black"
                                            activeLabelColor="black" completedLabelColor="black"
                                            disabledStepIconColor="#98a988" disabledStepNumColor="black"
                                            completedCheckColor={'#bc9855'}>

                                            <ProgressStep label="Information"
                                                nextBtnStyle={{ backgroundColor: '#bc9855', borderRadius: 15, width: 100, alignItems: 'center' }}
                                                nextBtnTextStyle={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 15, color: "black" }}
                                                onNext={() => {

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
                                            <ProgressStep label="Details"
                                                previousBtnStyle={{ backgroundColor: '#bc9855', borderRadius: 15, width: 100, alignItems: 'center' }}
                                                previousBtnTextStyle={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 15, color: "black" }}
                                                nextBtnStyle={{ backgroundColor: '#bc9855', borderRadius: 15, width: 100, alignItems: 'center' }}
                                                nextBtnTextStyle={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 15, color: "black" }}
                                                onNext={() => {

                                                }}

                                            >
                                                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
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

                                            <ProgressStep label="Search"
                                                previousBtnStyle={{ backgroundColor: '#bc9855', borderRadius: 15, width: 100, alignItems: 'center' }}
                                                previousBtnTextStyle={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 15, color: "black" }}
                                                nextBtnStyle={{ backgroundColor: '#bc9855', borderRadius: 15, width: 100, alignItems: 'center' }}
                                                nextBtnTextStyle={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 15, color: "black" }}
                                                onSubmit={async () => {
                                                    if (
                                                        this.state.ProjectName === '' ||
                                                        this.state.ProjectMission === '' ||
                                                        this.state.ProjectDescription === '' ||
                                                        this.state.Budget === '' ||
                                                        this.state.date === '' ||
                                                        this.state.MemberChoosen === '') {
                                                        this.showAlert("Fields", "Make sure all fields are full")
                                                    }
                                                    else {
                                                        this.setState({ savedInfo: false })
                                                        await this.saveInfo();
                                                        this.setState({ savedInfo: true })
                                                    }

                                                }}
                                            >
                                                <View style={[styles.RegisterRows, { marginTop: 20 }]}>

                                                    <Text style={[styles.textstyle1, { width: '40%', paddingHorizontal: 4 }]}>
                                                        Choose a leader
                                                    </Text>

                                                    <TouchableOpacity style={styles.Buttonstyle1}
                                                        onPress={() => {
                                                            if (this.state.MemberChoosen != '') {
                                                                this.setState({ enableSearch: false, })
                                                            }
                                                            else {
                                                                this.setState({ enableSearch: true, })
                                                            }
                                                            this.setState({
                                                                AddPersonModal: true,

                                                                searchby: "Nick Name",
                                                                searchbyInterest: false,
                                                                enableSearchInput: true,
                                                                loadedSearch: true,
                                                                search: '',
                                                            })
                                                            // console.log(this.state.MemberChoosen)

                                                        }}>
                                                        <Text style={styles.ButtonTextStyle}>Click me</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                {
                                                    this.state.MemberChoosen !== '' ?

                                                        <View style={[styles.RegisterRows, { marginTop: 20 }]}>
                                                            <Text style={[{ width: '40%', fontFamily: 'SairaSemiCondensed-Bold', fontSize: 15, color: 'black' }]}>Chosen Leader is </Text>
                                                            <Text style={{ width: '50%', fontFamily: 'SairaSemiCondensed-Regular', fontSize: 15, color: 'black' }}>{this.state.MemberChoosen}</Text>

                                                        </View> : null
                                                }


                                            </ProgressStep>
                                        </ProgressSteps>
                                    </View>
                                    // {/* // </KeyboardAwareScrollView> */}

                                    :
                                    <Loading />
                                }
                            </SafeAreaView >
                        </View>
                    </SafeAreaView>

                </Modal>
                {/* Profile for others */}
                <Modal
                    animationType='slide'
                    visible={this.state.ProfileForOthersModal}
                    onRequestClose={async () => {
                        this.setState({ ProfileForOthersModal: false })
                    }
                    }
                    style={[styles.ModalView]}
                >
                    <ProfileForOthers
                        Email={this.state.ProfileForOthersEmail}
                        GuestEmail={this.state.Email}
                        GuestNickName={this.state.NickName}
                    />

                </Modal>
                {/* add person to project */}
                <Modal
                    animationType='slide'
                    visible={this.state.AddPersonModal}
                    onRequestClose={async () => {
                        this.setState({ AddPersonModal: false })
                    }
                    }
                    style={[styles.MainView,]}>
                    <SafeAreaView style={[styles.ModalView,]} >
                        <View style={{ width: '100%', height: 50, backgroundColor: "#bc9855", justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 20, color: 'black' }}>Search for leader</Text>
                        </View>
                        <Provider>
                            <SafeAreaView style={{ width: '100%', height: '100%', flex: 1, paddingLeft: 20, paddingVertical: 20, alignItems: 'center' }}>
                                <Portal style={{ width: '100%', height: '100%' }}>
                                    <Dialog
                                        visible={this.state.ShowModal}
                                        onDismiss={() => this.setState({ ShowModal: false })}

                                        style={{
                                            borderRadius: 10,
                                            backgroundColor: '#bfcfb2'
                                        }}
                                    >
                                        {/*  Add Collaborators */}
                                        <Dialog.Title style={{ fontFamily: 'SairaSemiCondensed-Regular', fontSize: 18, textAlign: 'center' }}>
                                            Choose way of searching
                                        </Dialog.Title>
                                        <Dialog.Content style={{ alignItems: 'center' }}>
                                            <SelectDropdown
                                                dropdownBackgroundColor={"#98a988"}
                                                dropdownStyle={{ backgroundColor: 'none' }}
                                                buttonStyle={styles.textinputstyle}
                                                styleInput={{ fontFamily: 'SairaSemiCondensed-Regular' }}
                                                defaultButtonText={this.state.searchby}
                                                rowStyle={{ backgroundColor: '#98a988', borderRadius: 8, overflow: 'hidden' }}
                                                rowTextStyle={{ fontFamily: 'SairaSemiCondensed-Regular', fontSize: 15 }}
                                                buttonTextStyle={{ fontFamily: 'SairaSemiCondensed-Regular', fontSize: 15 }}
                                                rowTextForSelection={""}
                                                data={["Email", "Nick Name", "Fields of Interest"]}
                                                onSelect={(selectedItem, index) => {

                                                    this.setState({
                                                        searchby: selectedItem,
                                                        ShowModal: false,
                                                        enableSearchInput: true,
                                                        filteredDataSource: [],
                                                        search: ''
                                                    })
                                                    if (selectedItem === "Fields of Interest") {
                                                        this.setState({
                                                            showFieldsOfInterset: true,
                                                            enableSearchInput: false,
                                                        })
                                                    }

                                                }}
                                                buttonTextAfterSelection={(selectedItem, index) => {
                                                    return selectedItem
                                                }}

                                            />

                                        </Dialog.Content>
                                    </Dialog>


                                </Portal>
                                <Portal style={{ width: '100%', height: '100%' }}>
                                    <Dialog
                                        visible={this.state.showFieldsOfInterset}
                                        onDismiss={() => this.setState({ showFieldsOfInterset: false, })}

                                        style={{
                                            borderRadius: 10,
                                            backgroundColor: '#bfcfb2'
                                        }}
                                    >
                                        {/*  Add Collaborators */}
                                        <Dialog.Title style={{ fontFamily: 'SairaSemiCondensed-Regular', fontSize: 18, textAlign: 'center' }}>
                                            Field of Interest
                                        </Dialog.Title>
                                        <Dialog.Content style={{ alignItems: 'center' }}>
                                            <SelectDropdown
                                                dropdownBackgroundColor={"#98a988"}
                                                buttonStyle={{
                                                    width: '100%',
                                                    paddingHorizontal: 4,
                                                    borderRadius: 14,
                                                    height: 47,
                                                    fontFamily: 'SairaSemiCondensed-Regular',
                                                    fontSize: 15,
                                                    textDecorationLine: 'none',
                                                    backgroundColor: "#98a988"
                                                }}
                                                styleInput={{ fontFamily: 'SairaSemiCondensed-Regular' }}
                                                defaultButtonText={this.state.searchbyInterest}
                                                dropdownStyle={{ backgroundColor: 'none' }}
                                                rowStyle={{ backgroundColor: '#98a988', borderRadius: 8, overflow: 'hidden' }}
                                                rowTextForSelection={""}
                                                rowTextStyle={{ fontFamily: 'SairaSemiCondensed-Regular', fontSize: 15 }}
                                                buttonTextStyle={{ fontFamily: 'SairaSemiCondensed-Regular', fontSize: 15 }}
                                                data={FieldsOfInterest}
                                                onSelect={(selectedItem, index) => {

                                                    this.setState({
                                                        searchbyInterest: selectedItem,
                                                        showFieldsOfInterset: false,
                                                    })
                                                    if (selectedItem === "") this.setState({ enableSearch: false })
                                                    else this.setState({ enableSearch: true })
                                                    this.searchFilterFunction('')

                                                }}
                                                buttonTextAfterSelection={(selectedItem, index) => {
                                                    return selectedItem
                                                }}

                                            />

                                        </Dialog.Content>
                                    </Dialog>


                                </Portal>
                                <SafeAreaView style={{
                                    flexDirection: 'row', justifyContent: 'center',
                                    width: '100%', height: 50, marginTop: 20
                                }}>
                                    <View style={{
                                        width: '80%', height: 40, marginRight: '5%'
                                    }}>
                                        <TextInput
                                            style={styles.textInputStyle}
                                            onChangeText={(text) => {
                                                if (text == '') this.setState({ enableSearch: false })
                                                else this.setState({ enableSearch: true })
                                                this.setState({ search: text, ShowModal: false })
                                                this.searchFilterFunction(text)

                                            }}

                                            value={this.state.search}
                                            underlineColorAndroid="transparent"
                                            placeholder="Choose method of search first"
                                            editable={this.state.enableSearchInput}
                                        />
                                    </View>
                                    <View style={{ width: '10%', height: 40, marginRight: '5%' }}>
                                        <Ionicons
                                            color='black'
                                            name='filter-sharp'
                                            type='font-awesome'
                                            size={25}
                                            style={{ paddingTop: 10 }}
                                            onPress={() => {
                                                if (this.state.searchby !== "Fields of Interest") {
                                                    this.setState({ ShowModal: true, })
                                                }
                                                else {
                                                    if (this.state.searchbyInterest === "") this.setState({ showFieldsOfInterset: true, })
                                                    else this.setState({ ShowModal: true, })
                                                }
                                            }
                                            }
                                        />
                                    </View>

                                </SafeAreaView>

                                <SafeAreaView style={{ width: '100%', height: '80%', marginTop: 20 }}>
                                    {this.state.enableSearch ?
                                        this.state.loadedSearch ?

                                            // 
                                            <SafeAreaView style={{ width: '80%', height: '100%', marginRight: '15%', flex: 1, alignItems: 'center' }}>
                                                <FlatList
                                                    scrollEnabled
                                                    vertical
                                                    showsVerticalScrollIndicator={false}
                                                    width={'100%'}
                                                    height={'100%'}
                                                    data={this.state.filteredDataSource}
                                                    keyExtractor={(item, index) => item._id.toString()}
                                                    ItemSeparatorComponent={this.ItemSeparatorView}
                                                    renderItem={this.ItemView}
                                                />


                                            </SafeAreaView>

                                            :
                                            <Loading />
                                        :
                                        this.state.MemberChoosen !== '' ?
                                            <SafeAreaView style={{
                                                flexDirection: 'column',
                                                width: '100%', height: '100%', flex: 1, alignItems: 'center', marginTop: 20
                                            }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={[{ width: '40%', fontFamily: 'SairaSemiCondensed-Bold', fontSize: 15, color: 'black' }]}>Chosen Leader is </Text>
                                                    <Text style={{ width: '50%', fontFamily: 'SairaSemiCondensed-Regular', fontSize: 15, color: 'black' }}>{this.state.MemberChoosen}</Text>

                                                </View>


                                            </SafeAreaView> : null


                                    }
                                </SafeAreaView>
                            </SafeAreaView>

                        </Provider>
                    </SafeAreaView>
                </Modal>

                {/* View modal */}
                <Modal
                    animationType='slide'
                    visible={this.state.ViewModal}
                    onRequestClose={async () => {
                        this.setState({ ViewModal: false })
                    }
                    }
                    style={[styles.ModalView]}
                >
                    <View style={[styles.modalS, { padding: 0, paddingTop: 0 }]}>
                        <View style={{ width: '100%', height: 50, backgroundColor: "#bc9855", justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 20, color: 'black' }}>View project details</Text>
                        </View>
                        <View style={[{ height: '100%', flexDirection: 'column', width: '100%', }]}>
                            <ViewProject
                                ProjectID={this.state.ProjectInfo._id}
                                ProjectName={this.state.ProjectInfo.ProjectName}
                                Email={this.state.Email}
                                NickName={this.state.NickName}
                            />
                        </View>
                        {/* </KeyboardAwareScrollView> */}
                    </View>

                </Modal>




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
    MainView: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#bfcfb2',
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
        borderRadius: 14,
        height: 47,
        fontFamily: 'SairaSemiCondensed-Regular',
        fontSize: 15,
        textDecorationLine: 'none',
        backgroundColor: "#98a988"
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
    textstyle1: {

        width: '30%',
        height: 40,
        fontFamily: 'SairaSemiCondensed-Regular',
        fontSize: 15,
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },

    Buttonstyle: {
        width: wp(50),
        height: hp(6),
        backgroundColor: '#bc9855',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    Buttonstyle1: {
        width: wp(50),
        height: 40,
        backgroundColor: '#bc9855',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    ButtonTextStyle: {
        fontFamily: 'SairaSemiCondensed-Regular',
        fontSize: 16,
        color: 'black'
    },
    customerAddress: {
        fontFamily: 'ArimaMadurai-Bold',
        fontSize: 20,
        color: 'black'
    },
    ModalView: {
        display: 'flex',
        flex: 1,
        height: '100%',
        width: '100%',
        // alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#bfcfb2',
        marginTop: 0,

    },
    textInputStyle: {
        margin: 5,
        backgroundColor: '#98a988',
        fontFamily: 'SairaSemiCondensed-Regular',
        width: '100%',
        paddingHorizontal: 4,
        height: 47,
        fontSize: 15,
        textDecorationLine: 'none',
        borderRadius: 15
    },
    bottomSheetContainer: {
        width: '100%',
        flex: 1,
        paddingTop: 20,
        paddingBottom: 8,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopColor: '#98a988',
        borderWidth: 2,
        elevation: 4,
        backgroundColor: '#bfcfb2'
    },
    textItems: {
        fontSize: 15,
        color: 'black',
        fontFamily: 'SairaSemiCondensed-Regular',
    },
    item: {
        borderBottomWidth: 1,
        borderBottomColor: "#bc9855",
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        marginTop: 15,
        // marginHorizontal: 20,
    },
    textItems1: {
        fontSize: 14,
        color: 'black',
        fontFamily: 'SairaSemiCondensed-Regular',
    },
    textItems2: {
        fontSize: 16,
        color: 'black',
        fontFamily: 'SairaSemiCondensed-Regular',
    },
    boldText: {
        fontSize: 15,
        color: 'black',
        fontFamily: 'SairaSemiCondensed-Bold',
    },
    textinterest: {
        fontSize: 14,
        // opacity: 0.8,
        color: "black",
        fontFamily: 'SairaSemiCondensed-Regular',
        marginTop: 10

    },

});

export default AskAsCustomer;
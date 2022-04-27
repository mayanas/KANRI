
import React, { Component } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    Alert,
    SafeAreaView
} from "react-native";

import { serverLink } from '../serverLink';
import Loading from '../../Components/Loading';
import { ProgressStep, ProgressSteps } from 'react-native-progress-steps';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class AskAsCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepColor: '#bc9855',
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

        }

    }





    render() {
        return (
            <SafeAreaView style={styles.MainView}>
                <View style={[{ marginTop: 20, marginHorizontal: 20 }]}>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <View style={{ width: '20%', alignItems: 'flex-start' }}>
                            <Image
                                source={require('../../assets/logo/logo1.jpeg')}
                                style={{ width: 60, height: 60, borderRadius: 0 }}

                            />
                        </View>
                        <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.textAddress}>As Customer</Text>
                        </View>
                        <View style={{ width: '20%' }}>
                            <Text></Text>
                        </View>

                    </View>
                </View>
                <View style={styles.MainView}>
                    <SafeAreaView style={{ width: '100%', height: '100%', flex: 1 }}>
                        {this.state.savedInfo ?
                            <KeyboardAwareScrollView>
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

                                            }}
                                        >

                                        </ProgressStep>
                                        <ProgressStep label="Information"
                                            previousBtnStyle={{ backgroundColor: '#bc9855', borderRadius: 15, width: 100, alignItems: 'center' }}
                                            previousBtnTextStyle={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 15, color: "black" }}
                                            nextBtnStyle={{ backgroundColor: '#bc9855', borderRadius: 15, width: 100, alignItems: 'center' }}
                                            nextBtnTextStyle={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 15, color: "black" }}
                                            onNext={() => {

                                            }}

                                        >

                                        </ProgressStep>

                                        <ProgressStep label="Details"
                                            previousBtnStyle={{ backgroundColor: '#bc9855', borderRadius: 15, width: 100, alignItems: 'center' }}
                                            previousBtnTextStyle={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 15, color: "black" }}
                                            nextBtnStyle={{ backgroundColor: '#bc9855', borderRadius: 15, width: 100, alignItems: 'center' }}
                                            nextBtnTextStyle={{ fontFamily: 'SairaSemiCondensed-Bold', fontSize: 15, color: "black" }}
                                            onSubmit={async () => {


                                            }}
                                        >


                                        </ProgressStep>
                                    </ProgressSteps>
                                </View>
                            </KeyboardAwareScrollView>
                            :
                            <Loading />
                        }
                    </SafeAreaView >
                </View>


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



});

export default AskAsCustomer;
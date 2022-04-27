/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Lottie from '../Components/Lottie';

import {
  StyleSheet,
  Text,
  View,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // where: this.props.where,
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
    this.props.navigation.goBack(null)
    // if (this.state.where === 'kanri') {
    //   this.props.navigation.navigate('kanri');
    // }
    // else if(this.state.where==='profile'){
    //   this.props.navigation.navigate('Profile');
    // }
    return true;
  }

  render() {

    return (

      <SafeAreaView style={{width:'100%',height:'100%'}}>
        <View style={styles.MainView}>

          <Lottie />

          <View style={{ marginTop: -100 }}>
            <View style={{ marginTop: 40 }}>
              <Text style={styles.textstyle}>ABOUT US</Text>
            </View>
            <View>
              <Text>dscs</Text>
            </View>
          </View>

        </View>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  MainView: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#bfcfb2',
  },
  textstyle: {
    // marginTop: 50,
    fontFamily: "ArimaMadurai-Regular",
    fontSize: 50,
    color: 'black',
    textAlign: 'center'
    // fontWeight: 'bold',
  },

});

export default About;

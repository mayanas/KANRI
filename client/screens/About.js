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
  FlatList,
  SafeAreaView
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// import {  } from 'react-native-safe-area-context';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // where: this.props.where,
      Data: [
        { id: 1, name: "maya" },
        { id: 2, name: "maya" }
      ]
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
    return true;
  }

  ItemData = async ({ item }) => {

    return (
      <View
        style={{
          width: 350,
          height: 250,
          borderColor: "#bc9855",
          borderWidth: 1,
          marginVertical: 10,
          borderRadius: 15,
          paddingHorizontal: 10,
          paddingTop: 10
        }}>
        <Text>{item.name}</Text>
      </View>
    )
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

  render() {

    return (

      <SafeAreaView style={{ width: '100%', height: '100%' }}>
        <View style={styles.MainView}>

          <Lottie />

          <View style={{ marginTop:300  }}>
            <View style={{ marginTop: 40 }}>
              <Text style={styles.textstyle}>ABOUT US</Text>
            </View>
            <View style={{marginTop:40}}>
            <SafeAreaView style={{width:'100%',height:'100%'}}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  // style={{width:'100%',height:'100%'}
                  >
                  <View
                    style={{
                      width: 370,
                      height: 300,
                      borderColor: "#bc9855",
                      borderWidth: 1,
                      marginVertical: 10,
                      borderRadius: 15,
                      paddingHorizontal: 10,
                      paddingTop: 10,
                      marginLeft:20
                    }}>
                    <Text>maya</Text>
                  </View>
                  <View
                    style={{
                      width: 370,
                      height: 300,
                      borderColor: "#bc9855",
                      borderWidth: 1,
                      marginVertical: 10,
                      borderRadius: 15,
                      paddingHorizontal: 10,
                      paddingTop: 10,
                      marginHorizontal:20
                    }}>
                    <Text>maya</Text>
                  </View>
                </ScrollView>
                </SafeAreaView>

            </View>
          </View>

        </View>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    width: '100%',
    height: '100%',
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

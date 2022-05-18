/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component } from 'react';
 import Lottie from '../Components/Lottie';
 import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
 import Ionicons from 'react-native-vector-icons/dist/Ionicons';
 import {
   StyleSheet,
   Text,
   View,
   BackHandler,
   FlatList,
   SafeAreaView,
   TouchableOpacity,
   Linking
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
       ],
       PhoneNumber: '',
       Email: '',
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
 
   initiateWhatsApp=async()=>{
     let url =
       'whatsapp://send?text=' +
       '' +
       '&phone=' + this.state.PhoneNumber;
     Linking.openURL(url)
       .then((data) => {
         console.log('WhatsApp Opened');
       })
       .catch(() => {
         alert('Make sure Whatsapp installed on your device');
       });
 
   }
   call=async()=>{
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
   }
 
   render() {
 
     return (
 
       <SafeAreaView style={{ width: '100%', height: '100%' }}>
         <View style={styles.MainView}>
 
           <Lottie />
 
           <View style={{ marginTop: 300 }}>
             <View style={{ marginTop: 40 }}>
               <Text style={styles.textstyle}>ABOUT US</Text>
             </View>
             <View style={{ marginTop: 40 }}>
               <SafeAreaView style={{ width: '100%', height: '100%' }}>
                 <ScrollView
                   horizontal
                   showsHorizontalScrollIndicator={false}
                 // style={{width:'100%',height:'100%'}
                 >
                   <View
                     style={{
                       width: 370,
                       height: 250,
                       borderColor: "#bc9855",
                       borderWidth: 1,
                       marginVertical: 10,
                       borderRadius: 15,
                       paddingHorizontal: 10,
                       paddingTop: 10,
                       marginLeft: 20
                     }}>
                     <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '12%' }}>
                       {/* <Text style={{fontFamily:'SairaSemiCondensed-Bold',color:'black',fontSize:30}}>KANRI</Text> */}
                       <Text style={{ fontFamily: 'SairaSemiCondensed-Regular', textAlign: 'left', color: 'black', fontSize: 16 }}>KANRI project seeks to provide a user-friendly application and website that makes
                         it simple to manage projects and deliver them on time by allocating tasks to suitable
                         people with profiles that detail their work domains and projects.</Text>
                     </View>
                   </View>
                   <View
                     style={{
                       width: 370,
                       height: 250,
                       borderColor: "#bc9855",
                       borderWidth: 1,
                       marginVertical: 10,
                       borderRadius: 15,
                       paddingHorizontal: 10,
                       paddingTop: 10,
                       marginHorizontal: 20
                     }}>
                     <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: '8%' }}>
                       <Text style={{textAlign:'left', width:'40%', fontFamily:'SairaSemiCondensed-Bold', fontSize:17,color:'black'}}>Communications</Text>
                       <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 30 }}>
                         <Text style={{textAlign:'left', width:'40%', fontFamily:'SairaSemiCondensed-Regular', fontSize:16,color:'black'}}>Maya Yacoub</Text>
                         <View style={{flexDirection:'row', alignItems:'flex-start',width:'40%'}}>
                           <TouchableOpacity style={{ marginHorizontal: 10 }}
                             onPress={async () => {
                               // await this.getPhoneNumber(item.Email)
                               this.setState({ PhoneNumber: '+972598490879' })
                               this.initiateWhatsApp()
                             }}
                           >
                             <Icon
                               name='whatsapp'
                               color='black'
                               size={22}
                             />
                           </TouchableOpacity>
                           <TouchableOpacity style={{ marginHorizontal: 10 }}
                             onPress={async () => {
                               // await this.getPhoneNumber(item.Email)
                               await this.setState({ PhoneNumber: '+972598490879' })
                               this.call()
                             }}
                           >
                             <Icon
                               name="phone"
                               size={22}
                               color={'black'} />
                           </TouchableOpacity>
 
                         
                         </View>
                       </View>
 
                       <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 30 }}>
                         <Text style={{textAlign:'left', width:'40%', fontFamily:'SairaSemiCondensed-Regular', fontSize:16,color:'black'}}>Israa Shtayeh</Text>
                         <View style={{flexDirection:'row', alignItems:'flex-start',width:'40%'}}>
                           <TouchableOpacity style={{ marginHorizontal: 10 }}
                             onPress={async () => {
                               // await this.getPhoneNumber(item.Email)
                               this.setState({ PhoneNumber: '+972568368397' })
                               this.initiateWhatsApp()
                             }}
                           >
                             <Icon
                               name='whatsapp'
                               color='black'
                               size={22}
                             />
                           </TouchableOpacity>
                           <TouchableOpacity style={{ marginHorizontal: 10 }}
                             onPress={async () => {
                               // await this.getPhoneNumber(item.Email)
                               await this.setState({ PhoneNumber: '+972568368397' })
                               this.call()
                             }}
                           >
                             <Icon
                               name="phone"
                               size={22}
                               color={'black'} />
                           </TouchableOpacity>
 
                         
                         </View>
                       </View>
                     </View>
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
 
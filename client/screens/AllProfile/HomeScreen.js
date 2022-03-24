/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component} from 'react';
 import { KeyboardAvoidingView } from 'react-native';
 import { Searchbar } from 'react-native-paper';
 import LinearGradient  from 'react-native-linear-gradient';

 
 import {
   StyleSheet,
   View,
   Text,
   BackHandler,
   Image,
 } from 'react-native';
//  import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
 
 class HomeScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      search:"",
      Email:"",
    }
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount(){
    this.setState({Email : this.props.route.params.Email})
  }
   
  // UNSAFE_componentWillMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  // }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  // }

  // handleBackButtonClick() {
  //   BackHandler.exitApp(); 
  //       return true;
  // }

   render(){
     
     return (

       <View style={styles.MainView}>
         <View style={styles.TopView}>
           
           <Searchbar
            placeholder="Search"
            placeholderTextColor="black"
            
            iconColor='black'

               //backgroundColor="black"
            
            style={{
              backgroundColor:"#98a988",
              borderRadius:50,
              width:'85%',
              height:'90%',
              fontFamily:'SairaSemiCondensed-Regular',
              
            }}            

  
            onChangeText={text=>{
            this.setState({search:text});
            }}
            value={this.state.search}
          />
          {/* {console.log(this.state.search)} */}
          <Image 
               source={require('../../assets/logo/logo1.jpeg')}
               style={{width:60, height:60, borderRadius:0}}
               
               />


          
         </View>
         <LinearGradient
         colors={['#98a988', '#bfcfb2', '#bfcfb2']}
         style={{
           left:0,
           right:0,
           height:50,
           width:'100%',
           margin:0,
         }}
         >
           <Text></Text>
         </LinearGradient>
         <Text>hello</Text>
         
          
          {/* <Text>{this.props.route.params.Email}</Text> */}
          
         
       </View>
     );
   }
 }
 
 
 const styles = StyleSheet.create({
    MainView: {
        display:'flex',
         flex: 1,
         flexDirection: 'column',
         alignItems: 'center',
        //  justifyContent: 'center',
         backgroundColor: '#bfcfb2',
    },
    TopView: {
      width:'100%',
      height:'8%',
      flexDirection:'row',
      backgroundColor:'#bfcfb2',
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20,
      paddingHorizontal:20,
      
      marginTop:10,
      // shadowRadius: 50,
      // shadowColor:'#bfcfb2'
      // alignItems:'center',
      // justifyContent:'center'
    },
    FirstinnerView: {
      flexDirection:'row',
      alignItems:'center',
      marginTop: 25,
      width:'100%',
    }
    
    
});

 
 export default HomeScreen;
 
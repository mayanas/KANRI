/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component} from 'react';
 import { Alert, KeyboardAvoidingView } from 'react-native';
 import { Searchbar } from 'react-native-paper';
 import LinearGradient  from 'react-native-linear-gradient';
 import { serverLink } from '../serverLink';

 
 import {
   StyleSheet,
   View,
   Text,
   BackHandler,
   Image,
   SafeAreaView,
   FlatList,
   TouchableOpacity,
 } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isEqualIcon } from 'react-native-paper/lib/typescript/components/Icon';
import Loading from '../../Components/Loading';

//

//  import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
 
 class HomeScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      Email:this.props.route.params.Email,
      search:"",
      filteredDataSource:[],
      masterDataSource:[],
      enableSearch:false,
      loadedSearch:false,
      ProfileImages:[],
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount(){
    this.setState({Email : this.props.route.params.Email}) 
    // this.send()
  }
  

  UNSAFE_componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    BackHandler.exitApp(); 
        return true;
  }
  

  searchFilterFunction =async  (text) => {
    
    // Check if searched text is not blank
    this.setState({loadedSearch:false})
    await this.getData();
    if (text) {
        
        const newData =this.state.masterDataSource.filter(
          function (item) {
            const itemData = item.NickName
            ? item.NickName.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        this.setState({filteredDataSource:newData,});
        }
        else {
          this.setState({
            filteredDataSource:[],
            
    });
  }
  this.setState({loadedSearch:true})
};  

ItemView = ({item}) => {

  return (
    // Flat List Item
    <TouchableOpacity style={styles.item}
    onPress={() => this.getItem(item)}
   >
   <Text
      style={styles.textItems}
      >
      {item.NickName}
      
    </Text>
   </TouchableOpacity>
    
  );

 
};

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
showAlert = (title,field) =>
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
getItem = (item) => {
 
this.props.navigation.navigate('profileForOthers',{Email:item.Email,GuestEmail:this.state.Email})
}
// async getProfileImage(){
//   await fetch(serverLink+"/getProfileImage", {
//     method: "POST",
//     headers: {
//      "Content-Type": "application/json"
//      },
//     body: JSON.stringify(
//       {               
//               "Email": this.state.Email,
//       }
//     )
//    }).then(resp => {
//      return resp.json();
//    }).then(jsonresponse => {
//     //  console.log(jsonresponse)
//       this.setState({
//         ProfileImage: jsonresponse,
//      })
//    }).catch(error => {
//      console.log(error);
//    });  
   
// }
getData=async () =>  {
  const response = await fetch(serverLink+"/getData", {
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
   if(body=="null"){
     this.showAlert("Warning", "Email does not exist!")
   }else{
console.log(body);
this.setState({masterDataSource:body})
 
}
}

   render(){
    
     return (

      
       <View style={styles.MainView}>
        
         
           <SafeAreaView ew style={styles.MainView}>
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
              
              
            }}  
            inputStyle={{
              fontFamily:'SairaSemiCondensed-Regular',
              fontSize:15
            }}          

  
            onChangeText={(text) => {
              if(text=='')this.setState({enableSearch:false})
              else this.setState({enableSearch:true})
              this.setState({search:text})
              this.searchFilterFunction(text)}}
            
            value={this.state.search}
          />
          {/* {console.log(this.state.search)} */}
          <Image 
               source={require('../../assets/logo/logo1.jpeg')}
               style={{width:60, height:60, borderRadius:0}}
               
               />


          
         </View>
         
         {this.state.enableSearch? 
           this.state.loadedSearch?
            <SafeAreaView style={{width:'100%', height:'100%',flex:1}}>
           <FlatList
         scrollEnabled
         vertical
         showsVerticalScrollIndicator={false}
         width={'100%'}
         height={'100%'}
      data={this.state.filteredDataSource}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={this.ItemSeparatorView}
      renderItem={this.ItemView}
    />
         </SafeAreaView>:<Loading/>
         :
    <KeyboardAwareScrollView style={{backgroundColor:'#bfcfb2'}}>
    <Text>hello</Text>
    
    </KeyboardAwareScrollView>
    }
         
         
        
          {/* <Text>{this.props.route.params.Email}</Text> */}
          </SafeAreaView>
          
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
      height:60,
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
    },
    item:{
      borderBottomWidth:1,
      borderBottomColor:"#bc9855",
      alignItems:'flex-start',
      // justifyContent:'flex-start',
      width:300,
      // height:'100%'
      marginTop:15
        },
        textItems:{
          fontSize:15,
          color:'black',
          fontFamily:'SairaSemiCondensed-Regular',
        },
        
    
    
});

 
 export default HomeScreen;
 
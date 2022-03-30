import React,{Component} from 'react';
import {
    StyleSheet,
    View,
   Text,
   TouchableOpacity,
   SafeAreaView
} from 'react-native';
import { Modal } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

class EditModal extends Component {

    constructor(props){
        super(props);
        this.state={
            isModalVisible: true,
            Data : [
                {id:0,text:"User Name",value:""},
                {id:1,text:"Phone Number",value:""},
                {id:2,text:"Qualification Degree",value:""},
                {id:3,text:"Bio",value:""},
                {id:4,text:"Password",value:""},
              ],
              isRender:false,
            
        }
    }
    
  render() {
    return (
        // <View style={styles.MainView}>
        <Modal animationType='slide'
                   visible={this.state.isModalVisible}
                   onRequestClose={()=>{this.setState({isModalVisible:false})}
                                             }
                    style={styles.ModalView}>
                 <View style={styles.cancelicon}>
                     <Icon  name='close' color="black"  size={25} onPress={()=>{
                      
                      this.setState({isModalVisible:false,})
                    }
                      } />
                 </View>
                 <View style={styles.modalS}>
                    
                    <SafeAreaView  style={{width:'100%', height:'100%'}}>
                    <FlatList
  data={this.state.Data}
  keyExtractor={(item)=>item.id.toString()}
    renderItem={this.renderItem}
   
  extraData={this.state.isRender}
   />
  


              </SafeAreaView >      

            </View>
   </Modal>
//    {/* </View> */}
    )
    
  }
}

const styles = StyleSheet.create({
    item:{
        borderBottomWidth:1,
        borderBottomColor:"gray",
        alignItems:'flex-start'
          },
          cancelicon:{
            paddingTop:1,
        paddingLeft:"94%",
        backgroundColor:'#bfcfb2',
          },
          text:{
        marginVertical:30,
        fontSize:25,
        fontWeight:"bold",
        marginLeft:10
          },
         
          data: {
              fontSize: 20
          },
          modalS:{alignItems:"center",
          alignItems:"center",alignSelf:"center",display:'flex',backgroundColor:'#bfcfb2',paddingTop:"50%", height:"100%"},

          ModalView:{
            flex:1,
            height:"100%",
            alignContent:'center',
            alignItems:'center',
            backgroundColor:'#bfcfb2',
          }
          ,
          save:{
            alignItems:'center',
            paddingHorizontal:100,
            backgroundColor:'red',
            marginTop:20,
          }
        ,
            MainView: {
                display:'flex',
                 flex: 1,
                 flexDirection: 'column',
                //  alignItems: 'center',
                //  justifyContent: 'center',
                 backgroundColor: '#bfcfb2',
            },
            textstyle1: {
              fontSize: 20,
              width: 130,
              color: 'black',
              fontFamily: 'SairaSemiCondensed-Regular',
              
             },
       
          
            textStyle: {
              fontFamily:'SairaSemiCondensed-Regular',
              fontSize:25,
              color:'black',
              textAlign:'center'
            },
         
            textStyle1: {
              fontFamily:'SairaSemiCondensed-Regular',
              fontSize:13,
              color:'black',
              textAlign:'center'
            },
        
         
            buttonText: {
          
            color: 'black',
            textAlign: 'center',
            // fontWeight: 'bold',
            opacity:0.3,
            fontSize: 15,
            fontFamily:"SairaSemiCondensed-Bold",
              // color: '#fff'
          
            },
           
        
            RowStyle: {
              width:'100%',
              height: 60,
              flexDirection:'row',
              paddingHorizontal: 20,
              paddingVertical:10,
              justifyContent:'flex-start',
               alignContent:'center',
              backgroundColor:null,
        
            },
            textstyle1: {
              fontSize: 15,
              width: '40%',
              height:'100%',
              color: 'black',
              fontFamily: 'SairaSemiCondensed-Regular',
              marginTop:7,
              
             },
             inputView:{
              Width:180,
              height:40,
              backgroundColor:'#98a988',
              borderRadius:15,
              overflow: 'hidden',
              paddingHorizontal:4,
              display:'flex',
              flex: 1,
              flexDirection:'row',
              alignItems: 'center',
              // marginRight: 20,
              // alignItems: 'center',
              // justifyContent:'center',
            },
            textinputstyle: {
              width: 180,
              paddingHorizontal:4,
              // opacity:1,
              // marginVertical:1,
              height: 50,
              fontFamily: 'SairaSemiCondensed-Regular',
              fontSize: 15,
              textDecorationLine: 'none',
              backgroundColor: "#98a988"
            },
        
            buttoninputstyle: {
              width: '100%',
              paddingHorizontal:4,
              borderRadius:50,
              overflow:'hidden',
              // opacity:1,
              // marginVertical:1,
              height: 50,
              backgroundColor: "#bc9855",
              justifyContent:'center'
            },
            
            buttontext: {
              color: 'black',
              textAlign: 'center',
              // fontWeight: 'bold',
              fontSize: 20,
              fontFamily:"SairaSemiCondensed-Regular",
            },
}
    
)
    


export default EditModal;

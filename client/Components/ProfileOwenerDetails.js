import React,{Component} from 'react';
import {
    StyleSheet,
    View,
   Text,
   TouchableOpacity
} from 'react-native';


class ProfileOwenerDetails extends Component {

    constructor(props){
        super(props);
        this.state={
          editModalVisible:false
        }
    }
    EditButtonPressed=()=>{
        this.setState({editModalVisible:true})
        
      }
      AddProjectButtonPressed=()=>{
        console.log('add')
      }
      AskForProjectButtonPressed=()=>{
        console.log('ask')
      }

  render() {
    // if(this.state.editModalVisible) return(<EditModal/>)
    return (
        
        <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingVertical: 5,
        }}>
          
          
            <TouchableOpacity
          
          onPress={()=>this.EditButtonPressed()}
          style={{
            width: '33%',
            paddingHorizontal:1,
          }}>
           <View
            style={styles.sview}> 
            <Text
              style={styles.text}>
              Edit Profile
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={()=>this.AddProjectButtonPressed()}
          style={{
            width: '34%',
            paddingHorizontal:1,
          }}>
          <View
            style={styles.sview}>
            <Text
              style={styles.text}>
             Add Project
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={()=>this.AskForProjectButtonPressed()}
          style={{
            width: '33%',
            paddingHorizontal:1,
          }}>
          <View
            style={styles.sview}>
            <Text
            style={styles.text}
             >
             Ask
            </Text>
          </View>
        </TouchableOpacity>
        
      </View>
    )
    
  }
}

const styles = StyleSheet.create({
    sview:{             
        height: 35,
        borderRadius: 5,
        borderColor: 'black',
        backgroundColor:"#bc9855",
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    text:{  
        // fontWeight: 'bold',
        fontSize: 14,
        letterSpacing: 1,
        opacity: 0.8,
        color:"black",
        fontFamily:'SairaSemiCondensed-Bold'
        
      },
}
    
)
    


export default ProfileOwenerDetails;
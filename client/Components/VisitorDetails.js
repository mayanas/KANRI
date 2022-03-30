import React,{Component} from 'react';
import {
    StyleSheet,
    View,
   Text,
   TouchableOpacity
} from 'react-native';


class VisitorDetails extends Component {

    constructor(props){
        super(props);
        this.state={
            followtext:"Follow",
            color:"#bc9855",
            IsFollowed:false,
        }
    }

    componentDidMount(){
        //هون بدي اشوف اذا متابعه يلون بوتون الفولو ويغير نصها
        
    }

    FollowButtonPressed=()=>{
        console.log('follow')
    }
    UnFollowButtonPressed=()=>{
        console.log('unfollow')
    }
    MessegeButtonPressed=()=>{
        console.log('messege')
    }
    CallButtonPressed=()=>{
        console.log('call')
    }

  render() {
    return (
        
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingVertical: 5,
          }}>
          <TouchableOpacity
             onPress={() =>{
              if(this.state.color=="#98a988"){
                this.setState({
                  color:"#bc9855",
                  followtext:"Follow"
                })
                this.UnFollowButtonPressed()
              }
                else{
                  this.setState({
                    color:"#98a988",
                    followtext:"Following"
                  });
                  this.FollowButtonPressed()
                }
              }
                          
             }
            style={{
              width: '33%',
              paddingHorizontal:1,
            }}>
            <View
              style={{   height: 35,
                borderRadius: 5,
                borderColor: 'black',
                backgroundColor:this.state.color,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',}}>
              <Text
                style={styles.text}>
              {this.state.followtext}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={()=>this.MessegeButtonPressed()}
            style={{
              width: '34%',
              paddingHorizontal:1,
            }}>
            <View
              style={styles.sview}>
              <Text
                style={styles.text}>
               Message
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={()=>this.CallButtonPressed()}
            style={{
              width: '33%',
              paddingHorizontal:1,
            }}>
            <View
              style={styles.sview}>
              <Text
              style={styles.text}
               >
           Call
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
    


export default VisitorDetails;
import React,{Component} from 'react';
import {
    View,
   ActivityIndicator,
   Text,
} from 'react-native';


class Loading extends Component {
  state = {
  }

  render() {
    return (
        
            <View
              style={{
                display:'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:'#bfcfb2'
              }}>
              <ActivityIndicator size="large" color='#555555' />
              <Text style={{ fontFamily:'SairaSemiCondensed-Regular', fontSize: 16, color: '#555555',}}>
                Loading....
              </Text>
            </View>
    )
    
  }
}

export default Loading;
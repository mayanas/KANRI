import React, {Component} from 'react';
import LottieView from 'lottie-react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


class LottieCustomer extends Component{
    constructor(props){
      super(props);
    }
     componentDidMount() {
       this.animation.reset();
       this.animation.play();
     }
     componentDidUpdate(){
       this.animation.reset();
       this.animation.play();
     }
     render(){
       return(
        <LottieView 
        ref={animation => {
          this.animation = animation;
        }}
        source={require('../assets/gifs/customer.json')}
        size={35}
        autoPlay={true}
        loop={true}
        speed={1}
        style={{
          // height:hp(40),
          // width:hp(300),
          marginTop: -hp(20)
        }}
      />
       );
     }

}

export default LottieCustomer;
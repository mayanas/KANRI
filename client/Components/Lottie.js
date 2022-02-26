import React, {Component} from 'react';
import LottieView from 'lottie-react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


class Lottie extends Component{
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
        source={require('../assets/gifs/first.json')}
        size={35}
        autoPlay={true}
        loop={true}
        speed={1}
        style={{marginTop: -hp(30)}}
      />
       );
     }

}

export default Lottie;
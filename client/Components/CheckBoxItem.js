import { CheckBox } from 'react-native-elements';
import React,{Component} from 'react';
import {View} from 'react-native';


class CheckBoxItem extends Component {
  state = {
    check: false, // by default lets start unchecked
  }

  onValueChange = () => {
    // toggle the state of the checkbox
    this.setState(previous => {
      return  { check: !previous.check }
    }, () => this.props.onUpdate()); 
    // once the state has been updated call the onUpdate function
    // which will update the selectedBoxes array in the parent componetn
  } 

  render() {
    return (
      <View>
        <CheckBox 
          title={this.props.label}
          checked={this.state.check} 
          onPress={this.onValueChange} 
          containerStyle={{backgroundColor:'#bfcfb2', borderColor:'#bc9855'}}
          iconLeft
          checkedColor='black'

        />
      </View>
    );
  }
}

export default CheckBoxItem;
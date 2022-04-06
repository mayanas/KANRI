import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function Add(props) {
  return (
    <View style={styles.listTile}>
      
      <Text style={styles.title}
      onPress={() => props.OpenProfile(props.todo._id,props.todo.Email)}
      >{props.todo.NickName}</Text>
      <View style={{width:'25%', alignItems:'flex-end'}}>
      <Icon 
      name={props.Flag?"checkcircleo":"loading1"}
      style={styles.trailing}
      size={18}
      color="black"
      />
      </View>
      <View style={{width:'25%', alignItems:'flex-end'}}>
        
      <Icon
        name="delete"
        style={styles.trailing}
        size={18}
        color="black"
        onPress={() => props.deleteTodo(props.todo._id,props.todo.NickName)}
      />
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  listTile: {
    width: "80%",
    height:40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal:20,
    borderRadius:15,
    marginBottom:15,
    backgroundColor: "#bfcfb2",
    // padding: 10,
    borderWidth: 1,
    borderColor: "#98a988",
    paddingHorizontal:10
  },

  title: {
    width: "50%",
    fontSize: 15,
    fontFamily:'SairaSemiCondensed-Regular',
    color:'black'
  },
  trailing: {
    width: "25%",
  }
});
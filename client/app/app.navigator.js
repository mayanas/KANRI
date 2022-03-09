import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Kanri from "../screens/Kanri";
import Login from "../screens/Login";
import About from "../screens/About";
import Register from "../screens/Register";
import ForgetPassword from "../screens/ForgetPassword";
import Home from "../screens/AllProfile/Home";
import Start from "../screens/Start";

const {Navigator, Screen} = createStackNavigator();

const AppNavigator =()=>(
    <NavigationContainer>
        <Navigator initialRouteName="start" screenOptions={{headerShown:false}}>
            <Screen name="start" component={Start}></Screen>
            <Screen name="kanri" component={Kanri}></Screen>
            <Screen name="about" component={About}></Screen>
            <Screen name="login" component={Login}></Screen>
            <Screen name="register" component={Register}></Screen>
            <Screen name="forgetPassword" component={ForgetPassword}></Screen>
            <Screen name="home" component={Home}></Screen>
        </Navigator>
    </NavigationContainer>
)

export default AppNavigator;
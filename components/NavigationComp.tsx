import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StackParamList } from '../typings/navigations';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import LandingPage from "../screens/LandingPage";
import SignUpPage from "../screens/SignUpPage";
import TestPage from "../screens/TestPage";
let user: any = undefined;


const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();

function LoggedInStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }}/>
      <Stack.Screen name="SignUpPage" component={SignUpPage} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}
function LandingStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }}/>
      <Stack.Screen name="SignUpPage" component={SignUpPage} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}
/*
function HomeChatStackNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }} />
        <Stack.Screen name="Screen1" component={Screen1} options={{ headerShown: false }} />
        <Stack.Screen name="Screen2" component={Screen2} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }
  */

  export default function NavigationComp () {
      //const user = useSelector( (state: any) => state.user.loggedInUser)
      
    return (
        <NavigationContainer>
            {user !== undefined ? (
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Chat" component={LoggedInStackNavigator} />
                <Tab.Screen name="I dnu" component={TestPage} />
                <Tab.Screen name="Something" component={TestPage} />
                <Tab.Screen name="HomeScreen" component={TestPage} />
            </Tab.Navigator>

                ) : (

            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="LandingPage" component={LandingStackNavigator} />
                <Tab.Screen name="SignUpPage" component={SignUpPage} />
            </Tab.Navigator>
            )}
        </NavigationContainer>
    )
  }
  
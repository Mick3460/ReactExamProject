import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StackParamList } from '../typings/navigations';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import * as SecureStore from 'expo-secure-store'
import LandingPage from "../screens/LandingPage";
import SignUpPage from "../screens/SignUpPage";
import TestPage from "../screens/TestPage";
import LoggedInLandingPage from "../screens/LoggedInLanding"
import { updateUser } from '../store/actions/user.actions';
import ProfilePage from '../screens/ProfilePage';
import ChatroomsPage from '../screens/ChatroomsPage';
import {User} from "../entities/User"

let user: any = undefined;

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();

function LoggedInStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoggedInLandingPage" component={LoggedInLandingPage} options={{ headerShown: false }}/>
      <Stack.Screen name="TestPage" component={TestPage} options={{ headerShown: false }}/>
      <Stack.Screen name="ChatroomsPage" component={ChatroomsPage} options={{ headerShown: false }}/>
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

export default function NavigationComp () {
  const user = useSelector( (state: any) => state.user.loggedInUser)
  const dispatch = useDispatch() //useDispatch er en hook :)
  
  let idToken;
  let userJson:any;

  async function readPersistedUserInfo() {
    idToken = await SecureStore.getItemAsync('token');
    userJson = await SecureStore.getItemAsync('user');

    if (userJson) {
      let userParsing = JSON.parse(userJson)
      let parsedUser = new User(userParsing.email, undefined, undefined, userParsing.idToken)
      return parsedUser
    } else {
      return undefined;
    }
  }
  
  useEffect(() => {
    readPersistedUserInfo()
    .then( response => dispatch( updateUser(response!) ) ) 
  }, [])// array of variables that can trigger an update if they change. Pass an// an empty array if you just want to run it once after component mounted. 
  
  return (
    <NavigationContainer>
            {user !== undefined ? (
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="HOMESCREEN" component={LoggedInStackNavigator} />
                <Tab.Screen name="Test Page" component={TestPage} />
                <Tab.Screen name="Chat" component={ChatroomsPage} />
                <Tab.Screen name="Profile" component={ProfilePage}/>
            </Tab.Navigator>

                ) : (

            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Landing Page" component={LandingStackNavigator} />
                <Tab.Screen name="SignUp Page" component={SignUpPage} />
            </Tab.Navigator>
            )}
        </NavigationContainer>
    )
  }
  
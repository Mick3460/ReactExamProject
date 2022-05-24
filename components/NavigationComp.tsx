import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StackParamList } from '../typings/navigations';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
//import AsyncStorage from '@react-native-community/async-storage';
import * as SecureStore from 'expo-secure-store'
import LandingPage from "../screens/LandingPage";
import SignUpPage from "../screens/SignUpPage";
import EventFeedPage from "../screens/EventFeedPage";
import NewEventPage from '../screens/NewEventPage'
import LoggedInLandingPage from "../screens/LoggedInLanding"
import { updateUser } from '../store/actions/user.actions';
import {ProfilePage} from '../screens/ProfilePage';
import ChatroomPage from '../screens/ChatroomPage';
import ChatroomsPage from '../screens/ChatroomsPage';
import {ProfileEditPage} from "../screens/ProfileEditPage"
import EventPage from "../screens/EventPage";
import {User} from "../entities/User"
import LoggedInLanding from '../screens/LoggedInLanding';
import {StyleSheet, Text} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';

let user: any = undefined;

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();


function LandingPageStackNavigator() {
  return (
  <Stack.Navigator initialRouteName='LandingPage'>
    <Stack.Screen name="LandingPage" component={LandingPage} options={{headerShown: false}}/>
    <Stack.Screen name="SignUpPage" component={SignUpPage} options={{headerShown: false}}/>
  </Stack.Navigator>
  )
}

function EventStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="EventFeedPage">
      <Stack.Screen name="EventFeedPage" component={EventFeedPage} options ={{headerShown: false}}/>
      <Stack.Screen name="EventPage" component={EventPage} options = {{headerShown: false}}/>
      <Stack.Screen name="NewEventPage" component={NewEventPage} options = {{headerShown: false}}/>
    </Stack.Navigator>
  )
}

function ProfileStackNavigator(){
  return (
    <Stack.Navigator initialRouteName='ProfilePage'>
      <Stack.Screen name='ProfilePage' component={ProfilePage} />
      <Stack.Screen name="ProfileEditPage" component={ProfileEditPage}/>
    </Stack.Navigator>
  )
}

function ChatroomStackNavigator() {
  return (
    <Stack.Navigator initialRouteName='Chatroom'>
      <Stack.Screen name="Chatroom" component={ChatroomsPage} options={{headerShown: false}}/>
      <Stack.Screen name="SpecificChatroom" component={ChatroomPage} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default function NavigationComp () {
  const user = useSelector( (state: any) => state.user.loggedInUser)
  const dispatch = useDispatch() //useDispatch er en hook :)

  let userJson;
  console.log("Vi logger user i NavigationCOmp",user);
  
  async function readPersistedUserInfo() {
    //idToken = await SecureStore.getItemAsync('token');
    userJson = await SecureStore.getItemAsync('user');
    console.log("readPersistedUserInfo");
    console.log("userJson" ,userJson);
    console.log("Vi logger user i readPersisted...",user);
    const savedUser = JSON.parse(userJson)
    if (userJson != null || userJson != undefined) {
      console.log("we're inside the if statement, NavigationComp");
      
      let userParsing = JSON.parse(userJson) as User
      
      return userParsing
    } else {
      return undefined;
    }
  }

  useEffect( () => {
    readPersistedUserInfo()
    .then( response => dispatch( updateUser(response!) ) ) 
  }, [])// array of variables that can trigger an update if they change. Pass an// an empty array if you just want to run it once after component mounted. 
  
  return (
    <NavigationContainer>
      
            {user != undefined ? (
            <Tab.Navigator screenOptions={{ headerShown: false }} >
                <Tab.Screen name="Home" component={LoggedInLandingPage} options={{tabBarIcon: ({  }) => (
                  <Icon name="home" size={30} color="#0000FF"/>
                )}}/>
                <Tab.Screen name="Events" component={EventStackNavigator} options={{tabBarIcon: ({  }) => (
                  <Icon name="calendar" size={30} color="#0000FF"/>
                )}}/>
                <Tab.Screen name="Chat" component={ChatroomStackNavigator} options={{tabBarIcon: ({  }) => (
                  <Icon name="message1" size={30} color="#0000FF"/>
                )}}/>
                <Tab.Screen name="Profile" component={ProfileStackNavigator} options={{tabBarIcon: ({  }) => (
                  <Icon name="user" size={30} color="#0000FF"/>
                )}}/>
            </Tab.Navigator>

                ) : (

            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Login" component={LandingPageStackNavigator} options={{tabBarIcon: ({  }) => (
                  <Icon name="login" size={30} color="#0000FF"/>
                )}} />
                <Tab.Screen name="Sign Up" component={SignUpPage}  options={{tabBarIcon: ({  }) => (
                  <Icon name="adduser" size={30} color="#0000FF"/>
                )}}/>
            </Tab.Navigator>
            )}
        </NavigationContainer>
    )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
      margin: 100,
      height: 100,
      width: 100
  },
})  

  
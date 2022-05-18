import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { User } from '../entities/User';
import { useDispatch, useSelector } from 'react-redux';
import { signInFirebase, } from '../store/actions/user.actions';
//import { logOut } from '../store/actions/chat.actions';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../typings/navigations';
//import * as SecureStore from 'expo-secure-store'
import SignUpPage from "./SignUpPage"

type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "SignUpPage"
>

export default function LandingPage() {
    const [loginText, setLoginText] = useState('mjim@ergod.dk')
    const [loginPw, setLoginPw] = useState('lol123')
    
    const dispatch = useDispatch() //useDispatch er en hook :)
    const user: User = useSelector((state: any) => state.user.loggedInUser) // subscribe to redux store and select attribute 
    const validUser = useSelector((state: any) => state.user.validUser) // subscribe to redux store and select attribute 
    

    //const Stack = createNativeStackNavigator<StackParamList>();
    //const Tab = createBottomTabNavigator();
    const navigation = useNavigation<ScreenNavigationType>()

    async function handleSignIn () {
        const email = loginText;
        const pw = loginPw;
        dispatch(await signInFirebase(email,pw))
    }


    return (
        
    <View style={styles.container}>
        
        <View style={styles.leftOuterBox}>
            <Text style={styles.hugeText}>Landing Page</Text>
            <Text>Is Michael happy? ..no  </Text>    
            <Text>Not a user yet? Sign up and gives us all your data!</Text>  
            <Button title="Sign up" onPress={() => navigation.navigate("SignUpPage" )} />

        <Text>Log in using social networks</Text>

        {/**IKONER TIL GOOGLE OG FACEBOOK */}
            <View style={styles.iconsDiv}>
                <TouchableOpacity onPress={() => {console.log("FACEBOOK")}}>
                    <Image
                    source={require('../assets/facebook2.png')}
                    style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {console.log("GOOGLE")}}>    
                    <Image
                    source={require('../assets/googleIcon.png')}
                    style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

        {/*OR divider */}
        <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 20}}>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}}/> 
                <View><Text style={{width: 50, textAlign: 'center'}}>or</Text></View>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>

        {/*Email, Password textfields with sign in and logout buttons */}
        <View style={{paddingTop: 30}}>
            <TextInput value={loginText} onChangeText={setLoginText} style={styles.textInput} placeholder="Email" />
            <TextInput value={loginPw} secureTextEntry={true} onChangeText={setLoginPw} style={styles.textInput} placeholder="Password" />
            <TouchableOpacity onPress={handleSignIn} style={styles.appButtonContainerLeft}>
                    <Text style={styles.appButtonTextLeft}>SIGN IN</Text>
            </TouchableOpacity>
        </View>

        </View>
        </View> 
   
    );
}

const styles = StyleSheet.create({
   
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    
    leftOuterBox: {
        backgroundColor: '#FDE7E2',
        
        width: '100%',
        height: '100%',

        alignItems: 'center',
        justifyContent: 'center',

    },
    rightOuterBox: {
        backgroundColor: '#009688',
        
        width: '30%',
        height: '100%',

        alignItems: 'center',
        justifyContent: 'center',
    },
    allOfSignup: {
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        

    },
    signupBox: {
        height: '30%',
        justifyContent: 'center',
        paddingTop: 0,
        paddingBottom: 20,
        
    },

    textInput: {
        borderColor: '#000',
        borderWidth: 1,
        textAlign: 'center',
        backgroundColor: '#fff',
        padding: 2,
        margin: 1,
        marginBottom: 3,
        width: 200,

    },

    bigText: {
        fontSize: 20,
        
    },
    hugeText: {
        fontSize: 40,
    },
    iconsDiv: {
        width: '30%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-evenly',

    },

    icon: {
        width: 40, 
        height: 40, 
        borderRadius: 20,
    },

    appButtonContainerLeft: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
      },
      appButtonContainerRight: {
        elevation: 8,
        backgroundColor: "#FDE7E2",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
      },

      appButtonTextRight: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
      appButtonTextLeft: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      }

})



import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ImageBackground } from 'react-native';
import { User } from '../entities/User';
import { useDispatch, useSelector } from 'react-redux';
import { signInFirebase, } from '../store/actions/user.actions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../typings/navigations';

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

    async function handleSignIn() {
        const email = loginText;
        const pw = loginPw;
        dispatch(await signInFirebase(email, pw))
    }


    const img = require("../assets/homescreenBackground.png")


    return (

        <View style={styles.container}>
            <ImageBackground source={img} style={styles.img}>

                {/*Email, Password textfields with sign in */}
                <View>
                    <TextInput value={loginText} onChangeText={setLoginText} style={styles.textInput} placeholder="Email" />
                    <TextInput value={loginPw} secureTextEntry={true} onChangeText={setLoginPw} style={styles.textInput} placeholder="Password" />
                    <TouchableOpacity onPress={handleSignIn} style={styles.signInButton}>
                        <Text style={styles.signInText}>SIGN IN</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    img: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },

    signInText: {
        fontWeight: 'bold',
        color: '#fff',
        alignSelf: "center"
    },

    signInButton: {
        elevation: 8,
        backgroundColor: "rgb(30, 120, 190)",
        borderRadius: 10,
        marginTop: 15,
        paddingVertical: 10,
        paddingHorizontal: 12
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
        borderRadius: 5
    },

})

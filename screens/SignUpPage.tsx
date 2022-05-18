import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../typings/navigations';
import LandingPage from "./LandingPage"
import { signUpFirebase } from '../store/actions/user.actions';


export default function SignUpPage() {

    type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,"LandingPage" >
    const [text, setText] = useState('jim@ergod.dk')
    const [passwordStr, setPasswordStr] = useState('lol123')
    const dispatch = useDispatch() //useDispatch er en hook :)
    const navigation = useNavigation<ScreenNavigationType>()
    
    function handleAddUser () {
        const email = text;
        const pw = passwordStr;
        signUpFirebase(email,pw)
        //dispatch(signUp(email,pw));
        //navigation.navigate("LandingPage") //TODO: UNCOMMENT THIS WHEN JIM PUSHES
    }
    return (
        <View style={styles.container}>
            
            <View style={styles.rightOuterBox}>
                <View style={styles.allOfSignup}>
                    <View>
                    <Text style={styles.bigText}> New member? Sign up! </Text>
                    </View>
                <View style={styles.signupBox}>
                    <TextInput value={text} onChangeText={setText} style={styles.textInput} placeholder="Email" />
                    <TextInput value={passwordStr} secureTextEntry={true} onChangeText={setPasswordStr} style={styles.textInput} placeholder="Password" />
                </View>
                
                <TouchableOpacity onPress={handleAddUser} style={styles.appButtonContainerRight}>
                <Text style={styles.appButtonTextRight}> SIGN UP </Text>
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
    },

    rightOuterBox: {
        backgroundColor: '#009688',
        
        width: '100%',
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
        width: 220,
    },

    bigText: {
        fontSize: 20,
        
    },
    hugeText: {
        fontSize: 40,
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

})  
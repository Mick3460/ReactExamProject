import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { signUpFirebase } from '../store/actions/user.actions';


export default function SignUpPage() {

    const [text, setText] = useState('jim@ergod.dk')
    const [passwordStr, setPasswordStr] = useState('lol123')

    function handleAddUser() {
        const email = text;
        const pw = passwordStr;
        signUpFirebase(email, pw)
    }
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.imageBackground} source={require('../assets/homescreenBackground.png')}>
                <View style={styles.rightOuterBox}>
                    <View style={styles.allOfSignup}>
                        <View>
                            <Text style={styles.bigText}> To use all our great features please sign up!</Text>
                        </View>
                        <View style={styles.signupBox}>
                            <TextInput value={text} onChangeText={setText} style={styles.textInput} placeholder="Email" />
                            <TextInput value={passwordStr} secureTextEntry={true} onChangeText={setPasswordStr} style={styles.textInput} placeholder="Password" />
                        </View>

                        <TouchableOpacity onPress={handleAddUser} style={styles.signUpBtn}>
                            <Text style={styles.signUpBtnText}> SIGN UP </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightOuterBox: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    allOfSignup: {
        height: '50%',
        width: '90%',
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
        backgroundColor: '#fff',
        textAlign: 'center',
        padding: 2,
        margin: 1,
        marginBottom: 3,
        width: 200,
        borderWidth: 1,
        borderRadius: 5
    },

    bigText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#32305D"

    },
    hugeText: {
        fontSize: 40,
    },
    signUpBtn: {
        elevation: 8,
        backgroundColor: "#FDE7E2",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },

    signUpBtnText: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },

})  
import React from 'react';
import { Button, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/actions/user.actions';

export default function LoggedInLanding() {

    const dispatch = useDispatch()
    const img = require('../assets/homescreenBackground.png')
    
    function handleLogOut(){
        dispatch(logOut()) // user-clearing method
        //dispatch(logOut()) // chat-clearing method
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={img} style={styles.imgbackground}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgbackground: {
        width: "100%",
        height: "100%",
    },
})  
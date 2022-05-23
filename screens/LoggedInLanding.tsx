import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';
import WeatherWidget from '../components/WeatherWidget';
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
            <ImageBackground source={img} style={styles.imgbackground}>
                <Text style={styles.weatherText}>Current weather at KEA:</Text>
                <WeatherWidget/>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    weatherText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#32305D"
    },
    imgbackground: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
})  
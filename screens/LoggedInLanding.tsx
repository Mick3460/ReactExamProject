import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/actions/user.actions';


export default function LoggedInLanding() {

    const dispatch = useDispatch()
    
    function handleLogOut(){
        dispatch(logOut()) // user-clearing method
        //dispatch(logOut()) // chat-clearing method
    }

    return (
        <View style={styles.container}>
            <Text>FORSIDE FOR BRUGERE SOM ER LOGGET IND</Text>
            <Button onPress={handleLogOut} title="log out"></Button>
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
})  
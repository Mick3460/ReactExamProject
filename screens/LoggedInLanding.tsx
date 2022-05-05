import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function LoggedInLanding() {
    return (
        <View style={styles.container}>
            <Text>FORSIDE FOR BRUGERE SOM ER LOGGET IND</Text>
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
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EventBlogComp from '../components/EventBlogComp';

export default function EventPage({route}) {
console.log(route.params)
// Use the id from the route to fetch from the database
    return (
        <View style={styles.container}>
            <Text>Event Page</Text>
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
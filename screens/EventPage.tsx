import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import {defaultImage} from './TestPage'

export default function EventPage({route}) {
//console.log(route.params)
const item = route.params.item
console.log(item)
// Use the id from the route to fetch from the database
    return (
        <View style={styles.container}>
            <Image style={styles.imageStyler} source={defaultImage(item.img)}/>
            <Text>Event Page</Text>
            <Text>{item.title}</Text>
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
    imageStyler: {
        width: 100,
        height: 100
    }
})  
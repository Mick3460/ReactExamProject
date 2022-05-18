import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import {defaultImage} from './TestPage'

const icons = [require('../assets/location.png'), require('../assets/calendar.png')]

export default function EventPage({route}) {
//console.log(route.params)
const item = route.params.item
//console.log(item)
// Use the id from the route to fetch from the database
// 
    return (
        <View style={styles.container}>
            <Image style={styles.cover} source={defaultImage(item.img)}/>
            
            <View style={styles.eventBox}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.eventDate}><Image style={styles.icon} source={icons[1]}/>{item.formatDateToDetailString()}</Text>
                <Text style={styles.eventLocation}><Image style={styles.icon} source={icons[0]}/>{item.location}</Text>
            </View>
            <Text style={styles.eventDescription}>{item.detail}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //alignItems: 'flex-start',
        //justifyContent: 'center',
    },
    cover: {
        width: '100%',
        height: 250,
        marginTop: 25
    },
    eventBox: {
        marginTop: 10,
        marginLeft: 20,
    },
    eventTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        marginRight: 10
    },
    eventDate: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    eventLocation: {
        fontSize: 20,
        marginRight: 10
    },
    eventDescription: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 10,
        backgroundColor: '#fff',
    },
    icon: {
        width: 20,
        height: 20
    }
})  
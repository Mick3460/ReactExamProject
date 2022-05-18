import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import {defaultImage} from './EventFeedPage'

const icons = [require('../assets/location.png'), require('../assets/calendar.png')]

export default function EventPage({route}) {

const item = route.params.item
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
    },
    cover: {
        width: '100%',
        height: 250,
        marginTop: 25
    },
    eventBox: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20
    },
    eventTitle: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    eventDate: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    eventLocation: {
        fontSize: 20,
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
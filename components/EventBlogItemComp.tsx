import React from 'react'
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import {View, Text, Image, SafeAreaView, ImageSourcePropType } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'

// works
function trimDetail(detail: string) {
    if(detail.length > 110) {
        return detail.slice(0, 110)+"..."
    }
    return detail
}


const EventBlogItemComp = ({title, img, date, location, detail}: {title: string, img: ImageSourcePropType, date: string, location: string, detail: string}) => (
    // clickable
    <TouchableOpacity>
    <SafeAreaView  style={styles.container}>
        {/* //<View style={styles.innerBox} > */}
        <ImageBackground source={img} style={styles.innerBox} imageStyle={{ borderRadius: 10}}>
        <LinearGradient colors={['#00000000', '#000000']} style={styles.gradient}>
        <Text style={styles.eventTitle}>{title}</Text>
        <Text style={styles.eventText}>{date}</Text>
        <Text style={styles.eventText}>{location}</Text>
        </LinearGradient>
        
        </ImageBackground>
        {/* //</View> */}
    </SafeAreaView >
    </TouchableOpacity>
)

export default EventBlogItemComp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 30,
        width: 280,
        borderRadius: 10
    },
    eventTitle: {
        color: 'white',
        fontSize: 22,
        marginLeft: 10,
        marginBottom: 10
    },
    eventText: {
        color: 'white',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10
    },
    innerBox: {
        margin: 10,
        minWidth: 250,
        minHeight: 180,
    },
    gradient: {
        alignItems: 'flex-start', justifyContent: 'flex-end',  height : '100%', width : '100%', borderRadius: 10
    }
  });
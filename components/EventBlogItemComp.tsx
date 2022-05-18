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

export const EventBlogItemComp = ({title, img, date, location, detail}: {title: string, img: ImageSourcePropType, date: string, location: string, detail: string}) => {
    return (
    <SafeAreaView  style={styles.container}>
        <ImageBackground source={img} style={styles.innerBox} imageStyle={{ borderRadius: 10}}>
            <LinearGradient colors={['#00000000', '#000000']} style={styles.gradient}>
                <Text style={styles.eventTitle}>{title}</Text>
                <Text style={styles.eventText}>{date}</Text>
                <Text style={styles.eventText}>{location}</Text>
            </LinearGradient>
        </ImageBackground>
    </SafeAreaView>
    )
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 10,
        width: 350,
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
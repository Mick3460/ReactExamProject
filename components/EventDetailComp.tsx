// import React from 'react'
// import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
// import {View, Text, Image, SafeAreaView, ImageSourcePropType } from 'react-native'
// import {LinearGradient} from 'expo-linear-gradient'


// const EventBlogItemComp = ({title, img, date, location, detail}: {title: string, img: ImageSourcePropType, date: string, location: string, detail: string}) => (
//     // clickable
//     <TouchableOpacity onPress={() => eventDetailPage()}>
//     <SafeAreaView  style={styles.container}>
//         {/* //<View style={styles.innerBox} > */}
//         <ImageBackground source={img} style={styles.innerBox} imageStyle={{ borderRadius: 10}}>
//         <LinearGradient colors={['#00000000', '#000000']} style={styles.gradient}>
//         <Text style={styles.eventTitle}>{title}</Text>
//         <Text style={styles.eventText}>{date}</Text>
//         <Text style={styles.eventText}>{location}</Text>
//         </LinearGradient>
        
//         </ImageBackground>
//         {/* //</View> */}
//     </SafeAreaView >
//     </TouchableOpacity>
// )
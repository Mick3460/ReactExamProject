import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import EventBlogComp from '../components/EventBlogComp';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from "../typings/navigations";


type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "ProfilePage" // the available pages?
>

export default function TestPage() {
    const navigation = useNavigation<ScreenNavigationType>()
    navigation.navigate("ProfilePage") // where it goes to
    return (
        <SafeAreaView>
            <View style={styles.topBar}>
                <Text style={styles.barText}>EVENT FEED</Text>
            </View>
            <EventBlogComp/>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    topBar: {
        flex: 1,
        alignItems: 'center',
        //marginTop: 180,
        minHeight: 120,
        width: '100%',
        backgroundColor: '#fff',
    },
    barText: {
        marginTop: 50,
        marginBottom: 30,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'rgb(30, 120, 190)'
    }
})  
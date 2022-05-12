import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import EventBlogComp from '../components/EventBlogComp';

export default function TestPage() {
    return (
        <SafeAreaView style={styles.container}>
            <EventBlogComp/>
        </SafeAreaView >
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
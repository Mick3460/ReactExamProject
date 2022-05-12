import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EventBlogComp from '../components/EventBlogComp';

export default function TestPage() {
    return (
        <View style={styles.container}>
            <EventBlogComp/>
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
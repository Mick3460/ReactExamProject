import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TestPage() {
    return (
        <View style={styles.container}>
            <Text>TEST PAGE, ER HER BARE FOR AT VISE EN SCREEN</Text>
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
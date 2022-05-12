import { View, StyleSheet } from 'react-native'
import React from 'react'

export default function Seperator() {
    return (
        <View
            style={styles.seperator}
        />
    )
}

const styles = StyleSheet.create({
    seperator: {
        margin: 15,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
})

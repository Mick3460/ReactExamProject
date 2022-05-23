import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useQuery } from 'react-query'
import { LinearGradient } from 'expo-linear-gradient'

const WeatherWidget = () => {
    const fetchWeather = async () => {
        const response = await fetch("http://api.weatherapi.com/v1/current.json?key=144b504c27ba4d1692494537222305&q=Copenhagen", {})
        const result = await response.json()
        return result
    }

    const { data, status } = useQuery("weather", fetchWeather)
    if (status === 'loading') {
        return <Text>Loading...</Text>
    }

    if (status === "error") {
        return <Text>Error</Text>
    }

    return (
        <View>
            <LinearGradient colors={['#345eeb', '#34c9eb']} style={styles.gradientStyle}>
                <View style={styles.weatherWidget}>
                    <Text>{data.current.temp_c} °C </Text>
                    <Text>{data.current.condition.text}</Text>
                    <Image style={{ width: 50, height: 50 }} source={{ uri: "http:" + data.current.condition.icon }} />
                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherWidget: {
        flexDirection: "row",
        alignItems: 'center',
        padding: 5,
        
    },
    gradientStyle: {
        borderRadius: 40,
        borderWidth: StyleSheet.hairlineWidth,
    }
})

export default WeatherWidget
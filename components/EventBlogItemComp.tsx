import React from 'react'
import {View, Text, Image} from 'react-native'
const EventBlogItemComp = ({title, img}: {title: string, img: string}) => (
    <View>

        <Text>{title}</Text>
        <Image source={require(img)}></Image>
    </View>
)
export default EventBlogItemComp
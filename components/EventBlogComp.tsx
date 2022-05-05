import React from 'react'
import {FlatList, View} from 'react-native'
import EventBlogItemComp from './EventBlogItemComp'
import { EventBlogItem } from '../entities/EventBlogItem'

// 

const blogArray = [new EventBlogItem("0","TestTitle0", "", ""), new EventBlogItem("1","TestTitle1", "", "")] // Pull from database which would be firebase


const renderItem = ({item}: {item: EventBlogItem}) => {
    // fields
    return (
        <EventBlogItemComp title={item.title} img={item.img}></EventBlogItemComp>
    )
}
 const EventBlogComp = () => (
    <View>
        <FlatList
        data= {blogArray}
        renderItem={renderItem}>
            </FlatList>
    </View>
)

export default EventBlogComp
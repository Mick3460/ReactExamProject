import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import EventBlogComp from '../components/EventBlogComp';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from "../typings/navigations";

//import React from 'react'
import {FlatList, TouchableOpacity } from 'react-native'
import {EventBlogItemComp} from '../components/EventBlogItemComp'
import { EventBlogItem } from '../entities/EventBlogItem'

const blogArray = [
    new EventBlogItem("0","TestTitle0", "25/05 * 15:00 - 18:00", "Yo mama's house", "Helloge", ""), 
    new EventBlogItem("1","TestTitle1", "25/05 * 15:00 - 18:00", "Yo mama's house", "Helloge", ""), 
    new EventBlogItem("2","TestTitle2", "25/05 * 15:00 - 18:00", "Yo mama's house", "Helloge", ""), 
    new EventBlogItem("3","TestTitle3", "25/05 * 15:00 - 18:00", "Yo mama's house", "Helloge", ""), 
    new EventBlogItem("4","TestTitle4", "01/06 * 12:00 - 19:00", "KBH Ø","Helloge", "")
    ] // Pull from database which would be firebase
    
type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "TestPage" // the available pages? Or the return stack?
>

export default function TestPage({navigation}) {

    const renderItem = ({item}: {item: EventBlogItem}) => {
        const sourceimage = defaultImage(item.img) // loool doesn't matter
        return (
            <TouchableOpacity onPress={() => navigation.navigate("EventPage", {item})}>
                <EventBlogItemComp title={item.title} img={sourceimage} date={item.date} location={item.location} detail={item.detail}></EventBlogItemComp>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView>
            <View style={styles.topBar}>
                <Text style={styles.barText}>EVENT FEED</Text>
            </View>
            <SafeAreaView style={styles.container}>
                <FlatList // FlatList is scrollable
                    data= {blogArray}
                    renderItem={renderItem}
                    style={styles.scrollable}>
                </FlatList>
            </SafeAreaView >
        </SafeAreaView >
    );
}

export function defaultImage(img: string) {
    
    if(!img) {
        return {uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAYFBMVEXDw8MAAABwcHDHx8eKioqkpKS8vLzGxsatra3KysqQkJCenp6AgIB3d3dra2u3t7dZWVlMTEyysrIsLCxTU1NDQ0OUlJQhISEyMjJlZWUMDAw9PT2Dg4N0dHQYGBhGRkaaAXj3AAACVklEQVR4nO3a63KiQBBAYbATxxYQbxtNdjd5/7dMIFwEGbaA1Fo05/tpNFVzZJgBCQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICFEdFJROTRQ5jKxbvVRLF79CCmkW043XbeEeTpBxo8zXs2ZA2i9RSRiQbPUw5l90wDUw2cqIyIYamBHpP9Lho+GEMNNM7P8IfB/8BOg2qbcNaB/8BQg2qt3ww8J5hpkA2kkAwcj50GUdVgN3AymGkQpPW+1zMXfFeHdhror7LBuvt9GsXHzpHaaVAdCC/dw9FddnnYNU0MNXDp4WuUp6j7bCAv3jXDUIPAabo5eia9K46SS9ffDDX44nxbA7kWM2V/f5gYa+CTnwyKVeMuwjIaSL15CMNj+72LaODWt7fNTotsUG8dcq+t2bCEBpq0bqC2dhA2G4ho/cLN1VT3TtJkA00u57R8xQVvdw2ujdlgsYGusnGWEfRwl6B1aWmwQbEQ/v4elf7pSBCGt7cdDTYoF8K/2XftNp0JGqcEew3qhTD7rt27p8FHPRvMNbhZCN/Wge49CcIwqSJYa9BYCD+07yfpxmcsNQgax/6qJ0H4Xn7EWAM99426pfwhwlYDz0LoU1xGm2rgXQh9vu+smWoQXAY2uJhr0LMQ+uR31gw1GPVs1lZMNUj/PeIOqaUGchrV4Cp2GujrqATZZbSVBr274n5bNdJANuOJjQY8ozl6GtRm3sD9yDPb824QuHjqo/ureOYJ8p8TZKJHDwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOB/+wQBph2Iu8J1cQAAAABJRU5ErkJggg=="}
    }
    else {
        return {uri: img}
    }
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
    },
    container: {
        marginTop: 0,
        alignItems: 'center',
    },
    scrollable: {
        marginBottom: 140
    }
})  

import React, {useEffect} from "react"
import { StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import {FlatList, TouchableOpacity } from 'react-native'
import {EventBlogItemComp} from '../components/EventBlogItemComp'
import { EventBlogItem } from '../entities/EventBlogItem'
import { useDispatch, useSelector } from "react-redux";
import {queryEvent} from '../store/actions/event.actions'

export default function EventFeedPage({navigation}) {
    const firebaseArray: EventBlogItem[] = useSelector((state: any) => state.event.events) // It pushes the data as an array into the firebaseArray, bruh
    const dispatch = useDispatch()
    async function handleFetchEvent() {
        dispatch(await queryEvent())
    }
    useEffect(() => { 
        handleFetchEvent()
        console.log("at launch")
        }, [] 
        );

    const renderItem = ({item}: {item: EventBlogItem}) => {

        const sourceimage = defaultImage(item.img)
        return (
            <TouchableOpacity onPress={() => navigation.navigate("EventPage", {item})}>
                <EventBlogItemComp 
                    title={item.title} 
                    img={sourceimage} 
                    date={item.formatDateToFeedString()} 
                    location={item.location} 
                    detail={item.detail}
                    />
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView>
        
            <View style={styles.topBar}>
                <Text style={styles.barText}>EVENT FEED</Text>
                <TouchableOpacity style={styles.newEvent} onPress={() => navigation.navigate("NewEventPage")}><Text style={{color: '#fff'}}> NEW EVENT </Text></TouchableOpacity>
            </View>
            <SafeAreaView style={styles.container}>
            
                <FlatList // FlatList is scrollable
                    data= {firebaseArray}
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
        minHeight: 130,
        width: '100%',
        backgroundColor: '#fff',
    },
    barText: {
        marginTop: 50,
        marginBottom: 7,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'rgb(30, 120, 190)'
    },
    container: {
        marginTop: 0,
        alignItems: 'center',
    },
    scrollable: {
        marginBottom: 130
    },
    newEvent: {
        margin: 0,
        borderRadius: 5,
        backgroundColor: 'rgb(30, 120, 190)',
    }
})  

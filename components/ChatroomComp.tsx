import React from 'react'
import { View,  Text , StyleSheet, FlatList, TouchableOpacity, Image} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Chatroom } from '../entities/Chatroom';
import { Message } from '../entities/Message';

function trimMessage(msg?: string) {
    if(msg && msg.length > 20) {
        return msg.substring(0,20) + "..."
    } 
    return msg
}

function trimUsername(name?: string) {
    if(name && name.length > 25) {
        return name.substring(0,25) + "..."
    }
    return name
}

//Chatroom objects har id og Messages
export default function ChatroomComp ({chatroom} : {chatroom: Chatroom}){ //chatroom: Chatroom
    const chatroomId = chatroom.id // Will be username later
    const img = require('../assets/homescreenBackground.png')

    // Once we know the 2 users in the room we can also adjust the last message string to include username
    const lastMsg = chatroom.messages?.[0].message as string
    return (
        <View style={styles.container}>
            <Image style={styles.imageStyle} source={img}/>

            <View style={styles.innerProp}> 
                <Text style={styles.innerText}>Username:{trimUsername(chatroomId)}</Text>
                <Text>Last message: {trimMessage(lastMsg)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        minWidth: 320,
        minHeight: 60,
        //borderRadius: 10,
        //backgroundColor: 'red'
    },
    imageStyle: {
        width: 60,
        height: 60,
        borderRadius: 50
    },
    innerProp: {
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    innerText: {
        fontWeight: 'bold'
    }
}) 
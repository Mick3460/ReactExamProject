import React from 'react'
import { View,  Text , StyleSheet, FlatList, TouchableOpacity,} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Chatroom } from '../entities/Chatroom';
import { Message } from '../entities/Message';

//Chatroom objects har id og Messages
export default function ChatroomComp ({chatroom} : {chatroom: Chatroom}){ //chatroom: Chatroom
    let lastMsgIndex = chatroom.messages?.length as number
    let lastMsg = chatroom.messages?.[0].message

    return (
        <View style={styles.container}>
            <Text>lol:{lastMsgIndex}</Text>
            <Text>lol:{lastMsg}</Text>
        </View>
    )
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
        borderColor: 'black',
        borderWidth: 4,
        marginTop: 0,
        alignItems: 'center',
    },
    scrollable: {
        marginBottom: 120
    }
})  



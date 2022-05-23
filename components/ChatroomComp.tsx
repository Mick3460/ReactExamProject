import React from 'react'
import { View,  Text , StyleSheet, FlatList, TouchableOpacity, Image} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Chatroom } from '../entities/Chatroom';
import { Message } from '../entities/Message';
import { useDispatch, useSelector } from "react-redux";

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

function findOtherUser(id: string) {

}

//Chatroom objects har id og Messages
export default function ChatroomComp ({chatroom} : {chatroom: Chatroom}){ //chatroom: Chatroom
    //const username = chatroom.users[0]// Will be username later
    const loggedInUser = useSelector( (state:any) => state.user.loggedInUser )
    let username = ""
    let img = {uri: "https://cdn.frankerfacez.com/emoticon/318909/4"}
    chatroom.users?.forEach(user => {
        if(user.uid != loggedInUser.uid) {
            username = user.displayName as string
            img = {uri: user.photoURL as string}
        }
    })
    
    const chatrooms: Chatroom[] = useSelector((state: any) => state.chat.chatrooms)
    let lastMsg;
    // Once we know the 2 users in the room we can also adjust the last message string to include username
    if (chatroom.messages != undefined && chatroom.messages.length > 0){
        lastMsg = chatroom.messages?.[chatroom.messages.length-1].message as string
        const lastUser = chatroom.messages?.[chatroom.messages.length-1].sender as string
        if(lastUser == loggedInUser.uid) {
            lastMsg = "You: " + lastMsg
        }
    }
    return (
        <View style={styles.container}>
            <Image style={styles.imageStyle} source={img}/>

            <View style={styles.innerProp}> 
                <Text style={styles.innerText}>{trimUsername(username)}</Text>
                <Text>{trimMessage(lastMsg)}</Text>
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
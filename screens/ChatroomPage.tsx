import React, {useEffect} from "react"
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Chatroom } from "../entities/Chatroom";
import { Message } from "../entities/Message";
import { addMessage } from "../store/actions/chat.actions";


export default function ChatroomsPage({route}) {
    
    const dispatch = useDispatch()
    const [messageInput, onChangeMessage] = React.useState('');
    const user = useSelector( (state:any) => state.user.loggedInUser )
    const chatrooms: Chatroom[] = useSelector((state: any) => state.chat.chatrooms)
    
    let item = route.params.item
    const chatroomId = item.id
    let msgArray = item.messages


   useEffect(() => {
   
   }, [chatrooms]); // The second parameters are the variables this useEffect is listening to for changes.

   const handleAddMessage = async () => {
        const msg: Message = new Message(messageInput,user.uid);
        msgArray.push(msg)   
        dispatch( await addMessage(msg,chatroomId));
        onChangeMessage('')
    }


   const renderChatroom = ({ item } : { item: Message }) => (
    <View style={user.uid.trim() == item.sender.trim() ? styles.rightChatBox : styles.leftChatBox}>
    <Text style={styles.textMessage}> {item.message} </Text>
    <Text style={styles.textMessageTime}>{checkTime(item)}</Text>
    </View>
    );
       
    return (
        <View style={styles.container}>

        <FlatList
        style={styles.theList}
        data={msgArray}
        renderItem={renderChatroom}
        
        />
        <TextInput
            style={{width:'100%', borderWidth:2, borderColor: 'green',   }}
            onChangeText={onChangeMessage}
            value={messageInput}
            placeholder="  Enter message..."
        />
        
        <TouchableOpacity onPress={handleAddMessage} style={styles.appButtonContainerLeft}>
            <Text style={styles.appButtonTextLeft}>Send message</Text>
        </TouchableOpacity>
    </View>
    )
}

   
   const checkTime = (item: Message) => {
       
       if (item.createdAt == null)
       return new Date().toDateString();
       if (item.createdAt != null)
       return item.createdAt.toDate().toDateString();
       
   }

   

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    textMessage: {
        textAlign: "left",
        fontSize: 14, padding: 5,

    },
    textMessageTime: {
        textAlign: "center",
        fontSize: 10, paddingLeft: 8, paddingRight: 8,

    },
    theList: {
        backgroundColor: 'rgb(242,242,242)',
        width: '100%',
        flexDirection: 'column-reverse'
    },
    leftChatBox: {
        borderWidth: 2, borderColor: 'lightblue', borderRadius: 20,  alignItems: "flex-start",
        backgroundColor: 'lightblue', width:200, margin: 5,
    },
    rightChatBox: {
        borderWidth: 2, borderColor: 'lightgreen', alignItems: 'flex-end', borderRadius: 20,
        backgroundColor: 'lightgreen', width:200, alignSelf: 'flex-end',margin: 5,
    },
    appButtonTextLeft: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
      appButtonContainerLeft: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
      },


})

import React, {useEffect} from "react"
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Chatroom } from "../entities/Chatroom";
import { Message } from "../entities/Message";
import { queryChatrooms } from "../store/actions/chat.actions";


export default function ChatroomsPage() {
    
    const dispatch = useDispatch()
    const [message, onChangeMessage] = React.useState('');
    const chatrooms: Chatroom[] = useSelector((state: any) => state.chat.chatrooms)
    const user = useSelector( (state:any) => state.user.loggedInUser )

    const testt = chatrooms[0]
    let messageArray = testt?.messages

    async function handleFetchChatroom() {
        dispatch(await queryChatrooms(user))
    }

    useEffect(() => { 
    handleFetchChatroom()
    console.log("\n\n\n££££££££££££££££££££££")
    console.log(user);
    console.log("\n\n\n£££££££££££££££££££££")
    }, [] );

   useEffect(() => {
   if (chatrooms) {
   console.log("Update chatrooms useEffect() ")
   }
   }, [chatrooms]); // The second parameters are the variables this useEffect is listening to for changes.

   const handleAddChatroom = () => {
    //const chatroom: Chatroom = new Chatroom(message.substring(0,12), message, new Date());
    //dispatch(addChatroom(chatroom,user));
   }
   /*
   const checkTime = (item: Chatroom) => {
       
       if (item.timestamp == null)
       return new Date().toString();
       if (item.timestamp != null)
       return item.timestamp.toString();
       else
       return new Date().toString();
   }

   */
   const renderChatroom = ({ item } : { item: Message }) => (
    <View style={user.uid.trim() == item.sender.trim() ? styles.rightChatBox : styles.leftChatBox}>
    <Text style={{fontWeight: 'bold', fontSize: 10}}>{item.sender}</Text>
    <Text style={{fontSize: 14, }}>{item.message}</Text>
    <Text style={{textAlign: 'right', fontSize:8,}}></Text>
    </View>
    );
       
    return (
        <View style={styles.container}>
            
        <Text>user id token er: </Text>
        <Text>user id token er: </Text>
        <Text>user id token er:{user?.connectedChatroomIds.toString()}</Text>
        <Text style={{fontSize: 12, width:300}}>Email:{user?.email}</Text>
        <Text style={{fontSize: 12, width:300}}>uid:{user?.uid}</Text>

        <FlatList
        style={styles.theList}
        data={messageArray}
        renderItem={renderChatroom}
        //keyExtractor={item => item.sender} // MAKE A UNIQUE ID ON ITEMS
        
        />
        <TextInput
            style={{width:300, borderWidth:2, borderColor: 'green',   }}
            onChangeText={onChangeMessage}
            value={message}
            placeholder="Enter message..."
        />
        
        <TouchableOpacity onPress={handleAddChatroom} style={styles.appButtonContainerLeft}>
            <Text style={styles.appButtonTextLeft}>Send message</Text>
        </TouchableOpacity>
    </View>
    )
}



const styles = StyleSheet.create({
    //<Button title="Send chat msg" onPress={handleAddChatroom} />
    //<Button title="Go to screen 2" onPress={() => navigation.navigate("Screen2")} />
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    theList: {
        backgroundColor: 'lightgrey',
        width: 300,
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

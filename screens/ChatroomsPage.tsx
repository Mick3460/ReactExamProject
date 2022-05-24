import React, {useEffect} from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Chatroom } from "../entities/Chatroom";
import ChatroomComp from "../components/ChatroomComp";
import { queryChatrooms } from "../store/actions/chat.actions";
import { User } from "../entities/User";

export default function ChatroomsPage ({navigation}) {
    const chatrooms: Chatroom[] = useSelector((state: any) => state.chat.chatrooms)
    const user: User = useSelector( (state:any) => state.user.loggedInUser)
    const dispatch = useDispatch()

    async function handleFetchChatroom() {
        dispatch(await queryChatrooms(user))
    }

    useEffect(() => { 
        handleFetchChatroom()
        }, [chatrooms,user] );
    
/*     
    useEffect(() => {
    if (chatrooms) {
    console.log("Update chatrooms useEffect() ")
    }
    }, [chatrooms]);

 */
    const renderItem = ({item}: {item: Chatroom}) => {
        
        return (
            <TouchableOpacity onPress={() => navigation.navigate("SpecificChatroom", {item})}>
                <View style={styles.container}>
            <ChatroomComp chatroom={item}
            />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView>
            <View style={styles.topBar}>
                <Text style={styles.barText}>CHAT MESSSAGES</Text>
            </View>
            <SafeAreaView style={styles.container}>
                <FlatList // FlatList is scrollable
                    data= {chatrooms}
                    renderItem={renderItem}
                    style={styles.scrollable}>
                </FlatList>
            </SafeAreaView >
        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    topBar: {
        flex: 1,
        alignItems: 'center',
        //marginTop: 180,
        minHeight: 105,
        width: '100%',
        backgroundColor: '#fff',
    },
    barText: {
        marginTop: 30,
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
        marginBottom: 120
    }
})  

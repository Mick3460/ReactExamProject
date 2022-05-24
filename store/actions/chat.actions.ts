
import { User } from "../../entities/User";
import { Message } from "../../entities/Message";
import { Chatroom } from "../../entities/Chatroom";


export const ADD_CHATROOM = 'ADD_CHATROOM';
export const FETCH_CHATROOMS = 'FETCH_CHATROOMS';



// Create a reference to the cities collection
import { addDoc, collection, doc, getDoc, getDocs, query, where ,FieldValue, serverTimestamp, orderBy} from "firebase/firestore";
import { db } from "../../App";


export const queryChatroomWhere = async (id:number) => {
    const chatroomRef = collection(db, "chatrooms");
    const q = query(chatroomRef, where("chatroomId", "==", id.toString())) //must be a string :rage:
    const querySnapshot = await getDocs(q);
    let chatroom: Object = {};
    
    querySnapshot.forEach((doc) => {
        chatroom = {
            id: doc.id,
            userOne: doc.data().userOne,
            userTwo: doc.data().userTwo
        }
      // doc.data() is never undefined for query doc snapshots
    });
    return chatroom;
}

export const queryChatrooms = async (user: User) => {
    let chatroomIds = user.connectedChatroomIds
    let fetchedChatrooms: Object[] = []
    
    //fetch all chatroom ids
    for(let i=0; i<chatroomIds!.length; i++){
        fetchedChatrooms.push(await queryChatroomWhere(chatroomIds![i]))
    }

    //fetch the messages within every chatroom id
    let chatroomss: Chatroom[] = []
    for (let j = 0; j < fetchedChatrooms.length; j++){
        const chatroomId = fetchedChatrooms[j].id
        const userOneId = fetchedChatrooms[j].userOne.trim(1)
        const userTwoId = fetchedChatrooms[j].userTwo
        const userOneRef = doc(db, "users/"+userOneId)
        const userTwoRef = doc(db, "users/"+userTwoId)
    
        const snapOne = await getDoc(userOneRef)
        const snapTwo = await getDoc(userTwoRef)
        const userArray: User[] = [snapOne.data(), snapTwo.data()]


        let chatroomObject = new Chatroom(chatroomId,[] as Message[], userArray )
        const chatroomReff = collection(db,"chatrooms/"+chatroomId+"/messages")
        const q = query(chatroomReff, orderBy("createdAt")) //must be a string :rage:
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {    
            let msg = new Message(doc.data().message, doc.data().sender,doc.data().createdAt)
              
            chatroomObject.messages?.push(msg)
        });
        
        
        chatroomss.push(chatroomObject)
        
        
    }
    
    return {type: FETCH_CHATROOMS, payload: chatroomss}
}

export const addMessage = async (msg: Message,chatroomId: string) => {
    
    try {
        const newDoc = await addDoc(collection(db,"chatrooms/"+chatroomId+"/messages"), { 
        message: msg.message,
        sender: msg.sender,
        createdAt: serverTimestamp()
      })

    } catch (e){
      console.log(e)
    }
    
    return {type: ADD_CHATROOM, payload: {msg, chatroomId: chatroomId.toString()}}
}
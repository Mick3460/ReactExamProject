
import { User } from "../../entities/User";
import { Message } from "../../entities/Message";
import { Chatroom } from "../../entities/Chatroom";


export const ADD_CHATROOM = 'ADD_CHATROOM';
export const FETCH_CHATROOMS = 'FETCH_CHATROOMS';



// Create a reference to the cities collection
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../App";


export const queryChatroomWhere = async (id:number) => {
    const chatroomRef = collection(db, "chatrooms");
    const q = query(chatroomRef, where("chatroomId", "==", id.toString())) //must be a string :rage:
    const querySnapshot = await getDocs(q);
    let docId: string = "";
    querySnapshot.forEach((doc) => {
        docId = doc.id
      // doc.data() is never undefined for query doc snapshots
    });
    return docId;
}

export const queryChatrooms = async (user: User) => {
    let chatroomIds = user.connectedChatroomIds
    let fetchedIds: string[] = []
    
    //fetch all chatroom ids
    for(let i=0; i<chatroomIds!.length; i++){
        fetchedIds.push(await queryChatroomWhere(chatroomIds![i]))
    }

    //fetch the messages within every chatroom id
    console.log("############\n\n",fetchedIds);
    let chatroomss: Chatroom[] = []
    for (let j = 0; j < fetchedIds.length; j++){
        let chatroomObject = new Chatroom(fetchedIds[j],[] as Message[] )
        const chatroomReff = collection(db,"chatrooms/"+fetchedIds[j]+"/messages")
        const q = query(chatroomReff) //must be a string :rage:
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {    
            let msg = new Message(doc.data().message, doc.data().sender)  
            chatroomObject.messages?.push(msg)
            // doc.data() is never undefined for query doc snapshots
        });
        chatroomObject.messages?.reverse() //reverse list hack :D
        chatroomss.push(chatroomObject)
    }
    console.log("\n \n this is all the chatrooms objects:", chatroomss);
    return {type: FETCH_CHATROOMS, payload: chatroomss}
}


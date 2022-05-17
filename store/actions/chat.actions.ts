import { Chatroom } from "../../entities/Chatroom";
import { User } from "../../entities/User";


export const ADD_CHATROOM = 'ADD_CHATROOM';
export const FETCH_CHATROOMS = 'FETCH_CHATROOMS';


//TODO: FIKS DEN HER URL
export const chatRoomURL = "https://reactexamproject-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json=auth=";

// Create a reference to the cities collection
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../App";
import { Message } from "../../entities/Message";
import { ChatroomObj } from "../../entities/ChatroomObj";


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
    let chatroomss: any[] = []
    for (let j = 0; j < fetchedIds.length; j++){
        let chatroomObject = new ChatroomObj(fetchedIds[j],[] as Message[] )
        const chatroomReff = collection(db,"chatrooms/"+fetchedIds[j]+"/messages")
        const q = query(chatroomReff) //must be a string :rage:
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {    
            let msg = new Message(doc.data().message, fetchedIds[j])  
            chatroomObject.messages?.push(msg)
            // doc.data() is never undefined for query doc snapshots
        });
        chatroomss.push(chatroomObject)
    }
    console.log("\n \n this is all the chatrooms objects:", chatroomss);
    return {type: FETCH_CHATROOMS, payload: chatroomss}
}

/*
    //TODO: HENT BEDRE LOL
    let removeMe = "E5TP4rKxHaYM6xQNrGlg"
    const chatroomReff = collection(db,"chatrooms/"+removeMe+"/messages")
    const docs = await getDocs(chatroomReff)
    console.log("````");

    docs.forEach( (doc) => {
        console.log(doc.id, " => ",doc.data());
    })  
*/
/*
    
    const chatroomRef = collection(db, "chatrooms");
    const q = query(chatroomRef, where("chatroomId", "==", "1"))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach( (doc) => {
        console.log(doc.id, "LLALAALAL%&%&%&%&");
        testId = doc.id
    })
*/


export const addChatroom = (chatroom: Chatroom, user: User) => {
    // indsæt getState: any i dispatchen for at få den næste kommentar til at være valid (?)
     return async (dispatch: (arg0: { type: string; payload: any;}) => void) => {
        //const tooken = getState().user.idToken; KUNNE BRUGES ISTEDET FOR AT SENDE USER MED VIDERE.
        const KEY = user.idToken;
        const url = chatRoomURL+KEY;

        const response = await fetch(url, {
            //redux Thunk makes it possible to return an async function instead of just an action
            //this way we can make fetches without breaking the redux-flow protocols.
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                //key value pairs of data you want to send to server
                
            ...chatroom
            })
        });
        
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@",response);
        if (!response.ok) {
            //There was a problem.. error handling time, BUT I WONT LOL
            console.log(" response isnt OK :) chat.action");
            
            
        } else {
            const data = await response.json(); // json to javascript
            chatroom.id=data.name
            dispatch({type: ADD_CHATROOM, payload: chatroom })
        }
    };
};


/*
export const fetchChatroom = (user: User) => {

    return async (dispatch: (arg0: { type: string; payload: any;}) => void) => {
        //const tooken = getState().user.idToken; KUNNE BRUGES ISTEDET FOR AT SENDE USER MED VIDERE.
        const KEY = user.idToken;
        const url = chatRoomURL+KEY;
            //delete chatroom.id KUNNE BRUGES TIL AT FJERNE ET ID, NÅR MAN SKAL OPDATERE.

        const response = await fetch(url, {
            //redux Thunk makes it possible to return an async function instead of just an action
            //this way we can make fetches without breaking the redux-flow protocols.
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        if (!response.ok) {
            //There was a problem.. error handling time, BUT I WONT LOL
            console.log(" response isnt OK :) chat.action");
            
        } else {
            const data = await response.json(); // json to javascript
            let chatrooms = []
            for (const key in data){

                chatrooms.push(new Chatroom(data[key].title, 
                data[key].message, data[key].timestamp, key))
            }
            dispatch({type: FETCHCHAT, payload: chatrooms })
        }
    };
}
*/


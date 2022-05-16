import { Chatroom } from "../../entities/Chatroom";
import { User } from "../../entities/User";


export const ADD_CHATROOM = 'ADD_CHATROOM';
export const FETCHCHAT = 'FETCHCHAT';


//TODO: FIKS DEN HER URL
export const chatRoomURL = "https://reactexamproject-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json=auth=";

// Create a reference to the cities collection
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../App";

export const queryChatroom = async () => {
    const chatroomRef = collection(db, "chatrooms");
    
    // Create a query against the collection.
    const q = query(chatroomRef, where("chatroomId", "==", "1"));
    let arrayOfId= []
    let testId;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        testId=doc.id
        arrayOfId.push(doc.id)
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });

    console.log("TÆST");
    //TODO: HENT BEDRE LOL
    const chatroomReff = collection(db,"chatrooms/"+testId+"/messages")
    const docs = await getDocs(chatroomReff)
    console.log("````");

    docs.forEach( (doc) => {
        console.log(doc.id, " => ",doc.data());
    })  
}


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


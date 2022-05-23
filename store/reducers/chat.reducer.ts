
import { Chatroom } from "../../entities/Chatroom"
import { Message } from "../../entities/Message"
import { ADD_CHATROOM, FETCH_CHATROOMS } from "../actions/chat.actions"


interface ReduxState {
    chatrooms: Chatroom[] ,
    isHappy: boolean,
    counter: number,
    name: string
}

const initialState: ReduxState = {
    chatrooms: [],
    isHappy: false,
    counter: 0,
    name: "Peter"
}

interface ReduxAction {
    type: string,
    payload?: boolean | number | string | Message ;
}

const chatReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {
        case ADD_CHATROOM:
            //console.log("chatReducer, ADD_CHATROOM reached\n");
            //console.log(action.payload);
            
            let thisId = action.payload?.chatroomId
            //console.log(thisId);
            
            //find the index of the chatroom we wish to add a chat to
            const index = state.chatrooms.findIndex(chatroom => chatroom.id == thisId)
            //console.log("index for idet:",index);
            
            let chatroomToUpdate = state.chatrooms[index]
            //console.log("chatroom to update",chatroomToUpdate);
            
            //push the msg from the user
            chatroomToUpdate.messages?.push(action.payload?.msg)
            //console.log("chatroom to update AFTER PUSH",chatroomToUpdate);
            
            //filter out the old chatroom, insert Chatroom to update
            let newChatroom = state.chatrooms.filter( (chatroom) => {chatroom.id == thisId })
            //console.log("the new chatroom to replace the old one:", newChatroom);
            
            return {...state, chatrooms: [newChatroom, chatroomToUpdate]}

        case FETCH_CHATROOMS:
            return {...state, chatrooms: action.payload}

        default:
            return state;
    }
}


export default chatReducer;
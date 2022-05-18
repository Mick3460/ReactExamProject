
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
            console.log("chatReducer, ADD_CHATROOM reached\n");
            console.log(action.payload);
            
            let thisId = action.payload?.chatroomId
            console.log(thisId);
            
            const index = state.chatrooms.findIndex(id => id == action.payload?.chatroomId)
            const chatroomToUpdate = state.chatrooms[index] //TODO: insert action.payload
            return {...state, chatrooms: [...state.chatrooms, action.payload]}
        case FETCH_CHATROOMS:
            console.log("fetch chatroom reducer reached");
            
            return {...state, chatrooms: action.payload}

        default:
            return state;
    }
}


export default chatReducer;
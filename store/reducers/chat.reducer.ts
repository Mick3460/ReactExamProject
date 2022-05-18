
import { Chatroom } from "../../entities/Chatroom"
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
    payload?: boolean | number | string 
}

const chatReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {
        case ADD_CHATROOM:
            console.log("chatReducer, ADD_CHATROOM reached");
            return {...state, chatrooms: [...state.chatrooms, action.payload]}
        case FETCH_CHATROOMS:
            console.log("\n chatReducer, FETCH CHATROOM reached");
            console.log("action.payload", action.payload);
            
            return {...state, chatrooms: action.payload}
            return state    

        default:
            return state;
    }
}


export default chatReducer;
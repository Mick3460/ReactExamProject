import { Chatroom } from "../../entities/Chatroom"
import { ADD_CHATROOM } from "../actions/chat.actions"


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
    payload?: boolean | number | string | Chatroom
}

const chatReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {
        case ADD_CHATROOM:
            console.log("chatReducer, ADD_CHATROOM reached");
            
            const chatroom = action.payload as Chatroom
            return {...state, chatrooms: [...state.chatrooms, action.payload] as Chatroom[]}
            

        default:
            return state;
    }
}


export default chatReducer;
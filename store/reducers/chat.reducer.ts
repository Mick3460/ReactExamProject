
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
            
            let thisId = action.payload?.chatroomId
            
            //find the index of the chatroom we wish to add a chat to
            const index = state.chatrooms.findIndex(chatroom => chatroom.id == thisId)
            
            let chatroomToUpdate = {...state.chatrooms[index]}
            
            //filter out the old chatroom, insert Chatroom to update
            let newChatroom = {...state.chatrooms.splice(index-1,1)}

            //push the msg from the user
            chatroomToUpdate.messages?.push(action.payload?.msg)
            
            return {...state, chatrooms: [newChatroom, chatroomToUpdate]}

        case FETCH_CHATROOMS:
            return {...state, chatrooms: action.payload}

        default:
            return state;
    }
}


export default chatReducer;
import {EventBlogItem} from "../../entities/EventBlogItem"
import { FETCHEVENT, NEWEVENT } from "../actions/event.actions";

interface ReduxState {
    events: EventBlogItem[]
}

const initialState: ReduxState = {
    events: []
}

interface ReduxAction {
    type: string,
    payload?: EventBlogItem // maybe not need a "?"?
}

const userReducer = (state: ReduxState = initialState, action: any) => {
    switch (action.type) {
        case NEWEVENT:
            return state;
        case FETCHEVENT:
            return {...state, events: action.payload as EventBlogItem[]} // This pushes the queried array into the state array? but we only want the elements.
        default: 
            return state;
    }
};

export default userReducer;
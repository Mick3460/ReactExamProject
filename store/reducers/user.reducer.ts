import { User } from "../../entities/User";
import { SIGNUP, SIGNIN, LOGOUT, UPDATE_USER, } from "../actions/user.actions";



interface ReduxState {
    loggedInUser?: User | undefined,
    validUser: boolean,
    idToken: string | undefined,

}

const initialState: ReduxState = {
    
    validUser: false,
    idToken: undefined,
}

interface ReduxAction {
    type: string,
    payload?: boolean | number | string 
}

const userReducer = (state: ReduxState = initialState, action: any) => {
    switch (action.type) {
        case SIGNUP:
            //const newUser = new User(action.payload.email,undefined,undefined,action.payload.idToken)
            return state; 
        
        case SIGNIN:
            if (action.payload.registered == true){
            const fetchedUser = action.payload.user
            return {...state, validUser: true, loggedInUser: fetchedUser}
            
            } else {
                return state
            }
        case LOGOUT:
            console.log("logOut case reached in reducer");
            return {...state, validUser: false, loggedInUser: undefined, idToken: undefined}
            
        case UPDATE_USER:
            console.log("UPDATE USER case reached in reducer");
            
            return {...state, validUser: true, loggedInUser: action.payload.userJson}
        default: 
            return state;
    }
    
};

export default userReducer;
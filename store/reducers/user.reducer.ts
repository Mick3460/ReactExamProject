import { User } from "../../entities/User";
import { SIGNUP, SIGNIN, LOGOUT, UPDATE_USER, ERROR, } from "../actions/user.actions";



interface ReduxState {
    loggedInUser?: User | undefined,
    validUser: boolean,
    idToken: string | undefined,

}

const initialState: ReduxState = {
    loggedInUser: undefined,
    validUser: false,
    idToken: undefined,
}


const userReducer = (state: ReduxState = initialState, action: any) => {
    switch (action.type) {
        case SIGNUP:
            return state; 
        
        case SIGNIN:
            if (action.payload.registered == true){
            const user: User = action.payload.user
            return {...state, validUser: true, loggedInUser: action.payload.user}
        
            } else {
                return state
            }
            
        case LOGOUT:
            return {...state, validUser: false, loggedInUser: undefined, idToken: undefined}
            
        case UPDATE_USER:
            if (action.payload != null || action.payload != undefined) { 
                
                return {...state, validUser: true, loggedInUser:{ ...state.loggedInUser, ...action.payload.userJson}} 
            }
            else {
                return state
            }
        case ERROR:
            return state
        default: 
            return state;
    }
    
};

export default userReducer;
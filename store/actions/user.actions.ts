import { User } from "../../entities/User";
import { FirebaseSignupSuccess } from "../../entities/FirebaseSignupSuccess";
import * as SecureStore from 'expo-secure-store'

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USER = 'UPDATE_USER';
const KEY = "AIzaSyA5Yl0sy-HhRBnKNjhYUH0A52O0J2h8gMA";


export const updateUser = (userJson: any) => {
    return {type: UPDATE_USER, payload:{userJson}}
}

export const logOut = () => {
    SecureStore.deleteItemAsync('idToken')
    SecureStore.deleteItemAsync('user')
    return {type: LOGOUT}
}


export const signInFirebase = () => {
    
}

export const signIn = (email: string, password: string) => {
    
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+KEY;

    return async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        const response = await fetch(url, {
          //redux Thunk makes it possible to return an async function instead of just an action
          //this way we can make fetches without breaking the redux-flow protocols.
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                //key value pairs of data you want to send to server
                // ...
                email, //email: email
                password,
                returnSecureToken: true //returns ID and refresh token. ALWAYS USE TRUE
            })
        });
  
        if (!response.ok) {
            //There was a problem.. error handling time, BUT I WONT LOL
            console.log("response problem. remember valid email and pw with numbers");
            
        } else {
            const data: FirebaseSignupSuccess = await response.json(); // json to javascript
            console.log("Data from the server user.actions:  ", data);
            const user = new User(data.email,undefined,undefined,data.idToken)
            await SecureStore.setItemAsync('token', data.idToken)
            await SecureStore.setItemAsync('user', JSON.stringify(user)) //converts user object to JSON because it only reads strings.
            dispatch({type: SIGNIN, payload: {user, registered: data.registered}})
        }
    };
 };


export const signUp = (email : string, password : string) => {

    const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+KEY

   return async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
       const response = await fetch(url, {
        
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({ //javascript to json
               //key value pairs of data you want to send to server
               // ...
               email, //email: email
               password,
               returnSecureToken: true //returns ID and refresh token. ALWAYS USE TRUE
           })
       });
 
       if (!response.ok) {
           //There was a problem.. error handling time, BUT I WONT LOL
           console.log("response problem. remember valid email and pw with numbers");
           
       } else {
           const data: FirebaseSignupSuccess = await response.json(); // json to javascript
           console.log("Data from the server in user.actions: ", data);
           
           dispatch({type: SIGNUP, payload: {email: data.email, idToken: data.idToken}})
       }
   };
};

import { User } from "../../entities/User";
import { FirebaseSignupSuccess } from "../../entities/FirebaseSignupSuccess";
import * as SecureStore from 'expo-secure-store'
import {auth} from "../../App"
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../App";

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USER = 'UPDATE_USER';
export const ERROR = "ERROR"
const KEY = "AIzaSyA5Yl0sy-HhRBnKNjhYUH0A52O0J2h8gMA";


export const updateUser = (userJson: any) => {
    return {type: UPDATE_USER, payload:{userJson}}
}

export const logOut = () => {
    SecureStore.deleteItemAsync('idToken')
    SecureStore.deleteItemAsync('user')
    return {type: LOGOUT}
}

async function addANewUserToFireStore(user: User) {
    try {
        const docRef = doc(db,"users/"+user.uid)
        const newDoc = await setDoc(docRef, { 
        displayName: "user.displayname",
        first: "Michael",
        last: "Big papa",
        email: user.email,
        uid: user.uid,
        photoURL: "https://i.kym-cdn.com/photos/images/facebook/001/459/556/023.png",
        connectedChatroomIds: [1,2]
      })
    } catch (e){
      console.log(e)
    }
  }

  async function readASingleUserDocument(path:string) {

    const docReff = doc(db,path)
    const mySnapshot = await getDoc(docReff)
    
    if (mySnapshot.exists()) {
      const docData = mySnapshot.data();
      const user: User = {
          email: docData.email, 
          displayname: docData.displayName, 
          photoUrl: docData.photoURL, 
          idToken: null, 
          uid: docData.uid, 
          connectedChatroomIds: docData.connectedChatroomIds} //,  
      return user
    }
  }

export const signUpFirebase = async (email: string,password: string) => {
    
    const response = await createUserWithEmailAndPassword(auth,email,password)
    const user = response.user
    if (user.email != null ) {
        const userr = new User(user.email, user.displayName as string ,user.photoURL as string, user.stsTokenManager.accessToken as string, user.uid)
        console.log("userr:",userr);
        addANewUserToFireStore(userr)
        return {type: SIGNUP}
    }
}

export const signInFirebase = async (email:string ,password: string) => {
  
    const response = await signInWithEmailAndPassword(auth,email,password)
    const userUid = response.user.uid
    const idToken = response._tokenResponse.idToken
    const fetchUser = await readASingleUserDocument("users/"+userUid) as User
    fetchUser.idToken = idToken
    return {type: SIGNIN, payload: {user: fetchUser, registered: true}} //TODO:FIKS
}






/*
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
*/
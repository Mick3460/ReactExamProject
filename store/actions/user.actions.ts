import { User } from "../../entities/User";
import { FirebaseSignupSuccess } from "../../entities/FirebaseSignupSuccess";
import * as SecureStore from 'expo-secure-store'
import {auth} from "../../App"
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth"
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../App";


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
    signOut(auth)
    .then(() => console.log("Signed out"))
    .catch(() => console.log("error signing out"))
    return {type: LOGOUT}
}

async function addANewUserToFireStore(user: User) {
    try {
        const docRef = doc(db,"users/"+user.uid)

        const newDoc = await setDoc(docRef, { 
        displayName: user.displayname,
        first: "Michael",
        last: "Big papa",
        email: user.email,
        uid: user.uid,
        photoURL: user.photoUrl,
        connectedChatroomIds: [1,2]
      })
    } catch (e){
      console.log(e)
    }
  }

  async function readASingleUserDocument(path:string) {
    console.log("using this path: ",path); 
    console.log("READING A SINGLE DOCUMENT METHOD");
    
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
      console.log(docData);
      console.log("##########", docData.email);
      
      console.log("My data is:", JSON.stringify(docData));
      return user
      
    }
  }

export const signUpFirebase = (email: string,password: string) => {
    
    createUserWithEmailAndPassword(auth,email,password)
    .then( (userCredential) => {
        
        const user: any = userCredential.user

        //console.log("signUpFireBase action, user:",user);
        //console.log("signUpFireBase action, user.email:",user.email); //works userCredential._tokenResponse.idToken
        //console.log("signUpFireBase action, user.stsTokenManager:",user.stsTokenManager); 
        //console.log("signUpFireBase action, user.stsTokenManager.accessToken:",user.stsTokenManager.accessToken); //works userCredential._tokenResponse.idToken      
        
        if (user.email != null){
        const userr = new User(user.email, user.displayName as string ,user.photoURL as string, user.stsTokenManager.accessToken as string, user.uid)
        //console.log("userr:",userr);
        addANewUserToFireStore(userr)
        return {type: SIGNUP}
        }
    })
    .catch( (error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log("errorCode:",errorCode);
        console.log("errorMessage:",errorMessage);
        
    })
}

export const signInFirebase = (email:string ,password: string) => {
        
    signInWithEmailAndPassword(auth,email,password)
    .then( async (userCredential) => {
        const fetchedUser = userCredential.user
        const userUid = fetchedUser.uid
        const idToken = userCredential._tokenResponse.idToken
        //check if user is in FireStore 
        const test = await readASingleUserDocument("users/"+userUid)
        //ourUser.idToken = idToken
    })
    .catch( (error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log("errorCode:",errorCode);
        console.log("errorMessage:",errorMessage);
    })
    return {type:SIGNIN , payload: {registered: true}} //TODO:FIKS
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

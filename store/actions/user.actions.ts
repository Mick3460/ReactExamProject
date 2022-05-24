import { User } from "../../entities/User";
import * as SecureStore from 'expo-secure-store'
import {auth} from "../../App"
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../App";


export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USER = 'UPDATE_USER';
export const ERROR = "ERROR"
const KEY = "AIzaSyA5Yl0sy-HhRBnKNjhYUH0A52O0J2h8gMA";


export const updateUser = (userJson: User) => {
    console.log("updateUser, user action, userJson:",userJson);
    
    return {type: UPDATE_USER, payload: {userJson: userJson} }
}

export const logOut = () => {
    SecureStore.deleteItemAsync('token')
    SecureStore.deleteItemAsync('user')
    signOut(auth) //firebase
    .then(() => console.log("Signed out"))
    .catch(() => console.log("error signing out"))
    return {type: LOGOUT}
}

async function addANewUserToFireStore(user: User) {
    try {
        const docRef = doc(db,"users/"+user.uid) 
        const newDoc = await setDoc(docRef, { 
        
        displayName: "placeholderName",
        first: "Michael",
        last: "Big papa",
        email: user.email,
        uid: user.uid,
        photoURL: "https://i.kym-cdn.com/photos/images/facebook/001/459/556/023.png",
        connectedChatroomIds: [1,2],
        description: "Lol"
      })
    } catch (e){
      console.log(e)
    }
  }

  async function readASingleUserDocument(path:string) {

    const docReff = doc(db,"users/"+path)
    const mySnapshot = await getDoc(docReff)
    
    if (mySnapshot.exists()) {
      const docData = mySnapshot.data();
      const user: User = {
          email: docData.email, 
          displayName: docData.displayName, 
          photoURL: docData.photoURL, 
          idToken: null, 
          uid: docData.uid, 
          connectedChatroomIds: docData.connectedChatroomIds,
          first: docData.first,
          last: docData.last,
          description: docData.description,
        } //,  
      return user
    }
  }

export const signUpFirebase = async (email: string,password: string) => {
    
    const response = await createUserWithEmailAndPassword(auth,email,password)
    const user = response.user
    if (user.email != null ) {
        const userr = new User(user.email, user.displayName as string ,user.photoURL as string, user.stsTokenManager.accessToken as string, user.uid)
        
        addANewUserToFireStore(userr)
        return {type: SIGNUP}
    }
}

export const signInFirebase = async (email:string ,password: string) => {
  
    const response = await signInWithEmailAndPassword(auth,email,password)
    const userUid = response.user.uid
    const idToken = response._tokenResponse.idToken
    const fetchUser = await readASingleUserDocument(userUid) as User
    fetchUser.idToken = idToken

    //can only save objects as strings in Secure Store
    await SecureStore.setItemAsync('user', JSON.stringify(fetchUser)) //converts user object to JSON because it only reads strings.

    return {type: SIGNIN, payload: {user: fetchUser, registered: true}} 
}



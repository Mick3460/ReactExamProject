import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import NavigationComp from './components/NavigationComp';
import chatReducer from './store/reducers/chat.reducer';
import userReducer from './store/reducers/user.reducer';
import { useNavigation } from '@react-navigation/native';


// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, collectionGroup, getDoc, doc, setDoc, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyA5Yl0sy-HhRBnKNjhYUH0A52O0J2h8gMA",
  authDomain: "reactexamproject.firebaseapp.com",
  databaseURL: "https://reactexamproject-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "reactexamproject",
  storageBucket: "reactexamproject.appspot.com",
  messagingSenderId: "1009677637522",
  appId: "1:1009677637522:web:f6c68d992fc398c25c134b",
  measurementId: "G-PJLKNLP8NQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)


//document reference  "specialtyoftheday"
const docReference = doc(db,"chatMessage/zQhBRb7nqAb2KWnG3eET") //doc(ref to firestore, path to doc)

//write or change document, use setDoc
async function changeTheDocument() { //testet, virker
  const docData = {
    chatMessage: "lol mads sucks balls",
    username: "jimmys mor"
  }
  await setDoc(docReference, docData)   //updateDoc opdaterer kun de ting man specificerer, men error'er hvis det ikke findes
  //lav try catch istedet lol
}


//add new document to collection without specifying ID
//Using a collection reference instead of document reference.
async function addANewDocument() {
  try {
    const newDoc = await addDoc(collection(db, "users"), { 
      userName: "Ur mamma",
      first: "Michael",
      last: "Big papa",
      email: "lol@lol.dk"
    })
  } catch (e){
    console.log(e)
  }
}

//read a single doc.. needs a document reference
//const docReference = doc(db,"chatMessage/zQhBRb7nqAb2KWnG3eET")
async function readASingleDocument() {
  const docReff = doc(db,"users/SdOF7X8LErDJGGbieagm")
  const mySnapshot = await getDoc(docReff)
  if (mySnapshot.exists()) {
    const docData = mySnapshot.data()
    console.log("My data is:", JSON.stringify(docData));
    
  }
}
//listen to a document changes in realtime with a snapshot listener
//there's a little more to this and has an unsub function.. https://www.youtube.com/watch?v=BjtxPj6jRM8 7:45 ish
function listenToADocument() {
  onSnapshot(docReference, (docSnapshop) => { //pass in document and listener. The listener is a function that takes a snapshot ref and does something
    if(docSnapshop.exists()) {
      const docData = docSnapshop.data()
      console.log("docSnapshot, in real time docData is: ", JSON.stringify(docData));
      
    }
  } ) 
}

//get multiple docs
async function queryForDocuments() {
  const ourQuery = query( //pass in constraint for query
    collection(db, "users"), //collection
    where("email", "==", "lol@lol.dk")
    //could add orderBy('name')
    //limit(10)  fx med "chatmessages"

  )

  const querySnapshot = await getDocs(ourQuery) //array of documents
  const allDocs = querySnapshot.docs
  //OOOOOR
  const allDocss = querySnapshot.forEach( (snap) => {
    console.log("Snap id: ",snap.id, " contains: ",JSON.stringify(snap.data()));
    
  })

}

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
})


const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {

  return (
    <Provider store={store}>
      <NavigationComp></NavigationComp>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

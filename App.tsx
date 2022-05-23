import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import NavigationComp from './components/NavigationComp';
import chatReducer from './store/reducers/chat.reducer';
import userReducer from './store/reducers/user.reducer';
import eventReducer from './store/reducers/event.reducer';
import { useNavigation } from '@react-navigation/native';

//react query
import { QueryClient, QueryClientProvider } from "react-query";

//import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Require cycle:', 'Setting a timer']);
//LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);
LogBox.ignoreAllLogs(true)

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



const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
  event: eventReducer,
})


const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

const queryClient = new QueryClient({})

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavigationComp></NavigationComp>
      </Provider>
    </QueryClientProvider>
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

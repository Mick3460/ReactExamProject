import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import NavigationComp from './components/NavigationComp';
import userReducer from './store/reducers/user.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  //chat: chatReducer,
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

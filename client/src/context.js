import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { createContext, useState } from 'react';
// const [loggedIn, setLoggedIn] = useState(null);
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDGUu9t1MjKWs_5oM6MUj7XxnViK9HjNtY",
    authDomain: "bad-bank-final.firebaseapp.com",
    projectId: "bad-bank-final",
    storageBucket: "bad-bank-final.appspot.com",
    messagingSenderId: "877795596748",
    appId: "1:877795596748:web:1da3d70cbafc9150496569"
  };
  
  // Initialize Firebase
  const firebaseapp = initializeApp(firebaseConfig);  
  export const auth = getAuth(firebaseapp);
  export default firebaseapp; 

export const UserContext   = createContext({
    loggedIn: null,
    setLoggedIn: () => {},
    firebaseapp: firebaseapp
})

export const UserContextProvider = (props) => {
  const setLoggedIn = (user) => {
    setState({...state, loggedIn: user})
  }
  const initState = {
    loggedIn: null,
    setLoggedIn: setLoggedIn,
    firebaseapp: firebaseapp
  } 

  const [state, setState] = useState(initState);


return (
  <UserContext.Provider value={state}>
    {props.children}
  </UserContext.Provider>
)
}



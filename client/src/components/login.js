import { useState, useContext } from "react";
import { UserContext } from "../context";
import Card from "../card";
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from "../context";

function Login(){
    // const [show, setShow]     = useState(true);
    const [status, setStatus] = useState(''); 
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const ctx = useContext(UserContext);
    const { setLoggedIn } = ctx;
    var loggedIn = ctx.loggedIn;

    function handle(e){
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          const { NODE_ENV } = process.env;
          const API_URL =
            NODE_ENV === 'production' ? window.API_URL : process.env.REACT_APP_API_URL;
          fetch(`${API_URL}/api/account/find/${user.uid}`)
          .then(function (response) {
            // handle success
            setLoggedIn(response.data);
            console.log(response.data);
            setStatus('Welcome');
            // setShow(false);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
      });
  }

  function validLogOut(){
    if (loggedIn = null ){
        return false;
    }
    return true;
  }

  function clearForm(){
    setEmail('');
    setPassword('');
    setLoggedIn(null);
    console.log(loggedIn);
    //redundant?
    signOut(auth).then(() =>{
      console.log('signed out successfully from firebase');
    })
    .catch((error) => {
      console.log(error);
    });
    setTimeout(alert('Logged Out'), 1000);
  }
  
  if(loggedIn ===null){  
  return (
      <>
      <Card
        bgcolor="dark"
        header="Login"
        status={status}
        body={
          <>
          Email<br/>
          <input type="input" 
            className="form-control" 
            placeholder="Enter email" 
            value={email} 
            onChange={e => setEmail(e.currentTarget.value)}/><br/>
      
          Password<br/>
          <input type="password" 
            className="form-control"
            id="password" 
            placeholder="Enter password" 
            value={password} 
            onChange={e => setPassword(e.currentTarget.value)}/><br/>
      
          <button type="submit" className="btn btn-light" onClick={handle}>Login</button><br/><br/>
          <button type="submit" className="btn btn-light" disabled={!validLogOut()} onClick={clearForm}>Log Out</button>
          </>
        }
        />
        </>
        );
      }else{
        return(
          <>
          <Card
          bgcolor="dark"
          header="Login"
          status={status}
          body={
          <>
          <h5>Welcome</h5>
          <button type="submit" className="btn btn-light" onClick={clearForm}>Sign Out</button>
          </>    
          }
      />
      </>
      ); 
  }
}

  export default Login
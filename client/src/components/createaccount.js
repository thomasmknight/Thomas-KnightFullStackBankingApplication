import { useState, useContext, useEffect } from "react";
import Card from '../card';
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../context";
import { UserContext } from '../context';

function CreateAccount(){
    const [show, setShow]           = useState(true);
    const [status, setStatus]       = useState('');
    const [name, setName]           = useState('');
    const [email, setEmail]         = useState('');
    const [password, setPassword]   = useState('');
    const ctx = useContext(UserContext);

    const { loggedIn, setLoggedIn } = ctx;
 
    
    function validate(field, label){
        if(!field) {
            setStatus('Error: Invalid ' + label);
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
        if(password.length < 8){
            setStatus('Error: password must be 8 characters or more')
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
        return true;
    }

    function validSubmit(){
        if ( name.length < 1 || email.length < 1 || password.length < 1){
            return false;
        }
        return true;
    }

    async function handleCreate(e){
        e.preventDefault();
        console.log(name, email, password);
        
        if(!validate(name,      'name'))        return;
        if(!validate(email,     'email'))       return;
        if(!validate(password,  'password'))    return;
        
            createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                    // Account created in Firebase
                    const uid = userCredential.user.uid;
                    const { NODE_ENV } = process.env;
                    const API_URL =
                     NODE_ENV === 'production' ? window.API_URL : process.env.REACT_APP_API_URL;
                     console.log(API_URL);
                    const url = `${API_URL}/api/account/create/${uid}/${name}/${email}/${password}`;
                    const url2 = `${API_URL}/api/account/find/${userCredential.user.uid}`;

                    console.log(url);
                    fetch(url)
                    .then(function (response)  {
                        fetch(url2).then(function (response) {
                            setLoggedIn(response.data);
                            console.log(loggedIn);
                            console.log(response.data);
                            console.log(response);
                        })
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                    // .catch((error) => console.log(error));
                    
                    // setName(userCredential.user.name);
                    // setEmail(userCredential.user.email);
                    // setPassword(userCredential.user.password);
                    // //redundant?

                    // useEffect(() => {
                    //     const createUser = () => {
                    //         fetch(url)
                    //         .then(response =>{
                    //             console.log(response);
                    //             console.log(response.json);
                    //         })
                    //     };
                    //     createUser();
                    // }, []);

                    // (async () => {
                    //     var res  = await fetch(url);
                    //     var data = await res.json();    
                    //     console.log(data);
                    //     //Account created in DB        
                    // })();
    
                    })
                     .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode, errorMessage);
                    });
        setShow(false);
    }

    function clearForm(){
        setName('');
        setEmail('');
        setPassword('');
        setShow(true);
        setLoggedIn(null);
        signOut(auth).then(() =>{
            console.log('signed out successfully from firebase');
          })
          .catch((error) => {
            console.log(error);
          });
    }

    return(
        <>
        <h1>Create Account</h1>
        <Card
            bgcolor="dark"
            header="Create Account"
            status={status}
            body={show ? (
                <>
                Name<br/>
                <input type="input" className="form-control" id="name"
                    placeholder="Enter Name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
                Email Address<br/>
                <input type="input" className="form-control" id="email"
                    placeholder="Enter Email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br/>
                Password<br/>
                <input type="input" className="form-control" id="password"
                    placeholder="Enter Password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br/>
                <button type="submit" className="btn btn-light" disabled={!validSubmit()} onClick={handleCreate}>Create Account</button>
                <br/>
                </>
            ):(
                <>
                <h5>Success</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
                {/* <button type="submit" className="btn btn-dark" onClick={deleteAccount}>Delete account</button> */}
                </>    
            )}
        />
        </>
    );
}

export default CreateAccount
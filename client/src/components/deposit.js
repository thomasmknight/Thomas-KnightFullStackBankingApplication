import { useContext, useState } from "react";
import { UserContext, auth } from "../context"; 
import Card from "../card";

function Deposit(){
    const ctx = useContext(UserContext);
    const {loggedIn} = ctx;
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(0);
    const [load, setLoad] = useState(false);
    const [status, setStatus] = useState('');

    // auth.getUser(uid).then((userRecord)=>{
    //     console.log(userRecord);
    // })
    console.log(loggedIn);

        if (loggedIn != null && (!load)){
            setBalance(loggedIn.balance);
            setLoad(true);
            console.log(loggedIn);
        }

    function handleDeposit (e) {
        e.preventDefault();
        if(!validate(amount))   return;
        const depositAmount = Number(amount);
        const sum = depositAmount + balance;
        console.log(loggedIn._id);
        loggedIn.balance = sum;
        setBalance(sum);
        const { NODE_ENV } = process.env;
        const API_URL =
         NODE_ENV === 'production' ? window.API_URL : process.env.REACT_APP_API_URL;
        const url = `${API_URL}/api/account/deposit/${loggedIn.balance}/${depositAmount}/${loggedIn.uid}`;
        (async () => {
            var res  = await fetch(url);
            var data = await res.json();    
            console.log(data);
            //Account updated in DB        
        })();

    }

    function validate (){
        if( amount < 0 ){
            setStatus('Error: Must enter a positive dollar amount');
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
        return true;
    }

    function validSubmit(){
        if (amount < 1){
            return false;
        }
        return true;
    }

    if(loggedIn === null){
        return (
            <>
                <h1>Deposit</h1>
                <p>
                     <h2>Please <em><a className="nav-link" href="/login/">log in</a></em> to deposit funds</h2>
                </p>
            </>
            );
    }else{
    return(
        <>
        <h1>Deposit</h1>
            <Card
                bgcolor="dark"
                header="Create Account"
                status={status}
                body={
                    <>
                    {loggedIn}'s current balance: <br/>
                    ${loggedIn}<br/>
                    <input type="number" className="form-control" id="amount"
                    placeholder="Deposit Amount" value={amount} onChange={e => setAmount(e.currentTarget.value)} /><br/>
                    <button type="submit" className="btn btn-light" disabled={!validSubmit()} onClick={handleDeposit}> Deposit </button>
                    </>
                }
            />
        <h2>Welcome {loggedIn}</h2>
        </>
    );
    }
}


export default Deposit
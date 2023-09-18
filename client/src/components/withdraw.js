import { useContext, useState } from "react";
import { UserContext } from "../context";
import Card from "../card";

function Withdraw(){
    const ctx = useContext(UserContext);
    var loggedIn = ctx.loggedIn;
    
    const [amount, setAmount] = useState(null);
    const [balance, setBalance] = useState(0);
    const [load, setLoad] = useState(false);
    const [status, setStatus] = useState('');

    if (loggedIn != null && (!load)){
        setBalance(loggedIn.balance);
        setLoad(true);
    }


function handleWithdraw (e) {
    e.preventDefault();
    if(!validate(amount, balance))   return;
    const withdrawAmount = Number(amount);
    const sum = balance - withdrawAmount;
    loggedIn.balance = sum;
    setBalance(sum);
    const { NODE_ENV } = process.env;
    const API_URL =
        NODE_ENV === 'production' ? window.API_URL : process.env.REACT_APP_API_URL;
    // const url = `${process.env.REACT_APP_API_URL}/api/account/withdraw/${loggedIn.email}/${withdrawAmount}/${loggedIn._id}`;
    const url = `${API_URL}/api/account/withdraw/${loggedIn.email}/${withdrawAmount}/${loggedIn._id}`;
    (async () => {
        var res  = await fetch(url);
        var data = await res.json();    
        console.log(data);
        //Account updated in DB        
    })();

}

function validate (inputAmount, inputBalance){
    if( inputAmount < 0 ){
        setStatus('Error: Must enter a positive dollar amount');
        setTimeout(() => setStatus(''), 3000);
        return false;
    }
    if(inputAmount > inputBalance){
        setStatus('Error: Insufficient funds');
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
                <h1>Withdraw</h1>
                <p>
                     <h2>Please <em><a className="nav-link" href="/login/">log in</a></em> to withdraw funds</h2>
                </p>
            </>
            );
    }else{
    return(
        <>
        <h1>Withdraw</h1>
            <Card
                bgcolor="dark"
                header="Create Account"
                status={status}
                body={
                    <>
                    {loggedIn.name}'s current balance: <br/>
                    ${loggedIn.balance}<br/>
                    <input type="number" className="form-control" id="amount"
                    placeholder="Withdrawal Amount" value={amount} onChange={e => setAmount(e.currentTarget.value)} /><br/>
                    <button type="submit" className="btn btn-light" disabled={!validSubmit()} onClick={handleWithdraw}> Withdraw </button>
                    </>
                }
            />
        <h2>Welcome {loggedIn.name}</h2>
        </>
        
    );
}
}

export default Withdraw 
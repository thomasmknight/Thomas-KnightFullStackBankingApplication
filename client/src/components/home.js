import { useContext } from "react";
import { UserContext } from "../context";
import Card from "../card";

function Home(){
const ctx = useContext(UserContext);
var loggedIn = ctx.loggedIn;
if(loggedIn = null){
    return(
        <>
        <br/>
        <Card
            bgcolor="dark"
            txtcolor="white"
            title="Welcome to Gotham National Bank"
            body={(
                <>
                Please <em><a className="nav-link" href="#/login/">log in</a></em> to view your account
                <img src="bank.png" className="img-fluid"
                alt="Responsive Image"/>
                </>
            )}
        />
        </>
    );
}else{
    return(
        <>
        <br/>
            <Card
                bgcolor="dark"
                txtcolor="white"
                title="Welcome to Gotham National Bank"
                body={(
                    <>
                    <img src="bank.png" className="img-fluid"
                    alt="Responsive Image"/>
                    <br/>
                    Welcome {loggedIn}
                    </>
                )}
            />
            </>
        );
}
    
}

export default Home
// To-Do list for the Bad Bank:
// Add styling elements
// dynamically add extra rows to the all data page---TEMP FIXED
// diable submit buttons if no fields are filled
// hover on navbar leads to pop-up (leave to last)
//Amazon S3
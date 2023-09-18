import { useState, useEffect } from "react";
import Card from "../card";
function AllData(){
    const [data, setData] = useState([]);
    const [show, setShow] = useState(true);   
    const [status, setStatus] = useState('');
    const [bandName, setBandName ] = useState('');

    function validSubmit(){
        if ( bandName.length < 1 ){
            return false;
        }
        return true;
    }

    async function handle(e){
        e.preventDefault();
        if( bandName === 'Chumbawumba'){
            setShow(false);
            setStatus('Correct');
        }else return;
    }

    useEffect(() => {
        const getData = () => {
        // fetch all accounts from API
        const { NODE_ENV } = process.env;
        const API_URL =
            NODE_ENV === 'production' ? window.API_URL : process.env.REACT_APP_API_URL; 
        fetch(`${API_URL}/api/account/all`)
        // fetch('/api/account/all')
            // .then(response => response.json())
            .then(response => {
                setData(JSON.stringify(response));  
                console.log(response); 
                console.log(data); 
                console.log(response.json);            
            })
            .catch((error) =>{
                console.log(error);
            });
        };
        getData();
    }, []);

    return (
        <>
        <h1>View All Data</h1>
        <Card
            bgcolor="dark"
            header="View All Data"
            status={status}
            body={show ? (
                <>
                Answer this security question to view customer data<br/><br/>
                What is the greatest band in the world?<br/>
                <input type="input" className="form-control" id="question"
                    placeholder="Enter Band Name" value={bandName} onChange={e => setBandName(e.currentTarget.value)} /><br/>
                <button type="submit" className="btn btn-light" disabled={!validSubmit()} onClick={handle}>Submit</button>
                </>
            ):(
                <>
                    <h5>All Data in Store:</h5>
                     {data}
                </>
                
            )}
        />
        </>
         );
}

export default AllData

//chumbawumba verification?


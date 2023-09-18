// import { ReactDOM, React } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import AllData from './components/alldata.js';
import CreateAccount from './components/createaccount.js';
import Deposit from './components/deposit.js';
import Home from './components/home.js';
import Login from './components/login.js';
import NavBar from './components/navbar.js';
import Withdraw from './components/withdraw.js';

import {  UserContextProvider } from './context.js';

function App() {

  return (
    <>
      <UserContextProvider>
        <Router>
          <NavBar/>
          <Routes>
            <Route path='/' exact element={ <Home/> } />
            <Route path='/createaccount/' element={ <CreateAccount/> } />
            <Route path='/login/' element={ <Login/> } />
            <Route path='/deposit/' element={ <Deposit/> } />
            <Route path='/withdraw/' element={ <Withdraw/> } />
            <Route path='/alldata/' element={ <AllData/> } />
          </Routes>
        </Router>
      </UserContextProvider>
    </>
  )
}

export default App;

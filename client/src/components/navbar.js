import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
function NavBar(){
    
    return(
        <>
         <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
        <Navbar.Brand as={Link} to="/">GNB</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/CreateAccount/">Create Account</Nav.Link>
                  <Nav.Link as={Link} to="/login/">Login</Nav.Link>
                  <Nav.Link as={Link} to="/deposit/">Deposit</Nav.Link>
                  <Nav.Link as={Link} to="/withdraw/">Withdraw</Nav.Link>
                  <Nav.Link as={Link} to="/transfer/">Transfer</Nav.Link>
                  <Nav.Link as={Link} to="/balance/">Balance</Nav.Link>
                  <Nav.Link as={Link} to="/alldata/">All Data</Nav.Link>
            </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
            </>)
}
        {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">GNB</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/" id="home">Home <span className="sr-only">(current)</span><span id="home-text">Home Page</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/CreateAccount/" id="create-acct">Create Account<span id="create-acct-text">Create an account</span></a>
                        
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/login/" id="login">Login<span id="login-text">Log In</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/deposit/" id="deposit">Deposit<span id="deposit-text">Deposit Funds</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/withdraw/" id="withdraw">Withdraw<span id="withdraw-text">Withdraw Funds</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/balance/" id="balance">Balance<span id="balance-text">Check your account balance</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/transfer/" id="transfer">Transfer<span id="transfer-text">Transfer funds</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/alldata/" id="all-data">All Data<span id="all-data-text">View all account data</span></a>
                    </li>
                </ul>
            </div>
        </nav>
    );
   
} */}

export default NavBar
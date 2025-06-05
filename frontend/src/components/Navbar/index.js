import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Cookie from 'js-cookie'; 
import './index.css'; 

const Header = () => {
    const navigate = useNavigate(); 

    const handleLogout = () => {
        const token = Cookie.get('token'); 

        if (token) {
            
            Cookie.remove('token'); 
            console.log('User logged out successfully!'); 
            navigate('/login'); 
        } else {
            console.log('No active session to log out from.');
            alert('You are not currently logged in.');
            navigate('/login'); 
            
        }
    };

    return (
        <header className="app-header">
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                   
                    <Link className="navbar-brand me-auto" to="/mainpage">AI Learner App</Link> 
                    
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav" 
                        aria-controls="navbarNav" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        
                        <ul className="navbar-nav mx-auto"> 
                            <li className="nav-item">
                                <Link className="nav-link" to="/mainpage">Home</Link>
                            </li>
                        </ul>

                       
                        <ul className="navbar-nav ms-auto"> 
                            <li className="nav-item">
                                <Link className="nav-link" to="/history">History</Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={handleLogout} style={{ color: 'white', textDecoration: 'none' }}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
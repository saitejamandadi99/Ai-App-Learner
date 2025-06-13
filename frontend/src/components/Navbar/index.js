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
            console.error('You are not currently logged in.');
            navigate('/login');
        }
    };

    return (
        
        <header className="app-header">
            
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/mainpage">AI Learner App</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav w-100 justify-content-between"> 
                            
                            <li className="nav-item">
                                
                                <Link className="nav-link active" aria-current="page" to="/mainpage">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/history">History</Link>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="nav-link btn btn-primary btn-link "
                                    onClick={handleLogout}
                                    style={{ color: 'inherit', textDecoration: 'none', padding: '0.5rem 1rem' }}
                                >
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

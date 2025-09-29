import React from 'react';
import { Link } from 'react-router-dom';
// Make sure the path is correct

const Header = () => {
    return (
        <header>
            <div className="logo">
                <img src='./image3.png' alt="GateSense Logo" className="logo-image" />
                GATESENSE
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
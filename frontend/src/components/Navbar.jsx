import React from 'react';
import '../css/Navbar.css'

import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to='/home' className="navbar-logo">Bookstore</Link>
                <div className="search-container">
                    <input type="text" placeholder="Search for books..." className="search-input" />
                    <button className="search-button">Search</button>
                </div>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <a href="/favorites" className="nav-links">Favorites</a>
                    </li>
                    <li className="nav-item">
                        <Link to='/profile' className="nav-links">Account</Link>
                    </li>
                    <li className="nav-item">
                        <a href="/cart" className="nav-links cart-link">
                            <span role="img" aria-label="shopping cart">🛒</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
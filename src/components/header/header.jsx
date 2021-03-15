import React from 'react';
import { NavLink } from 'react-router-dom';

import './header.css';

const Header = () => {
    return (
        <div className="header">
            <h3>
                <NavLink to="/">Game of Thrones DB</NavLink>
            </h3>
            <nav className="header-links">
                <NavLink activeClassName="active" to="/characters/">Characters</NavLink>
                <NavLink activeClassName="active" to="/houses/">Houses</NavLink>
                <NavLink activeClassName="active" to="/books/">Books</NavLink>
            </nav>
        </div>
    );
}

export default Header;
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import QuickSearchBar from '../QuickSearchBar';

import '../../styles/GeneralStyles.css';
import logo from '../../assets/icon.png';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav>
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" />
      </Link>
        <div className={`menu ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <QuickSearchBar />
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/search" onClick={toggleMenu}>Advanced Search</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

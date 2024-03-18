import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import QuickSearchBar from '../QuickSearchBar';

import '../../styles/GeneralStyles.css';
import logo from '../../assets/icon.png';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" />
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <QuickSearchBar />
      <ul className={menuOpen ? 'open' : ''}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/search">Advanced Search</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

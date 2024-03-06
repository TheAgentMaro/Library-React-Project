import React from 'react';

import '../../styles/Layout.css'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} SupWorld Library. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
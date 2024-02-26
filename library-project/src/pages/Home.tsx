// Page d'accueil

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Bienvenue à la Bibliothèque SupWorld</h1>
      <p>Découvrez notre vaste collection de livres passionnants.</p>
      <div className="cta-buttons">
        <Link to="/search" className="cta-button">Recherche Avancée</Link>
        <Link to="/search" className="cta-button">Voir les Nouveautés</Link>
      </div>
      <p>Vous pouvez également parcourir nos catégories populaires :</p>
      <ul className="categories-list">
        <li><Link to="/search?q=science">Science</Link></li>
        <li><Link to="/search?q=fiction">Fiction</Link></li>
        <li><Link to="/search?q=mystery">Mystère</Link></li>
      </ul>
    </div>
  );
}

export default Home;
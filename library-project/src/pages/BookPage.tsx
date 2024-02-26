//Page d'affichage des détails du livre

import React from 'react';
import { useParams } from 'react-router-dom';


const BookPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h1>Détails du Livre</h1>
      <p>ID du Livre : {id}</p>
      {/* Contenu des détails du livre */}
    </div>
  );
}

export default BookPage;

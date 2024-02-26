//Page d'affichage des détails du livre

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/BookPage.css';

interface BookData {
    title: string;
    author: string;
    coverUrl: string;
    description: string;
    wikipediaUrl: string;
  }
  const BookPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [bookData, setBookData] = useState<BookData | null>(null);
  
    useEffect(() => {
        fetchBookData(id!);
      }, [id]);
  
      const fetchBookData = async (bookId: string) => {
        try {
          const response = await fetch(`https://openlibrary.org/works/${bookId}.json`);
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données du livre');
          }
          const data = await response.json();
          const bookInfo: BookData = {
            title: data.title,
            author: data.authors ? data.authors[0].name : 'Auteur inconnu',
            coverUrl: `https://covers.openlibrary.org/b/id/${data.cover_id}-L.jpg`,
            description: data.description || 'Aucune description disponible',
            wikipediaUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(data.title)}`,
          };
          setBookData(bookInfo);
        } catch (error) {
          console.error('Erreur lors de la récupération des données du livre:', error);
        }
      };
    return (
      <div className="book-page">
        <h1>Détails du Livre</h1>
        {bookData ? (
          <div className="book-details">
            <img src={bookData.coverUrl} alt={bookData.title} className="book-cover" />
            <div className="book-info">
              <h2>{bookData.title}</h2>
              <p><strong>Auteur:</strong> {bookData.author}</p>
              <p><strong>Description:</strong> {bookData.description}</p>
              <a href={bookData.wikipediaUrl} target="_blank" rel="noopener noreferrer">Lien Wikipedia</a>
            </div>
          </div>
        ) : (
          <p>Chargement des détails du livre...</p>
        )}
      </div>
    );
  }
  
  export default BookPage;
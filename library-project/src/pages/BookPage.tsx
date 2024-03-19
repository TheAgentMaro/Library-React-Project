import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookDataContext, Book } from '../context/BookDataContext';
import '../styles/GeneralStyles.css';

const BookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, fetchBookData } = useContext(BookDataContext);
  const [bookData, setBookData] = useState<Book | null>(null);

  useEffect(() => {
    if (id) {
      fetchBookData(id)
        .then((data) => {
          setBookData(data);
        })
        .catch((error) => {
          console.error('Error fetching book data:', error);
        });
    }
  }, [id, fetchBookData]);

  if (loading) {
    return <p>Loading book details...</p>;
  }

  if (error || !bookData) {
    return <p>Failed to load book details.</p>;
  }

  return (
    <div className="book-page">
      <h1>Book Details</h1>
      <div className="book-details">
        <img src={`https://covers.openlibrary.org/b/id/${bookData.cover_i}-L.jpg`} alt={bookData.title} className="book-cover" />
        <div className="book-info">
          <h2>{bookData.title}</h2>
          <p><strong>Author:</strong> {bookData.author_name.join(', ')}</p>
          <p><strong>Description:</strong> {bookData.description}</p>
          <p><strong>Subjects:</strong></p>
          <ul>
            {bookData.subjects.map((subject, index) => (
              <li key={index}>{subject}</li>
            ))}
          </ul>
          <p><strong>Wikipedia Description:</strong> {bookData.wikipediaDescription}</p>
          <p><strong>Wikipedia Link:</strong> <a href={`https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(bookData.title)}`} target="_blank" rel="noopener noreferrer">Wikipedia</a></p>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
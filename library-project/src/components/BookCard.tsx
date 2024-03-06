import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/BookCard.css'

type BookInfo = {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
}

type BookCardProps = {
  bookInfo: BookInfo;
}

const BookCard: React.FC<BookCardProps> = ({ bookInfo }) => {
  return (
    <div className="book-card">
      <img src={bookInfo.coverUrl} alt={bookInfo.title} />
      <h3>{bookInfo.title}</h3>
      <p>by {bookInfo.author}</p>
      <p>{bookInfo.description}</p>
      <Link to={`/book/${bookInfo.id}`} className="cta-button">View Details</Link>
    </div>
  );
}

export default BookCard;
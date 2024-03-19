import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/GeneralStyles.css';

type BookInfo = {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
};

type BookCardProps = {
  bookInfo: BookInfo;
};

const BookCard: React.FC<BookCardProps> = ({ bookInfo }) => {
  const { id, title, author, coverUrl, description } = bookInfo;

  return (
    <div className="book-card">
      <img src={coverUrl} alt={title} />
      <h3>{title}</h3>
      <p>by {author}</p>
      <p>{description || 'No description available'}</p>
      <Link to={`${id}`} className="cta-button">View Details</Link>
    </div>
  );
};

export default BookCard;

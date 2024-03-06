import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import BookCard from '../components/BookCard';

interface Book {
  key: string;
  title: string;
  author_name: string[];
  cover_i: number;
  description: string;
}

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchBooksData();
  }, []);

  const fetchBooksData = async () => {
    try {
      const response = await fetch('https://openlibrary.org/search.json?q=react');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      // Limiter le nombre de livres à afficher à 6
      const limitedBooks = data.docs.slice(0, 6).map((book: Book) => ({
        key: book.key,
        title: book.title,
        author_name: book.author_name,
        cover_i: book.cover_i,
        description: book.description ? book.description.toString : 'No description available',
      }));
      setBooks(limitedBooks);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div className="home-container">
      <h1>Welcome to the SupWorld Library</h1>
      <p>Discover our extensive collection of exciting books.</p>
      <div className="cta-buttons">
        <Link to="/search" className="cta-button">Advanced Search</Link>
        <Link to="/search" className="cta-button">See what's new</Link>
      </div>
      <p>You can also browse our popular categories:</p>
      <ul className="categories-list">
        <li><Link to="/quick-search?q=science">Science</Link></li>
        <li><Link to="/quick-search?q=science">Fiction</Link></li>
        <li><Link to="/quick-search?q=science">Mystery</Link></li>
      </ul>

      <div className="book-cards">
        {books.map((book: Book) => (
          <BookCard
            key={book.key}
            bookInfo={{
              id: book.key,
              title: book.title,
              author: book.author_name ? book.author_name.join(', ') : 'Unknown',
              coverUrl: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
              description: book.description,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/GeneralStyles.css'
import BookCard from '../components/BookCard';
import axios from 'axios';

interface Book {
  key: string;
  title: string;
  author_name: string[];
  cover_i: number;
  description: string;
}

interface RecentChange {
  id: string;
  kind: string;
  timestamp: string;
  comment: string;
  author: {
    key: string;
  };  
  data: {
    master: string;
    duplicates?: string[];
  };
}


const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [recentChanges, setRecentChanges] = useState<RecentChange[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchBooksData();
    fetchRecentChanges();
  }, []);

  const fetchBooksData = async () => {
    try {
      const response = await axios.get('https://openlibrary.org/search.json?q=react');
      const limitedBooks = response.data.docs.slice(0, 6).map((book: Book) => ({
        key: book.key,
        title: book.title,
        author_name: book.author_name,
        cover_i: book.cover_i,
        description: book.description ? book.description.toString : 'No description available',
      }));
      setBooks(limitedBooks);
      setLoading(false);
    } catch (error) {
      setError('Error fetching data');
      setLoading(false);
    }
  };

  const fetchRecentChanges = async () => {
    try {
      const response = await axios.get('http://openlibrary.org/recentchanges.json?limit=5');
      setRecentChanges(response.data);
    } catch (error) {
      setError('Error fetching recent changes');
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to the SupWorld Library</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
      <p>Discover our extensive collection of exciting books.</p>
      <div className="cta-buttons">
        <Link to="/search" className="cta-button">Advanced Search</Link>
        <Link to="/search" className="cta-button">See what's new</Link>
      </div>
      <p>You can also browse our popular categories:</p>
      <ul className="categories-list">
        <li><Link to="/quick-search?q=science">Science</Link></li>
        <li><Link to="/quick-search?q=fiction">Fiction</Link></li>
        <li><Link to="/quick-search?q=mystery">Mystery</Link></li>
      </ul>

      <h2>Books</h2>
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

      <div className="recent-changes">
        <h2>Recent Changes on the Website</h2>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Kind</th>
                <th>Timestamp</th>
                <th>Comment</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {recentChanges.map((change) => (
                <tr key={change.id} className="change-item">
                  <td>{change.kind}</td>
                  <td>{change.timestamp}</td>
                  <td>{change.comment}</td>
                  <td>{change.author.key}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </>
      )}
    </div>
  );
}

export default Home;

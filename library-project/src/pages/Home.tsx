import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/GeneralStyles.css';
import BookCard from '../components/BookCard';
import { BookDataContext } from '../context/BookDataContext'; 

interface Book {
  key: string;
  title: string;
  author_name: string[];
  cover_i: number;
  description: string;
}


const Home: React.FC = () => {
  const { books, recentChanges, loading, error } = useContext(BookDataContext);

  return (
    <div className="home-container">
      <h1>Welcome to the SupWorld Library</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          <p>Discover our extensive collection of exciting books.</p>
          <div className="cta-buttons">
            <Link to="/search" className="cta-button">
              Advanced Search
            </Link>
            <Link to="/search" className="cta-button">
              See what's new
            </Link>
          </div>
          <p>You can also browse our popular categories:</p>
          <ul className="categories-list">
            <li>
              <Link to="/quick-search?q=science">Science</Link>
            </li>
            <li>
              <Link to="/quick-search?q=fiction">Fiction</Link>
            </li>
            <li>
              <Link to="/quick-search?q=mystery">Mystery</Link>
            </li>
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
};

export default Home;

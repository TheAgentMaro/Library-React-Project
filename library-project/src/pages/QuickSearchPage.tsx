import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BookCard from '../components/BookCard';
import '../styles/GeneralStyles.css'

interface Book {
  key: string;
  title: string;
  author_name: string[];
  cover_i: number;
  description: string;
}

const QuickSearchPage: React.FC = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [queryParams, setQueryParams] = useState<string>('');

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('q');
    if (query) {
      setQueryParams(query);
      handleSearch(query);
    }
  }, [location]);

  const handleSearch = async (query: string) => {
    try {
      const queryString = `https://openlibrary.org/search.json?q=${query}`;
      const response = await fetch(queryString);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setSearchResults(data.docs);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div className="search-page">
      <h1>Quick Search Results for "{queryParams}"</h1>
      <div className="search-results">
        {searchResults.length > 0 ? (
          <div className="book-cards">
            {searchResults.map((book: Book) => (
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
        ) : (
          <p className="P-text">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default QuickSearchPage;
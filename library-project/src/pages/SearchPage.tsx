import React, { useState } from 'react';
import BookCard from '../components/BookCard';
import '../styles/GeneralStyles.css'

interface Book {
  key: string;
  title: string;
  author_name: string[];
  cover_i: number;
  description: string;
}

const SearchPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [subject, setSubject] = useState('');
  const [place, setPlace] = useState('');
  const [person, setPerson] = useState('');
  const [publisher, setPublisher] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);

  const handleSearch = async () => {
    try {
      let queryString = `https://openlibrary.org/search.json?q=`;
  
      if (title) queryString += `title:${title} `;
      if (author) queryString += `author:${author} `;
      if (isbn) queryString += `isbn:${isbn} `;
      if (subject) queryString += `subject:${subject} `;
      if (place) queryString += `place:${place} `;
      if (person) queryString += `person:${person} `;
      if (publisher) queryString += `publisher:${publisher} `;
  
      queryString = queryString.trim();
  
      // Encode the query string
      queryString = encodeURI(queryString);
  
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
      <h1>Advanced Search</h1>
      <div className="search-form">
        <div className="search-inputs">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="text"
          placeholder="Place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <input
          type="text"
          placeholder="Person"
          value={person}
          onChange={(e) => setPerson(e.target.value)}
        />
        <input
          type="text"
          placeholder="Publisher"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
        />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
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
          <p className="P-text">No results .</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

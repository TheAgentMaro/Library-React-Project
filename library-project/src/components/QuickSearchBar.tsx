import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GeneralStyles.css'

const QuickSearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchQuery.trim() !== '') {
      try {
        // Encode the search query
        const encodedQuery = encodeURIComponent(searchQuery);
        navigate(`/quick-search?q=${encodedQuery}`);
      } catch (error) {
        console.error('Error searching:', error);
      }
    }
  };

  return (
    <div className="quick-search-bar">
      <input
        type="text"
        placeholder="Search for books, authors, categories and more.."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ color: 'white !important' }}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default QuickSearchBar;

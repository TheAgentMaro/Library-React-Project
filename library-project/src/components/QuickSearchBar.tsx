import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/QuickSearchBar.css';

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
        placeholder="Searching..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default QuickSearchBar;

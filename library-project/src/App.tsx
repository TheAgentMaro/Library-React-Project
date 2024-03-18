import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import BookPage from './pages/BookPage';
import QuickSearchPage from './pages/QuickSearchPage';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import './App.css'

function App() {

  return (
    <Router>
      <div className="App">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/quick-search" element={<QuickSearchPage />} />
          <Route path="/works/:id" element={<BookPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}


export default App

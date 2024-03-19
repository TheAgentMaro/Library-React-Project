import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export type Book = {
  key: string;
  title: string;
  author_name: string[];
  cover_i: number;
  description: string;
  wikipediaUrl: string;
  wikipediaDescription: string; 
  subjects: string[];
};

export type RecentChange = {
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
};

export type BookDataContextType = {
  books: Book[];
  recentChanges: RecentChange[];
  loading: boolean;
  error: string;
  fetchBookData: (bookId: string) => Promise<Book | null>;
};

export const BookDataContext = createContext<BookDataContextType>({
  books: [],
  recentChanges: [],
  loading: false,
  error: '',
  fetchBookData: async () => null,
});

export const BookDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
      const limitedBooks = response.data.docs.slice(0, 6).map(async (book: any) => {
        const wikipediaData = await fetchWikipediaData(book.title);
        return {
          key: book.key,
          title: book.title,
          author_name: book.author_name,
          cover_i: book.cover_i,
          description: book.description || 'No description available',
          wikipediaUrl: wikipediaData.url,
          wikipediaDescription: wikipediaData.description,
        };
      });

      const resolvedBooks = await Promise.all(limitedBooks);
      setBooks(resolvedBooks);
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

  const fetchWikipediaData = async (title: string): Promise<{ url: string; description: string }> => {
    try {
      const encodedTitle = encodeURIComponent(title);
      const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodedTitle}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch Wikipedia data for ${title}`);
      }
      const data = await response.json();
      return {
        url: data.content_urls?.desktop?.page || '',
        description: data.extract || 'No description available',
      };
    } catch (error) {
      console.error('Error fetching Wikipedia data:', error);
      return { url: '', description: 'No description available' };
    }
  };
  

  const fetchBookData = async (bookId: string): Promise<Book | null> => {
    try {
      const response = await axios.get(`https://openlibrary.org/works/${bookId}.json`);
      const data = response.data;
      const title = data.title || 'Unknown Title';
      const authorNames = data.authors ? data.authors.map((author: any) => author.name) : ['Unknown Author'];
      const coverId = data.covers && data.covers.length > 0 ? data.covers[0] : null;
      const description = data.description || 'No description available';
      const subjects = data.subjects || [];


      const bookInfo: Book = {
        key: bookId,
        title: title,
        author_name: authorNames,
        cover_i: coverId || 0,
        description: description,
        wikipediaUrl: '',
        wikipediaDescription: '',
        subjects: subjects,
      };

      const wikiData = await fetchWikipediaData(title);
      bookInfo.wikipediaUrl = wikiData.url;
      bookInfo.wikipediaDescription = wikiData.description;

  
      return bookInfo;
  
    } catch (error) {
      console.error('Error fetching book data:', error);
      return null; 
    }
  };
  

  return (
    <BookDataContext.Provider value={{ books, recentChanges, loading, error, fetchBookData }}>
      {children}
    </BookDataContext.Provider>
  );
};
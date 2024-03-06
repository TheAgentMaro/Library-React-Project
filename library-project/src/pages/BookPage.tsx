import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/BookPage.css';

interface BookData {
  title: string;
  authors: string[];
  coverUrl: string;
  description: string;
  wikipediaUrl: string;
  wikipediaDescription: string;
}

const BookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      fetchBookData(id);
    }
  }, [id]);

  const fetchBookData = async (bookId: string) => {
    try {
      const response = await fetch(`https://openlibrary.org/works/${bookId}.json`);
      if (!response.ok) {
        throw new Error('Failed to fetch book data');
      }
      const data = await response.json();
      const title = data.title || 'Unknown Title';
      const authors = data.authors ? data.authors.map((author: any) => author.author.key.replace('/authors/', '')) : ['Unknown Author'];
      const authorNames = authors.map((authorKey: string) => authorKey);
      const coverId = data.covers && data.covers.length > 0 ? data.covers[0] : null;
      const description = data.description || 'No description available';
      
      const bookInfo: BookData = {
        title: title,
        authors: authorNames,
        coverUrl: coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : '',
        description: description,
        wikipediaUrl: '',
        wikipediaDescription: ''
      };
      setBookData(bookInfo);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching book data:', error);
      setLoading(false);
    }
  };

  const fetchWikipediaData = async (title: string): Promise<{ url: string; description: string }> => {
    try {
      const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch Wikipedia data');
      }
      const data = await response.json();
      return {
        url: data.content_urls.desktop.page,
        description: data.extract || 'No description available',
      };
    } catch (error) {
      console.error('Error fetching Wikipedia data:', error);
      return { url: '', description: 'No description available' };
    }
  };

  useEffect(() => {
    if (bookData && bookData.title) {
      fetchWikipediaData(bookData.title)
        .then((wikiData) => {
          setBookData((prevData: BookData | null) => {
            if (prevData) {
              return {
                ...prevData,
                wikipediaUrl: wikiData.url,
                wikipediaDescription: wikiData.description,
              };
            }
            return null;
          });
        })
        .catch((error) => console.error('Error fetching Wikipedia data:', error));
    }
  }, [bookData]);

  console.log('Book Data:', bookData);

  return (
    <div className="book-page">
      <h1>Book Details</h1>
      {loading ? (
        <p>Loading book details...</p>
      ) : bookData ? (
        <div className="book-details">
          <img src={bookData.coverUrl} alt={bookData.title} className="book-cover" />
          <div className="book-info">
            <h2>{bookData.title}</h2>
            <p><strong>Author:</strong> {bookData.authors}</p>
            <p><strong>Description:</strong> {bookData.description}</p>
            <p><strong>Wikipedia Description:</strong> {bookData.wikipediaDescription}</p>
            <p><strong>Wikipedia Link:</strong> <a href={`https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(bookData.title)}`} target="_blank" rel="noopener noreferrer">Wikipedia</a></p>
          </div>
        </div>
      ) : (
        <p>Failed to load book details.</p>
      )}
    </div>
  );
}

export default BookPage;

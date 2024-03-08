import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookCard from '../components/BookCard';
import '@testing-library/jest-dom/extend-expect';

// Define a mock book info object for testing
const mockBookInfo = {
  id: '/book/123',
  title: 'Test Book',
  author: 'Test Author',
  coverUrl: 'test-cover-url.jpg',
  description: 'Test description for the book.',
};

const renderWithRouter = (component: JSX.Element) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('BookCard Component', () => {
  it('should render book card with correct details', () => {
    renderWithRouter(<BookCard bookInfo={mockBookInfo} />);
    
    expect(screen.getByText(mockBookInfo.title)).toBeInTheDocument();
    expect(screen.getByText(`by ${mockBookInfo.author}`)).toBeInTheDocument();
    expect(screen.getByText(mockBookInfo.description)).toBeInTheDocument();

    const viewDetailsLink = screen.getByRole('link', { name: /view details/i });
    expect(viewDetailsLink).toBeInTheDocument();
    expect(viewDetailsLink).toHaveAttribute('href', mockBookInfo.id);
  });

});
// Import necessary libraries and components
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

// Wrap the BookCard component with BrowserRouter for routing context
const renderWithRouter = (component: JSX.Element) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

// Test suite for BookCard component
describe('BookCard Component', () => {
  // Test case to ensure that BookCard renders correctly with the provided book info
  it('should render book card with correct details', () => {
    renderWithRouter(<BookCard bookInfo={mockBookInfo} />);
    
    // Assert that the book title, author, and description are rendered correctly
    expect(screen.getByText(mockBookInfo.title)).toBeInTheDocument();
    expect(screen.getByText(`by ${mockBookInfo.author}`)).toBeInTheDocument();
    expect(screen.getByText(mockBookInfo.description)).toBeInTheDocument();

    // Assert that the "View Details" link is rendered with the correct URL
    const viewDetailsLink = screen.getByRole('link', { name: /view details/i });
    expect(viewDetailsLink).toBeInTheDocument();
    expect(viewDetailsLink).toHaveAttribute('href', mockBookInfo.id);
  });

});
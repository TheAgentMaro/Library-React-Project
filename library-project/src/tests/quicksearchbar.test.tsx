import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom'; // Import useNavigate directly
import QuickSearchBar from '../components/QuickSearchBar';
import '@testing-library/jest-dom/extend-expect';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

test('renders QuickSearchBar component', () => {
  const { getByPlaceholderText, getByText } = render(
    <BrowserRouter>
      <QuickSearchBar />
    </BrowserRouter>
  );

  const inputElement = getByPlaceholderText('Searching...');
  expect(inputElement).toBeInTheDocument();

  const searchButton = getByText('Search');
  expect(searchButton).toBeInTheDocument();
});

test('handles search correctly', () => {
  const mockNavigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

  const { getByPlaceholderText, getByText } = render(
    <BrowserRouter>
      <QuickSearchBar />
    </BrowserRouter>
  );

  const inputElement = getByPlaceholderText('Searching...');
  const searchButton = getByText('Search');

  fireEvent.change(inputElement, { target: { value: 'Test query' } });
  fireEvent.click(searchButton);

  expect(mockNavigate).toHaveBeenCalledWith('/quick-search?q=Test%20query');
});

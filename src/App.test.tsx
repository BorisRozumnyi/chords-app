import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders click to enter text', () => {
  render(<App />);
  const enterElement = screen.getByText(/click to enter text/i);
  expect(enterElement).toBeInTheDocument();
});

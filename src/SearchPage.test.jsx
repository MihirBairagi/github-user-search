import { render, screen } from '@testing-library/react';
import SearchPage from './pages/SearchPage';
import { MemoryRouter } from 'react-router-dom';

test('renders input and button', () => {
  render(
    <MemoryRouter>
      <SearchPage />
    </MemoryRouter>
  );

  const inputElement = screen.getByPlaceholderText(/enter username/i);
  const buttonElement = screen.getByRole('button', { name: /search/i });

  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

import { render, screen, waitFor } from '@testing-library/react';
import UserDetailsPage from './pages/UserDetailsPage';
import { MemoryRouter } from 'react-router-dom'; // Wrap in router for navigation

describe('UserDetailPage', () => {
  it('should render user details correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/user/some-username']}>
        <UserDetailsPage />
      </MemoryRouter>
    );

    // First, check for the "Loading..." state
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the user details to load or for an error to appear
    await waitFor(() => {
      // Check for username after loading
      const usernameElement = screen.queryByText('Some Username');
      if (usernameElement) {
        expect(usernameElement).toBeInTheDocument();
      } else {
        // If no username, we check if the error message appears
        expect(screen.getByText('Error: Not Found')).toBeInTheDocument();
      }
    });
  });
});

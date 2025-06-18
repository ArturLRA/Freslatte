import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('render NavBarMenu on home route', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  const navElement = screen.getByRole('navigation'); // supondo que NavBarMenu tenha role navigation
  expect(navElement).toBeInTheDocument();
});

test('does not render NavBarMenu on /loginpage', () => {
  render(
    <MemoryRouter initialEntries={['/loginpage']}>
      <App />
    </MemoryRouter>
  );
  const navElement = screen.queryByRole('navigation');
  expect(navElement).not.toBeInTheDocument();
});

import React from 'react';
import { render } from '@testing-library/react';
import { FavoritesProvider } from './contexts/FavoritesContext'; // adjust path
import { MemoryRouter } from 'react-router-dom';

export const renderWithProviders = (ui: React.ReactElement, { route = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <FavoritesProvider>{ui}</FavoritesProvider>
    </MemoryRouter>
  );
};

import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../pages';

describe('Requisito 3', () => {
  it('Testando sem nenhum pokemon favoritado', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavs = screen.getByText('No favorite pokemon found');
    expect(noFavs).toBeInTheDocument();
  });
});

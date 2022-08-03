import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 1', () => {
  it('Testando se os links aparecem na tela', () => {
    renderWithRouter(<App />);
    const home = screen.getByText('Home');
    expect(home).toBeInTheDocument();

    const about = screen.getByText('About');
    expect(about).toBeInTheDocument();

    const favoritePokemon = screen.getByText('Favorite Pokémons');
    expect(favoritePokemon).toBeInTheDocument();
  });

  it('Testando se os link about redireciona para sua devida página', () => {
    const { history } = renderWithRouter(<App />);

    const about = screen.getByRole('link', { name: 'About' });
    userEvent.click(about);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testando se os link about redireciona para sua devida página', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: 'Home' });
    userEvent.click(home);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testando se os link favourite pokemons redireciona para sua devida página', () => {
    const { history } = renderWithRouter(<App />);

    const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favorite);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});

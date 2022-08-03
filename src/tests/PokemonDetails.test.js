import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Requisito 7', () => {
  test('pokemons details appear when select the pokemon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);
    expect(screen.getByRole('heading', { name: 'Pikachu Details' })).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Summary' })).toBeInTheDocument();
    expect(screen.getByText(/this intelligent pokémon roasts/i)).toBeInTheDocument();
  });

  test('cheking for maps', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);

    const title = screen.getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(title).toBeInTheDocument();

    const poke = screen.getAllByAltText('Pikachu location');
    expect(poke[0].src).toMatch(/.*\.png/);
    expect(poke[1].src).toMatch(/.*\.png/);
    expect(poke[0].alt).toMatch(/Pikachu location/i);
    expect(poke[1].alt).toMatch(/Pikachu location/i);
  });

  test('Favoritando os pokemons', () => {
    const { history } = renderWithRouter(<App />);
    const { id, name } = pokemons[2];

    history.push(`/pokemons/${id}`);
    const PokemonFavori = screen.getByRole('checkbox', { name: /Pokémon favoritado\?/i });
    userEvent.click(PokemonFavori);
    const star = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(star).toBeDefined();
  });
});

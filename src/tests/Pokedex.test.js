import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pokemonName = 'pokemon-name';

describe('Requisito 5', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const encountered = screen.getByText('Encountered pokémons');
    expect(encountered).toBeInTheDocument();
  });
  it('exibe o próximo pokémon da lista', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', { name: 'Próximo pokémon' });

    userEvent.click(buttonNext);

    const nextPokemon = screen.getByTestId(pokemonName);

    const charmander = screen.getByText('Charmander');
    expect(nextPokemon).toBe(charmander);

    userEvent.click(buttonNext);

    const caterpie = screen.getByText('Caterpie');
    expect(nextPokemon).toBe(caterpie);
  });

  it('exibe apenas um pokémon', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId(pokemonName);
    expect(pokemon).toHaveLength(1);
  });
  it('exibe os filtros', () => {
    renderWithRouter(<App />);
    const filters = 7;
    const filterBtn = screen.getAllByTestId('pokemon-type-button');
    expect(filterBtn).toHaveLength(filters);
  });
  it('has the All button', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(buttonAll);
    const initialPokemon = screen.getByText('Pikachu');
    const pokemon = screen.getByTestId(pokemonName);
    expect(pokemon).toBe(initialPokemon);
  });
});

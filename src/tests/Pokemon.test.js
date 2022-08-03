import '@testing-library/jest-dom';
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const detailss = 'More details';

describe('Requisito 6', () => {
  it('renderiza as infos dos pokémons', () => {
    renderWithRouter(<App />);

    const type = screen.getByTestId('pokemon-type');
    const pokemonType = screen.getAllByText('Electric');
    expect(type).toBe(pokemonType[0]);

    const img = screen.getByRole('img');
    const imgSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(img.src).toContain(imgSrc);
    expect(img.alt).toBe('Pikachu sprite');

    const weight = screen.getByTestId('pokemon-weight');
    const pokemonWeight = screen.getByText('Average weight: 6.0 kg');
    expect(weight).toBe(pokemonWeight);

    const name = screen.getByTestId('pokemon-name');
    const pokemonName = screen.getByText('Pikachu');
    expect(name).toBe(pokemonName);
  });
  it('link de navegação para exibir detalhes deste pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: detailss });
    expect(moreDetails).toBeInTheDocument();
  });
  it('ao clicar no mais informações redireciona para a página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: detailss });
    userEvent.click(linkDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('existe um ícone de estrela nos pokémons favoritados:', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: detailss });
    userEvent.click(details);

    const check = screen.getByRole('checkbox');
    userEvent.click(check);
    const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favorite);

    const img = screen.getAllByRole('img');
    const star = '/star-icon.svg';

    expect(img).toHaveLength(2);
    expect(img[1].src).toContain(star);
    expect(img[1].alt).toBe('Pikachu is marked as favorite');
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Requisito 4', () => {
  it('Testando se a pagina not found aparece corretamente', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();

    const imgNotFound = screen.getByRole('img',
      { name: 'Pikachu crying because the page requested was not found' });
    const imgNotFoundSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imgNotFound.src).toBe(imgNotFoundSrc);
  });
});

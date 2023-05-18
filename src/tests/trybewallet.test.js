import React from 'react';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

const initialState = {
  user: {
    email: 'teste@teste.com',
  },
  wallet: {
    currencies: ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF',
      'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'],
    expenses: [{
      id: 0,
      value: '350',
      description: 'Diablo IV',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
      exchangeRates: mockData,
    }],
    editor: false,
    idToEdit: 0,
  },
};

describe('teste', () => {
  it('Renders the screen', () => {
    const history = createMemoryHistory();
    renderWithRouterAndRedux(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Render label nomes correctly', () => {
    renderWithRouterAndRedux(<App />);
    const label1 = screen.getByText('Email');

    const label2 = screen.getByText('Password');

    expect(label1).toBeInTheDocument();
    expect(label2).toBeInTheDocument();
  });
  it('Render email and password inputs', () => {
    renderWithRouterAndRedux(<App />);

    const logBtn = screen.getByRole('textbox', {
      name: /Email/i });
    expect(logBtn).toBeInTheDocument();

    const passBtn = screen.getByLabelText(/password/i);
    expect(passBtn).toBeInTheDocument();
  });
  it('Validate email correctly', () => {
    renderWithRouterAndRedux(<App />);
    const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    expect('teste@teste.com').toMatch(validEmail);
  });
  it('Checks the disabled/enabled button dynamic', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeDisabled();

    /* const inputTest = '123456'; */
    const input = screen.getByLabelText(/password/i);
    const email = screen.getByRole('textbox', { name: /email/i });

    userEvent.type(email, 'example@teste.com');
    userEvent.type(input, '123456');

    expect(button).toBeEnabled();
    userEvent.click(button);
    const { pathname } = history.location;

    expect(pathname).toBe('/carteira');
  });
  it('Checks if path carteira renders correctly', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const emailField = screen.getByTestId('email-field');
    expect(emailField).toBeInTheDocument();

    const valueInput = screen.getByText(/valor/i);
    expect(valueInput).toBeInTheDocument();

    const headerTxt = screen.getByText(/brl/i);
    expect(headerTxt).toBeInTheDocument();
  });
  it('Checks the initial values', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const emailInput = screen.getByText(/teste@teste\.com/i);
    expect(emailInput).toBeInTheDocument();

    const value = '350';
    const coin = 'USD';
    const exchangeRates = mockData;
    const valueTest = value * exchangeRates[coin].ask;
    const finalValue = valueTest.toFixed(2);

    expect(finalValue).toBe('1663.59');
  });
});

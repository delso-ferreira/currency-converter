// Coloque aqui suas actions
import { DELETE_TABLE_DATA, USER_SUBMIT, WALLET_REQUEST,
  WALLET_SUBMIT } from './actionTypes';

const submitUserForm = (userProfile) => ({
  type: USER_SUBMIT,
  payload: userProfile,
});

const submitWalletForm = (walletForm, coins) => ({
  type: WALLET_SUBMIT,
  payload: { ...walletForm, exchangeRates: coins },
});

const fetchWalletForm = (coins) => ({
  type: WALLET_REQUEST,
  payload: coins,
});

const getCurrencies = () => async (dispatch) => {
  const getFetch = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await getFetch.json();

  const getCoins = Object.keys(result);
  const coins = getCoins.filter((element) => element !== 'USDT');
  dispatch(fetchWalletForm(coins));
};

const addUserExpense = (datauser) => async (dispatch) => {
  const getFetch = await fetch('https://economia.awesomeapi.com.br/json/all');
  const coins = await getFetch.json();

  dispatch(submitWalletForm(datauser, coins));
};

const deleteTabledata = (id) => ({
  type: DELETE_TABLE_DATA,
  payload: id,
});

export { submitUserForm, submitWalletForm, fetchWalletForm,
  getCurrencies, addUserExpense, deleteTabledata };

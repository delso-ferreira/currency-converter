// Coloque aqui suas actions
import { USER_SUBMIT, WALLET_REQUEST, WALLET_SUBMIT } from './actionTypes';

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
  console.log(coins);
  dispatch(fetchWalletForm(coins));
};

export { submitUserForm, submitWalletForm, fetchWalletForm, getCurrencies };

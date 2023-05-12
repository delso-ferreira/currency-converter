// Coloque aqui suas actions
import { USER_SUBMIT, WALLET_SUBMIT } from './actionTypes';

const submitUserForm = (userProfile) => ({
  type: USER_SUBMIT,
  payload: userProfile,
});

const submitWalletForm = (walletForm) => ({
  type: WALLET_SUBMIT,
  payload: walletForm,
});

export { submitUserForm, submitWalletForm };

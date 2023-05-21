// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET_SUBMIT, WALLET_REQUEST, DELETE_TABLE_DATA } from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_REQUEST:
    return { ...state, currencies: action.payload };
  case WALLET_SUBMIT:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case DELETE_TABLE_DATA:
    return { ...state,
      expenses: state.expenses.filter((data) => data.id !== action.payload) };
  default:
    return state;
  }
};

export default walletReducer;

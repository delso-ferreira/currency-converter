import { WALLET_SUBMIT, WALLET_REQUEST, DELETE_TABLE_DATA } from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
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

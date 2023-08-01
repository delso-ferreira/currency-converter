import { USER_SUBMIT } from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_SUBMIT:
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default userReducer;

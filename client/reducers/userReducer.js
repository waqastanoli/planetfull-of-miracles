import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  account:null,
  token:null,
  name: null,
  email: null,
  password: null,
  fetching: false,
  fetched: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ACCOUNTS': {
      return {
        ...state,
        fetching: true
      };
    }
    case 'ACCOUNTS_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }
    case 'ACCOUNTS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: null,
        ...action.payload
      }
    }
    case 'CLEAR_ERRORS': {
      return {
        ...state,
        error: null
      }
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
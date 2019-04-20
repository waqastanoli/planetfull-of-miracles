import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  checkout: {}
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHECKOUT': {
      return {
        ...state,
        fetching: true
      };
    }
    case 'CHECKOUT_REDUCER': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }
    case 'CHECKOUT_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: null,
        ...action.payload
      }
    }
    case 'CHECKOUT_CLEAR': {
      return {
        fetching: false,
        fetched: true,
        error: null,
        checkout: {}
      }
    }
    default: {
      return state;
    }
  }
};

export default checkoutReducer;

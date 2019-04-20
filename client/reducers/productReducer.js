import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  page:1,
  perpage:9,
  products: [],
  suggestions_list: []
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PRODUCTS': {
      return {
        ...state,
        fetching: true
      };
    }
    case 'PRODUCTS_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }
    case 'PRODUCTS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: null,
        ...action.payload
      }
    }
    case 'SUGGESTION_REJECTED': {
      return {
        ...state,
        error: action.payload
      }
    }
    case 'SUGGESTION_FULFILLED': {
      return {
        ...state,
        error: null,
        ...action.payload
      }
    }
    default: {
      return state;
    }
  }
};

export default productReducer;

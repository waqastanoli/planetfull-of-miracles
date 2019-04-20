import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  product: null,
  fetching: false,
  fetched: false,
  error: null,
};

const productDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCT_DETAIL': {
      return {
        ...state,
        fetching: true
      };
    }
    case 'PRODUCT_DETAIL__REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }
    case 'PRODUCT_DETAIL_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: null,
        ...action.payload
      }
    }
    
    default: {
      return state;
    }
  }
};

export default productDetailReducer;
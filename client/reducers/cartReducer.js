import { LOCATION_CHANGE } from 'react-router-redux';
var localcartItems=[];
//localStorage.removeItem('cartItems')
if(localStorage.getItem('cartItems')){
  localcartItems=JSON.parse(localStorage.getItem('cartItems'));
}

const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  cartItems: localcartItems
};

const cartReducer = (state = initialState, action) => {
  localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  switch (action.type) {
    case 'CART': case 'ADD_CART_ITEM': case 'REMOVE_CART_ITEM': case 'QUANTITY_CART_UPDATE': {
      return {
        ...state,
        fetching: true
      };
    }
    case 'CART_REJECTED': case 'ADD_CART_ITEM_REJECTED': case 'REMOVE_CART_ITEM_REJECTED': case 'QUANTITY_CART_UPDATE_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }
    case 'CART_FULFILLMENT': case 'ADD_CART_ITEM_FULFILLMENT': case 'REMOVE_CART_ITEM_FULFILLMENT': case 'QUANTITY_CART_UPDATE_FULFILLMENT':case 'SET_CURRENT_USER_CART': {
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

export default cartReducer;

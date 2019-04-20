import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import productsReducer from './productReducer';
import cartReducer from './cartReducer';
import checkoutReducer from './checkoutReducer';
import userReducer from './userReducer';
import authReducer from './authReducer';
import productDetailReducer from './productDetailReducer';
const rootReducer = (history) => combineReducers({
  products: productsReducer,
  cartItems: cartReducer,
  checkout: checkoutReducer,
  account: userReducer,
  auth: authReducer,
  productDetail: productDetailReducer,
  router: connectRouter(history)
});

export default rootReducer;

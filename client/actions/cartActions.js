import _ from 'lodash';

const getCartProductsAction = (items) => {
  return (dispatch) => {
    dispatch({ type: 'CART' });

    dispatch({ type: 'CART_FULFILLMENT', payload: { cartItems: items } });
    // dispatch({ type: 'CART_REJECTED' });
  }
}

const addCartProductsAction = (product, cartItems, quantityAdded) => {
  return (dispatch) => {
    dispatch({ type: 'ADD_CART_ITEM' });

    let index = _.findIndex(cartItems, (item) => {
      return item._id === product._id
    });

    if(index === -1) cartItems.push(product);
    else cartItems[index].quantity = cartItems[index].quantity + quantityAdded;

    dispatch({ type: 'ADD_CART_ITEM_FULFILLMENT', payload: { cartItems } });
  }
}

const removeCartProductAction = (productID, cartItems) => {
  return (dispatch) => {
    dispatch({ type: 'REMOVE_CART_ITEM' });
    
    let index = _.findIndex(cartItems, (item) => {
      return item._id === productID
    });
    cartItems.splice(index, 1);

    if(index !== -1) dispatch({ type: 'REMOVE_CART_ITEM_FULFILLMENT', payload: { cartItems } });
    else dispatch({ type: 'REMOVE__CART_ITEM_REJECTED' });
  }
}

const updateCartProductQuantity = (productID, quantity, cartItems) => {
  return (dispatch) => {
    dispatch({ type: 'QUANTITY_CART_UPDATE' });

    let index = _.findIndex(cartItems, (item) => {
      return item._id === productID
    });
    cartItems[index].quantity = quantity;
    
    if (index !== -1) dispatch({ type: 'QUANTITY_CART_UPDATE_FULFILLMENT', payload: { cartItems }});
    else dispatch({ type: 'QUANTITY_CART_UPDATE_REJECTED' });
  }
}

export default { 
  getCartProductsAction, 
  addCartProductsAction, 
  removeCartProductAction,
  updateCartProductQuantity
};

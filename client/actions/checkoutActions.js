import axios from 'axios';
import API_URL from '../config/API_URL';

const checkoutAction = (values) => {
  return (dispatch) => {
    dispatch({ type: 'CHECKOUT' });
    axios.post(`${API_URL.API_URL}/api/v1/orders`, values)
    .then(res => {
      const { status, data } = res.data;
      if  (status) {
        dispatch({ type: 'CHECKOUT_FULFILLED', payload: data });
      } else {
        dispatch('CHECKOUT_REJECTED');
      }
    }).catch(err => {
      console.log(' *** ERROR *** ', err);
    });
  };
}

export default { checkoutAction };

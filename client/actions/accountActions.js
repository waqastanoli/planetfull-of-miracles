import _ from 'lodash';
import axios from 'axios';
import API_URL from '../config/API_URL';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../setAuthToken';

export const setCurrentUser = (payload) => {
    return {
        type: 'SET_CURRENT_USER',
        payload: payload
    }
}

export const setCurrentUserCart = (payload) => {
    return {
        type: 'SET_CURRENT_USER_CART',
        payload: payload
    }
}

const registerAction = (user, cartItems) => {

  return (dispatch) => {
    dispatch({ type: 'ACCOUNTS' });
    
    axios.post(`${API_URL.API_URL}/api/v1/users/register`, {
	    name: user.name,
	    email: user.email,
	    password: user.password,
      mobile: user.mobile
      
	  })
    .then(res => {
      const { status, data, error } = res.data;
       if  (status) {
       	const decoded = jwt_decode(data);
        dispatch({ type: 'ACCOUNTS_FULFILLED', payload: { account: decoded, token:data }});
        dispatch(setCurrentUser({
        	isAuthenticated:true,
        	user:decoded,
        	token:data,
          new:true
        }));
        dispatch(setCurrentUserCart({
          cartItems:decoded.cartItems?decoded.cartItems:[]
        }));
        localStorage.setItem('jwtToken', data);
        setAuthToken(data);
      } else {
        dispatch({ type: 'ACCOUNTS_REJECTED', payload:  error });
      }
    }).catch(err => {
      console.log(' *** ERROR *** ', err);
    });
  }
}
const verifyAction = (token, email) => {

  return (dispatch) => {
    dispatch({ type: 'ACCOUNTS' });
    
    axios.post(`${API_URL.API_URL}/api/v1/users/verify`, {
      token: token,
      email: email
    })
    .then(res => {
      const { status, data, error, token } = res.data;
       if  (status) {
      const decoded = jwt_decode(data);
        dispatch({ type: 'ACCOUNTS_FULFILLED', payload: { account: decoded, token:data }});
        dispatch(setCurrentUser({
          isAuthenticated:true,
          user:decoded,
          token:data
        }));
        dispatch(setCurrentUserCart({
          cartItems:decoded.cartItems?decoded.cartItems:[]
        }));
        localStorage.setItem('jwtToken', data);
        setAuthToken(data);
      } else {
        dispatch({ type: 'ACCOUNTS_REJECTED', payload:  error });
      }
    }).catch(err => {
      console.log(' *** ERROR *** ', err);
    });
  }
}
const loginAction = (user) => {

  return (dispatch) => {
    dispatch({ type: 'ACCOUNTS' });
    
    axios.post(`${API_URL.API_URL}/api/v1/users/signin`, {
	    email: user.email,
	    password: user.password
	  })
    .then(res => {
      const { status, data, error, token } = res.data;
       if  (status) {
    	const decoded = jwt_decode(data);
        dispatch({ type: 'ACCOUNTS_FULFILLED', payload: { account: decoded, token:data }});
        dispatch(setCurrentUser({
        	isAuthenticated:true,
        	user:decoded,
        	token:data
        }));
        dispatch(setCurrentUserCart({
          cartItems:decoded.cartItems?decoded.cartItems:[]
        }));
        localStorage.setItem('jwtToken', data);
        setAuthToken(data);
      } else {
        dispatch({ type: 'ACCOUNTS_REJECTED', payload:  error });
      }
    }).catch(err => {
      console.log(' *** ERROR *** ', err);
    });
  }
}
export const clearErrors = (history) => dispatch => {
  dispatch({ type: 'CLEAR_ERRORS'});
}
export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    localStorage.setItem('cartItems', []);
    dispatch(setCurrentUserCart({
          cartItems:[]
        }));
    dispatch(setCurrentUser({
	    isAuthenticated: false,
	    user: {},
	    token: null
	}));
	
    history.push('/signin');
}
export const showorks = () => dispatch => {
    dispatch({
        type: 'SET_SHOW_WORKS',
        payload: {workshow:true}
    })
}
export const closeworks = () => dispatch => {
    dispatch({
        type: 'SET_CLOSE_WORKS',
        payload: {workshow:false}
    })
}
export default { closeworks, showorks, clearErrors, verifyAction, registerAction, loginAction, logoutUser };
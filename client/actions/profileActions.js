import _ from 'lodash';
import axios from 'axios';
import API_URL from '../config/API_URL';

const getProfileAction = (userName)=> {
	
	return (dispatch) => {
    dispatch({ type: 'GET_PROFILE_DETAIL' });
    
    axios.get(`${API_URL.API_URL}/api/v1/users/profile/${userName}`)
    .then(res => {
      const { status, data } = res.data;
      if  (status) {
        dispatch({ type: 'PROFILE_DETAIL_FULFILLED', payload:  data });
      } else {
        dispatch('PROFILE_DETAIL__REJECTED');
      }
    }).catch(err => {
      console.log(' *** ERROR *** ', err);
    });
  }
}
const updateSection = (id, type, value)=> {
	
	return (dispatch) => {
    dispatch({ type: 'UPDATE_PROFILE_DETAIL' });
    
    axios.put(`${API_URL.API_URL}/api/v1/users/`+id, {
      type: type,
      value: value
    })
    .then(res => {
      const { status, data } = res.data;
      if  (status) {
        dispatch({ type: 'PRODUCTS_FULFILLED', payload: { list: data }});
      } else {
        dispatch('PRODUCTS_REJECTED');
      }
    }).catch(err => {
      console.log(' *** ERROR *** ', err);
    });
  }
}
export default { getProfileAction, updateSection };
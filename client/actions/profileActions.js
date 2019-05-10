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

const updateproud = (user_id, note, title,id=null)=> {
	
	return (dispatch) => {
    dispatch({ type: 'UPDATE_PROUD' });
    console.log(note)
    axios.post(`${API_URL.API_URL}/api/v1/users/updateproud`, {
      id:id,
      user_id:user_id,
      note: note,
      title: title
    })
    .then(res => {

      const { status, data } = res;
      console.log(data)
      if  (status) {
      	if(id==null)
        dispatch({ type: 'PROUD_ADDED', payload: { proud_chart: data.Proud }});
      	else 
		dispatch({ type: 'PROUD_UPDATED', payload: { proud_chart: data.Proud }});      		
      } else {
        dispatch('PROUD_REJECTED');
      }
    }).catch(err => {
      console.log(' *** ERROR *** ', err);
    });
  }
}
const updatetopic = (user_id, note, title,id=null)=> {
	
	return (dispatch) => {
    dispatch({ type: 'UPDATE_TOPIC' });
    
    axios.post(`${API_URL.API_URL}/api/v1/users/updatetopic`, {
      id:id,
      user_id:user_id,
      note: note,
      title: title
    })
    .then(res => {

      const { status, data } = res;
      console.log(data)
      if  (status) {
      	if(id==null)
        dispatch({ type: 'TOPIC_ADDED', payload: { proud_chart: data.Proud }});
      	else 
		dispatch({ type: 'TOPIC_UPDATED', payload: { proud_chart: data.Proud }});      		
      } else {
        dispatch('TOPIC_REJECTED');
      }
    }).catch(err => {
      console.log(' *** ERROR *** ', err);
    });
  }
}

export default { updatetopic, updateproud, getProfileAction, updateSection };
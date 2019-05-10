import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
	id:null,
  fetching: false,
  fetched: false,
  error: null,
  name:null,
  image:null,
  cover:null,
  badge: null,
  current_situation:null,
  future_vision:null,
  inspire:[],
  aspire:[],
  proud_chart:[],
  serving_me:[],
  serving_others:[],
  suggestions_list: []
};
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PROFILE_DETAIL': {
      return {
        ...state,
        fetching: true
      };
    }
    case 'PROFILE_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }
    case 'PROFILE_DETAIL_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: null,
        ...action.payload
      }
    }
    case 'PROFILE_REJECTED': {
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
    case 'PROUD_ADDED': {

      return {
        ...state,
        error: null,
        proud_chart: [...state.proud_chart, action.payload.proud_chart]        
      }
    }
    case 'PROUD_UPDATED': {
      var proud_chart = state.proud_chart;	
      
      
      var indexfind = state.proud_chart.findIndex(function(item, i){
		  return item._id === action.payload.proud_chart._id
	  });
      proud_chart[indexfind]=action.payload.proud_chart
      return {
        ...state,
        error: null,
        proud_chart: proud_chart        
      }
    }
    default: {
      return state;
    }
  }
};
export default profileReducer;
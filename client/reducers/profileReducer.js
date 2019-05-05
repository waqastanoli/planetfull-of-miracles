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
    case 'PRODUCTS': {
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
    default: {
      return state;
    }
  }
};
export default profileReducer;
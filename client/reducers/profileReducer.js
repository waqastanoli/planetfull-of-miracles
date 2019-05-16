import { LOCATION_CHANGE } from 'react-router-redux';
const getUnique = (arr, comp)  =>  {

  const unique = arr
       .map(e => e[comp])

     // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter(e => arr[e]).map(e => arr[e]);

   return unique;
}
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
  suggestions_list: [],
  openContracts:[],
  completedContracts:[],
  users:[]
};
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
  	case 'RESET_PROFILE':{
  		return initialState;
  	}
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
    case 'CONTRACT_ADDED': {
      if(action.payload.serving_me)
      return {
        ...state,
        error: null,
        serving_me: [...state.serving_me, action.payload.serving_me]        
      }
      if(action.payload.serving_others)
      return {
        ...state,
        error: null,
        serving_others: [...state.serving_others, action.payload.serving_others]        
      }
    }
    case 'PROUD_ADDED': {

      return {
        ...state,
        error: null,
        proud_chart: [...state.proud_chart, action.payload.proud_chart]        
      }
    }
	case 'TOPIC_ADDED': {
	  if(action.payload.inspire){
	  	var topic = action.payload.inspire;
	  	var found = state.inspire.some(el => el._id === action.payload.inspire._id);
	  }
	  if(action.payload.aspire){
	  	var topic = action.payload.aspire;
	  	var found = state.aspire.some(el => el._id === action.payload.aspire._id);
	  }
	  if(found){
	  	return {
	        ...state
	      }
	  }
	  if(action.payload.inspire) {
      	return {
              ...state,
              error: null,
              inspire: [...state.inspire, topic]        
            }
      }
      if(action.payload.aspire) {
      	return {
              ...state,
              error: null,
              aspire: [...state.aspire, topic]        
            }
      }
      return {
        ...state
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
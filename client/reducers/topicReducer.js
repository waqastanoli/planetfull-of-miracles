const initialState = {
  _userIds:[],
  _id:null,
  text:null,
  type:null,
  createdAt:null,
  fetching: false,
  fetched: false,
};

const topicReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TOPIC_DETAIL': {
      return {
        ...state,
        fetching: true
      };
    }
    case 'TOPIC_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }
    case 'TOPIC_DETAIL_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: null,
        ...action.payload
      }
    }
    case 'SUGGESTION_FULFILLED': {
      return {
        ...state,
        error: null,
        ...action.payload
      }
    }
    
  /*case 'TOPIC_ADDED': {
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
    }*/

    
    default: {
      return state;
    }
  }
};
export default topicReducer;
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  fetching: false,
  fetched: false,
  error: null
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default homeReducer;
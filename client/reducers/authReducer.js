// authReducer.js
import jwt_decode from 'jwt-decode';

var initialState = {
    isAuthenticated: false,
    user: {},
    image:null,
    token: null
}

var jwtToken = localStorage.getItem('jwtToken');
if(jwtToken){
    var decoded = jwt_decode(jwtToken);
    
    if(decoded){
        if (decoded.exp < Date.now() / 1000) {

            localStorage.clear();
        }else {
            initialState = {
                isAuthenticated: true,
                user: decoded,
                token: jwtToken
            }
        }
    }
} 

export default function(state = initialState, action ) {
    switch(action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                ...action.payload
            }
        default: 
            return state;
    }
}
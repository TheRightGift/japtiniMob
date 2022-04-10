import { USER_DATA } from '../actions/authActions';

const initialState = {
    user: [],
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case USER_DATA:
            // return { ...state, user: action.payload };
            return { ...state, ...{ user : action.payload.user } };
        default:
            return state;
    }
  }
  
  export default authReducer;
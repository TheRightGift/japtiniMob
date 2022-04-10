import { COIN_DATA } from '../actions/coinAction';

const initialState = {
    coin: [],
};

function coinReducer(state = initialState, action) {
    
    switch (action.type) {
        case COIN_DATA:
            // console.log(action);
            return { ...state, ...{ coin : action.payload.coin } };
        default:
            return state;
    }
  }
  
  export default coinReducer;
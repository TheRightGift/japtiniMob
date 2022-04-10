import { MODAL_VISIBILITY, ON_BOARDING_VIEWED } from '../actions/appActions';

const initialState = {
    modalVisible: false,
    onBoardingViewed: false,
};

function appReducer(state = initialState, action) {
    switch (action.type) {
        case MODAL_VISIBILITY:
            // return { ...state, user: action.payload };
            return { ...state, ...{ modalVisible : action.payload.modalVisible } };
        case ON_BOARDING_VIEWED:
            return { ...state, ...{ onBoardingViewed : action.payload.onBoardingViewed } };
        default:
            return state;
    }
  }
  
  export default appReducer;
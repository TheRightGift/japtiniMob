// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers
import authReducer from './authReducer';
import coinReducer from './coinReducer';
import appReducer from './appReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
    authReducer: authReducer,
    coinReducer: coinReducer,
    appReducer: appReducer,
});

// Exports
export default rootReducer;
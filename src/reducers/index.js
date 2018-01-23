import {combineReducers} from 'redux';
import ScenesReducer from './reducer-scenes';

const appReducers = combineReducers({
    scenes: ScenesReducer
});

export default appReducers;
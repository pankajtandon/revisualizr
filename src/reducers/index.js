import {combineReducers} from 'redux';
import ScenesReducer from './reducer-scenes';
import DeleteSceneReducer from './reducer-delete-scene';

const appReducers = combineReducers({
    scenes: ScenesReducer,
    deleteSceneId: DeleteSceneReducer
});

export default appReducers;
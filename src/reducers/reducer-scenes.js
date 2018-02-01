import {FETCH_SCENES, FETCH_SCENES_SUCCESS, FETCH_SCENES_FAILURE} from "../actions/scenes";

export default function (state = {}, action) {
    switch(action.type) {
        case FETCH_SCENES:
                return { ...state, scenesList: {scenes:[], error: null, loading: true} };
        case FETCH_SCENES_SUCCESS:
            return { ...state, scenesList: {scenes: action.payload, error: null, loading: false} };
        case FETCH_SCENES_FAILURE:
            error = action.payload || {message: action.payload.message};
            return { ...state, scenesList: {scenes: [], error: error, loading: false} };
        default:
            return state;
    }
};
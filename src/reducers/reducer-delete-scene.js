import {DELETE_SCENE} from "../actions/deleteScene";

export default function (state = {}, action) {
    switch (action.type) {
        case DELETE_SCENE:
            return {...state, id: action.payload};
        default:
            return state;
    }
}
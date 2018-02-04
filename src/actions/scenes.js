import axios from 'axios';
import {sceneData} from '../constants/tempdata'

//Scenes list
export const FETCH_SCENES = 'FETCH_SCENES';
export const FETCH_SCENES_SUCCESS = 'FETCH_SCENES_SUCCESS';
export const FETCH_SCENES_FAILURE = 'FETCH_SCENES_FAILURE';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';
export function fetchScenes() {
    /*
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/scenes`,
        headers: []
    });
    */

    //Simulate a network call...
    const request = new Promise((resolve, reject) => {
       setTimeout(() => {
           resolve({data: sceneData })
       }, 2000)
    });

    return {
        type: FETCH_SCENES,
        payload: request
    };
}

export function fetchScenesSuccess(scenes) {
    return {
        type: FETCH_SCENES_SUCCESS,
        payload: scenes
    };
}

export function fetchScenesFailure(error) {
    return {
        type: FETCH_SCENES_FAILURE,
        payload: error
    };
}

export function validateSceneFields(props) {

    const request = axios.post(`${ROOT_URL}/scenes/validate/fields`, props);

    return {
        type: VALIDATE_SCENE_FIELDS,
        payload: request
    };
}

export function validateSceneFieldsSuccess() {
    return {
        type: VALIDATE_SCENE_FIELDS_SUCCESS
    };
}

export function validateSceneFieldsFailure(error) {
    return {
        type: VALIDATE_SCENE_FIELDS_FAILURE,
        payload: error
    };
}

export function resetSceneFields() {
    return {
        type: RESET_SCENE_FIELDS
    }
}

export function createScene(props, tokenFromStorage) {
    const request = axios({
        method: 'post',
        data: props,
        url: `${ROOT_URL}/scene`,
        headers: {
            'Authorization': `Bearer ${tokenFromStorage}`
        }
    });

    return {
        type: CREATE_SCENE,
        payload: request
    };
}

export function createSceneSuccess(newScene) {
    return {
        type: CREATE_SCENE_SUCCESS,
        payload: newScene
    };
}

export function createSceneFailure(error) {
    return {
        type: CREATE_SCENE_FAILURE,
        payload: error
    };
}

export function resetNewScene() {
    return {
        type: RESET_NEW_SCENE
    }
}
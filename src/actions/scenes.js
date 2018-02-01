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

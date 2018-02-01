export const DELETE_SCENE = 'DELETE_SCENE';

export const deleteSceneActionCreator = (scene) => {
    return {
        type: DELETE_SCENE,
        payload: scene.id
    }
};
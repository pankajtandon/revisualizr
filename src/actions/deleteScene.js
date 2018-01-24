export const deleteSceneActionCreator = (state, scene) => {
    console.log('Scene', scene);
    console.log('State', state);
    return {
        type: "DELETE_SCENE",
        payload: scene
    }
};
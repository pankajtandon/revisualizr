export default function (state = {}, action) {
    console.log('State in reducer:', state);
    switch (action.type) {
        case "DELETE_SCENE":
            return {...state, deleted: true};
            break;
        default:
            return {...state};
    }
}
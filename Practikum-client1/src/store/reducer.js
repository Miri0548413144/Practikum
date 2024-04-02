import * as Actions from './action'
 const initalseState = {
    workers: []
}

const reducer= (state = initalseState, action) => {
    switch (action.type) {
        case Actions.GET_WORKERS:
            return { ...state, workers: action.payload }
        case Actions.EDIT_WORKERS:
            const workers = [...state.workers];
            workers.push(action.payload);
            return { ...state, workers }
        case Actions.EDIT_WORKERS: {
            const workers = [...state.workers];
            const findIndex = workers.findIndex(x => x.Id == action.payload.Id);
            workers[findIndex] = action.payload;
            return { ...state, workers }
        }
        case Actions.DELETE_WORKERS:{
            const workers = state.workers.filter(x => x.Id != action.payload.Id);
            return { ...state, workers }
        }
        default: return { ...state }
    }
}

export default reducer;

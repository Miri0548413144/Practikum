import * as Actions from './action'
 const initalseState = {
    workers: [],
    roles:[]
}

const reducer= (state = initalseState, action) => {
    switch (action.type) {
        case Actions.GET_WORKERS:
            return { ...state, workers: action.payload }
        case Actions.ADD_WORKER:
            const workers = [...state.workers];
            workers.push(action.payload);
            return { ...state, workers }
        case Actions.EDIT_WORKER: {
            const workers = [...state.workers];
            const findIndex = workers.findIndex(x => x.Id == action.payload.Id);
            workers[findIndex] = action.payload;
            return { ...state, workers }
        }
        case Actions.DELETE_WORKER:{
            const workers = state.workers.filter(x => x.Id != action.payload.Id);
            return { ...state, workers }
        }
        default: return { ...state }
        case Actions.GET_ROLES:
            return { ...state, roles: action.payload }
        case Actions.ADD_ROLE:
            const roles = [...state.roles];
            roles.push(action.payload);
            return { ...state, roles }
    }
}

export default reducer;

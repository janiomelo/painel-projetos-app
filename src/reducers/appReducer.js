import { CLICK_UPDATE_VALUE, CONTAINER_LOADING } from '../actions/actionTypes';

const initialState = {
    titleApp: 'Gestor3 App'
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLICK_UPDATE_VALUE:
            return {
                ...state,
                titleApp: action.titleApp
            };
        case CONTAINER_LOADING:
            return {
                ...state,
                state: action.newValue
            };
        default:
            return state;
    }
};
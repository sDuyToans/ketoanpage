import { AUTH_ACTIONS_TYPES } from "../controllers/auth.types";

const inititalState = {
    account: { email: 'duytoan@gmail.com'},
    isLogin: false,
    error: null
}

export const authReducer = (state = inititalState, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case AUTH_ACTIONS_TYPES.SET_ISLOGIN: 
            return {...state, isLogin: payload}
        case AUTH_ACTIONS_TYPES.UPDATE_ERROR_LOGIN: 
            return {...state, error: payload}
        default:
            return state;
    }
}
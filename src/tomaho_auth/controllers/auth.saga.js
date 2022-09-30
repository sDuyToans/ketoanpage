import { all, takeLeading, call, put, select } from "redux-saga/effects";
import { selectAccount, selectIsLogin } from "../models/authSelector";
import { AUTH_ACTIONS_TYPES } from "./auth.types";

export function* handleLogin(props) {
    try {
        const emailDefault = yield select(selectAccount);
        const isLogin = yield select(selectIsLogin);
        if (emailDefault.email === props.payload.email) {
            yield put({
                type: AUTH_ACTIONS_TYPES.SET_ISLOGIN,
                payload: !isLogin
            })
        } else{
            yield put({
                type: AUTH_ACTIONS_TYPES.UPDATE_ERROR_LOGIN,
                payload: 'Sai Email. Vui Lòng Nhập Lại!'
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export function* setLoginStart() {
    yield takeLeading(AUTH_ACTIONS_TYPES.LOGIN, handleLogin)
}

export function* authSaga() {
    yield all([call(setLoginStart)])
}
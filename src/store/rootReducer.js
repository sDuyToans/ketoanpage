import { combineReducers } from "redux";
import { banHangReducer } from "../tomaho_account/base/models/banhangreducer/banhang.reducer";
import {menuReducer} from "../tomaho_account/base/models/Menu/menuReducer";
import { authReducer } from "../tomaho_auth/models/AuthReducer";

export const rootReducer = combineReducers({
    menuReducer: menuReducer,
    authReducer: authReducer,
    banHangReducer: banHangReducer
});
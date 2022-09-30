import { createSelector } from "reselect";

const selectAuthReducer = (state => state.authReducer);

export const selectAccount = createSelector(
    [selectAuthReducer],
    slice => slice.account
)

export const selectIsLogin = createSelector(
    [selectAuthReducer],
    slice => slice.isLogin
)

export const selectErrorLogin = createSelector(
    [selectAuthReducer],
    slice => slice.error
)
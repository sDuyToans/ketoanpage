import { createSelector } from 'reselect';

const selectMenuReducer = state => state.menuReducer;

export const selectMenu = createSelector(
    [selectMenuReducer],
    slice => slice.menu
)

export const selectSideBar = createSelector(
    [selectMenuReducer],
    slice => slice.sideBarMenu
)
export const selectIsAddNew  = createSelector(
    [selectMenuReducer],
    slice => slice.isAddNew
)

export const selectKeyBread = createSelector(
    [selectMenuReducer],
    slice => slice.keyBread
)

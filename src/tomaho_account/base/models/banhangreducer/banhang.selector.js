import { createSelector } from "reselect";

const selectBanHangReducer = state => state.banHangReducer;

 export const selectDataBanHang = createSelector(
    [selectBanHangReducer],
    slice => slice.banHangData
)
 
export const selectDataReturn = createSelector(
    [selectBanHangReducer],
    slice => slice.returnValueSearch
)

export const selectIsSearch = createSelector(
    [selectBanHangReducer],
    slice => slice.isSearch
)

export const selectFormBanHang = createSelector(
    [selectBanHangReducer],
    slice => slice.formBanHang
)

export const selectIsUpdate = createSelector(
    [selectBanHangReducer],
    slice => slice.isUpdate
)


const selectChiTietPhatSinh = state => state.banHangReducer.formBanHang.chitietphatsinh;

export const selectTong = createSelector(
    [selectChiTietPhatSinh],
    item => item.reduce((total, item) => total + (item.sl * item.dongia), 0)
)

export const selectIsCreate = createSelector(
    [selectBanHangReducer],
    slice => slice.isCreate
)

export const selectIsEdit = createSelector(
    [selectBanHangReducer],
    slice => slice.isEdit
)

export const selectIdEdit = createSelector(
    [selectBanHangReducer],
    slice => slice.idEdit
)

export const selectWillUpdate = createSelector(
    [selectBanHangReducer],
    slice => slice.willUpdate
)

export const selectIsGhiSo = createSelector(
    [selectBanHangReducer],
    slice => slice.isGhiSo
)

export const selectKHCT = createSelector(
    [selectBanHangReducer],
    slice => slice.kichhoatCT
)

export const selectDisabled = createSelector(
    [selectBanHangReducer],
    slice => slice.onDisabled
)

export const selectIsSave = createSelector(
    [selectBanHangReducer],
    slice => slice.isSave
)

export const selectError = createSelector(
    [selectBanHangReducer],
    slice => slice.error
)
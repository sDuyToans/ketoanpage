import { BANHANG_ACTION_TYPES } from "../../controllers/banhang.types";

const initialState = {
    banHangData: [
        { id: 1, sochungtu: 'DBH/2022/001', sohoadon: '1', khachhang: 'Toan', ngaychungtu: '01/09/2020', ngayhachtoan: '17/09/2021', tongtien: 100, trangthai: 'Ghi sổ'},
        { id: 2, sochungtu: 'ABH/2022/001', sohoadon: 'asd', khachhang: 'Duy', ngaychungtu: '02/09/2021', ngayhachtoan: '20/09/2021', tongtien: 200, trangthai: 'Chưa ghi sổ'},
        { id: 3, sochungtu: 'SBH/2022/001', sohoadon: '3a', khachhang: 'Hung', ngaychungtu: '02/09/2020', ngayhachtoan: '17/09/2021', tongtien: 300, trangthai: 'Ghi sổ'},
        { id: 4, sochungtu: '/', sohoadon: '?1asd', khachhang: 'John', ngaychungtu: '10/10/2020', ngayhachtoan: '17/09/2021', tongtien: 150, trangthai: 'Ghi sổ'},
        { id: 5, sochungtu: 'HG', sohoadon: '/123', khachhang: 'May', ngaychungtu: '21/02/2020', ngayhachtoan: '17/09/2021', tongtien: 290, trangthai: 'Chưa ghi sổ'},
        { id: 6, sochungtu: '01A', sohoadon: '/asd', khachhang: 'Kate', ngaychungtu: '05/01/2021', ngayhachtoan: '17/09/2021', tongtien: 1400, trangthai: 'Huỷ chứng từ'},
        { id: 7, sochungtu: 'AFS/212/1', sohoadon: 'jfh', khachhang: 'JS', ngaychungtu: '02/11/2020', ngayhachtoan: '17/09/2021', tongtien: 400, trangthai: 'Chưa ghi sổ'},
        { id: 8, sochungtu: '/', sohoadon: 'asd', khachhang: 'RS', ngaychungtu: '03/12/2020', ngayhachtoan: '17/09/2021', tongtien: 700, trangthai: 'Huỷ chứng từ'},
        { id: 9, sochungtu: 'DBH/2022/001', sohoadon: '1', khachhang: 'Toan', ngaychungtu: '01/09/2020', ngayhachtoan: '17/09/2021', tongtien: 100, trangthai: 'Ghi sổ'},
        { id: 10, sochungtu: 'ABH/2022/001', sohoadon: 'asd', khachhang: 'Duy', ngaychungtu: '02/09/2021', ngayhachtoan: '20/09/2021', tongtien: 200, trangthai: 'Chưa ghi sổ'},
        { id: 11, sochungtu: 'SBH/2022/001', sohoadon: '3a', khachhang: 'Hung', ngaychungtu: '02/09/2020', ngayhachtoan: '17/09/2021', tongtien: 300, trangthai: 'Ghi sổ'},
        { id: 12, sochungtu: '/', sohoadon: '?1asd', khachhang: 'John', ngaychungtu: '10/10/2020', ngayhachtoan: '17/09/2021', tongtien: 150, trangthai: 'Ghi sổ'},
        { id: 13, sochungtu: 'HG', sohoadon: '/123', khachhang: 'May', ngaychungtu: '21/02/2020', ngayhachtoan: '17/09/2021', tongtien: 290, trangthai: 'Chưa ghi sổ'},
        { id: 14, sochungtu: '01A', sohoadon: '/asd', khachhang: 'Kate', ngaychungtu: '05/01/2021', ngayhachtoan: '17/09/2021', tongtien: 1400, trangthai: 'Huỷ chứng từ'},
        { id: 15, sochungtu: 'AFS/212/1', sohoadon: 'jfh', khachhang: 'JS', ngaychungtu: '02/11/2020', ngayhachtoan: '17/09/2021', tongtien: 400, trangthai: 'Chưa ghi sổ'},
        { id: 16, sochungtu: '/', sohoadon: 'asd', khachhang: 'RS', ngaychungtu: '03/12/2020', ngayhachtoan: '17/09/2021', tongtien: 700, trangthai: 'Huỷ chứng từ'},
        { id: 17, sochungtu: 'DBH/2022/001', sohoadon: '1', khachhang: 'Toan', ngaychungtu: '01/09/2020', ngayhachtoan: '17/09/2021', tongtien: 100, trangthai: 'Ghi sổ'},
        { id: 18, sochungtu: 'ABH/2022/001', sohoadon: 'asd', khachhang: 'Duy', ngaychungtu: '02/09/2021', ngayhachtoan: '20/09/2021', tongtien: 200, trangthai: 'Chưa ghi sổ'},
        { id: 19, sochungtu: 'SBH/2022/001', sohoadon: '3a', khachhang: 'Hung', ngaychungtu: '02/09/2020', ngayhachtoan: '17/09/2021', tongtien: 300, trangthai: 'Ghi sổ'},
        { id: 20, sochungtu: '/', sohoadon: '?1asd', khachhang: 'John', ngaychungtu: '10/10/2020', ngayhachtoan: '17/09/2021', tongtien: 150, trangthai: 'Ghi sổ'},
        { id: 21, sochungtu: 'HG', sohoadon: '/123', khachhang: 'May', ngaychungtu: '21/02/2020', ngayhachtoan: '17/09/2021', tongtien: 290, trangthai: 'Chưa ghi sổ'},
        { id: 22, sochungtu: '01A', sohoadon: '/asd', khachhang: 'Kate', ngaychungtu: '05/01/2021', ngayhachtoan: '17/09/2021', tongtien: 1400, trangthai: 'Huỷ chứng từ'},
        { id: 23, sochungtu: 'AFS/212/1', sohoadon: 'jfh', khachhang: 'JS', ngaychungtu: '02/11/2020', ngayhachtoan: '17/09/2021', tongtien: 400, trangthai: 'Chưa ghi sổ'},
        { id: 24, sochungtu: '/', sohoadon: 'asd', khachhang: 'RS', ngaychungtu: '03/12/2020', ngayhachtoan: '17/09/2021', tongtien: 700, trangthai: 'Huỷ chứng từ'},
        { id: 25, sochungtu: 'DBH/2022/001', sohoadon: '1', khachhang: 'Toan', ngaychungtu: '01/09/2020', ngayhachtoan: '17/09/2021', tongtien: 100, trangthai: 'Ghi sổ'},
        { id: 26, sochungtu: 'ABH/2022/001', sohoadon: 'asd', khachhang: 'Duy', ngaychungtu: '02/09/2021', ngayhachtoan: '20/09/2021', tongtien: 200, trangthai: 'Chưa ghi sổ'},
        { id: 27, sochungtu: 'SBH/2022/001', sohoadon: '3a', khachhang: 'Hung', ngaychungtu: '02/09/2020', ngayhachtoan: '17/09/2021', tongtien: 300, trangthai: 'Ghi sổ'},
        { id: 28, sochungtu: '/', sohoadon: '?1asd', khachhang: 'John', ngaychungtu: '10/10/2020', ngayhachtoan: '17/09/2021', tongtien: 150, trangthai: 'Ghi sổ'},
        { id: 29, sochungtu: 'HG', sohoadon: '/123', khachhang: 'May', ngaychungtu: '21/02/2020', ngayhachtoan: '17/09/2021', tongtien: 290, trangthai: 'Chưa ghi sổ'},
        { id: 30, sochungtu: '01A', sohoadon: '/asd', khachhang: 'Kate', ngaychungtu: '05/01/2021', ngayhachtoan: '17/09/2021', tongtien: 1400, trangthai: 'Huỷ chứng từ'},
        { id: 31, sochungtu: 'AFS/212/1', sohoadon: 'jfh', khachhang: 'JS', ngaychungtu: '02/11/2020', ngayhachtoan: '17/09/2021', tongtien: 400, trangthai: 'Chưa ghi sổ'},
        { id: 32, sochungtu: '/', sohoadon: 'asd', khachhang: 'RS', ngaychungtu: '03/12/2020', ngayhachtoan: '17/09/2021', tongtien: 700, trangthai: 'Huỷ chứng từ'}
    ],
    idBanHangData: 32,
    returnValueSearch: [],
    isSearch: false,
    formBanHang: {
        sochungtu: '',
        sohoadon: '',
        kituhoadon: '',
        khachhang: '',
        ngaychungtu: '',
        ngayhachtoan: '',
        loaitien: 'VND',
        tigia: '1',
        diengiai: '',
        chitietphatsinh: []
    },
    defaultFormBanHang: {
        sochungtu: '',
        sohoadon: '',
        kituhoadon: '',
        khachhang: '',
        ngaychungtu: '',
        ngayhachtoan: '',
        loaitien: 'VND',
        tigia: '1',
        diengiai: '',
        chitietphatsinh: []
    },
    isUpdate: false,
    isCreate: false,
    isEdit: false,
    idEdit : '',
    willUpdate: false,
    isGhiSo: null,
    kichhoatCT: false,
    onDisabled: false,
    isSave: false,
    error: null,
    isActiveNewTrangThai: false
}

export const banHangReducer = ( state = initialState, action = {} ) => {
    const { type, payload } = action;
    switch (type){
        case BANHANG_ACTION_TYPES.UPDATE_RETURN_VALUESEARCH:
            return { ...state, returnValueSearch: payload }
        case BANHANG_ACTION_TYPES.UPDATE_IS_SEARCH:
            return { ...state, isSearch: payload }
        case BANHANG_ACTION_TYPES.UPDATE_IS_UPDATE:
            return { ...state, isUpdate: payload }
        case BANHANG_ACTION_TYPES.UPDATE_FORM_BANHANG:
            // console.log(payload)
            return {...state, formBanHang: payload}
        case BANHANG_ACTION_TYPES.UPDATE_IS_CREATE:
            return { ...state, isCreate: payload }
        case BANHANG_ACTION_TYPES.UPDATE_IS_EDIT:
            return { ...state, isEdit: payload }
        case BANHANG_ACTION_TYPES.UPDATE_ID_EDIT:
            return { ...state, idEdit: payload }
        case BANHANG_ACTION_TYPES.UPDATE_IS_GHISO: 
            return { ...state, isGhiSo: payload }
        case BANHANG_ACTION_TYPES.UPDATE_KHCT:
            return { ...state, kichhoatCT: payload}
        case BANHANG_ACTION_TYPES.UPDATE_ONDISABLED: 
            return { ...state, onDisabled: payload }
        case BANHANG_ACTION_TYPES.UPDATE_IS_SAVE:
            return {...state, isSave: payload}
        case BANHANG_ACTION_TYPES.UPDATE_ERROR:
            return {...state, error: payload}
        case BANHANG_ACTION_TYPES.UPDATE_CHUA_GHISO:
            const cloneArrSetChuaGhiSo = [...state.banHangData];
            for (const data of cloneArrSetChuaGhiSo){
                if(data.sochungtu === payload){
                    data.trangthai = 'Chưa ghi sổ';
                }
            }
            return {...state, banHangData: cloneArrSetChuaGhiSo}
        case BANHANG_ACTION_TYPES.UPDATE_FORM_BANHANG_EDIT:
            const cloneArrData = [...state.banHangData];
            for (let i = 0; i < cloneArrData.length; i++) {
                if(cloneArrData[i].sochungtu === payload.sochungtu) {
                    const id = cloneArrData[i].id
                    cloneArrData[i] = {...payload, id}
                }
            }
            return { ...state, banHangData: cloneArrData}
        case BANHANG_ACTION_TYPES.UPDATE_WILL_DATA_UPDATE: 
            return { ...state, willUpdate: payload}
        case BANHANG_ACTION_TYPES.UPDATE_FORM_BANHANG_CTPS:
            const tong = payload.reduce((total, item) => total + (item.sl * item.dongia), 0)
            state.idBanHangData++;
            const arrClone = {...state.formBanHang};
            arrClone.id = state.idBanHangData;
            arrClone.tongtien = tong;
            arrClone.trangthai = 'Chưa ghi sổ';
            arrClone.chitietphatsinh.push(...payload);
            const arrCloneBanHang = [...state.banHangData];
            for (let i = 0; i < arrCloneBanHang.length; i++) {
                if(arrCloneBanHang[i].sochungtu === arrClone.sochungtu){
                    arrCloneBanHang.splice(i, 1);
                }
            }
            arrCloneBanHang.push(arrClone)
            state.formBanHang = {...state.defaultFormBanHang}
            state.isUpdate = false;
            return {...state , banHangData: arrCloneBanHang}
        case BANHANG_ACTION_TYPES.UPDATE_GHI_SO:
            const arrCloneGhiSo = [...state.banHangData];
            for (let data of arrCloneGhiSo) {
                if(data.sochungtu === payload){
                    data.trangthai = 'Ghi sổ'
                }
            }
            return { ...state, banHangData: arrCloneGhiSo}
            case BANHANG_ACTION_TYPES.UPDATE_HUY_CHUNG_TU:
                const arrClonehuyct = [...state.banHangData];
                for (let data of arrClonehuyct) {
                    if(data.sochungtu === payload){
                        data.trangthai = 'Huỷ chứng từ'
                    }
                }
                return { ...state, banHangData: arrClonehuyct}
            case BANHANG_ACTION_TYPES.UPDATE_FORM_BANHANG_CTPS_EDIT:
                // console.log(payload)
                const arrCloneEditCTPS = [...state.banHangData];
                for ( let  i = 0; i < arrCloneEditCTPS.length; i ++) {
                    if (arrCloneEditCTPS[i].sochungtu === payload.id){
                        let newTong = payload.newArr.reduce((total, item) => total + item.thanhtien, 0);
                        arrCloneEditCTPS[i].tongtien = newTong;
                        arrCloneEditCTPS[i].chitietphatsinh = [...payload.newArr]
                    }
                }
                return {...state, banHangData: arrCloneEditCTPS}
        default:
            return state;
    }
}
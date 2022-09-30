import { ACCOUNT_ACTION_TYPES } from "../../controllers/account.types";

const inititalState = {
    menu: [
        {
            key: '2',
            label: 'Phát sinh',
            items: [
                {id: 1, des: 'Bán hàng'},
                {id: 2, des: 'Mua hàng'},
                {id: 3, des: 'Quỹ'},
                {id: 4, des: 'Ngân Hàng'},
                {id: 5, des: 'Kho'},
            ],
        },
        {
            key: '3',
            label: 'Tài sản - CDCDC',
            items: [
                {id: 6, des: 'Tài sản cố định'},
                {id: 7, des: 'Công cụ dụng cụ'},
            ]
        },
        {
            key: '4',
            label: 'Tổng hợp',
            items: [
                {id: 8, des: 'Phiếu kế toán'},
                {id: 9, des: 'Tính giá vốn'},
                {id: 10, des: 'Kết chuyển tài khoản'},
            ]
        }, {
            key: '5',
            label: 'Giá thành',
            items: [
                {id: 11, des: 'Đối tượng tập hợp chi phí'},
                {id: 12, des: 'Lệnh sản xuất'},
                {id: 13, des: 'Tính giá thành'},
            ]
        }, {
            key: '6',
            label: 'Danh mục',
            items: [
                {id: 14, des: 'Hệ thống tài khoản'},
                {id: 15, des: 'Liên hệ'},
                {id: 16, des: 'Danh mục kho'},
                {id: 17, des: 'Ngân hàng'},
                {id: 18, des: 'Khoản mục chi phí'},
                {id: 19, des: 'Loại tài sản'},
            ]
        }, {
            key: '7',
            label: 'Thiết lập ban đầu',
            items: [
                {id: 20, des: 'Tiền tệ'},
                {id: 21, des: 'Đơn vị tính'},
                {id: 22, des: 'Năm tài chính'},
                {id: 23, des: 'Số dư đầu kỳ'},
            ]
        }, {
            key: '8',
            label: 'Báo cáo',
            items: [
                {id: 24, des: 'Báo cáo bán hàng'},
                {id: 25, des: 'Báo cáo mua hàng'},
                {id: 26, des: 'Báo cáo ngân hàng'},
                {id: 27, des: 'Báo cáo quỹ tiền mặt'},
                {id: 28, des: 'Báo cáo kho'},
                {id: 29, des: 'Báo cáo công nợ'},
                {id: 30, des: 'Báo cáo tài chính'},
                {id: 31, des: 'Báo cáo tài sản'},
                {id: 32, des: 'Báo cáo KMCP'},
                {id: 33, des: 'Báo cáo khác'},
                {id: 34, des: 'Báo cáo thuế'},
            ]
        },
    ],
    sideBarMenu: [
        {key: '2',
        label: 'Phát sinh',
        items: [
            {id: 1, des: 'Bán hàng'},
            {id: 2, des: 'Mua hàng'},
            {id: 3, des: 'Quỹ'},
            {id: 4, des: 'Ngân Hàng'},
            {id: 5, des: 'Kho'},
        ]}
    ],
    isAddNew: false,
    keyBread: 1
}

export const menuReducer = ( state = inititalState, action = {} ) => {
    const { type, payload } = action;
    switch (type) {
        case ACCOUNT_ACTION_TYPES.UPDATA_SIDEBAR_MENU: 
            return {...state, sideBarMenu: payload}
        case ACCOUNT_ACTION_TYPES.UPDATE_IS_ADDNEW:
            return {...state, isAddNew: payload}
        case ACCOUNT_ACTION_TYPES.UPDATE_KEY_BREAD:
            return {...state, keyBread: payload}
        default: 
            return state;
    }
}
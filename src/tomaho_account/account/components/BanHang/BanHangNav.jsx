import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ACCOUNT_ACTION_TYPES } from '../../../base/controllers/account.types';
import { selectIsAddNew } from '../../../base/models/Menu/menu.selector'
import { BANHANG_ACTION_TYPES } from '../../../base/controllers/banhang.types';

const items = [
    {
        label: ' Đơn Bán Hàng',
        key: '1'
    },
    {
        label: ' Hàng Bán Trả Lại',
        key: '2',
    },
    {
        label: 'ĐBH Xuất Khẩu',
        key: '3',
    },
    {
        label: 'Giảm giá bán hàng',
        key: '4',
    },
];

const BanHangNav = () => {
    const dispatch = useDispatch();
    const [current, setCurrent] = useState('1');
    const isAdNew = useSelector(selectIsAddNew);
    const onClick = (e) => {
        setCurrent(e.key);
        dispatch({ type: ACCOUNT_ACTION_TYPES.UPDATE_KEY_BREAD, payload: e.key })
        dispatch({ type: ACCOUNT_ACTION_TYPES.UPDATE_IS_ADDNEW, payload: false })
        dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_IS_EDIT, payload: false});
        dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_IS_CREATE, payload: false});
        dispatch({type: BANHANG_ACTION_TYPES.UPDATE_SEARCHKEY, payload: ''});
        dispatch({type: BANHANG_ACTION_TYPES.UPDATE_IS_SEARCH, payload: true});
        dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_KHCT, payload: false})
        dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_ONDISABLED, payload: false})
    };
    return (
        <>
            <Menu onClick={onClick} selectedKeys={[current]} inlineCollapse='false' items={items} style={{ display: 'flex', height: 'fit-content', backgroundColor: 'rgb(199 69 69 / 85%)', width: '100%' }}>
            </Menu>
            <Outlet />
        </>
    )
};

export default BanHangNav;
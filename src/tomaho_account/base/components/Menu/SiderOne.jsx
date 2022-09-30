import './SiderOne.scss'
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import {
    UploadOutlined,
    VideoCameraOutlined,
    SettingOutlined 
} from '@ant-design/icons';
import { Layout, Menu, Popover } from 'antd';
import SideBarAvatar from '../Avatar';
import MenuSidebar from '../Menu';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ACCOUNT_ACTION_TYPES } from '../../controllers/account.types';
import { selectIsLogin } from '../../../../tomaho_auth/models/authSelector';
import { AUTH_ACTIONS_TYPES } from '../../../../tomaho_auth/controllers/auth.types';

const { Sider, Content } = Layout;
const MenuData = [
    {
        key: '2',
        icon: <VideoCameraOutlined />,
        label: 'Phát sinh',
        route: '/sell'
    },
    {
        key: '3',
        icon: <UploadOutlined />,
        label: 'Tài sản - CDCDC',
    },
    {
        key: '4',
        icon: <UploadOutlined />,
        label: 'Tổng hợp',
    }, {
        key: '5',
        icon: <UploadOutlined />,
        label: 'Giá thành',
    }, {
        key: '6',
        icon: <UploadOutlined />,
        label: 'Danh mục',
    }, {
        key: '7',
        icon: <UploadOutlined />,
        label: 'Thiết lập ban đầu',
    }, {
        key: '8',
        icon: <UploadOutlined />,
        label: 'Báo cáo',
    },
]

const SiderOne = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = useSelector(selectIsLogin);
    const handleNavigate = (route) => {
        return navigate(`${route}`)
    }
    const renderMenuData = () => {
        return MenuData.map(item => {
            return (
                    <Menu.Item key={item.key} style={{ color: '#fff' }} onClick={() => handleNavigate(item.route)}>
                        <Popover placement='left' content={item.label}>{item.icon}</Popover>
                    </Menu.Item>
            )
        })
    }
    const handleSelect = ({key}) => {
      dispatch({type: ACCOUNT_ACTION_TYPES.FETCH_MENU_DATA, key})
    }
    const hide = () => {
        setOpen(false)
        dispatch({ type: AUTH_ACTIONS_TYPES.SET_ISLOGIN, payload: !isLogin})
    }
    const hanldeOpenChange = () => {
        setOpen(true)
    }
    const [open, setOpen] = useState(false)
    return (
       <div className='sidebar' style={{display: 'flex'}}>
         {/* <Layout style={{ height: '100vh' }}> */}
            {/* <Sider trigger={null} collapsible collapsed={collapsed}> */}
                <Menu defaultSelectedKeys='2' onSelect={handleSelect} mode='none' style={!isLogin ? {display: 'none'} : { backgroundColor: 'rgb(136, 29, 5)', maxWidth: '60px', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }} >
                    <Menu.Item key='1'>
                        <Popover placement='left' content={<span>Avatar</span>}>
                            <SideBarAvatar />
                        </Popover>
                        <hr />
                    </Menu.Item>
                        {renderMenuData()}
                    <Menu.Item key='9' style={{color: '#fff'}}>
                        <Popover con trigger={'click'} placement='left' open={open} onOpenChange={hanldeOpenChange} content={<a onClick={hide}>Đăng xuất</a>}>
                        <SettingOutlined />
                        </Popover>
                    </Menu.Item>
                </Menu>
            {/* </Sider> */}
        {/* </Layout> */}
        <Outlet/>
       </div>
    );
};

export default SiderOne;

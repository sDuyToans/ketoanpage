import { Breadcrumb } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { ACCOUNT_ACTION_TYPES } from "../controllers/account.types";
import { BANHANG_ACTION_TYPES } from "../controllers/banhang.types";
import { selectKeyBread } from '../models/Menu/menu.selector'
import '../../../styles/breadcrumb.scss'
import { selectDataBanHang, selectIdEdit } from "../models/banhangreducer/banhang.selector";
const BreadCrumb = () => {
    const dispatch = useDispatch();
    const selectBreadCumKey = useSelector(selectKeyBread);
    const handleSwapData = () => {
        dispatch({type: ACCOUNT_ACTION_TYPES.UPDATE_IS_ADDNEW, payload: false});
        dispatch({type: BANHANG_ACTION_TYPES.UPDATE_IS_EDIT, payload: false});
        dispatch({type: BANHANG_ACTION_TYPES.UPDATE_IS_CREATE, payload: false})
        dispatch({type: BANHANG_ACTION_TYPES.UPDATE_IS_RELOAD, payload: true});
        dispatch({type: BANHANG_ACTION_TYPES.UPDATE_ID_EDIT, payload: null})
    }
    const renderLastBreadCrumb = (key) => {
        switch (key) {
            case '1': 
                return <span style={{cursor: 'pointer', fontSize: '20px'}} onClick={handleSwapData}>Đơn bán hàng</span>
            case '2': 
                return <span style={{cursor: 'pointer', fontSize: '20px'}}>Hàng bán trả lại</span>
            case '3':
                return <span style={{cursor: 'pointer', fontSize: '20px'}}>ĐBH xuất khẩu</span>
            case '4': 
                return <span style={{cursor: 'pointer', fontSize: '20px'}}>Giảm giá bán hàng</span>
            default:
                return <span style={{cursor: 'pointer', fontSize: '20px'}} onClick={handleSwapData}>Đơn bán hàng</span>
        }
    }
    const idUpdate = useSelector(selectIdEdit);
    return (
        <Breadcrumb>
            <Breadcrumb.Item style={{fontSize: '20px'}}> 
                Phát sinh
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{fontSize: '20px'}}>
                Bán Hàng
            </Breadcrumb.Item>
            <Breadcrumb.Item>
               {renderLastBreadCrumb(selectBreadCumKey)}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
               { idUpdate
                ? <span style={{cursor: 'pointer', fontSize: '20px'}}>{idUpdate}</span>
                : null
               }
            </Breadcrumb.Item>
        </Breadcrumb>
    )
};
export default BreadCrumb;
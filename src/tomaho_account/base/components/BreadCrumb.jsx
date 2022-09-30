import { Breadcrumb } from "antd";
import { useSelector } from 'react-redux';
import { selectKeyBread } from '../models/Menu/menu.selector'
const BreadCrumb = () => {
    const selectBreadCumKey = useSelector(selectKeyBread);
    const renderLastBreadCrumb = (key) => {
        switch (key) {
            case '1': 
            return 'Đơn bán hàng'
            case '2': 
                return 'Hàng bán trả lại'
            case '3':
                return 'ĐBH xuất khẩu'
            case '4': 
                return 'Giảm giá bán hàng'
            default:
                return 'Đơn bán hàng'
        }
    }
    return (
        <Breadcrumb>
            <Breadcrumb.Item>
                Phát sinh
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                Bán Hàng
            </Breadcrumb.Item>
            <Breadcrumb.Item>
               {renderLastBreadCrumb(selectBreadCumKey)}
            </Breadcrumb.Item>
        </Breadcrumb>
    )
};
export default BreadCrumb;
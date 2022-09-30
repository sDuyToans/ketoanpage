import { useSelector } from "react-redux";
import BreadCrumb from "../../../../base/components/BreadCrumb";
import FormAddNew from "../../../../base/components/FormAddNew";
import ListHead from "../../../../base/components/ListHead";
import TableData from "../../../../base/components/TableData";
import { selectIsEdit } from "../../../../base/models/banhangreducer/banhang.selector";
import { selectIsAddNew } from "../../../../base/models/Menu/menu.selector";
import BanHangNav from "../BanHangNav";
import { Layout } from 'antd'
import './DonBanHang.scss'
const DonBanHang = () => {
    const isAddNew = useSelector(selectIsAddNew);
    const isEdit = useSelector(selectIsEdit);
    return (
        <div className='donbanghang-container' style={isAddNew ? { width: '1110px' } : { width: '1130px' }}>
            <BanHangNav />
            <BreadCrumb />
            <Layout>
                {isAddNew || isEdit ? null : <ListHead />}
                {isAddNew || isEdit ? <FormAddNew /> : <TableData />}
            </Layout>
        </div>
    )
}

export default DonBanHang;
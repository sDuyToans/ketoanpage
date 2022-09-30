import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectDataBanHang, selectDataReturn, selectIsSearch, selectWillUpdate } from '../models/banhangreducer/banhang.selector';
import { BANHANG_ACTION_TYPES } from '../controllers/banhang.types';
import { ACCOUNT_ACTION_TYPES } from '../controllers/account.types';

const columns = [
  {
    title: '#',
    dataIndex: 'id',
    fixed: 'left'
  },
  {
    title: 'Số chứng từ',
    dataIndex: 'sochungtu',
    fixed: 'left'

  },
  {
    title: 'Số hoá đơn',
    dataIndex: 'sohoadon',

  },
  {
    title: 'Khách hàng',
    dataIndex: 'khachhang',

  },
  {
    title: 'Ngày chứng từ',
    dataIndex: 'ngaychungtu',

  },
  {
    title: 'Ngày hạch toán',
    dataIndex: 'ngayhachtoan',

  },
  {
    title: 'Tổng tiền',
    dataIndex: 'tongtien',

  },
  {
    title: 'Trạng thái',
    dataIndex: 'trangthai',
  },
]

const TableData = () => {
  const dispatch = useDispatch();
  const isSearch = useSelector(selectIsSearch);
  // const willUpdate = useSelector(selectWillUpdate);
  // const [dataRender, setDataRender] = useState([DataBanHang]);
  const DataSearch = useSelector(selectDataReturn);
  let DataBanHang = useSelector(selectDataBanHang);
  useEffect(() => {
    DataBanHang = DataSearch
  }, [DataSearch])
  return (
    <>
     {
      DataBanHang && DataBanHang.length > 0
      ?  <Table onRow={(record, rowIndex) => ({ onClick: e => {
        // dispatch({ type: ACCOUNT_ACTION_TYPES.UPDATE_IS_ADDNEW, payload: true});
        dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_IS_CREATE, payload: false});
        dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_IS_EDIT, payload: true});
        dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_ID_EDIT, payload: record.sochungtu})
        // console.log(record.sochungtu)
        dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_ONDISABLED, payload: true})
      }})} style={{ padding: '5px' }} columns={columns} dataSource={isSearch ? DataSearch : DataBanHang} scroll={{
        x: 1300,
        y: 300
      }} ></Table>
      :  <Table   
      style={{ padding: '5px' }} columns={columns} scroll={{
        x: 1300,
        y: 300
      }} ></Table>
     }
    </>
  )
}

export default TableData;
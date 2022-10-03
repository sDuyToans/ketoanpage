import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectDataBanHang, selectDataReturn, selectIsSearch, selectWillUpdate } from '../models/banhangreducer/banhang.selector';
import { BANHANG_ACTION_TYPES } from '../controllers/banhang.types';
import { ACCOUNT_ACTION_TYPES } from '../controllers/account.types';
import '../../../styles/tabledata.scss'

const columns = [
  {
    title: '#',
    dataIndex: 'id',
    width: 70,
    align: 'center',
    fixed: 'left',
    render: (_, record, index) => {
      return <span style={{padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{record.id}</span>
    }
  },
  {
    title: 'Số chứng từ',
    dataIndex: 'sochungtu',
    fixed: 'left',
    width: 170,
    render: (_, record) => {
      return <span style={{paddingLeft: '10px'}}>{record.sochungtu}</span>
    }
  },
  {
    title: 'Số hoá đơn',
    dataIndex: 'sohoadon',
    width: 120,
    render: (_, record) => {
      return <span style={{paddingLeft: '10px'}}>{record.sohoadon}</span>
    }
  },
  {
    title: 'Diễn giải',
    dataIndex: 'diengiai',
    width: 240,
    render: (_, record) => {
      return <span style={{paddingLeft: '10px'}}>{record.diengiai}</span>
    }
  },
  {
    title: 'Khách hàng',
    dataIndex: 'khachhang',
    width: 240,
    render: (_, record) => {
      return <span style={{paddingLeft: '10px'}}>{record.khachhang}</span>
    }
  },
  {
    title: 'Ngày chứng từ',
    dataIndex: 'ngaychungtu',
    width: 150,
    render: (_, record) => {
      return <span style={{paddingLeft: '10px'}}>{record.ngaychungtu}</span>
    }
  },
  {
    title: 'Ngày hạch toán',
    dataIndex: 'ngayhachtoan',
    width: 150,
    render: (_, record) => {
      return <span style={{paddingLeft: '10px'}}>{record.ngayhachtoan}</span>
    }
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'tongtien',
    width: 100,
    render: (_, record) => {
      return <span style={{paddingLeft: '10px'}}>{record.tongtien}</span>
    }
  },
  {
    title: 'Trạng thái',
    dataIndex: 'trangthai',
    width: 150,
    render: (_, record) => {
      switch (record.trangthai) {
        case 'Ghi sổ':
          return <span style={{color: '#fff', background: 'rgb(135, 208, 104)', padding: '5px 10px', marginLeft: '10px', borderRadius: '5px'}}>{record.trangthai}</span>
        case 'Chưa ghi sổ':
          return <span style={{color: '#fff', background: 'rgb(132, 132, 132)', padding: '5px 10px', marginLeft: '10px', borderRadius: '5px'}}>{record.trangthai}</span>
        case 'Huỷ chứng từ':
          return <span style={{color: '#fff', background: 'rgb(205, 32, 31)', padding: '5px 10px', marginLeft: '10px', borderRadius: '5px'}}>{record.trangthai}</span>
      }
    }
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
      ?  <Table 
        rowClassName={'table-row'}
        onRow={(record, rowIndex) => ({ onClick: e => {
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
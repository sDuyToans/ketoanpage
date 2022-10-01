import '../../../styles/formaddnew.scss'
import BodyForm from "./BodyForm";
import { Tabs, Table, Button, Select, Space, List, Form, Input, Col, Row, DatePicker, Modal } from "antd";
import { SearchOutlined, ReloadOutlined, PlusCircleOutlined, CloseOutlined, EditOutlined, CheckCircleOutlined, SaveOutlined } from '@ant-design/icons'

import FormFooter from "./FormFooter";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { selectIsAddNew, selectKeyBread } from "../models/Menu/menu.selector";
import moment from 'moment'
import {
    PlusOutlined
} from '@ant-design/icons';
import FieldSelect from "./FieldSelect";
import FieldChar from "./FieldChar";
import FieldSearch from './FieldSearch';
import FieldNumber from './FieldNumber';
import { selectFormBanHang, selectIsEdit, selectIsCreate, selectIsUpdate, selectDataBanHang, selectIdEdit, selectWillUpdate, selectKHCT, selectDisabled } from '../models/banhangreducer/banhang.selector';
import { BANHANG_ACTION_TYPES } from '../controllers/banhang.types';
import ListHead from './ListHead';
import { ACCOUNT_ACTION_TYPES } from '../controllers/account.types';
const FormAddNew = () => {

    const { Option } = Select;
    const isCreate = useSelector(selectIsCreate);
    const breadCrumbKey = useSelector(selectKeyBread);
    const [tongTien, setTongTien] = useState(0);
    // console.log(tongTien)
    const setTongTienOnChange = (recordId, arrNewLine) => {
        const cloneArr = [...arrNewLine];
        for (const line of cloneArr) {
            if (line._id === recordId) {
                if (line.soluong === 0 || line.dongia === 0) {
                    return line.thanhtien = 0;
                }
                // else return line.sl * line.dongio
                else {
                    line.thanhtien = line.sl * line.dongia
                    setArrNewLine(cloneArr);
                    const arrTongtien = arrNewLine.filter(item => item.thanhtien !== 0);
                    // console.log(arrTongtien)
                    setTongTien(arrTongtien.reduce((total, item) => total + item.thanhtien, 0))
                }
            }
            setArrNewLine(cloneArr)
        }
    }
    const columnsck = [
        {
            title: '#'
        },
        {
            title: 'Sản phẩm'
        },
        {
            title: 'Diễn giải'
        },
        {
            title: 'CK (%)'
        },
        {
            title: 'Tiền chiết khấu'
        },
        {
            title: 'Tk nợ'
        },
        {
            title: 'Tk có'
        },
    ]
    const columnsthuexk = [
        {
            title: '#'
        },
        {
            title: 'Sản phẩm'
        },
        {
            title: 'Diễn giải thuế'
        },
        {
            title: 'Giá tính thuế xuất khẩu'
        },
        {
            title: '% Thuế'
        },
        {
            title: 'Tiền thuế'
        },
        {
            title: 'TK Nợ XK'
        },
        {
            title: 'TK Có XK'
        },
        {
            title: '(%) Thuế VAT'
        },
        {
            title: 'Tiền Thuế VAT'
        },
        {
            title: 'TK nợ VAT'
        },
        {
            title: 'TK có VAT'
        },
    ]
    const KHCT = useSelector(selectKHCT);
    const onDisabled = useSelector(selectDisabled);
    // console.log(onDisabled)
    const columnsct = [
        {
            title: '#',
            dataIndex: '_id',
            fixed: 'left',
            render: (_, record) => {
                return <FieldChar disabled={true} value={record._id} />
            }
        },
        {
            title: 'Mã sản phẩm',
            dataIndex: 'masanpham',
            key: 'masanpham',
            render: (_, record) => {
                return <Select defaultValue={record.masanpham} disabled={isCreate || onDisabled ? true : false} style={{ width: '100%' }} onChange={(e) => {
                    record.masanpham = e;
                }}>
                    <Option value={'chair'}>chair</Option>
                </Select>
            }
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'sanpham',
            key: 'sanpham',
            render: (_, record) => {
                return <FieldChar defaultValue={record.sanpham} disabled={isCreate || onDisabled ? true : false} style={{ width: '100%' }} id={record._id} onChange={(e) => {
                    record.sanpham = e.target.value;
                }} />
            }
        },
        {
            title: 'Đơn giá',
            dataIndex: 'dongia',
            key: 'dongia',
            render: (_, record) => {
                return <FieldNumber defaultValue={record.dongia} disabled={isCreate || onDisabled ? true : false} style={{ width: '100%' }} onChange={(e) => {
                    record.dongia = e;
                    setTongTienOnChange(record._id, arrNewLine)
                }} />
            }
        },
        {
            title: 'SL',
            dataIndex: 'sl',
            key: 'sl',
            render: (_, record) => {
                return <FieldNumber defaultValue={record.sl} disabled={isCreate || onDisabled ? true : false} style={{ width: '100%' }} onChange={(e) => {
                    record.sl = e;
                    setTongTienOnChange(record._id, arrNewLine);
                }} />
            }
        },
        {
            title: 'ĐVT',
            dataIndex: 'dvt',
            key: 'dvt',
            render: (_, record) => {
                return <Select defaultValue={record.dvt} disabled={isCreate || onDisabled ? true : false} style={{ width: '100%' }} onChange={(e) => {
                    record.dvt = e;
                }} >
                    <Option value={'VND'}>VND</Option>
                </Select>
            }
        },
        {
            title: 'Thành tiền',
            dataIndex: 'thanhtien',
            key: 'thanhtien',
            render: (_, record) => {
                return <FieldChar style={{ width: '100%' }} disabled={true} value={record.thanhtien} id={record._id} />
            }
        },
        {
            title: 'TK nợ',
            dataIndex: 'tkNo',
            key: 'tkNo',
            render: (_, record) => {
                return <Select defaultValue={record.tkNo} disabled={isCreate || onDisabled ? true : false} style={{ width: '100%' }} onChange={(e) => {
                    record.tkNo = e;
                }}>
                    <Option value={'1112'}>1112 - Tiền Ngoại Tệ</Option>
                </Select>
            }
        },
        {
            title: 'Tk có',
            dataIndex: 'tkCo',
            key: 'tkCo',
            render: (_, record) => {
                return <Select defaultValue={record.tkCo} disabled={isCreate || onDisabled ? true : false} style={{ width: '100%' }} onChange={(e) => {
                    record.tkCo = e;
                }}>
                    <Option value={'1111'}>1111 - Tiền Việt nam</Option>
                </Select>
            }
        },
        {
            title: 'Kho',
            dataIndex: 'kho',
            render: (_, record) => {
                return <Select defaultValue={record.kho} disabled={isCreate || onDisabled ? true : false} style={{ width: '100%' }} onChange={(e) => {
                    record.kho = e;
                }}>
                    <Option value={'Kho 1'}>Kho 1</Option>
                </Select>
            }
        },
        {
            title: 'Khoản mục',
            dataIndex: 'khoanmuc',
            key: 'khoanmuc',
            render: (_, record) => {
                return <Select defaultValue={record.khoanmuc} disabled={isCreate || onDisabled ? true : false} style={{ width: '100%' }} onChange={(e) => {
                    record.khoanmuc = e;
                }}>

                </Select>
            }
        },
    ]
    const [activeTab, setActiveTab] = useState('1');
    const changeActiveKey = (key) => {
        setActiveTab(key);
    }
    const [arrNewLine, setArrNewLine] = useState([]);
    // console.log(arrNewLine)
    const isUpdate = useSelector(selectIsUpdate);
    const dispatch = useDispatch();
    useEffect(() => {
        if (isUpdate) {
            dispatch({
                type: BANHANG_ACTION_TYPES.UPDATE_FORM_BANHANG_CTPS,
                payload: arrNewLine
            })
        }
    }, [isUpdate])
    // const [ makeNewLine, setMakeNewLine ] = useState(false)
    const addNewLine = () => {
        if (isCreate && !isEdit || onDisabled) {
            return null;
        }
        const newLine = {};
        if (activeTab == 1) {
            newLine._id = uuidv4();
            newLine.masanpham = '';
            newLine.sanpham = '';
            newLine.dongia = '';
            newLine.sl = '';
            newLine.dvt = '';
            newLine.thanhtien = 0;
            newLine.tkNo = '';
            newLine.tkCo = '';
            newLine.kho = '';
            newLine.khoanmuc = '';
        }
        let newArr = arrNewLine.concat(newLine);
        setArrNewLine(newArr);
        // setMakeNewLine(true)
    }
    const formbanhang = useSelector(selectFormBanHang);
    const isAddNew = useSelector(selectIsAddNew)
    const renderTab = (key) => {
        switch (key) {
            case '1':
                return (
                    <Tabs defaultActiveKey="1" onChange={changeActiveKey}>
                        <Tabs.TabPane tab="Chi tiết phát sinh" key="1"  >
                            {
                                // dataEditRender && dataEditRender.chitietphatsinh
                                // ? <Table dataSource={dataEditRender.chitietphatsinh} columns={columnsct} scroll={{ x: 1500 }} />
                                // :
                                arrNewLine && arrNewLine.length > 0
                                    ? <Table dataSource={arrNewLine} columns={columnsct} scroll={{ x: 1500 }} />
                                    : <Table columns={columnsct} />
                            }
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Chiết khấu" key="2">
                            <Table columns={columnsck}>
                            </Table>
                        </Tabs.TabPane>
                    </Tabs>
                )
            case '2':
                return (
                    <Tabs defaultActiveKey="1" onChange={changeActiveKey}>
                        <Tabs.TabPane tab="Chi tiết phát sinh" key="1"  >
                            {
                                arrNewLine && arrNewLine.length > 0
                                    ? <Table dataSource={arrNewLine} columns={columnsct} />
                                    : <Table columns={columnsct} />
                            }
                        </Tabs.TabPane>
                    </Tabs>
                )
            case '3':
                return (
                    <Tabs defaultActiveKey="1" onChange={changeActiveKey}>
                        <Tabs.TabPane tab="Chi tiết phát sinh" key="1"  >
                            {
                                arrNewLine && arrNewLine.length > 0
                                    ? <Table dataSource={arrNewLine} columns={columnsct} />
                                    : <Table columns={columnsct} />
                            }
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Thuế xuất khẩu" key="2">
                            <Table columns={columnsthuexk}>
                            </Table>
                        </Tabs.TabPane>
                    </Tabs>
                )
            case '4':
                return (
                    <Tabs defaultActiveKey="1" onChange={changeActiveKey}>
                        <Tabs.TabPane tab="Chi tiết phát sinh" key="1"  >
                            {
                                arrNewLine && arrNewLine.length > 0
                                    ? <Table dataSource={arrNewLine} columns={columnsct} />
                                    : <Table columns={columnsct} />
                            }
                        </Tabs.TabPane>
                    </Tabs>
                )
            default:
                return (
                    <Tabs defaultActiveKey="1" onChange={changeActiveKey}>
                        <Tabs.TabPane tab="Chi tiết phát sinh" key="1"  >
                            {
                                arrNewLine && arrNewLine.length > 0
                                    ? <Table dataSource={arrNewLine} columns={columnsct} />
                                    : <Table columns={columnsct} />
                            }
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Chiết khấu" key="2">
                            <Table columns={columnsck}>
                            </Table>
                        </Tabs.TabPane>
                    </Tabs>
                )
        }
    }
    // const { Option } = Select;
    const donbanhang = {
        sochungtu: uuidv4(),
        sohoadon: '',
        kituhoadon: '',
        khachhang: '',
        ngaychungtu: moment().format('L'),
        ngayhachtoan: moment().format('L'),
        loaitien: 'VND',
        tigia: '1',
        diengiai: '',
        chitietphatsinh: []
    }
    // const dispatch = useDispatch();
    // const isCreate = useSelector(selectIsCreate);
    const [formValues, setFormValues] = useState(donbanhang);
    // console.log(formValues)
    const isAdNew = useSelector(selectIsAddNew);
    const [form] = Form.useForm();
    // const isUpdate = useSelector(selectIsUpdate);
    const isEdit = useSelector(selectIsEdit);
    const willUpdate = useSelector(selectWillUpdate);
    const dataBanHang = useSelector(selectDataBanHang);
    const [handleErrorLine, setHandleErrorLine] = useState()
    console.log(formValues)
    const handleFinish = () => {
        // console.log(formValues.chitietphatsinh)
        // if ()
        console.log(dataEditRender)
        console.log(formValues);
        setHandleErrorLine('');
        if(moment(formValues.ngaychungtu).isAfter(formValues.ngayhachtoan)){
            console.log(formValues.ngaychungtu)
            console.log(formValues.ngayhachtoan)
            setHandleErrorLine('Ngày chứng từ hơn ngày hạch toán');
            setModal(true);
            return null;
        } else if(formValues.khachhang === ''){
            setHandleErrorLine('Thiếu liên hệ!');
            setModal(true);
            return null;
        } else if (formValues.diengiai === ''){
            setHandleErrorLine('Thiếu diễn giải!');
            setModal(true);
            return null;
        }
        for (let i = 0; i < arrNewLine.length; i++) {
            if (arrNewLine[i].masanpham === '' || arrNewLine[i].sanpham === '' || arrNewLine[i].dongia === '' || arrNewLine[i].sl === '' || arrNewLine[i].dvt === '' || arrNewLine[i].thanhtien === '' || arrNewLine[i].tkNo === '' || arrNewLine[i].tkCo === '' || arrNewLine[i].kho === '') {
                if (arrNewLine[i].masanpham === '') {
                    console.log('Thiếu mã sản phẩm')
                    setHandleErrorLine('Thiếu mã sản phẩm')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].sanpham === '') {
                    console.log('Thiếu sản phẩm')
                    setHandleErrorLine('Thiếu sản phẩm')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].dongia === '') {
                    console.log('Thiếu đơn giá')
                    setHandleErrorLine('Thiếu đơn giá')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].sl === '') {
                    console.log('Thiếu số lượng')
                    setHandleErrorLine('Thiếu số lượng')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].dvt === '') {
                    console.log('Thiếu đơn vị tính')
                    setHandleErrorLine('Thiếu đơn vị tính')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].tkNo === '') {
                    console.log('Thiếu TK Nợ')
                    setHandleErrorLine('Thiếu TK Nợ')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].tkCo === '') {
                    console.log('Thiếu TK Có')
                    setHandleErrorLine('Thiếu TK Có')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].kho === '') {
                    console.log('Thiếu Kho')
                    setHandleErrorLine('Thiếu Kho')
                    setModal(true)
                    return null
                }
            }
        }
        dispatch({
            type: BANHANG_ACTION_TYPES.UPDATE_IS_UPDATE,
            payload: true
        })
        dispatch({
            type: BANHANG_ACTION_TYPES.UPDATE_FORM_BANHANG,
            payload: formValues
        })
        dispatch({
            type: BANHANG_ACTION_TYPES.UPDATE_IS_CREATE,
            payload: true
        })
        if (isCreate && !isEdit && isAdNew) {
            dispatch({
                type: BANHANG_ACTION_TYPES.UPDATE_FORM_BANHANG,
                payload: formValues
            })
        }
    }
    // dispatch({
    //     type: BANHANG_ACTION_TYPES.UPDATE_IS_UPDATE,
    //     payload: true
    // })
    // dispatch({
    //     type: BANHANG_ACTION_TYPES.UPDATE_FORM_BANHANG,
    //     payload: formValues
    // })
    // dispatch({
    //     type: BANHANG_ACTION_TYPES.UPDATE_IS_CREATE,
    //     payload: true
    // })
    // if (isCreate && !isEdit && isAdNew) {
    //     dispatch({
    //         type: BANHANG_ACTION_TYPES.UPDATE_FORM_BANHANG,
    //         payload: formValues
    //     })
    // }

    const [dataEditRender, setDataEditRender] = useState([]);
    const idUpdate = useSelector(selectIdEdit);
    useEffect(() => {
        if (isEdit && dataEditRender && idUpdate) {
            setArrNewLine(dataEditRender.chitietphatsinh)
            setFormValues(dataEditRender)
            form.setFieldsValue({
                sohoadon: dataEditRender.sohoadon,
                kituhoadon: dataEditRender.kituhoadon,
                ngaychungtu: moment(dataEditRender.ngaychungtu),
                ngayhachtoan: moment(dataEditRender.ngayhachtoan),
                khachhang: dataEditRender.khachhang,
                loaitien: dataEditRender.loaitien,
                tigia: dataEditRender.tigia,
                diengiai: dataEditRender.diengiai
            })
        }
    }, [dataEditRender])
    useEffect(() => {
        findDonBanHangEdit(idUpdate);
    }, [idUpdate])
    const findDonBanHangEdit = (idEdit) => {
        return setDataEditRender(dataBanHang.find(item => item.sochungtu === idEdit));
    }

    // const defaultValueProps = {
    //     sohoadon: '',
    //     kituhoadon: '',
    //     diengiai: ''
    // }
    // const [ valueprops, setValueProps ] = useState(defaultValueProps);
    // const { sohoadon, kituhoadon, diengiai } = valueprops;
    // console.log(valueprops)
    // const handleSave = () => {
    //     dispatch({
    //         type: BANHANG_ACTION_TYPES.UPDATE_FORM_BANHANG_EDIT,
    //         payload: { ...formValues, sochungtu: idUpdate }
    //     })
    // }
    const [modal, setModal] = useState(false);
    const [errorList, setErrorList] = useState([]);
    // console.log(errorList)
    const handleFinishFailed = (error) => {
        if (error) {
            setModal(true);
            setErrorList(error.errorFields)
        }
    }
    // const isSave = useSelector(isSave);
    const [save, setSave] = useState(false);
    const [kichHoatChungTu, setKichHoatChungTu] = useState(false);
    const handleKichHoatChungTu = () => {
        setKichHoatChungTu(false);
    }
    const handleSave = () => {
        if (formValues.diengiai === '', formValues.khachhang === '') {
            setModal(true)
        } else {
            for (let i = 0; i < arrNewLine.length; i++) {
                if (arrNewLine[i].masanpham === '' || arrNewLine[i].sanpham === '' || arrNewLine[i].dongia === '' || arrNewLine[i].sl === '' || arrNewLine[i].dvt === '' || arrNewLine[i].thanhtien === '' || arrNewLine[i].tkNo === '' || arrNewLine[i].tkCo === '' || arrNewLine[i].kho === '') {
                    if (arrNewLine[i].masanpham === '') {
                        console.log('Thiếu mã sản phẩm')
                        setHandleErrorLine('Thiếu mã sản phẩm')
                        setModal(true)
                        return null
                    }
                    else if (arrNewLine[i].sanpham === '') {
                        console.log('Thiếu sản phẩm')
                        setHandleErrorLine('Thiếu sản phẩm')
                        setModal(true)
                        return null
                    }
                    else if (arrNewLine[i].dongia === '') {
                        console.log('Thiếu đơn giá')
                        setHandleErrorLine('Thiếu đơn giá')
                        setModal(true)
                        return null
                    }
                    else if (arrNewLine[i].sl === '') {
                        console.log('Thiếu số lượng')
                        setHandleErrorLine('Thiếu số lượng')
                        setModal(true)
                        return null
                    }
                    else if (arrNewLine[i].dvt === '') {
                        console.log('Thiếu đơn vị tính')
                        setHandleErrorLine('Thiếu đơn vị tính')
                        setModal(true)
                        return null
                    }
                    else if (arrNewLine[i].tkNo === '') {
                        console.log('Thiếu TK Nợ')
                        setHandleErrorLine('Thiếu TK Nợ')
                        setModal(true)
                        return null
                    }
                    else if (arrNewLine[i].tkCo === '') {
                        console.log('Thiếu TK Có')
                        setHandleErrorLine('Thiếu TK Có')
                        setModal(true)
                        return null
                    }
                    else if (arrNewLine[i].kho === '') {
                        console.log('Thiếu Kho')
                        setHandleErrorLine('Thiếu Kho')
                        setModal(true)
                        return null
                    }
                }
            }
            dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_IS_CREATE, payload: true });
            dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_IS_EDIT, payload: false });
            dispatch({ type: ACCOUNT_ACTION_TYPES.UPDATE_IS_ADDNEW, payload: true });
            dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_WILL_DATA_UPDATE, payload: true })
            dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_FORM_BANHANG_EDIT, payload: formValues })
            dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_FORM_BANHANG_CTPS_EDIT, payload: { newArr: arrNewLine, id: idUpdate } })
            dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_SEARCHKEY, payload: '' });
            setSave(false)
            // console.log(formValues.diengiai)
        }
    }
    const handleHuy = () => {
        setSave(false)
        dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_ONDISABLED, payload: true })
    }
    return (
        <div className="formadd-new" style={{ padding: '5px' }}>
            {/* <BodyForm/> */}
            <div className="formaddnew-container">
                <Modal
                    title="Vertically centered modal dialog"
                    centered
                    visible={modal}
                    onOk={() => setModal(false)}
                    onCancel={() => setModal(false)}
                >
                    {
                        errorList?.map((item, index) => {
                                return (
                                    <p key={index}>{item.errors}</p>
                                )
                            })
                    }
                    {
                        <p>{handleErrorLine}</p>
                    }
                </Modal>
                <Form onFinish={handleFinish} form={form} onFinishFailed={handleFinishFailed} >
                    {/* <ListHead formValues={formValues} arrNewLine={arrNewLine} setSave={setSave}/> */}
                    {
                        kichHoatChungTu
                            ? <Button onClick={handleKichHoatChungTu}><CloseOutlined />Kích hoạt chứng từ</Button>
                            :
                            !save
                                ?
                                <ListHead formValues={formValues} arrNewLine={arrNewLine} setSave={setSave} setKichHoatChungTu={setKichHoatChungTu} />
                                : <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <div className="button-together" style={{ display: 'flex', gap: '10px' }}>
                                        <Button htmlType="submit" onClick={handleSave} style={{ backgroundColor: '#c43e1b' }}><SaveOutlined />Lưu</Button>
                                        <Button onClick={handleHuy}><CloseOutlined />Huỷ</Button>
                                    </div>
                                    <div className="right-listhead">
                                        <ul style={{ display: 'flex', gap: '5px', listStyle: 'none' }}>
                                            <li style={{ background: '#8c0c0c', padding: '5px 15px' }}>Chưa ghi sổ</li>
                                            <li style={{ background: '#8c0c0c', padding: '5px 15px' }}>Ghi sổ</li>
                                            <li style={{ background: '#8c0c0c', padding: '5px 15px' }}>Huỷ chứng từ</li>
                                        </ul>
                                    </div>
                                </div>
                    }
                    <Row gutter={10} className='first-row'>
                        <Col span={8}>
                            <Form.Item label="Số chứng từ" name={'sochungtu'} >
                                <FieldChar value={isEdit ? dataEditRender.sochungtu : ''} disabled='true' />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Số hoá đơn" name={'sohoadon'} >
                                <FieldChar name='sohoadon' value={isEdit ? dataEditRender.sohoadon : ''} disabled={isCreate && !isEdit || onDisabled ? true : false} onChange={(e) => {
                                    setFormValues({ ...formValues, sohoadon: e.target.value })
                                    // setValueProps({...valueprops, [e.target.name]: e.target.value});
                                }} />
                                {/* <Input value={isEdit ? dataEditRender.sohoadon : ''} disabled={isCreate ? true : false} onChange={(e) => { 
                                setFormValues({ ...formValues, sohoadon: e.target.value })
                                }} /> */}
                            </Form.Item>
                            {/* <Form.Item shouldUpdate={(prevValues, curValues) => prevValues.sohoadon !== curValues.sohoadon}>
                            {() => {
                                return (
                                    <Form.Item label="Số hoá đơn" name={'sohoadon'} >
                                        <FieldChar name='sohoadon' value={isEdit ? dataEditRender.sohoadon : ''} disabled={isCreate ? true : false} onChange={(e) => setFormValues({ ...formValues, sohoadon: e.target.value })} />
                                    </Form.Item>
                                );
                            }}
                        </Form.Item> */}
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Kí tự hoá đơn" name={'kituhoadon'}>
                                <FieldChar name='kituhoadon' value={isEdit ? dataEditRender.kituhoadon : ''} disabled={isCreate && !isEdit || onDisabled ? true : false} onChange={(e) => {
                                    setFormValues({ ...formValues, kituhoadon: e.target.value })
                                    // setValueProps({...valueprops, [e.target.name]: e.target.value});
                                }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={8}>
                            <Row gutter={10}>
                                <Col span={12}>
                                    <Form.Item label="Ngày chứng từ (*)" name={'ngaychungtu'}>
                                        <DatePicker name='ngaychungtu' value={isEdit ? dataEditRender.ngaychungtu : ''} disabled={isCreate && !isEdit || onDisabled ? true : false} id='ngaychungtu' format={'DD/MM/YYYY'} defaultValue={moment()} style={{ width: '100%' }} onChange={(e) => { setFormValues({ ...formValues, ngaychungtu: e.format('L') }); console.log(formValues)}} />

                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Ngày hoạch toán (*)" name={'ngayhoachtoan'}>
                                        <DatePicker name='ngayhoachtoan' value={isEdit ? dataEditRender.ngayhachtoan : ''} disabled={isCreate && !isEdit || onDisabled ? true : false} id='ngayhoactoan' format={'DD/MM/YYYY'} defaultValue={moment()} style={{ width: '100%' }} onChange={(e) => { setFormValues({ ...formValues, ngayhachtoan: e.format('L') }); console.log(formValues)}} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={8}>
                            <Form.Item disabled={isCreate && !isEdit || onDisabled ? true : false} label="Khách hàng (*)" name={'khachhang'} >
                                {/* rules={[{ required: true, message: 'Thiếu liên hệ' }]}  */}
                                <Select
                                    showSearch
                                    style={{
                                        width: '100%',
                                    }}
                                    onChange={(e) => setFormValues({ ...formValues, khachhang: e })}
                                    disabled={isCreate && !isEdit || onDisabled ? true : false}
                                >
                                    <Option name='khachhang' value={isEdit && !isEdit ? dataEditRender.khachhang : 'Toan'} >Toan</Option>

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Row gutter={10}>
                                <Col span={12}>
                                    <Form.Item label="Loại tiền" name={'loaitien'}>
                                        {/* <FieldSelect arrOptions={selectCurrency} disabled='true' /> */}
                                        <Select disabled={true} showSearch={true} defaultValue='VND' >
                                            <Option name='loaitien' value='VND'>VND</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Tỉ giá" name={'tigia'}>
                                        <Input name='tigia' disabled={true} prefix={dataEditRender ? '' : 1} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Form.Item label="Diễn giải (*)" name={'diengiai'}>
                        {/* rules={[{ required: true, message: 'Thiếu diễn giải' }]} */}
                        <Input.TextArea name='diengiai' value={isEdit && !isEdit ? dataEditRender.diengiai : ''} disabled={isCreate || onDisabled ? true : false} onChange={(e) => {
                            setFormValues({ ...formValues, diengiai: e.target.value })
                            // setValueProps({...valueprops, [e.target.name]: e.target.value});
                        }} />
                    </Form.Item>
                    <div className="tab-container">
                        {renderTab(breadCrumbKey)}
                    </div>
                    <Space>
                        <PlusOutlined onClick={addNewLine} />Thêm dòng mới
                    </Space>
                    <FormFooter tongTien={tongTien} />
                </Form>
            </div>

        </div>
    )
};
export default FormAddNew;
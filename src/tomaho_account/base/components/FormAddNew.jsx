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
import { selectFormBanHang, selectIsEdit, selectIsCreate, selectIsUpdate, selectDataBanHang, selectIdEdit, selectWillUpdate, selectKHCT, selectDisabled, selectIsReload, selectIsActiveNewTrangThai } from '../models/banhangreducer/banhang.selector';
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
            title: 'S???n ph???m'
        },
        {
            title: 'Di???n gi???i'
        },
        {
            title: 'CK (%)'
        },
        {
            title: 'Ti???n chi???t kh???u'
        },
        {
            title: 'Tk n???'
        },
        {
            title: 'Tk c??'
        },
    ]
    const columnsthuexk = [
        {
            title: '#'
        },
        {
            title: 'S???n ph???m'
        },
        {
            title: 'Di???n gi???i thu???'
        },
        {
            title: 'Gi?? t??nh thu??? xu???t kh???u'
        },
        {
            title: '% Thu???'
        },
        {
            title: 'Ti???n thu???'
        },
        {
            title: 'TK N??? XK'
        },
        {
            title: 'TK C?? XK'
        },
        {
            title: '(%) Thu??? VAT'
        },
        {
            title: 'Ti???n Thu??? VAT'
        },
        {
            title: 'TK n??? VAT'
        },
        {
            title: 'TK c?? VAT'
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
            width: 20,
            render: (_, record) => {
                return <FieldChar disabled={true} value={record._id} />
            }
        },
        {
            title: 'M?? s???n ph???m',
            dataIndex: 'masanpham',
            key: 'masanpham',
            width: 25,
            render: (_, record) => {
                return <Select defaultValue={record.masanpham} disabled={isCreate || onDisabled ? true : false} style={{ width: '100%' }} onChange={(e) => {
                    record.masanpham = e;
                }}>
                    <Option value={'chair'}>chair</Option>
                </Select>
            }
        },
        {
            title: 'S???n ph???m',
            dataIndex: 'sanpham',
            key: 'sanpham',
            width: 20,
            render: (_, record) => {
                return <FieldChar defaultValue={record.sanpham} disabled={isCreate || onDisabled ? true : false} style={{ width: '100%' }} id={record._id} onChange={(e) => {
                    record.sanpham = e.target.value;
                }} />
            }
        },
        {
            title: '????n gi??',
            dataIndex: 'dongia',
            key: 'dongia',
            width: 20,
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
            width: 10,
            render: (_, record) => {
                return <FieldNumber defaultValue={record.sl} disabled={isCreate || onDisabled ? true : false} style={{ width: '100%' }} onChange={(e) => {
                    record.sl = e;
                    setTongTienOnChange(record._id, arrNewLine);
                }} />
            }
        },
        {
            title: '??VT',
            dataIndex: 'dvt',
            key: 'dvt',
            width: 15,
            render: (_, record) => {
                return <Select defaultValue={record.dvt} disabled={isCreate || onDisabled ? true : false} style={{ width: '100%' }} onChange={(e) => {
                    record.dvt = e;
                }} >
                    <Option value={'VND'}>VND</Option>
                </Select>
            }
        },
        {
            title: 'Th??nh ti???n',
            dataIndex: 'thanhtien',
            key: 'thanhtien',
            width: 17,
            render: (_, record) => {
                return <FieldChar style={{ width: '100%' }} disabled={true} value={record.thanhtien} id={record._id} />
            }
        },
        {
            title: 'TK n???',
            dataIndex: 'tkNo',
            key: 'tkNo',
            width: 15,
            render: (_, record) => {
                return <Select defaultValue={record.tkNo} disabled={isCreate || onDisabled ? true : false} style={{ width: '100%' }} onChange={(e) => {
                    record.tkNo = e;
                }}>
                    <Option value={'1112'}>1112 - Ti???n Ngo???i T???</Option>
                </Select>
            }
        },
        {
            title: 'Tk c??',
            dataIndex: 'tkCo',
            key: 'tkCo',
            width: 15,
            render: (_, record) => {
                return <Select defaultValue={record.tkCo} disabled={isCreate || onDisabled ? true : false} style={{ width: '100%' }} onChange={(e) => {
                    record.tkCo = e;
                }}>
                    <Option value={'1111'}>1111 - Ti???n Vi???t nam</Option>
                </Select>
            }
        },
        {
            title: 'Kho',
            dataIndex: 'kho',
            width: 20,
            render: (_, record) => {
                return <Select defaultValue={record.kho} disabled={isCreate || onDisabled ? true : false} style={{ width: '100%' }} onChange={(e) => {
                    record.kho = e;
                }}>
                    <Option value={'Kho 1'}>Kho 1</Option>
                </Select>
            }
        },
        {
            title: 'Kho???n m???c',
            dataIndex: 'khoanmuc',
            key: 'khoanmuc',
            width: 50,
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
                        <Tabs.TabPane tab="Chi ti???t ph??t sinh" key="1"  >
                            {
                                // dataEditRender && dataEditRender.chitietphatsinh
                                // ? <Table dataSource={dataEditRender.chitietphatsinh} columns={columnsct} scroll={{ x: 1500 }} />
                                // :
                                arrNewLine && arrNewLine.length > 0
                                    ? <Table dataSource={arrNewLine} columns={columnsct} scroll={{ x: 1500 }} />
                                    : <Table columns={columnsct} />
                            }
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Chi???t kh???u" key="2">
                            <Table columns={columnsck}>
                            </Table>
                        </Tabs.TabPane>
                    </Tabs>
                )
            case '2':
                return (
                    <Tabs defaultActiveKey="1" onChange={changeActiveKey}>
                        <Tabs.TabPane tab="Chi ti???t ph??t sinh" key="1"  >
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
                        <Tabs.TabPane tab="Chi ti???t ph??t sinh" key="1"  >
                            {
                                arrNewLine && arrNewLine.length > 0
                                    ? <Table dataSource={arrNewLine} columns={columnsct} />
                                    : <Table columns={columnsct} />
                            }
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Thu??? xu???t kh???u" key="2">
                            <Table columns={columnsthuexk}>
                            </Table>
                        </Tabs.TabPane>
                    </Tabs>
                )
            case '4':
                return (
                    <Tabs defaultActiveKey="1" onChange={changeActiveKey}>
                        <Tabs.TabPane tab="Chi ti???t ph??t sinh" key="1"  >
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
                        <Tabs.TabPane tab="Chi ti???t ph??t sinh" key="1"  >
                            {
                                arrNewLine && arrNewLine.length > 0
                                    ? <Table dataSource={arrNewLine} columns={columnsct} />
                                    : <Table columns={columnsct} />
                            }
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Chi???t kh???u" key="2">
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
        if (moment(formValues.ngaychungtu).isAfter(formValues.ngayhachtoan)) {
            console.log(formValues.ngaychungtu)
            console.log(formValues.ngayhachtoan)
            setHandleErrorLine('Ng??y ch???ng t??? h??n ng??y h???ch to??n');
            setModal(true);
            return null;
        } else if (formValues.khachhang === '') {
            setHandleErrorLine('Thi???u li??n h???!');
            setModal(true);
            return null;
        } else if (formValues.diengiai === '') {
            setHandleErrorLine('Thi???u di???n gi???i!');
            setModal(true);
            return null;
        }
        for (let i = 0; i < arrNewLine.length; i++) {
            if (arrNewLine[i].masanpham === '' || arrNewLine[i].sanpham === '' || arrNewLine[i].dongia === '' || arrNewLine[i].sl === '' || arrNewLine[i].dvt === '' || arrNewLine[i].thanhtien === '' || arrNewLine[i].tkNo === '' || arrNewLine[i].tkCo === '' || arrNewLine[i].kho === '') {
                if (arrNewLine[i].masanpham === '') {
                    console.log('Thi???u m?? s???n ph???m')
                    setHandleErrorLine('Thi???u m?? s???n ph???m')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].sanpham === '') {
                    console.log('Thi???u s???n ph???m')
                    setHandleErrorLine('Thi???u s???n ph???m')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].dongia === '') {
                    console.log('Thi???u ????n gi??')
                    setHandleErrorLine('Thi???u ????n gi??')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].sl === '') {
                    console.log('Thi???u s??? l?????ng')
                    setHandleErrorLine('Thi???u s??? l?????ng')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].dvt === '') {
                    console.log('Thi???u ????n v??? t??nh')
                    setHandleErrorLine('Thi???u ????n v??? t??nh')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].tkNo === '') {
                    console.log('Thi???u TK N???')
                    setHandleErrorLine('Thi???u TK N???')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].tkCo === '') {
                    console.log('Thi???u TK C??')
                    setHandleErrorLine('Thi???u TK C??')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].kho === '') {
                    console.log('Thi???u Kho')
                    setHandleErrorLine('Thi???u Kho')
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
        dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_ONDISABLED, payload: true })
        setSave(false);
    }
    const [isSave, setIsSave] = useState(false)
    const [dataEditRender, setDataEditRender] = useState([]);
    // console.log(dataEditRender)
    const idUpdate = useSelector(selectIdEdit);
    useEffect(() => {
        if (isEdit && dataEditRender && idUpdate) {
            setArrNewLine(dataEditRender.chitietphatsinh)
            setFormValues(dataEditRender)
            form.setFieldsValue({
                sohoadon: dataEditRender.sohoadon,
                kituhoadon: dataEditRender.kituhoadon,
                ngaychungtu: moment(dataEditRender.ngaychungtu),
                ngayhoachtoan: moment(dataEditRender.ngayhachtoan),
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
        setDataEditRender(dataBanHang.find(item => item.sochungtu == idEdit))
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
        dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_CHUA_GHISO, payload: formValues.sochungtu })
        dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_KHCT, payload: true });
        dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_IS_CREATE, payload: true });
        activeTrangThai( formValues.sochungtu )
    }
    const handleSave = () => {
        console.log(formValues)
        setHandleErrorLine('');
        if (moment(formValues.ngaychungtu).isAfter(formValues.ngayhachtoan)) {
            console.log(formValues.ngaychungtu)
            console.log(formValues.ngayhachtoan)
            setHandleErrorLine('Ng??y ch???ng t??? h??n ng??y h???ch to??n');
            setModal(true);
            return null;
        } else if (formValues.khachhang === '') {
            setHandleErrorLine('Thi???u li??n h???!');
            setModal(true);
            return null;
        } else if (formValues.diengiai === '') {
            setHandleErrorLine('Thi???u di???n gi???i!');
            setModal(true);
            return null;
        }
        for (let i = 0; i < arrNewLine.length; i++) {
            if (arrNewLine[i].masanpham === '' || arrNewLine[i].sanpham === '' || arrNewLine[i].dongia === '' || arrNewLine[i].sl === '' || arrNewLine[i].dvt === '' || arrNewLine[i].thanhtien === '' || arrNewLine[i].tkNo === '' || arrNewLine[i].tkCo === '' || arrNewLine[i].kho === '') {
                if (arrNewLine[i].masanpham === '') {
                    console.log('Thi???u m?? s???n ph???m')
                    setHandleErrorLine('Thi???u m?? s???n ph???m')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].sanpham === '') {
                    console.log('Thi???u s???n ph???m')
                    setHandleErrorLine('Thi???u s???n ph???m')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].dongia === '') {
                    console.log('Thi???u ????n gi??')
                    setHandleErrorLine('Thi???u ????n gi??')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].sl === '') {
                    console.log('Thi???u s??? l?????ng')
                    setHandleErrorLine('Thi???u s??? l?????ng')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].dvt === '') {
                    console.log('Thi???u ????n v??? t??nh')
                    setHandleErrorLine('Thi???u ????n v??? t??nh')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].tkNo === '') {
                    console.log('Thi???u TK N???')
                    setHandleErrorLine('Thi???u TK N???')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].tkCo === '') {
                    console.log('Thi???u TK C??')
                    setHandleErrorLine('Thi???u TK C??')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].kho === '') {
                    console.log('Thi???u Kho')
                    setHandleErrorLine('Thi???u Kho')
                    setModal(true)
                    return null
                }
            }
        }
        for (let i = 0; i < arrNewLine.length; i++) {
            if (arrNewLine[i].masanpham === '' || arrNewLine[i].sanpham === '' || arrNewLine[i].dongia === '' || arrNewLine[i].sl === '' || arrNewLine[i].dvt === '' || arrNewLine[i].thanhtien === '' || arrNewLine[i].tkNo === '' || arrNewLine[i].tkCo === '' || arrNewLine[i].kho === '') {
                if (arrNewLine[i].masanpham === '') {
                    console.log('Thi???u m?? s???n ph???m')
                    setHandleErrorLine('Thi???u m?? s???n ph???m')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].sanpham === '') {
                    console.log('Thi???u s???n ph???m')
                    setHandleErrorLine('Thi???u s???n ph???m')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].dongia === '') {
                    console.log('Thi???u ????n gi??')
                    setHandleErrorLine('Thi???u ????n gi??')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].sl === '') {
                    console.log('Thi???u s??? l?????ng')
                    setHandleErrorLine('Thi???u s??? l?????ng')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].dvt === '') {
                    console.log('Thi???u ????n v??? t??nh')
                    setHandleErrorLine('Thi???u ????n v??? t??nh')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].tkNo === '') {
                    console.log('Thi???u TK N???')
                    setHandleErrorLine('Thi???u TK N???')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].tkCo === '') {
                    console.log('Thi???u TK C??')
                    setHandleErrorLine('Thi???u TK C??')
                    setModal(true)
                    return null
                }
                else if (arrNewLine[i].kho === '') {
                    console.log('Thi???u Kho')
                    setHandleErrorLine('Thi???u Kho')
                    setModal(true)
                    return null
                }
            }
            dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_IS_CREATE, payload: true });
            dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_IS_EDIT, payload: false });
            dispatch({ type: ACCOUNT_ACTION_TYPES.UPDATE_IS_ADDNEW, payload: true });
            dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_WILL_DATA_UPDATE, payload: true })
            dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_FORM_BANHANG_EDIT, payload: formValues })
            dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_FORM_BANHANG_CTPS_EDIT, payload: { newArr: arrNewLine, id: idUpdate } })
            dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_SEARCHKEY, payload: '' });
            // console.log(123)
            setSave(false)
            setIsSave(true)
            // console.log(formValues.diengiai)
        }
    }
    const handleHuy = () => {
        setSave(false)
        dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_ONDISABLED, payload: true })
    }
    // console.log(save)
    // console.log(onDisabled)
    // console.log(kichHoatChungTu)
    const activeTrangThai = (id) => {
        const activeData = dataBanHang.find(item => item.sochungtu === id);
        console.log(activeData.trangthai)
        switch (activeData.trangthai) {
            case 'Ghi s???':
                document.querySelector('.ghi-so').classList.add('active');
                document.querySelector('.chua-ghi-so').classList.remove('active');
                document.querySelector('.huy-chung-tu').classList.remove('active');
                break;
            case 'Ch??a ghi s???':
                document.querySelector('.chua-ghi-so').classList.add('active');
                document.querySelector('.ghi-so').classList.remove('active');
                document.querySelector('.huy-chung-tu').classList.remove('active');
                break;
            case 'Hu??? ch???ng t???':
                document.querySelector('.huy-chung-tu').classList.add('active');
                document.querySelector('.ghi-so').classList.remove('active');
                document.querySelector('.chua-ghi-so').classList.remove('active');
                break;
        }
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
                            ?
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', paddingTop: '5px'}}>
                                <Button onClick={() => handleKichHoatChungTu(formValues.sochungtu)}><CloseOutlined />K??ch ho???t ch???ng t???</Button>
                                <ul style={{ display: 'flex', gap: '5px', listStyle: 'none' }}>
                                    <li className='chua-ghi-so' style={{ padding: '5px 15px' }}>Ch??a ghi s???</li>
                                    <li className='ghi-so' style={{ padding: '5px 15px' }}>Ghi s???</li>
                                    <li className='huy-chung-tu active' style={{ padding: '5px 15px' }}>Hu??? ch???ng t???</li>
                                </ul>
                            </div>
                            :
                            !save
                                ?
                                <ListHead activeTrangThai={activeTrangThai} formValues={formValues} arrNewLine={arrNewLine} setSave={setSave} setKichHoatChungTu={setKichHoatChungTu} />
                                : <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '5px'}}>
                                    <div className="button-together" style={{ display: 'flex', gap: '10px' }}>
                                        <Button htmlType="submit" onClick={handleSave} style={{ backgroundColor: '#c43e1b' }}><SaveOutlined />L??u</Button>
                                        <Button onClick={handleHuy}><CloseOutlined />Hu???</Button>
                                    </div>
                                    <div className="right-listhead">
                                        <ul style={{ display: 'flex', gap: '5px', listStyle: 'none' }}>
                                            <li className='chua-ghi-so active' style={{  padding: '5px 15px' }}>Ch??a ghi s???</li>
                                            <li className='ghi-so' style={{  padding: '5px 15px' }}>Ghi s???</li>
                                            <li className='huy-chung-tu' style={{  padding: '5px 15px' }}>Hu??? ch???ng t???</li>
                                        </ul>
                                    </div>
                                </div>
                    }
                    <Row gutter={10} className='first-row'>
                        <Col span={8}>
                            <Form.Item label="S??? ch???ng t???" name={'sochungtu'} >
                                <FieldChar disabled='true' />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="S??? ho?? ????n" name={'sohoadon'} >
                                <FieldChar name='sohoadon' disabled={isCreate && !isEdit || onDisabled ? true : false} onChange={(e) => {
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
                                    <Form.Item label="S??? ho?? ????n" name={'sohoadon'} >
                                        <FieldChar name='sohoadon' value={isEdit ? dataEditRender.sohoadon : ''} disabled={isCreate ? true : false} onChange={(e) => setFormValues({ ...formValues, sohoadon: e.target.value })} />
                                    </Form.Item>
                                );
                            }}
                        </Form.Item> */}
                        </Col>
                        <Col span={8}>
                            <Form.Item label="K?? t??? ho?? ????n" name={'kituhoadon'}>
                                <FieldChar name='kituhoadon' disabled={isCreate && !isEdit || onDisabled ? true : false} onChange={(e) => {
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
                                    <Form.Item label="Ng??y ch???ng t??? (*)" name={'ngaychungtu'}>
                                        <DatePicker name='ngaychungtu' disabled={isCreate && !isEdit || onDisabled ? true : false} id='ngaychungtu' format={'DD/MM/YYYY'} defaultValue={moment()} style={{ width: '100%' }} onChange={(e) => { setFormValues({ ...formValues, ngaychungtu: e.format('L') }); console.log(formValues) }} />

                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Ng??y ho???ch to??n (*)" name={'ngayhoachtoan'}>
                                        <DatePicker name='ngayhoachtoan' disabled={isCreate && !isEdit || onDisabled ? true : false} id='ngayhoactoan' format={'DD/MM/YYYY'} defaultValue={moment()} style={{ width: '100%' }} onChange={(e) => { setFormValues({ ...formValues, ngayhachtoan: e.format('L') }); console.log(formValues) }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={8}>
                            <Form.Item disabled={isCreate && !isEdit || onDisabled ? true : false} label="Kh??ch h??ng (*)" name={'khachhang'} >
                                {/* rules={[{ required: true, message: 'Thi???u li??n h???' }]}  */}
                                <Select
                                    showSearch
                                    style={{
                                        width: '100%',
                                    }}
                                    onChange={(e) => setFormValues({ ...formValues, khachhang: e })}
                                    disabled={isCreate && !isEdit || onDisabled ? true : false}
                                >
                                    <Option name='khachhang' value={'Toan'} >Toan</Option>

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Row gutter={10}>
                                <Col span={12}>
                                    <Form.Item label="Lo???i ti???n" name={'loaitien'}>
                                        {/* <FieldSelect arrOptions={selectCurrency} disabled='true' /> */}
                                        <Select disabled={true} showSearch={true} defaultValue='VND' >
                                            <Option name='loaitien' value='VND'>VND</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="T??? gi??" name={'tigia'}>
                                        <Input name='tigia' disabled={true} prefix={dataEditRender ? '' : 1} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Form.Item label="Di???n gi???i (*)" name={'diengiai'}>
                        {/* rules={[{ required: true, message: 'Thi???u di???n gi???i' }]} */}
                        <Input.TextArea name='diengiai' value={''} disabled={isCreate || onDisabled ? true : false} onChange={(e) => {
                            setFormValues({ ...formValues, diengiai: e.target.value })
                            // setValueProps({...valueprops, [e.target.name]: e.target.value});
                        }} />
                    </Form.Item>
                    <div className="tab-container">
                        {renderTab(breadCrumbKey)}
                    </div>
                    <Space>
                        <PlusOutlined onClick={addNewLine} />Th??m d??ng m???i
                    </Space>
                    <FormFooter tongTien={tongTien} />
                </Form>
            </div>

        </div>
    )
};
export default FormAddNew;
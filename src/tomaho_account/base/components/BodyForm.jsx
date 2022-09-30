// import '../../../styles/bodyform.scss'
// import { Form, DatePicker, Input, Row, Col, Select } from "antd";
// import FieldChar from "./FieldChar";
// import moment from 'moment';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectIsAddNew } from '../models/Menu/menu.selector';
// import ListHead from './ListHead';
// import { useEffect, useState } from 'react';
// import { v4 as uuidv4 } from 'uuid'
// import { selectDataBanHang, selectFormBanHang, selectIdEdit, selectIsCreate, selectIsEdit, selectIsUpdate } from '../models/banhangreducer/banhang.selector';
// import { BANHANG_ACTION_TYPES } from '../controllers/banhang.types';

// // const selectCurrency = [
// //     { id: 1, value: 'VND' }
// // ]

// const BodyForm = () => {
//     const { Option } = Select;
//     const donbanhang = {
//         sochungtu: uuidv4(),
//         sohoadon: '',
//         kituhoadon: '',
//         khachhang: '',
//         ngaychungtu: moment(),
//         ngayhachtoan: moment(),
//         loaitien: 'VND',
//         tigia: '1',
//         diengiai: '',
//         chitietphatsinh: []
//     }
//     const dispatch = useDispatch();
//     const isCreate = useSelector(selectIsCreate);
//     const [formValues, setFormValues] = useState(donbanhang);
//     const isAdNew = useSelector(selectIsAddNew);
//     const [form] = Form.useForm();
//     const isUpdate = useSelector(selectIsUpdate);
//     const isEdit = useSelector(selectIsEdit);
//     const dataBanHang = useSelector(selectDataBanHang);
//     const handleFinish = () => {
//         dispatch({
//             type: BANHANG_ACTION_TYPES.UPDATE_IS_UPDATE,
//             payload: true
//         })
//         dispatch({
//             type: BANHANG_ACTION_TYPES.UPDATE_FORM_BANHANG,
//             payload: formValues
//         })
//         dispatch({
//             type: BANHANG_ACTION_TYPES.UPDATE_IS_CREATE,
//             payload: true
//         })
//         if(isCreate && !isEdit && isAdNew) {
//             dispatch({
//                 type: BANHANG_ACTION_TYPES.UPDATE_FORM_BANHANG,
//                 payload: formValues
//             })
//         }
//     }
//     const [dataEditRender, setDataEditRender] = useState([]);
//     const idUpdate = useSelector(selectIdEdit) || '/';
//     useEffect(() => {
//         if(isEdit && dataEditRender && idUpdate) {
//             form.setFieldsValue({
//                 sohoadon: dataEditRender.sohoadon,
//                 kituhoadon: dataEditRender.kituhoadon,
//                 ngaychungtu: dataEditRender.ngaychungtu,
//                 ngayhachtoan: dataEditRender.ngayhachtoan,
//                 khachhang: dataEditRender.khachhang,
//                 loaitien: dataEditRender.loaitien,
//                 tigia: dataEditRender.tigia,
//                 diengiai: dataEditRender.diengiai
//             })
//         }
//     }, [dataEditRender])
//     useEffect(() => {
//         findDonBanHangEdit(idUpdate);
//     }, [idUpdate])
//     const findDonBanHangEdit = (idEdit) => {
//         return setDataEditRender(dataBanHang.find(item => item.sochungtu === idEdit));
//     }

//     // const defaultValueProps = {
//     //     sohoadon: '',
//     //     kituhoadon: '',
//     //     diengiai: ''
//     // }
//     // const [ valueprops, setValueProps ] = useState(defaultValueProps);
//     // const { sohoadon, kituhoadon, diengiai } = valueprops;
//     // console.log(valueprops)
//     const handleSave = () => {
//         dispatch({
//             type: BANHANG_ACTION_TYPES.UPDATE_FORM_BANHANG_EDIT,
//             payload: {...formValues, sochungtu: idUpdate}
//         })
//     }
//     return (
//         <div className="formaddnew-container">
//             <Form onFinish={handleFinish} form={form} id='myForm' onValuesChange={handleSave} >
//                 {
//                     isAdNew ? <ListHead /> : null
//                 }
//                 <Row gutter={10}>
//                     <Col span={8}>
//                         <Form.Item label="Số chứng từ" name={'sochungtu'}>
//                             <FieldChar value={isEdit ? dataEditRender.sochungtu : ''} disabled='true' />
//                         </Form.Item>
//                     </Col>
//                     <Col span={8}>
//                         <Form.Item label="Số hoá đơn" name={'sohoadon'} >
//                             <FieldChar name='sohoadon' value={isEdit ? dataEditRender.sohoadon : ''} disabled={isCreate && !isEdit ? true : false} onChange={(e) => { 
//                                 setFormValues({ ...formValues, sohoadon: e.target.value })
//                                 // setValueProps({...valueprops, [e.target.name]: e.target.value});
//                                 }} />
//                                 {/* <Input value={isEdit ? dataEditRender.sohoadon : ''} disabled={isCreate ? true : false} onChange={(e) => { 
//                                 setFormValues({ ...formValues, sohoadon: e.target.value })
//                                 }} /> */}
//                         </Form.Item>
//                         {/* <Form.Item shouldUpdate={(prevValues, curValues) => prevValues.sohoadon !== curValues.sohoadon}>
//                             {() => {
//                                 return (
//                                     <Form.Item label="Số hoá đơn" name={'sohoadon'} >
//                                         <FieldChar name='sohoadon' value={isEdit ? dataEditRender.sohoadon : ''} disabled={isCreate ? true : false} onChange={(e) => setFormValues({ ...formValues, sohoadon: e.target.value })} />
//                                     </Form.Item>
//                                 );
//                             }}
//                         </Form.Item> */}
//                     </Col>
//                     <Col span={8}>
//                         <Form.Item label="Kí tự hoá đơn" name={'kituhoadon'}>
//                             <FieldChar name='kituhoadon' value={isEdit ? dataEditRender.kituhoadon : ''} disabled={isCreate && !isEdit ? true : false} onChange={(e) => {
//                                 setFormValues({ ...formValues, kituhoadon: e.target.value })
//                                 // setValueProps({...valueprops, [e.target.name]: e.target.value});
//                                 }} />
//                         </Form.Item>
//                     </Col>
//                 </Row>
//                 <Row gutter={10}>
//                     <Col span={8}>
//                         <Row gutter={10}>
//                             <Col span={12}>
//                                 <Form.Item label="Ngày chứng từ (*)" name={'ngaychungtu'}>
//                                     <DatePicker name='ngaychungtu' value={isEdit ? dataEditRender.ngaychungtu : ''} disabled={isCreate && !isEdit  ? true : false} id='ngaychungtu' format={'YYYY/MM/DD'} defaultValue={moment()} style={{ width: '100%' }} onChange={(e) => { setFormValues({ ...formValues, ngaychungtu: e }) }} />

//                                 </Form.Item>
//                             </Col>
//                             <Col span={12}>
//                                 <Form.Item label="Ngày hoạch toán (*)" name={'ngayhoachtoan'}>
//                                     <DatePicker name='ngayhoachtoan' value={isEdit ? dataEditRender.ngayhachtoan : ''} disabled={isCreate && !isEdit ? true : false} id='ngayhoactoan' format={'YYYY/MM/DD'} defaultValue={moment()} style={{ width: '100%' }} onChange={(e) => { setFormValues({ ...formValues, ngaychungtu: e }) }} />

//                                 </Form.Item>
//                             </Col>
//                         </Row>
//                     </Col>
//                     <Col span={8}>
//                         <Form.Item disabled={isCreate && !isEdit ? true : false} label="Khách hàng (*)" name={'khachhang'} >
//                             <Select
//                                 showSearch
//                                 style={{
//                                     width: '100%',
//                                 }}
//                                 onChange={(e) => setFormValues({ ...formValues, khachhang: e })}
//                                 disabled={isCreate && !isEdit ? true : false}
//                             >
//                                 <Option name='khachhang' value={isEdit && !isEdit ? dataEditRender.khachhang : 'Toan'} >Toan</Option>

//                             </Select>
//                         </Form.Item>
//                     </Col>
//                     <Col span={8}>
//                         <Row gutter={10}>
//                             <Col span={12}>
//                                 <Form.Item label="Loại tiền" name={'loaitien'}>
//                                     {/* <FieldSelect arrOptions={selectCurrency} disabled='true' /> */}
//                                     <Select disabled={true} showSearch={true} defaultValue='VND' >
//                                         <Option name='loaitien' value='VND'>VND</Option>
//                                     </Select>
//                                 </Form.Item>
//                             </Col>
//                             <Col span={12}>
//                                 <Form.Item label="Tỉ giá" name={'tigia'}>
//                                     <Input name='tigia' disabled={true} prefix={1} style={{ width: '100%' }} />
//                                 </Form.Item>
//                             </Col>
//                         </Row>
//                     </Col>
//                 </Row>
//                 <Form.Item label="Diễn giải (*)" name={'diengiai'}>
//                     <Input.TextArea name='diengiai' value={isEdit && !isEdit ? dataEditRender.diengiai : ''} disabled={isCreate ? true : false} onChange={(e) => {
//                         setFormValues({ ...formValues, diengiai: e.target.value })
//                         // setValueProps({...valueprops, [e.target.name]: e.target.value});
//                         }} />
//                 </Form.Item>
//             </Form>
//         </div>
//     )
// };
// //rules={[{required: true}]}

// export default BodyForm;

/*
    pls no touch this
*/
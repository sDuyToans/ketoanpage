import { Button, Form, Input } from "antd";
import FieldChar from "./FieldChar";
import { SearchOutlined, ReloadOutlined, PlusCircleOutlined, CloseOutlined, EditOutlined, CheckCircleOutlined, SaveOutlined } from '@ant-design/icons'
import FieldSelect from "./FieldSelect";
import '../../../styles/siderbar/listhead.scss'
import { useDispatch, useSelector } from "react-redux";
import { selectIsAddNew } from "../models/Menu/menu.selector";
import { ACCOUNT_ACTION_TYPES } from "../controllers/account.types";
import { BANHANG_ACTION_TYPES } from "../controllers/banhang.types";
import { selectDataBanHang, selectIdEdit, selectIsCreate, selectIsEdit, selectIsSave, selectIsSearch, selectKHCT } from "../models/banhangreducer/banhang.selector";
import { AUTH_ACTIONS_TYPES } from "../../../tomaho_auth/controllers/auth.types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const arrOptions = [
    { id: 1, value: 'Tất cả' },
    { id: 2, value: 'Ghi sổ' },
    { id: 3, value: 'Chưa ghi sổ' },
    { id: 4, value: 'Huỷ chứng từ' }
]

const ListHead = ({ formValues, arrNewLine, setSave, setKichHoatChungTu, activeTrangThai }) => {
    const idEdit = useSelector(selectIdEdit);
    const [form] = Form.useForm();
    const dataDefault = useSelector(selectDataBanHang);
    const idUpdate = useSelector(selectIdEdit);
    const addNew = useSelector(selectIsAddNew);
    const isCreate = useSelector(selectIsCreate);
    const isEdit = useSelector(selectIsEdit);
    const dataBanHang = useSelector(selectDataBanHang);
    const dispatch = useDispatch();
    const hanldeAddNew = () => {
        dispatch({ type: ACCOUNT_ACTION_TYPES.UPDATE_IS_ADDNEW, payload: !addNew })
        dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_IS_CREATE, payload: false })
        // console.log('123')
        setSave(true)
    }
    const resetField = () => {
        form.resetFields();
        dispatch({
            type: BANHANG_ACTION_TYPES.UPDATE_RETURN_VALUESEARCH,
            payload: dataDefault
        })
    }
    const handleFinish = () => {
        dispatch({
            type: BANHANG_ACTION_TYPES.UPDATE_SEARCHKEY,
            payload: form.getFieldValue()
        })
        dispatch({
            type: BANHANG_ACTION_TYPES.UPDATE_IS_SEARCH,
            payload: true
        })
    }
    const onChangeHanlde = (value) => {
        dispatch({
            type: BANHANG_ACTION_TYPES.UPDATE_SELECT_VALUE,
            payload: value
        })
        dispatch({
            type: BANHANG_ACTION_TYPES.UPDATE_IS_SEARCH,
            payload: true
        })
    }
    let dataClone = [];
    useEffect(() => {
        dataClone = dataDefault;
    }, [dataDefault])
    const editHanlde = () => {
        dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_IS_CREATE, payload: false });
        dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_IS_EDIT, payload: true });
        dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_ONDISABLED, payload: false })
        dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_IS_SAVE, payload: true });
        dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_ID_EDIT, payload: formValues.sochungtu })
        setSave(true)
        // dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_KHCT, payload: false})
        // dispatch({
        //     type: BANHANG_ACTION_TYPES.UPDATE_ID_EDIT,
        //     payload: dataDefault[dataDefault.length - 1].sochungtu
        // })
    }
    // const handleSave = () => {
    //     dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_IS_CREATE, payload: true });
    //     dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_IS_EDIT, payload: false });
    //     dispatch({ type: ACCOUNT_ACTION_TYPES.UPDATE_IS_ADDNEW, payload: true });
    //     dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_WILL_DATA_UPDATE, payload: true })
    //     dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_FORM_BANHANG_EDIT, payload: formValues })
    //     dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_FORM_BANHANG_CTPS_EDIT, payload: { newArr: arrNewLine, id: idUpdate } })
    //     dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_SEARCHKEY, payload: '' });
    // }
    const [ghiSo, setGhiSo] = useState(false);
    const handleGhiSo = () => {
        dispatch({
            type: BANHANG_ACTION_TYPES.UPDATE_GHI_SO,
            payload: formValues.sochungtu
        })
        setGhiSo(true);
        activeTrangThai(formValues.sochungtu)
    }
    const handleHuyCT = () => {
        setKichHoatChungTu(true);
        if (idUpdate) {
            dispatch({
                type: BANHANG_ACTION_TYPES.UPDATE_HUY_CHUNG_TU,
                payload: idUpdate
            })
        } else {
            dispatch({
                type: BANHANG_ACTION_TYPES.UPDATE_HUY_CHUNG_TU,
                payload: dataDefault[dataDefault.length - 1].sochungtu
            })
        }
        activeTrangThai(formValues.sochungtu);
    }
    const KHCT = useSelector(selectKHCT);
    // console.log(KHCT)
    const handleKichHoatChungTu = (id) => {
        // console.log(id)
        dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_CHUA_GHISO, payload: id })
        dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_KHCT, payload: true });
        dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_IS_CREATE, payload: true });
        setKichHoatChungTu(false);
        activeTrangThai(formValues.sochungtu)
    }
    const [boGhiSo, setBoGhiSo] = useState(false);
    const handleBoGhiso = (id) => {
        setBoGhiSo(true);
        setGhiSo(false)
        setKichHoatChungTu(false);
        dispatch({ type: BANHANG_ACTION_TYPES.UPDATE_CHUA_GHISO, payload: id })
        activeTrangThai(id)
    }
    const checkDataEditToRenderButton = (idEdit) => {
        for (const data of dataBanHang) {
            if (data.sochungtu === idEdit) {
                // console.log(data)
                switch (data.trangthai) {
                    case 'Ghi sổ':
                        // console.log(data.trangthai)
                        return (
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <div className="button-together" style={{ display: 'flex', gap: '10px' }}>
                                    <Button style={{ backgroundColor: '#c43e1b' }} onClick={() => handleBoGhiso(data.sochungtu)}><SaveOutlined />Bỏ ghi sổ</Button>
                                    <Button disabled={true}><CloseOutlined />Xuất kho</Button>
                                </div>
                                <div className="right-listhead">
                                    <ul style={{ display: 'flex', gap: '5px', listStyle: 'none' }}>
                                        <li className='chua-ghi-so' style={{  padding: '5px 15px' }}>Chưa ghi sổ</li>
                                        <li className='ghi-so active' style={{  padding: '5px 15px' }}>Ghi sổ</li>
                                        <li className='huy-chung-tu' style={{  padding: '5px 15px' }}>Huỷ chứng từ</li>
                                    </ul>
                                </div>
                            </div>
                        )
                    case 'Chưa ghi sổ':
                        // console.log(data.trangthai)
                        return (
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <div className="button-together" style={{ display: 'flex', gap: '10px' }}>
                                    <Button onClick={editHanlde} style={{ backgroundColor: '#c43e1b' }}><EditOutlined />Sửa</Button>
                                    <Button onClick={handleGhiSo} style={{ backgroundColor: '#c43e1b' }}><CheckCircleOutlined />Ghi sổ</Button>
                                    <Button onClick={handleHuyCT}><CloseOutlined />Huỷ chứng từ</Button>
                                </div>
                                <div className="right-listhead">
                                    <ul style={{ display: 'flex', gap: '5px', listStyle: 'none' }}>
                                        <li className='chua-ghi-so active' style={{  padding: '5px 15px' }}>Chưa ghi sổ</li>
                                        <li className='ghi-so' style={{  padding: '5px 15px' }}>Ghi sổ</li>
                                        <li className='huy-chung-tu' style={{  padding: '5px 15px' }}>Huỷ chứng từ</li>
                                    </ul>
                                </div>
                            </div>
                        )
                    case 'Huỷ chứng từ':
                        // console.log(data.trangthai)
                        return (
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <Button onClick={() => handleKichHoatChungTu(data.sochungtu)}><CloseOutlined />Kích hoạt chứng từ</Button>
                                <ul style={{ display: 'flex', gap: '5px', listStyle: 'none' }}>
                                    <li className='chua-ghi-so' style={{  padding: '5px 15px' }}>Chưa ghi sổ</li>
                                    <li className='ghi-so' style={{  padding: '5px 15px' }}>Ghi sổ</li>
                                    <li className='huy-chung-tu active' style={{  padding: '5px 15px' }}>Huỷ chứng từ</li>
                                </ul>
                            </div>
                        )
                    default:
                        return (
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <div className="button-together" style={{ display: 'flex', gap: '10px' }}>
                                    <Button onClick={editHanlde} style={{ backgroundColor: '#c43e1b' }}><EditOutlined />Sửa</Button>
                                    <Button onClick={handleGhiSo} style={{ backgroundColor: '#c43e1b' }}><CheckCircleOutlined />Ghi sổ</Button>
                                    <Button onClick={handleHuyCT}><CloseOutlined />Huỷ chứng từ</Button>
                                </div>
                                <div className="right-listhead">
                                    <ul style={{ display: 'flex', gap: '5px', listStyle: 'none' }}>
                                        <li className='chua-ghi-so' style={{  padding: '5px 15px' }}>Chưa ghi sổ</li>
                                        <li className='ghi-so' style={{  padding: '5px 15px' }}>Ghi sổ</li>
                                        <li className='huy-chung-tu' style={{  padding: '5px 15px' }}>Huỷ chứng từ</li>
                                    </ul>
                                </div>
                            </div>
                        )
                }
            }
        }
    }
    const isSave = useSelector(selectIsSave);
    const handleHuyTao = () => {
        dispatch({ type: ACCOUNT_ACTION_TYPES.UPDATE_IS_ADDNEW, payload: false })
    }
    const [disableSearchIcon, setDisableSearchIcon] = useState(true);
    const handleSearch = (e) => {
        if (e.target.value !== '') {
            setDisableSearchIcon(false);
        }
        else setDisableSearchIcon(true)
    }
    return (
        <div className='listhead-container' style={addNew ? { justifyContent: 'flex-start', padding: '5px' } : { justifyContent: 'space-between', padding: '5px' }}>
            {
                ghiSo
                    ?
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <div className="button-together" style={{ display: 'flex', gap: '10px' }}>
                            <Button style={{ backgroundColor: '#c43e1b' }} onClick={() => handleBoGhiso(formValues.sochungtu)}><SaveOutlined />Bỏ ghi sổ</Button>
                            <Button disabled={true}><CloseOutlined />Xuất kho</Button>
                        </div>
                        <div className="right-listhead">
                            <ul style={{ display: 'flex', gap: '5px', listStyle: 'none' }}>
                                <li className='chua-ghi-so' style={{  padding: '5px 15px' }}>Chưa ghi sổ</li>
                                <li className='ghi-so' style={{  padding: '5px 15px' }}>Ghi sổ</li>
                                <li className='huy-chung-tu' style={{  padding: '5px 15px' }}>Huỷ chứng từ</li>
                            </ul>
                        </div>
                    </div>
                    :
                    boGhiSo
                        ?
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <div className="button-together" style={{ display: 'flex', gap: '10px' }}>
                                <Button onClick={editHanlde} style={{ backgroundColor: '#c43e1b' }}><EditOutlined />Sửa</Button>
                                <Button onClick={handleGhiSo} style={{ backgroundColor: '#c43e1b' }}><CheckCircleOutlined />Ghi sổ</Button>
                                <Button onClick={handleHuyCT}><CloseOutlined />Huỷ chứng từ</Button>
                            </div>
                            <div className="right-listhead">
                                <ul style={{ display: 'flex', gap: '5px', listStyle: 'none' }}>
                                    <li className='chua-ghi-so' style={{  padding: '5px 15px' }}>Chưa ghi sổ</li>
                                    <li className='ghi-so' style={{  padding: '5px 15px' }}>Ghi sổ</li>
                                    <li className='huy-chung-tu' style={{  padding: '5px 15px' }}>Huỷ chứng từ</li>
                                </ul>
                            </div>
                        </div>
                        :
                        KHCT
                            ? <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <div className="button-together" style={{ display: 'flex', gap: '10px' }}>
                                    <Button onClick={editHanlde} style={{ backgroundColor: '#c43e1b' }}><EditOutlined />Sửa</Button>
                                    <Button onClick={handleGhiSo} style={{ backgroundColor: '#c43e1b' }}><CheckCircleOutlined />Ghi sổ</Button>
                                    <Button onClick={handleHuyCT}><CloseOutlined />Huỷ chứng từ</Button>
                                </div>
                                <div className="right-listhead">
                                    <ul style={{ display: 'flex', gap: '5px', listStyle: 'none' }}>
                                        <li className='chua-ghi-so active' style={{  padding: '5px 15px' }}>Chưa ghi sổ</li>
                                        <li className='ghi-so' style={{  padding: '5px 15px' }}>Ghi sổ</li>
                                        <li className='huy-chung-tu' style={{  padding: '5px 15px' }}>Huỷ chứng từ</li>
                                    </ul>
                                </div>
                            </div>
                            :
                            isEdit
                                ? checkDataEditToRenderButton(idUpdate)
                                // :
                                // isEdit && !isCreate && isSave
                                //     ?
                                //     <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                //         <div className="button-together" style={{ display: 'flex', gap: '10px' }}>
                                //             <Button htmlType="submit" onClick={handleSave} style={{ backgroundColor: '#c43e1b' }}><SaveOutlined />Lưu</Button>
                                //             <Button><CloseOutlined />Huỷ</Button>
                                //         </div>
                                //         <div className="right-listhead">
                                //             <ul style={{ display: 'flex', gap: '5px', listStyle: 'none' }}>
                                //                 <li style={{  padding: '5px 15px' }}>Chưa ghi sổ</li>
                                //                 <li style={{  padding: '5px 15px' }}>Ghi sổ</li>
                                //                 <li style={{  padding: '5px 15px' }}>Huỷ chứng từ</li>
                                //             </ul>
                                //         </div>
                                //     </div>
                                :
                                isCreate && !isEdit
                                    ? <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                        <div className="button-together" style={{ display: 'flex', gap: '10px' }}>
                                            <Button onClick={editHanlde} style={{ backgroundColor: '#c43e1b' }}><EditOutlined />Sửa</Button>
                                            <Button onClick={handleGhiSo} style={{ backgroundColor: '#c43e1b' }}><CheckCircleOutlined />Ghi sổ</Button>
                                            <Button onClick={handleHuyCT}><CloseOutlined />Huỷ chứng từ</Button>
                                        </div>
                                        <div className="right-listhead">
                                            <ul style={{ display: 'flex', gap: '5px', listStyle: 'none' }}>
                                                <li className='chua-ghi-so active' style={{  padding: '5px 15px' }}>Chưa ghi sổ</li>
                                                <li className='ghi-so' style={{  padding: '5px 15px' }}>Ghi sổ</li>
                                                <li className='huy-chung-tu' style={{  padding: '5px 15px' }}>Huỷ chứng từ</li>
                                            </ul>
                                        </div>
                                    </div>
                                    :
                                    !addNew && !isCreate & !isEdit
                                        ? <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div className="button_add">
                                                <Button type="primary" danger onClick={hanldeAddNew} style={{ borderRadius: '5px' }}>
                                                    + Thêm mới
                                                </Button>
                                            </div>
                                            <div className="right-listhead">
                                                <Form form={form} onFinish={handleFinish} style={{ display: 'flex', gap: '5px', alignItems: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
                                                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                                        <Form.Item name={'searchData'}>
                                                            <Input onChange={(e) => handleSearch(e)} />
                                                        </Form.Item>
                                                        <Form.Item>
                                                            <FieldSelect arrOptions={arrOptions} onChangeHandle={onChangeHanlde} />
                                                        </Form.Item>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '5px' }}>
                                                        <Button disabled={disableSearchIcon ? true : false} type="button" onClick={resetField}>
                                                            <ReloadOutlined />
                                                        </Button>
                                                        <Button disabled={disableSearchIcon ? true : false} type="primary" htmlType="submit" style={{ backgroundColor: '#c43e1b', borderColor: '#c43e1b' }}>
                                                            <SearchOutlined />
                                                        </Button>
                                                    </div>
                                                </Form>
                                            </div>
                                        </div>
                                        : <div style={{ display: 'flex', gap: '10px' }}>
                                            <div className="button_add">
                                                <Button type="primary" htmlType="submit" style={{ backgroundColor: '#c43e1b' }}>
                                                    <PlusCircleOutlined /> Tạo
                                                </Button>
                                            </div>
                                            <div className="button_huytao" >
                                                <Button onClick={handleHuyTao}>
                                                    <CloseOutlined />Huỷ Tạo
                                                </Button>
                                            </div>
                                        </div>
            }
        </div>
    )
};

export default ListHead;
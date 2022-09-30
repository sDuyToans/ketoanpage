import '../../styles/login.scss'
import { Form, Input, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_ACTIONS_TYPES } from '../controllers/auth.types';
import { selectErrorLogin } from '../models/authSelector';


const LogIn = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [isEmpty, setIsEmpty] = useState([]);
    const handleChange = (e) => {
        setIsEmpty(e.target.value);
    }
    const handleFinish = (values) => {
        dispatch({ type: AUTH_ACTIONS_TYPES.LOGIN, payload: values })
        form.resetFields();
    }
    const selectError = useSelector(selectErrorLogin);
    const messageFailLogin = (msg) => {
        if (msg == null) {
            return;
        } else {
            message.error(msg);
            dispatch({
                type: AUTH_ACTIONS_TYPES.UPDATE_ERROR_LOGIN,
                payload: null
            })
        }
    }
    useEffect(() => {
        if (selectError !== null) {
            messageFailLogin(selectError)
        }
    }, [selectError])
    return (
        <div className="login-container">
            <div className="main-login">
                <div className="login-form">
                    <Form form={form} onFinish={handleFinish} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <h2>Đăng nhập</h2>
                        <Form.Item name={'email'} rules={[{ required: true, message: 'Email không thể để trống!' }, { type: 'email', message: 'Email vừa nhập không đúng quy định!' }]}>
                            <Input placeholder='Vui lòng nhâp email' onChange={handleChange} style={{ width: 250 }}/>
                        </Form.Item>
                        <Button type="primary" htmlType="submit" disabled={isEmpty === '' ? true : false}>
                            Đăng nhập
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
};
export default LogIn;
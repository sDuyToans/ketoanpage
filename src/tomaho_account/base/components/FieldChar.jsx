import { Input } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectDisabled } from "../models/banhangreducer/banhang.selector";
const FieldChar = ({ disabled = false, prefix,  name, onChange, id, value, defaultValue }) => {
    return (
        <Input defaultValue={defaultValue}  disabled={disabled} prefix={prefix} value={value}  style={{ width: '100%' }} onChange={onChange} name={name} id={id}/>
    )
};

export default FieldChar;
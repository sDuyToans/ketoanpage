import { InputNumber } from "antd";
const FieldNumber = ({onChange, disabled, value, defaultValue}) =>{
    return (
        <InputNumber defaultValue={defaultValue} value={value} disabled={disabled} min={0} style={{width: '100%'}} onChange={onChange}/>
    )
};

export default FieldNumber;
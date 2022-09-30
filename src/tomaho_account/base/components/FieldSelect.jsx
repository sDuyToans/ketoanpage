import { Select } from "antd";
import { useState } from "react";

const { Option } = Select;

// const handleChange = (value) => {
//   console.log(`selected ${value}`);
// };
const renderOption = (arrOptions) => {

  return arrOptions.map((item, index) => {
    return <Option value={item.value}>{item.value}</Option>
  })
}

const FieldSelect = ({ arrOptions, disabled = false, showSearch = false, onChangeHandle }) => {
  const defaultValue = arrOptions[0].value;
  return (
    <>
      <Select
        showSearch={showSearch}
        disabled={disabled}
        defaultValue={defaultValue? defaultValue: ''}
        style={{
          width: '100%'
        }}
        onChange={onChangeHandle}
      >
        {
          arrOptions && arrOptions.length > 0
          ? 
          renderOption(arrOptions)
          : null
        }
      </Select>
    </>
  )
};


export default FieldSelect;
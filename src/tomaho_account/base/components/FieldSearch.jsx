import { Select } from "antd";
const FieldSearch = ({ options, style }) => {
    const { Option } = Select;
    return (
        <>
            <Select
                showSearch
                style={style}
                filterOption={(inputValue, option) =>
                    option.children.join('').toLowerCase().includes(inputValue.toLowerCase())
                }>

                    { 
                        options && options.length > 0 
                        ? options.map((item, index) => (
                            <Option key={index}>{item.name}</Option>
                        ))
                        : null
                    }
            </Select>
        </>
    )
}
export default FieldSearch
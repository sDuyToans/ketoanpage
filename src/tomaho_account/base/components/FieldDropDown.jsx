import { Dropdown, Menu, Space } from "antd";
import { DownOutlined } from '@ant-design/icons';
const MoneyDataMenu = (
    <Menu items={[{ label: 'VND', key: '1' }]} />
)
const menu = (
    <Menu
        items={[
            {
                label: <a href="https://www.antgroup.com">1st menu item</a>,
                key: '0',
            },
            {
                label: <a href="https://www.aliyun.com">2nd menu item</a>,
                key: '1',
            },
            {
                type: 'divider',
            },
            {
                label: '3rd menu item',
                key: '3',
            },
        ]}
    />
);
const FieldDropDown = () => {
    return (
        <Dropdown overlay={menu} trigger={['click]']}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    )
}

export default FieldDropDown;
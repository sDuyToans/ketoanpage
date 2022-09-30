import { Menu} from 'antd';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import '../../../styles/siderbar/sidebar.scss'
import { selectSideBar } from '../models/Menu/menu.selector';

const MenuSidebar = () => {
  // const navigate = useNavigate();
  const menuList = useSelector(selectSideBar);
  // const handleNav = (link) => {
  //   return navigate(`${link}`)
  // }
  const renderMenuSideBar = () => {
    return menuList.map((item, index) => {
      return (
        <>
          <div className="menu-title">
            <span>{item.label}</span>
          </div>
          <div className="menu-select">
            <Menu style={{ backgroundColor: 'rgb(196, 62, 27)' }}>
              { item.items.map(item => {
                return (
                  <Menu.Item key={item.id.toString()} style={{color: '#fff'}}>
                      {item.des}
                  </Menu.Item>
                )
              })}
            </Menu>
          </div>
          <Outlet/>
        </>
      )
    })
  }
  return (
    <div className="menusidebar-container">
      {/* <div className="menu-title">
        <span>Title</span>
      </div>
      <div className="menu-select">
        <Menu style={{ backgroundColor: 'rgb(196, 62, 27)' }}>
          <Menu.Item key='1'>
            Bán hàng
          </Menu.Item>
          <Menu.Item key='2'>
            Mua hàng
          </Menu.Item>
          <Menu.Item key='3'>
            Quỹ
          </Menu.Item>
          <Menu.Item key='4'>
            Ngân Hàng
          </Menu.Item>
          <Menu.Item key='5'>
            Kho
          </Menu.Item>
        </Menu> */}
        {renderMenuSideBar()}
        {/* <Outlet/> */}
    </div>
  )
};
export default MenuSidebar;

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";

import RouteBanHang from "./tomaho_account/account/components/BanHang/HoldRouteBanHang";

import MenuSideBar from "./tomaho_account/base/components/Menu";
import SiderOne from "./tomaho_account/base/components/Menu/SiderOne";
import { selectIsLogin } from "./tomaho_auth/models/authSelector";
import LogIn from "./tomaho_auth/pages/login";
// import SiderOne from "./tomaho_account/base/components/Menu/SiderOne";


function App() {
  const isLogin = useSelector(selectIsLogin);
  const navigate = useNavigate();
  useEffect(() => {
    if(isLogin) {
      navigate('/sell');
    } else navigate('/login')
  }, [isLogin])
  return (
    <Routes>
          <Route Route path = "" element = {< SiderOne />}>
              <Route path="" element={<MenuSideBar />} />
              <Route path="/sell" element={<RouteBanHang />} />
              <Route path="/login" element={<LogIn />} />
          </Route >
    </Routes >
  );
}

export default App;

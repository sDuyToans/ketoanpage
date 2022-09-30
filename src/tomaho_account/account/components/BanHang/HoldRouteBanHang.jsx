import { Route, Routes } from "react-router-dom";
import MenuSidebar from "../../../base/components/Menu";
import BanHangNav from "./BanHangNav";
import DonBanHang from "./DonBanHang/DonBanHang";

const RouteBanHang = () => {
    return (
        <div className="holdroute" style={{display: 'flex'}}>
            <MenuSidebar />
            <DonBanHang />
        </div>
    )
}
export default RouteBanHang;
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";

export default function MasterLayout() {
  return <>
  <div className="Navbar">

  <Navbar/>
  </div>
  <div className="d-flex ">
    <div className="sidebar-container  d-none d-lg-block">
      <SideBar/>
    </div>
    <div className="main-Content w-100 m-3 rounded-2 overflow-auto pageOverflow vh-100">
      <Outlet/>
    </div>
  </div>
  </>
}

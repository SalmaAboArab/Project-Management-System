import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";

export default function MasterLayout({loginData}:any) {
  return <>
  <div className="Navbar ">

  <Navbar loginData={loginData}/>
  </div>
  <div className="d-flex">
    <div className="sidebar-container ">
      <SideBar/>
    </div>
    <div className="main-Content w-100 vh-100 overflow-auto pageOverflow">
      <Outlet/>
    </div>
  </div>
  </>
}

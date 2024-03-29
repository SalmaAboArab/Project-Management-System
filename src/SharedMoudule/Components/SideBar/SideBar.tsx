import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import "./SideBar.css";
import {  useContext, useState } from "react";
import menu from '../../../assets/menu.png'
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/Components/AuthContext.js";

export default function SideBar() {
  const [handleSidebar, setHandleSidebar] = useState(false);
  const {userRole}:any=useContext(AuthContext)
  const navigate=useNavigate();

  function toggleCollapse() {
    setHandleSidebar(!handleSidebar);
  }
  
  const logout=()=>{
    localStorage.clear();
    toast.success('BYE BYE 🙁')
    navigate('/');
  }

  return (
    <>
      <div>

        <Sidebar
          collapsed={!handleSidebar}
          className=" container sidebar-container  vh-100 position-relative"
        >
          <div
            onClick={toggleCollapse}
            className="collapsed-btn position-absolute"
          >
            <span className="collapsed-btn ps-1 pe-3 py-2 rounded-2">
              {!handleSidebar ? (
                <i className="fa-solid fa-chevron-left text-white"></i>
              ) : (
                <i className="fa-solid fa-chevron-right text-white"></i>
              )}
            </span>
          </div>
          <Menu className="mt-5 mx-auto ">
            <MenuItem
              icon={<i className="  fa-solid fa-house me-3" ></i>}
              component={<Link to={"/dashboard"} />}
            >
              Home
            </MenuItem>
            <MenuItem
              icon={<i className="fa fa-users me-3" ></i>}
              component={<Link to={"/dashboard/users"} />}
            >
              users
            </MenuItem>
            <MenuItem
              // icon={<i className="   fa-solid fa-briefcase" ></i>}
              icon={<img src={menu} className=" me-3"/>}
              component={<Link to={"/dashboard/projects"} />}
            >
              Projects
            </MenuItem>
            {userRole=='Manager'?
            <MenuItem
            icon={<i className="   fa-solid fa-list-check me-3" ></i>}
            component={<Link to={"/dashboard/tasks"} />}
          >
            
            Tasks
          </MenuItem>:''}
            
            {userRole=='Employee'?
            <MenuItem
            icon={<i className="   fa-solid fa-list-check me-3" ></i>}
            component={<Link to={"/dashboard/tasks-board"} />}
          >
            
            Tasks Board
          </MenuItem>:''}

            <MenuItem
              
              icon={<i className="fa-solid fa-unlock-keyhole me-3"></i>}
              component={<Link to={"change-password"} />}
            >
              ChangePassword
              {/* <span className="fs-6">ChangePassword</span> */}
            </MenuItem>

            <MenuItem
              icon={<i className="fa fa-arrow-right-from-bracket  me-3" ></i>}
              onClick={logout}
            >
              
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}

import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "./SideBar.css";
import { useState } from "react";
import menu from '../../../assets/menu.png'
export default function SideBar() {
  const [handleSidebar, setHandleSidebar] = useState(false);

  function toggleCollapse() {
    setHandleSidebar(!handleSidebar);
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
          <Menu className="mt-5   mx-auto ">
            <MenuItem
              icon={<i className="  fa-solid fa-house " ></i>}
              component={<Link to={"/dashboard"} />}
            >
              Home
            </MenuItem>
            <MenuItem
              icon={<i className="fa fa-users" ></i>}
              component={<Link to={"/dashboard/UsersList"} />}
            >
              users
            </MenuItem>
            <MenuItem
              // icon={<i className="   fa-solid fa-briefcase" ></i>}
              icon={<img src={menu}/>}
              component={<Link to={"/dashboard/ProjectList"} />}
            >
              Projects
            </MenuItem>
            <MenuItem
              icon={<i className="   fa-solid fa-list" ></i>}
              component={<Link to={"/dashboard/TasksList"} />}
            >
              
              Tasks
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}

import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import "./SideBar.css";
import { useContext, useState } from "react";
import menu from "../../../assets/menu.png";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/Components/AuthContext.js";
import ChangePassword from "../../../AuthModule/Components/ChangePassword/ChangePassword";
import { ThemeContext, ITheme } from "../../../Context/Components/ThemeContext";
import Logout from "../Logout/Logout.js";
export default function SideBar() {
  const { toggleTheme, isDarkMode }:ITheme = useContext(ThemeContext);
  const [handleSidebar, setHandleSidebar] = useState(false);
  const { userRole }: any = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  const [showLogout, setShowLogout] = useState(false);

  const handleCloseLogout = () => setShowLogout(false);
  const handleShowLogout = () => setShowLogout(true);

  function toggleCollapse() {
    setHandleSidebar(!handleSidebar);
  }

  const logout = () => {
    localStorage.clear();
    toast.success("BYE BYE");
    navigate("/");
  };

  return (
    <>
      <Logout logout={logout}  handleCloseLogout={handleCloseLogout}  showLogout={showLogout}/>

      <ChangePassword show={show} handleClose={handleClose} />
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
              icon={<i className="  fa-solid fa-house me-3"></i>}
              component={<Link to={"/dashboard"} />}
            >
              Home
            </MenuItem>
            {userRole === "Manager" ?
            <MenuItem
              icon={<i className="fa fa-users me-3"></i>}
              component={<Link to={"/dashboard/users"} />}
            >
              Users
            </MenuItem>
            :""}
            <MenuItem
              // icon={<i className="   fa-solid fa-briefcase" ></i>}
              icon={<img src={menu} className=" me-3" />}
              component={<Link to={"/dashboard/projects"} />}
            >
              Projects
            </MenuItem>

            {userRole == "Employee" ? 
            (
              <MenuItem
                icon={<i className="   fa-solid fa-list-check me-3"></i>}
                component={<Link to={"/dashboard/tasks-board"} />}
              >
                Tasks Board
              </MenuItem>
            ) 
            : 
            (
              <MenuItem
                icon={<i className="   fa-solid fa-list-check me-3"></i>}
                component={<Link to={"/dashboard/tasks"} />}
              >
                Tasks
              </MenuItem>
            )
            }

            <MenuItem
              onClick={handleShow}
              icon={<i className="fa-solid fa-unlock-keyhole me-3"></i>}
            >
              ChangePassword
            </MenuItem>

             {<MenuItem
            onClick={toggleTheme}
            icon={
              isDarkMode === true ? (<i className="fa-solid fa-toggle-on me-1   fs-3"></i>) : (<i className="fa-solid fa-toggle-off me-1 fs-3"></i>)
            }
          >
            {
              isDarkMode === true ? ("Light theme") : ("Dark theme")
            }
          </MenuItem>} 


            <MenuItem
              icon={<i className="fa fa-arrow-right-from-bracket  me-1 text-warning "></i>}
              onClick={handleShowLogout}   >        
              <span className="text-warning">Logout</span>
            </MenuItem>
           
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}

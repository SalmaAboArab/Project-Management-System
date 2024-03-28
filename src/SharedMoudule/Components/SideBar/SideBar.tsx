import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import "./SideBar.css";
import { useContext, useState } from "react";
import menu from "../../../assets/menu.png";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/Components/AuthContext";
import ChangePassword from "../../../AuthModule/Components/ChangePassword/ChangePassword";
export default function SideBar() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [handleSidebar, setHandleSidebar] = useState(false);
  const { loginData }: any = useContext(AuthContext);

  const navigate = useNavigate();

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
            <span className="collapsed-btn ps-1 pe-3  py-2 rounded-2">
              {handleSidebar ? (
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
            {loginData?.userGroup === "Manager" ? (
              <>
                <MenuItem
                  icon={<i className="fa fa-users me-3"></i>}
                  component={<Link to={"/dashboard/users-list"} />}
                >
                  Users
                </MenuItem>
              </>
            ) : (
              ""
            )}

            <MenuItem
              icon={<img src={menu} className=" me-3" />}
              component={<Link to={"/dashboard/project-list"} />}
            >
              Projects
            </MenuItem>
            <MenuItem
              icon={<i className="   fa-solid fa-list-check me-3"></i>}
              component={<Link to={"/dashboard/tasks-list"} />}
            >
              Tasks
            </MenuItem>

            <MenuItem
              onClick={handleShow}
              icon={<i className="fa-solid fa-unlock-keyhole me-3"></i>}
            >
              ChangePassword
            </MenuItem>

            <MenuItem
              icon={<i className="fa fa-arrow-right-from-bracket  me-3"></i>}
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

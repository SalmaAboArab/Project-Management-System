import "./Navbar.css";
import logo from "../../../assets/nav-logo.png";
import Notification from "../../../assets/Group.png";
import avatar from "../../../assets/Avatar.png";
import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

export default function Navbar({loginData}:any) {
  // const navigate=useNavigate();
  // const logout=()=>{
  //   localStorage.removeItem("userToken");
  //   localStorage.removeItem("loginData");
  //   toast.success('BYE BYE 🙁')
  //   navigate('/');
  // }
  return (<>
     <nav className="navbar  navbar-expand-lg bg-body-tertiary  ">
      <div className="container-fluid  px-4">
        <Link to={"/dashboard"}>
          <img className="w-100 main-logo" src={logo} alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="ms-auto navbar-nav  mb-2 mb-lg-0">
            <li className="userInfo mx-auto position-relative d-flex align-items-center">
            

                <div className="Notification">
                  <img src={Notification} alt="Notification-Bill" />
                </div>

                <div className="info  bg d-flex align-items-center justify-content-between">

                  <div >
                    <img
                      className="w-100 ms-3 me-2 my-image"
                      src={avatar}
                      alt="userImg"
                    />
                  </div>

                  <div>
                    <h5>{loginData?.userName}</h5>
                    <h6 className="text-secondary text-opacity-50">{loginData?.userEmail}</h6>
                  </div>

                </div>
              
            </li>
            {/* <li className="nav-item dropdown mx-3">
          <a className="nav-link dropdown-toggle text-warning" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown link
          </a>
          <ul className="dropdown-menu">
            <li><a className="text-warning ps-2" href="dashboard/ChangePassword">ChangePassword</a></li>
            <li className="mt-2 logout"><a onClick={()=>logout()} className="text-warning ps-2"><i className="fa fa-arrow-right-from-bracket  me-3" ></i>
              Logout</a></li>
          </ul>
          
        </li> */}
          </ul>
        </div>
      </div>
    </nav> 
    </>);
}

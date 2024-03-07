import "./Navbar.css";
import logo from "../../../assets/nav-logo.png";
import Notification from "../../../assets/Group.png";
import avatar from "../../../assets/Avatar.png";
import { Link } from "react-router-dom";

export default function Navbar({loginData}) {
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
                  <img src={Notification} alt="" />
                </div>

                <div className="info  bg d-flex align-items-center justify-content-between ">

                  <div >
                    <img
                      className="w-100 ms-3 me-2 my-image"
                      src={avatar}
                      alt=""
                    />
                  </div>

                  <div>
                    <h5>{loginData?.userName}</h5>
                    <p>a{loginData?.userEmail}</p>
                  </div>

                </div>
              
            </li>
          </ul>
        </div>
      </div>
    </nav> 
    </>);
}

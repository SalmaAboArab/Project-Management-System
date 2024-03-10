import { useForm } from "react-hook-form";
import logo from "../../../assets/PMS 3.svg";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { toast } from "react-toastify";
import Loader from "../../../SharedMoudule/Components/Loading/Loading";
import { AuthContext } from "../../../Context/Components/AuthContext";
import { ToastContext } from "../../../Context/Components/ToastContext";

export default function Login() {

  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  let {baseUrl}:any = useContext(AuthContext);
  let {toastSuccess,toastError}:any = useContext(ToastContext);


async function handleLogin(values:any) {
  try {
  const {data} = await axios.post(`${baseUrl}/Users/Login`,values)
    // console.log(data);
    toastSuccess("Welcome!")
    localStorage.setItem('userToken',data.token)
    navigate("/dashboard")
    
    
  } catch (error:any) {
    // console.log(error);
    toastError(error?.response?.data?.message);
  }
  setIsLoading(false)

}



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values:any) => {
    setIsLoading(true)
    handleLogin(values);
  };

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };
  return (
    <>
      <div className="auth-container vh-100  d-flex flex-column justify-content-center align-items-center">
        <div className="logo">
          <img className="form-logo pb-2 " src={logo} alt="logo" />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form  col-xl-5 col-lg-6 col-md-7 col-sm-9 col-10 bg-info rounded-4 p-5"
        >
         <p className="text-light mb-0 mt-3">welcome to PMS</p>
          <h2 className="form-Name ">
            <span>L</span>ogin
          </h2>

          <div className="  d-flex flex-column gap-3  mt-4">
            <div className=" one-input-group">
              <div
                className="form-outline my-2  text-start   "
                data-mdb-input-init
              >
                <label
                  className="form-label  fw-medium mb-0"
                  for="formControlReadonly"
                >
                  E-mail
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
                      message: "Please enter a valid email address",
                    },
                    maxLength: {
                      value: 30,
                      message: "Email must be at most 30 characters",
                    },
                    minLength: {
                      value: 10,
                      message: "Email must be at least 10 characters",
                    },
                  })}
                  className="form-input form-control bg-transparent border-0 border border-bottom text-white p-1"
                  id="formControlReadonly"
                  type="text"
                  placeholder="Enter your E-mail"
                  aria-label="readonly input example"
                  autoComplete="off"
                />
                {errors?.email && (
                  <p className="mt-1  text-danger">{errors?.email?.message}</p>
                )}
              </div>
            </div>

            <div className=" one-input-group">
              <div className="form-outline position-relative text-start d-flex flex-wrap">
                <label
                  className="w-100 form-label fw-medium mb-0"
                  for="formControl"
                >
                  Password
                </label>
                <input
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is Required",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]+$/,
                      message:
                        "Password must contain at least one letter, one number, and one special character",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password must be at most 20 characters",
                    },
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  type={!showPassword ? "text" : "password"}
                  className="form-input form-control bg-transparent border-0 border border-bottom text-white p-1 pb-0 flex-grow-1"
                  id="formControl"
                  placeholder="Enter your password"
                  aria-label="readonly input example"
                />
                {/* <span className="input-group-text border-0  bg-transparent position-absolute mt-4 end-0 p-2">
                  <i
                    className={`far ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    } eye`}
                    onClick={togglePasswordVisibility}
                  ></i>
                </span> */}
              </div>
              {errors?.password && (
                <p className="  text-danger">{errors?.password?.message}</p>
              )}
            </div>
          </div>
          <div className="links d-flex justify-content-between align-items-center text-white mb-5 ">
            <Link to={"/Register"}>Register Now ?</Link>
            <Link to={"/ForgotPassword"}>Forget Password ?</Link>
          </div>

          <div className=" text-center">
            <button
              type="submit"
              className="btn btn-warning text-center  text-white w-75 rounded-5  "
            >
              {isLoading ? <Loader/> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

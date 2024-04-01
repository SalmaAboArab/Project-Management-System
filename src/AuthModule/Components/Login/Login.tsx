import React, { useContext, useState } from "react";
import { emailValidation, passwordValidation } from "../Validator/Validator.js";
import logo from "../../../assets/PMS 3.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../../SharedMoudule/Components/Loading/Loading";
import { toast } from "react-toastify";
import { baseUrl } from "../../../Constants/Components/Urls.js";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Context/Components/AuthContext.js";

export default function Login() {
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {saveLoginData}:any=useContext(AuthContext)

  async function handleLogin(values: any) {
    try {
      const { data } = await axios.post(`${baseUrl}/Users/Login`, values);
      toast.success("Welcome!");
      localStorage.setItem("userToken", data.token);
      saveLoginData();
      navigate("/dashboard");
    } catch (error: any) {
      
      toast.error(error?.message || "There's a mistake.");
    }
    setIsLoading(false);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    handleLogin(values);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="auth-container vh-100  d-flex flex-column justify-content-center align-items-center">
        <div className="logo">
          <img className="form-logo pb-2 " src={logo} alt="logo" />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form  col-xl-5 col-lg-6 col-md-7 col-sm-9 col-10 bg-info rounded-4 p-sm-5 p-3"
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
                <label className="form-label  fw-medium mb-0">E-mail</label>
                <input
                  {...register("email", emailValidation)}
                  className="form-input form-control bg-transparent border-0 rounded-bottom-0  border border-bottom text-white p-1"
                  type="text"
                  placeholder="Enter your E-mail"
                  aria-label="readonly input example"
                />
                {errors?.email && (
                  <p className="mt-1  text-danger">{errors?.email?.message}</p>
                )}
              </div>
            </div>

            <div className=" one-input-group">
              <div className="form-outline position-relative text-start d-flex flex-wrap">
                <label className="w-100 form-label fw-medium mb-0">
                  Password
                </label>
                <input
                  {...register("password", passwordValidation)}
                  type={!showPassword ? "text" : "password"}
                  className="form-input form-control bg-transparent border-0 rounded-bottom-0  border border-bottom text-white p-1 pb-0 flex-grow-1"
                  placeholder="Enter your password"
                  aria-label="readonly input example"
                />
                <button
                  onClick={togglePasswordVisibility}
                  type="button"
                  className="input-group-text border-0  bg-transparent position-absolute mt-4 end-0 p-2"
                >
                  <i
                    className={`far ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    } eye`}
                  ></i>
                </button>
              </div>
              {errors?.password && (
                <p className="  text-danger ">{errors?.password?.message}</p>
              )}
            </div>
          </div>
          <div className="links flex-wrap d-flex justify-content-between align-items-center text-white mb-5 ">
            <Link to={"/register"}>Register Now ?</Link>
            <Link to={"/forgot-password"}>Forget Password ?</Link>
          </div>

          <div className=" text-center">
            <button
              type="submit"
              className={`btn btn-warning text-center  text-white w-75 rounded-5  ${
                isLoading ? "noClick" : ""
              }`}
            >
              {isLoading ? <Loader /> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

import React, { useContext, useState } from "react";
import { passwordValidation } from "../Validator/Validator.js";
import logo from "../../../assets/PMS 3.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../../SharedMoudule/Components/Loading/Loading";
import { toast } from "react-toastify";
import { baseUrl } from "../../../Constants/Components/Urls.js";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Context/Components/AuthContext.tsx";

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  let {  requestHeader }: any =useContext(AuthContext);

  async function handleLChangePassword(values: any) {
    try {
      const { data } = await axios.put(`${baseUrl}/Users/ChangePassword`, values,
      { headers: requestHeader });
      toast.success("password changed successfully");
      localStorage.setItem("userToken", data.token);
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "There's a mistake.");
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
    handleLChangePassword(values);
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
            <span>C</span>hange Password
          </h2>

          <div className="  d-flex flex-column gap-3  mt-4">


             <div className=" one-input-group">
              <div className="form-outline position-relative text-start d-flex flex-wrap">
                <label className="w-100 form-label fw-medium mb-0">
                Old Password
                </label>
                <input
                  {...register("oldPassword", passwordValidation)}
                  type={!showPassword ? "text" : "password"}
                  className="form-input form-control bg-transparent border-0 rounded-bottom-0  border border-bottom text-white p-1 pb-0 flex-grow-1"
                  placeholder="Enter your Old Password"
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
              {errors?.oldPassword && (
                <p className="  text-danger ">{errors?.oldPassword?.message}</p>
              )}
            </div>

            <div className=" one-input-group">
              <div className="form-outline position-relative text-start d-flex flex-wrap">
                <label className="w-100 form-label fw-medium mb-0">
                New Password
                </label>
                <input
                  {...register("newPassword", passwordValidation)}
                  type={!showPassword ? "text" : "password"}
                  className="form-input form-control bg-transparent border-0 rounded-bottom-0  border border-bottom text-white p-1 pb-0 flex-grow-1"
                  placeholder="Enter your New Password"
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
              {errors?.newPassword && (
                <p className="  text-danger ">{errors?.newPassword?.message}</p>
              )}
            </div>

            <div className=" one-input-group">
              <div className="form-outline position-relative text-start d-flex flex-wrap">
                <label className="w-100 form-label fw-medium mb-0">
                Confirm New Password
                </label>
                <input
                  {...register("confirmNewPassword", passwordValidation)}
                  type={!showPassword ? "text" : "password"}
                  className="form-input form-control bg-transparent border-0 rounded-bottom-0  border border-bottom text-white p-1 pb-0 flex-grow-1"
                  placeholder="Confirm New Password"
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
              {errors?.confirmNewPassword && (
                <p className="  text-danger ">{errors?.confirmNewPassword?.message}</p>
              )}
            </div>



          </div>
         

          <div className=" text-center mt-5">
            <button
              type="submit"
              className={`btn btn-warning text-center  text-white w-75 rounded-5  ${
                isLoading ? "noClick" : ""
              }`}
            >
              {isLoading ? <Loader /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

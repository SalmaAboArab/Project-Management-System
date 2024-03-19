import React, { useState } from 'react'
import Loader from '../../../SharedMoudule/Components/Loading/Loading'
import { useNavigate } from 'react-router-dom';
import logo from "../../../assets/PMS 3.svg";
import { useForm } from 'react-hook-form';
import { OTPValidation, emailValidation, passwordValidation } from "../Validator/Validator.js";
import { baseUrl } from '../../../Constants/Components/Urls';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function ResetPassword() {

  const navigate=useNavigate();
  // ########################## submit New password ##################################

  const [isLoading,setIsLoading]=useState(false);
  const {register,handleSubmit,watch,getValues,formState:{errors}}=useForm();

  const submitNewPassword=async(data:any)=>{
    try {
      setIsLoading(true);
      const response = await axios.post(`${baseUrl}/Users/Reset`,data);
        // console.log(response);
        toast.success(" You can login Now!")
      
        navigate("/")
    
    } catch (error) {
      // console.log(error)
      toast.error(error?.response?.data?.message);
      setIsLoading(false);
    }
    }

    const[showPassword,setShowPassword]=useState(true);
const togglePassword=()=>{
  setShowPassword(!showPassword);
}


const[showConfirmPassword,setShowConfirmPassword]=useState(true);
const toggleConfirmPassword=()=>{
  setShowConfirmPassword(!showConfirmPassword);
}


  return (
    <>  
<div className="auth-container vh-100  d-flex flex-column justify-content-center align-items-center">
        <div className="logo">
          <img className="form-logo pb-2 " src={logo} alt="logo" />
        </div>
        <form
          onSubmit={handleSubmit(submitNewPassword)}
          className="form  col-xl-5 col-lg-6 col-md-7 col-sm-9 col-10 bg-info rounded-4 p-sm-5 p-3"
        >
          <p className="text-light mb-0 mt-1">welcome to PMS</p>
          <h2 className="form-Name ">
            <span>R</span>eset Password
          </h2>

          <div className="  d-flex flex-column  mt-3 mb-2">

          <div className=" one-input-group">
              <div
                className="form-outline my-1  text-start   "
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
              <div
                className="form-outline my-1  text-start   "
                data-mdb-input-init
              >
                <label className="form-label  fw-medium mb-0">OTP</label>
                <input
                  {...register("seed", OTPValidation)}
                  className="form-input form-control bg-transparent border-0 rounded-bottom-0  border border-bottom text-white p-1"
                  type="text"
                  placeholder="Enter your OTP"
                  aria-label="readonly input example"
                />
                {errors?.seed && (
                  <p className="mt-1  text-danger">{errors?.seed?.message}</p>
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
                  placeholder="Enter  New password"
                  aria-label="readonly input example"
                />
                <button
                  onClick={togglePassword}
                  type="button"
                  className="input-group-text border-0  bg-transparent position-absolute mt-3 end-0 p-2"
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

            <div className=" one-input-group">
              <div className="form-outline position-relative text-start d-flex flex-wrap">
                <label className="w-100 form-label fw-medium mb-0">
                Confirm Password
                </label>
                <input
                  {...register("confirmPassword",{required: "Confirm Password is required"})}
                  
                  type={!showConfirmPassword ? "text" : "password"}
                  className="form-input form-control bg-transparent border-0 rounded-bottom-0  border border-bottom text-white p-1 pb-0 flex-grow-1"
                  placeholder="Confirm New password"
                  aria-label="readonly input example"
                />
                 {watch("confirmPassword") !== watch("password") &&
  getValues("confirmPassword") ? (
    <p className='text-danger'>passwords don't match</p>
  ) : null}
                <button
                  onClick={toggleConfirmPassword}
                  type="button"
                  className="input-group-text border-0  bg-transparent position-absolute mt-4 end-0 p-2"
                >
                  <i
                    className={`far ${
                      showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                    } eye`}
                  ></i>
                </button>
              </div>
              {errors?.confirmPassword && (
                <p className="  text-danger ">{errors?.confirmPassword?.message}</p>
              )}
            </div>
            
          </div>

          <div className=" text-center">
            <button
              type="submit"
              className={`btn btn-warning text-center  text-white w-75 rounded-5  ${
                isLoading ? "noClick" : ""
              }`}
            >
              {isLoading ? <Loader /> : "Reset"}
            </button>
          </div>
        </form>
      </div>

    </>
  )
}

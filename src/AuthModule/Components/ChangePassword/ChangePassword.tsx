import React, { useContext, useState } from "react";
import { passwordValidation } from "../Validator/Validator.js";
import logo from "../../../assets/PMS 3.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../../SharedMoudule/Components/Loading/Loading";
import { toast } from "react-toastify";
import { baseUrl } from "../../../Constants/Components/Urls.js";
import { useForm } from "react-hook-form";

export default function ChangePassword() {
  const [showPasswordOldPassword, setShowPasswordOldPassword] = useState(true);
  const [showPasswordNewPassword, setShowPasswordNewPassword] = useState(true);
  const [showPasswordConfirmPassword, setShowPasswordConfirmPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
 // const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const token=localStorage.getItem('userToken');
  async function handleLChangePassword(values: any) {

    
      try {
        const { data } = await axios.put(`${baseUrl}/Users/ChangePassword`, values,
        { headers: {Authorization:token} });
        toast.success("password changed successfully");
        navigate("/dashboard");
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "There's a mistake.");
      }
      setIsLoading(false);
    }

  
 
   



  const {
    register,
    handleSubmit,
    formState: { errors },watch,
  } = useForm();

  let confirmPassword = watch("newPassword");


  const onSubmit = async (values: any) => {
    setIsLoading(true);
    handleLChangePassword(values);
  };


  const togglePasswordVisibilityOldPassword = () => {
    setShowPasswordOldPassword(!showPasswordOldPassword);
   
  };

  const togglePasswordVisibilityNewPassword = () => {
    
    setShowPasswordNewPassword(!showPasswordNewPassword);
   
  };

  const togglePasswordVisibilityConfirmPassword = () => {
    
    setShowPasswordConfirmPassword(!showPasswordConfirmPassword);
  };
  return (
    <>
     <div className="auth-container vh-100  d-flex flex-column justify-content-center align-items-center">
        <div className="logo">
          <img className="form-logo pb-2 " src={logo} alt="projectManagementSystem-logo" />
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
                  type={!showPasswordOldPassword ? "text" : "password"}
                  className="form-input form-control bg-transparent border-0 rounded-bottom-0  border border-bottom text-white p-1 pb-0 flex-grow-1"
                  placeholder="Enter your Old Password"
                  aria-label="readonly input example"
                />

                <button
                  onClick={togglePasswordVisibilityOldPassword}
                  type="button"
                  className="input-group-text border-0  bg-transparent position-absolute mt-4 end-0 p-2"
                >
                  <i
                    className={`far ${
                      showPasswordOldPassword ? "fa-eye-slash" : "fa-eye"
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
                  type={!showPasswordNewPassword ? "text" : "password"}
                  className="form-input form-control bg-transparent border-0 rounded-bottom-0  border border-bottom text-white p-1 pb-0 flex-grow-1"
                  placeholder="Enter your New Password"
                  aria-label="readonly input example"
                />
                <button
                  onClick={togglePasswordVisibilityNewPassword}
                  type="button"
                  className="input-group-text border-0  bg-transparent position-absolute mt-4 end-0 p-2"
                >
                  <i
                    className={`far ${
                      showPasswordNewPassword ? "fa-eye-slash" : "fa-eye"
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
                 
                  {...register("confirmNewPassword", {
                    required: "Confirm Password is required",
                    validate: (value: string) =>
                      value === confirmPassword || "Passwords do not match",
                  })}
                  type={!showPasswordConfirmPassword ? "text" : "password"}
                  className="form-input form-control bg-transparent border-0 rounded-bottom-0  border border-bottom text-white p-1 pb-0 flex-grow-1"
                  placeholder="Confirm New Password"
                  aria-label="readonly input example"
                  
                />
                <button
                  onClick={togglePasswordVisibilityConfirmPassword}
                  type="button"
                  className="input-group-text border-0  bg-transparent position-absolute mt-4 end-0 p-2"
                >
                  <i
                    className={`far ${
                      showPasswordConfirmPassword ? "fa-eye-slash" : "fa-eye"
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
              {isLoading ? <Loader /> : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </>
  )
}

import { useForm } from "react-hook-form";
import logo from "../../../assets/PMS 3.svg";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import defaultImage from "../../../assets/Avatar.png";
import Loader from "../../../SharedMoudule/Components/Loading/Loading";
import { AuthContext } from "../../../Context/Components/AuthContext";
import { ToastContext } from "../../../Context/Components/ToastContext";
import "./Register.css";

export default function Register() {
  const [userImage, setUserImage] = useState("")

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  let { baseUrl }: any = useContext(AuthContext);
  let { toastSuccess, toastError }: any = useContext(ToastContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const confirmPassword = watch("password");

  async function handleRegister(values: any) {
    try {
      const { data } = await axios.post(`${baseUrl}/Users/Register`, values);
      console.log(data);
      toastSuccess("Account created successfully.");
      navigate("/VerifyAccount");
    } catch (error: any) {
      console.log(error);
      toastError(error?.response?.data?.message || "There's a mistake.");
    }
    setIsLoading(false);
  }

  function appendToFormData(values: any) {
    const registerForm = new FormData();
    registerForm.append("userName", values.userName);
    registerForm.append("email", values.email);
    registerForm.append("country", values.country);
    registerForm.append("phoneNumber", values.phoneNumber);
    registerForm.append("password", values.password);
    registerForm.append("confirmPassword", values.confirmPassword);
    registerForm.append("profileImage", values.profileImage[0]);
    return registerForm;
  }

  
 
  const onSubmit = async (values: any) => {
    localStorage.setItem("register-Email", values?.email);

    setIsLoading(true);
    const formData = appendToFormData(values);
    handleRegister(formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };



function handlePic(e:any) {
  setUserImage(URL.createObjectURL(e.target.files[0]))
  
  
}
  return (
    <>
      <div className="auth-container py-5 p-md-0 d-flex flex-column justify-content-center align-items-center">
        <div className="logo">
          <img className="form-logo pb-2" src={logo} alt="logo" />
        </div>
        <form   
                  onSubmit={handleSubmit(onSubmit)}
          className="form col-md-8 col-sm-9 col-10 bg-info rounded-4 p-md-5  p-3"
        >
         <div className=" pt-3">
           <p className=" text-light mb-0">welcome to PMS</p>
           <h2 className=" form-Name mb-3">
             <span>C</span>reate New Account
           </h2>
           </div>
          
          <div className="upload mx-auto my-3 d-flex justify-content-center align-items-center ">
            <img className="  m-0 p-0" src={userImage||defaultImage} alt="selectImage" />

            <div className="round  text-center  d-flex align-items-end  text-center justify-content-center mx-auto  ">
              <div className="h4 carousel mx-auto text-center position-relative start-0 w-100">
                <input
                onChangeCapture={(e)=>handlePic(e)}
                  {...register("profileImage")}
                  className="m-0 p-0 position-relative"
                  type="file"
                />
                <i className="fa-solid fa-camera"></i>
              </div>
            </div>
          </div>

          <div className="d-flex flex-wrap align-items-center    mt-2 ">
            <div className=" one-input-group   col-md-6 pe-md-3   my-4  col-12  ">
              <div
                className="form-outline my-2  text-start   "
                data-mdb-input-init
              >
                <label className="form-label  fw-medium pb-0 mb-0">User Name</label>
                <input
                  {...register("userName", {
                    required: "UserName is required",
                    maxLength: {
                      value: 8,
                      message: "UserName must be at most 8 characters",
                    },
                    minLength: {
                      value: 3,
                      message: "UserName must be at least 3 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z]+[0-9]+$/,
                      message:
                        "UserName must contain characters and end with numbers without spaces",
                    },
                  })}

                  className="form-input form-control bg-transparent rounded-bottom-0  border-0 border border-bottom text-white p-1"
                  type="text"
                    


                  
                  placeholder="Enter your name"
                  aria-label="readonly input example"
                />
                {errors?.userName && (
                  <p className="mt-1  text-danger">
                    {errors?.userName?.message}
                  </p>
                )}
              </div>
            </div>
            <div className=" one-input-group       col-md-6 ps-md-3   my-4  col-12 ">
              <div
                className="form-outline my-2  text-start   "
                data-mdb-input-init
              >
                <label className="form-label  fw-medium mb-0">E-mail</label>
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
                  className="form-input form-control bg-transparent rounded-bottom-0  border-0 border border-bottom text-white p-1"
                  type="email"
                    

                  placeholder="Enter your E-mail"
                  aria-label="readonly input example"
                />
                {errors?.email && (
                  <p className="mt-1  text-danger">{errors?.email?.message}</p>
                )}
              </div>
            </div>

            <div className=" one-input-group       col-md-6 pe-md-3   my-4  col-12">
              <div className="form-outline position-relative text-start d-flex flex-wrap">
                <label className="w-100 form-label fw-medium mb-0">
                  Country
                </label>
                <input
                  {...register("country", {
                    required: {
                      value: true,
                      message: "country is Required",
                    },
                  })}
                  type="text"
                  className="form-input form-control bg-transparent rounded-bottom-0  border-0 border border-bottom text-white p-1 pb-0 flex-grow-1"
                    
                  


                  
                  placeholder="Enter your country"
                  aria-label="readonly input example"
                />
              </div>
              {errors?.country && (
                <p className="text-danger">{errors?.country?.message}</p>
              )}
            </div>

            <div className=" one-input-group       col-md-6 ps-md-3   my-4 col-12">
              <div className="form-outline position-relative text-start d-flex flex-wrap">
                <label className="w-100 form-label fw-medium mb-0">
                  Phone Number
                </label>
                <input
                  {...register("phoneNumber", {
                    pattern: {
                      value: /^(\+2)?01[0125][0-9]{8}$/,
                      message: "Please enter a valid Egyptian phone number",
                    },
                    required: {
                      value: true,
                      message: "PhoneNumber is Required",
                    },
                  })}
                  type="tel"
                  className="form-input form-control bg-transparent rounded-bottom-0  border-0 border border-bottom text-white p-1 pb-0 flex-grow-1"
                    
                 

                  
                  placeholder="Enter your phone number"
                  aria-label="readonly input example"
                />
              </div>
              {errors?.phoneNumber && (
                <p className="  text-danger">{errors?.phoneNumber?.message}</p>
              )}
            </div>
            <div className=" one-input-group       col-md-6 pe-md-3   my-4 col-12">
              <div className="form-outline position-relative text-start d-flex flex-wrap">
                <label className="w-100 form-label fw-medium mb-0">
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
                        "Phone Number contain at least one letter, one number, and one special character",
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
                  className="form-input form-control bg-transparent rounded-bottom-0  border-0 border border-bottom text-white p-1 pb-0 flex-grow-1"
                    
                  

                  
                  placeholder="Enter your password"
                  aria-label="readonly input example"
                />
                <span className="input-group-text rounded-bottom-0  border-0  bg-transparent position-absolute mt-4 end-0 pt-2">
                  <i
                    className={`far ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    } eye`}
                    onClick={togglePasswordVisibility}
                  ></i>
                </span>
              </div>
              {errors?.password && (
                <p className="  text-danger">{errors?.password?.message}</p>
              )}
            </div>
            <div className=" one-input-group       col-md-6 ps-md-3   my-4 col-12">
              <div className="form-outline position-relative text-start d-flex flex-wrap">
                <label className="w-100 form-label fw-medium mb-0">
                  Confirm Password
                </label>
                <input
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value: string) =>
                      value === confirmPassword || "Passwords do not match",
                  })}
                  type={!showConfirmPassword ? "text" : "password"}
                  className="form-input form-control bg-transparent rounded-bottom-0   border-0 border border-bottom text-white p-1 pb-0 flex-grow-1"
                    
                  
                                    
                  
                  placeholder="Confirm New Password"
                  aria-label="readonly input example"
                />
                <span className="input-group-text rounded-bottom-0  border-0  bg-transparent position-absolute mt-4 end-0 pt-2">
                  <i
                    className={`far  ${
                      showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                    } eye`}
                    onClick={toggleConfirmPasswordVisibility}
                  ></i>
                </span>
              </div>
              {errors?.confirmPassword && (
                <p className="  text-danger">
                  {errors?.confirmPassword?.message}
                </p>
              )}
            </div>
          </div>

          <div className=" text-center">
            <button
              type="submit"
              className={`btn btn-warning text-center  text-white w-75 rounded-5 mb-2 ${
                isLoading ? "noClick" : ""
              }`}
            >
              {isLoading ? <Loader /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

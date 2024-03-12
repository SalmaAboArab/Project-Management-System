import { useForm } from "react-hook-form";
import logo from "../../../assets/PMS 3.svg";
import  { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../../SharedMoudule/Components/Loading/Loading";
import { AuthContext } from "../../../Context/Components/AuthContext";
import { ToastContext } from "../../../Context/Components/ToastContext";

export default function VerifyAccount() {
const [userEmail, setUserEmail] = useState("")
useEffect(() => {
  setUserEmail(localStorage.getItem("register-Email"))
  
}, [])

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  let {baseUrl}:any = useContext(AuthContext);
  let {toastSuccess,toastError}:any = useContext(ToastContext);


async function handleRegister(values:any) {
  try {
  const {data} = await axios.put(`${baseUrl}/Users/verify `,values)
    console.log(data);
    toastSuccess(data?.message)
    navigate("/")  
    localStorage.removeItem("register-Email")
   
    
  } catch (error:any) {
    console.log(error);
    toastError(error?.response?.data?.message);
  }
  setIsLoading(false)

}

function handleData(data:any) {
const  values = {
    email:userEmail,
    code:data?.code
  }
    handleRegister(values);
  
}


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data:any) => {
    setIsLoading(true)
    handleData(data)
    // handleRegister(values);
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
            <span>V</span>erify Account
          </h2>

          <div className="  d-flex flex-column gap-3  mt-4">
            {/* <div className=" one-input-group">
              <div
                className="form-outline my-2  text-start   "
                data-mdb-input-init
              >
                <label
                  className="form-label  fw-medium mb-0"
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
                  className="form-input form-control bg-transparent rounded-bottom-0  border-0 border border-bottom text-white p-1"
                  type="text"
                  placeholder="Enter your E-mail"
                  aria-label="readonly input example"
                  autoComplete="off"
                />
                {errors?.email && (
                  <p className="mt-1  text-danger">{errors?.email?.message}</p>
                )}
              </div>
            </div> */}

            <div className=" one-input-group">
              <div className="form-outline position-relative text-start d-flex flex-wrap">
                <label
                  className="w-100 form-label fw-medium mb-0"
                >
                  OTP Verification
                </label>
                <input
                  {...register("code", {
                    required: {
                      value: true,
                      message: "OTP is Required",
                    },
                      maxLength: {
                      value: 8,
                      message: "OTP code must be at most 8 characters",
                    },
                    minLength: {
                      value: 4,
                      message: "OTP code must be at least 4 characters",
                    },
                  })}
                  type={"text"}
                  className="form-input form-control bg-transparent rounded-bottom-0  border-0 border border-bottom text-white p-1 pb-0 flex-grow-1"
                  placeholder="Enter Verification"
                  aria-label="readonly input example"
                />
             
              </div>
              {errors?.password && (
                <p className="  text-danger">{errors?.password?.message}</p>
              )}
            </div>
          </div>
        
          <div className=" text-center">
            <button
              type="submit"
              className={`btn btn-warning text-center  text-white w-75 rounded-5  ${isLoading? "noClick":""}`}
            >
              {isLoading ? <Loader/> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

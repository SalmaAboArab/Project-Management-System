import { useState } from "react";
import { passwordValidation } from "../Validator/Validator.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../../SharedMoudule/Components/Loading/Loading";
import { toast } from "react-toastify";
import { baseUrl } from "../../../Constants/Components/Urls.js";
import { useForm } from "react-hook-form";
import { Button, Modal } from "react-bootstrap";

export default function ChangePassword({ show, handleClose }) {
  const [showPasswordOldPassword, setShowPasswordOldPassword] = useState(true);
  const [showPasswordNewPassword, setShowPasswordNewPassword] = useState(true);
  const [showPasswordConfirmPassword, setShowPasswordConfirmPassword] =
    useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("userToken");
  async function handleLChangePassword(values: any) {
    try {
      const { data } = await axios.put(
        `${baseUrl}/Users/ChangePassword`,
        values,
        { headers: { Authorization: token } }
      );
      toast.success("password changed successfully");
      handleClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "There's a mistake.");
    }
    setIsLoading(false);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
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
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>welcome to PMS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2"
          >
            <h2 className="form-Name ">
              <span>C</span>hange Password
            </h2>

            <div className=" d-flex flex-column gap-3  mt-4">
              <div className=" one-input-group">
                <div className="form-outline position-relative text-start d-flex flex-wrap">
                  <label className="w-100 form-label fw-medium mb-0">
                    Old Password
                  </label>
                  <input
                    {...register("oldPassword", passwordValidation)}
                    type={!showPasswordOldPassword ? "text" : "password"}
                    className="form-input-change-pass form-input form-control bg-transparent border-0 rounded-bottom-0  border border-bottom text-white p-1 pb-0 flex-grow-1"
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
                  <p className="  text-danger ">
                    {errors?.oldPassword?.message}
                  </p>
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
                    className="form-input-change-pass form-input form-control bg-transparent border-0 rounded-bottom-0  border border-bottom text-white p-1 pb-0 flex-grow-1"
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
                  <p className="  text-danger ">
                    {errors?.newPassword?.message}
                  </p>
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
                    className="form-input-change-pass form-input form-control bg-transparent border-0 rounded-bottom-0  border border-bottom text-white p-1 pb-0 flex-grow-1"
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
                  <p className="  text-danger ">
                    {errors?.confirmNewPassword?.message}
                  </p>
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
                {isLoading ? <Loader /> : "Save Changes"}
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>{" "}
        </Modal.Footer>
      </Modal>
    </>
  );
}

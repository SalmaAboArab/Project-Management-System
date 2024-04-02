import React, { useEffect, useState } from "react";
import styles from "./ProjectForm.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../Constants/Components/Urls";
import { toast } from "react-toastify";
import Loader from "../../../SharedMoudule/Components/Loading/Loading";

export default function ProjectForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const token = localStorage.getItem("userToken");
  const { action } = useParams();
  const curruntProjectId = localStorage.getItem("curruntProjectId");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: object) => {
    setIsLoading(true);
    const url =
      action == "update"
        ? `${baseUrl}/Project/${curruntProjectId}`
        : `${baseUrl}/Project`;
    const proccess = action == "update" ? "Updated" : "Added";
    const method = action == "update" ? 'put' : 'post';

    try {
      const response = await axios[method](url, data, {
        headers: { Authorization: token },
      });
      // console.log(`${proccess} project response `, response);
      toast.success(`Project ${proccess} Successfuly`);
      navigate("/dashboard/projects");
    } catch (error) {
      setIsLoading(false);
      // console.log(error);
      toast.error(error?.response?.data?.message || "Somthing went wrong!");
    }
  };

  const getCurrentProject = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/Project/${curruntProjectId}`,
        { headers: { Authorization: token } }
      );
      // console.log("current project ", response?.data);
      const currentProject = response?.data;
      setValue("title", currentProject?.title);
      setValue("description", currentProject?.description);
    } catch (error) {
      // console.log(error);
      toast.error(error?.response?.data?.message || "Somthing went wrong!");
    }
  };
  useEffect(() => {
    if (action == "update") getCurrentProject();
  }, []);

  return (
    <>
      <div className="ProjectFormContainer slide-in-bottom vh-100 bg-light overflow-auto pageOverflow pb-2">
        <div className="ProjectFormHeader bg-white ps-5 py-4">
          <Link to="/dashboard/projects" className="text-black textColer">
            <i className="fa fa-arrow-left me-2"></i>
            View All Projects
          </Link>
          <h2 className="mt-2 textColer">
            {action == "add" ? "Add a New Project" : "Update Project"}
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${styles.ProjectForm} rounded-4 bg-white shadow container  w-75`}
        >
          <div className={`mt-5 py-5 px-4 ProjectFormInputs`}>
            <div className="title ">
              <label htmlFor="">Title</label>
              <input
                type="text"
                placeholder="Name"
                className="form-control rounded-4 p-3 mt-2"
                {...register(
                  "title",
                  action == "add"
                    ? { required: "Project title is required" }
                    : {}
                )}
              />
            </div>
            {errors.description && (
              <p className="text-danger">{errors?.title?.message}</p>
            )}

            <div className="description mt-5 ">
              <label htmlFor="">Description</label>
              <textarea
                placeholder="Description"
                className="form-control rounded-4 mt-2 pt-3 ps-3 pe-1 pb-5"
                {...register(
                  "description",
                  action == "add"
                    ? { required: "Project description is required" }
                    : {}
                )}
              ></textarea>
            </div>
            {errors.description && (
              <p className="text-danger">{errors?.description?.message}</p>
            )}
          </div>

          <div className="line border-top py-4 px-4 row justify-content-between mt-3">
            <div className="cancel col-xxl-3 col-md-6 my-3 row justify-content-start text-center px-1">
              <button
                className="btn border border-black rounded-5 col-md-5 wColer"
                onClick={() => navigate("/dashboard/projects")}
              >
                Cancel
              </button>
            </div>
            <div className="save col-xxl-3 col-md-6 my-3 row justify-content-end text-center px-1">
              <button
                className={`btn btn-warning rounded-5 text-white col-md-5 ${isLoading ? "noClick" : ""}`}
              >
                {isLoading ? <Loader /> : action == "add" ? "Add" : "Update"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

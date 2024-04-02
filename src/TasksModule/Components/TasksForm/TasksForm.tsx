import React, { useContext, useEffect, useState } from "react";
import styles from "./TasksForm.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseUrl } from "../../../Constants/Components/Urls";
import { toast } from "react-toastify";
import Loader from "../../../SharedMoudule/Components/Loading/Loading";
import { AuthContext } from "../../../Context/Components/AuthContext";

export default function TasksForm() {
  const navigate = useNavigate();
  let { loginData } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const token = localStorage.getItem("userToken");
  const { action } = useParams();
  // const [currentTask, setCurrentTask] = useState(null);
  const curruntTaskId = localStorage.getItem("curruntTaskId");
  const [ProjectsList, setProjectsList] = useState(null);
  const [UsersList, setUsersList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: object) => {
    setIsLoading(true);
    // console.log(data);
    const url =
      action == "update"
        ? `${baseUrl}/Task/${curruntTaskId}`
        : `${baseUrl}/Task`;
    const proccess = action == "update" ? "Updated" : "Added";
    const method = action == "update" ? 'put' : 'post';

    try {
      const response = await axios[method](url, data, {
        headers: { Authorization: token },
      });
      console.log(`${proccess} task response `, response);
      toast.success(`Task ${proccess} Successfuly`);
      navigate("/dashboard/tasks");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message || "Somthing went wrong!");
    }
  };


  const getCurrentTask = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Task/${curruntTaskId}`, {
        headers: { Authorization: token },
      });
      // console.log("current task ", response.data);
      // setCurrentTask(response.data);
      const currentTask = response.data;
      setValue("title", currentTask?.title);
      setValue("description", currentTask?.description);
      setValue("employeeId", currentTask?.employee?.id);
    } catch (error) {
      console.log(error);
    }
  };

  const getprojectsList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Project/?pageSize=10000&pageNumber=1`, {
        headers: { Authorization: token },
      });
      // console.log("projects list ", response.data.data);
      setProjectsList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getusersList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Users/?pageSize=10000&pageNumber=1`, {
        headers: { Authorization: token },
      });
      // console.log("users list ", response.data.data);
      setUsersList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loginData?.userGroup === "Employee") {
      navigate("/dashboard");
    }
    getusersList();
    if (action == "update") getCurrentTask();
    else getprojectsList();
  }, []);

  return (
    <>
      <div className="TaskFormContainer slide-in-bottom vh-100 bg-light overflow-auto pageOverflow pb-2">
        <div className="TaskFormHeader bg-white ps-5 py-4">
          <Link to="/dashboard/tasks" className="text-black textColer">
            <i className="fa fa-arrow-left me-2"></i>
            View All Tasks
          </Link>
          <h2 className="mt-2 textColer">
            {action == "add" ? "Add a New Task" : "Update Task"}
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${styles.TaskForm} rounded-4 bg-white shadow container  w-75`}
        >
          <div className={`mt-5 py-5 px-4 TaskFormInputs`}>
            <div className="title ">
              <label htmlFor="">Title</label>
              <input
                type="text"
                placeholder="Name"
                className="form-control rounded-4 p-3 mt-2 "
                {...register(
                  "title",
                  action == "add" ? { required: "Task title is required" } : {}
                )}
              />
            </div>
            {errors.description && (
              <p className="text-danger">{errors?.title?.message}</p>
            )}

            <div className="description mt-4 ">
              <label htmlFor="">Description</label>
              <textarea
                placeholder="Description"
                className="form-control rounded-4 mt-2 pt-3 ps-3 pe-1 pb-5 "
                {...register(
                  "description",
                  action == "add"
                    ? { required: "Task description is required" }
                    : {}
                )}
              ></textarea>
            </div>
            {errors.description && (
              <p className="text-danger">{errors?.description?.message}</p>
            )}

            <div className="options row mt-4">
              <div className={action == "add" ? "col-md-6" : "col-md-12"}>
                <label htmlFor="">User</label>
                <select
                  id=""
                  className="w-100 form-select mt-2 rounded-4 p-3 "
                  {...register("employeeId", {
                    required: action == "add" ? "User is required" : false,
                  })}
                >
                  <option value="" selected hidden>
                      Select an employee
                    </option>
                  {/* {action == "add" ? (
                    <option value="" disabled selected hidden>
                      Select an employee
                    </option>
                  ) : (
                    <option value="" hidden selected >
                      Select an employee
                    </option>
                  )} */}
                  {UsersList?.map((user: object) => (
                    <option key={user?.id} value={user?.id}>
                      {user?.userName}
                    </option>
                  ))}
                </select>
                {errors.employeeId && (
                  <p className="text-danger">{errors?.employeeId?.message}</p>
                )}
              </div>
              {action == "add" ? (
                <div className="col-md-6">
                  <label htmlFor="">Project</label>
                  <select
                    name="project"
                    id=""
                    className="w-100 form-select mt-2 rounded-4 p-3 "
                    {...register("projectId", {
                      required: "Project is required",
                    })}
                  >
                    <option value="" disabled selected hidden>
                    Select a project
                    </option>
                    {ProjectsList?.map((project: object) => (
                      <option key={project?.id} value={project?.id}>
                        {project?.title}{" "}
                      </option>
                    ))}
                  </select>
                  {errors.projectId && (
                    <p className="text-danger">{errors?.projectId?.message}</p>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="line border-top py-4 px-4 row justify-content-between mt-3">
            <div className="cancel col-xxl-3 col-md-6 my-3 row justify-content-start text-center px-1">
              <button
                className="btn border border-black rounded-5 col-md-5 wColer"
                onClick={() => navigate("/dashboard/tasks")}
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

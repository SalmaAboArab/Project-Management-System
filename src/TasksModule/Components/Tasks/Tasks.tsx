import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../../Constants/Components/Urls.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../../../SharedMoudule/Components/Loading/Loading";
import NoData from "../../../SharedMoudule/Components/NoData/NoData.js";
import DeleteModal from "../../../SharedMoudule/Components/DeleteModal/DeleteModal.js";
import { AuthContext } from "../../../Context/Components/AuthContext.js";
import styles from "./Tasks.module.css";
import Pagination from "../../../SharedMoudule/Components/Pagination/Pagination.js";

export default function TasksList() {
  const [taskList, setTaskList] = useState([]);
  const [searchByTitle, setSearchByTitle] = useState("");
  const [statusSearch, setStatusSearch] = useState("");
  const [pagesArray, setPagesArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  let { loginData } = useContext(AuthContext);

  const closeModal = () => {
    setOpenDeleteModal(false);
  };

  const token = localStorage.getItem("userToken");

  const getTitleValue = (e: string) => {
    setSearchByTitle(e.target.value);
  };
  const getStatusValue = (e: string) => {
    setStatusSearch(e.target.value);
  };

  const navigate = useNavigate();
  const goToAddTasks = () => {
    navigate("/dashboard/tasks/tasks-form/add");
  };
  const getTasksList = async (
    pageNo: number,
    status: string,
    title: string
  ) => {
    console.log(pageNo, status, title);

    try {
      let response = await axios.get(`${baseUrl}/Task/manager?`, {
        headers: { Authorization: token },
        params: {
          pageNumber: pageNo,
          pageSize: 10,
          status,
          title,
        },
      });

      setPagesArray(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );

      setTaskList(response.data.data);
      setIsLoading(false);
    } catch (error: string) {
      toast.error(error?.response?.data?.message || "There's a mistake.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (loginData?.userGroup === "Employee") {
      navigate("/dashboard");
    }
    getTasksList(pageNum, statusSearch, searchByTitle);
    setIsLoading(true);
  }, [searchByTitle, statusSearch, pageNum]);
  return (
    <>
      <div className="TasksListContainer slide-in-bottom textColer rounded-3 p-3">
        <div className="d-flex flex-wrap align-items-center  justify-content-center justify-content-sm-between  title textColer  rounded-3 bg-white p-3 mb-3 mx-1">
          <h3 className="me-2">Tasks</h3>
          <button
            onClick={goToAddTasks}
            className="btn btn-warning btn-add-Tasks rounded-5 text-white ms-2"
          >
            <i className="fa fa-plus "></i> Add New Task
          </button>
        </div>

        <div className="row py-3 mb-2 bg-white rounded-2 mx-1  textColer">
          <div className="col-md-3 mt-md-0 mt-2 ">
            <input
              type="text"
              className="form-control bordersInputs  py-2 shadow rounded-5 "
              placeholder="Search by Title"
              onChange={getTitleValue}
            />
          </div>

          {
            <div className="col-md-2 mt-md-0 mt-2">
              <select
                className="form-select py-2 shadow rounded-5 bordersInputs"
                onChange={getStatusValue}
              >
                <option value="">search by status</option>
                <option>ToDo</option>
                <option>InProgress</option>
                <option>Done</option>
              </select>
            </div>
          }
        </div>

        {isLoading ? (
          <div className="  pt-5 mt-5 ">
            <Loading components={1} />
          </div>
        ) : (
          <div className={`${styles.userslistContainer} table-responsive `}>
            {taskList.length > 0 ? (
              <table className="table table-striped  text-center ">
                <thead className={`${styles.bg}`}>
                  <tr>
                    <th className={` ${styles.test2}`} scope="col">
                      Title
                    </th>
                    <th className={`${styles.verticalRule}   `} scope="col">
                      Status
                    </th>
                    <th className={`${styles.verticalRule}   `} scope="col">
                      Description
                    </th>
                    <th className={`${styles.verticalRule}   `} scope="col">
                      Project
                    </th>
                    <th
                      className={` ${styles.test1} ${styles.verticalRule}`}
                      scope="col"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {taskList.map((task: object) => (
                    <tr key={task.id}>
                      <td className="p-3">{task.title}</td>
                      <td className="p-3">{task.status}</td>
                      <td className="p-3">{task.description}</td>
                      <td className="p-3">{task.project.title}</td>
                      <td className="p-3">
                        <button
                          className={`btn`}
                          onClick={() => {
                            localStorage.setItem("curruntTaskId", task?.id);
                            navigate("/dashboard/tasks/tasks-form/update");
                          }}
                        >
                          <i
                            className="fa fa-edit text-warning mx-2"
                            aria-hidden="true"
                          >
                            {" "}
                          </i>
                        </button>
                        <button
                          className={`btn`}
                          onClick={() => {
                            setOpenDeleteModal(true);
                            setCurrentTaskId(task?.id);
                          }}
                        >
                          <i
                            className="fa fa-trash text-danger mx-2"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <NoData />
            )}
            <div>
              {taskList.length > 0 ? (
                <Pagination
                  pagesArray={pagesArray}
                  setPageNum={setPageNum}
                  pageNum={pageNum}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        )}

        {openDeleteModal && (
          <DeleteModal
            id={currentTaskId}
            closeDeleteModal={closeModal}
            getList={getTasksList}
            type={"Task"}
          />
        )}
      </div>
    </>
  );
}

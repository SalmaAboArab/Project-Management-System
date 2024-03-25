import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../Constants/Components/Urls.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NoData from "../../../noData/noData.js";

export default function TasksList() {
  const [taskList, setTaskList] = useState([]);
  const [searchByTitle, setSearchByTitle] = useState("");
  const [statusSearch, setStatusSearch] = useState([]);
  const [pagesArray, setPagesArray] = useState([]);

  const token = localStorage.getItem("userToken");
  const getTitleValue = (e: string) => {
    setSearchByTitle(e.target.value);

    getTasksList(1, 10, searchByTitle, e.target.value);
  };
  const getStatusValue = (e: string) => {
    setStatusSearch(e.target.value);
    getTasksList(1, 10, e.target.value, searchByTitle);
  };
  const navigate = useNavigate();
  const goToAddTasks = () => {
    navigate("/dashboard/add-tasks");
  };
  const getTasksList = async (
    pageNo: number,
    pageSize: number,
    status: string,
    title: string
  ) => {
    try {
      let response = await axios.get(`${baseUrl}/Task/manager?`, {
        headers: { Authorization: token },
        params: {
          pageNumber: pageNo,
          pageSize: pageSize,
          status: status,
          title: title,
        },
      });

      setPagesArray(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );

      console.log(response.data.totalNumberOfPages);
      setTaskList(response.data.data);
      //toast.success("password changed successfully");
    } catch (error: string) {
      toast.error(error?.response?.data?.message || "There's a mistake.");
    }
  };

  useEffect(() => {
    getTasksList(1, 10);
  }, []);
  return (
    <>
      <div className="title d-flex justify-content-between">
        <h3>Tasks</h3>
        <button
          onClick={goToAddTasks}
          className="btn btn-warning rounded-5 text-white"
        >
          <i className="fa fa-plus "></i> Add New Task
        </button>
      </div>

      <div className="row p-4 ">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control  "
            placeholder="Search by Title"
            onChange={getTitleValue}
          />
        </div>

        {
          <div className="col-md-6">
            <select className="form-control" onChange={getStatusValue}>
              <option value="">search by status</option>
              <option>ToDo</option>
              <option>InProgress</option>
              <option>Done</option>
            </select>
          </div>
        }

        {/*<div className="col-md-6">
          <input
            type="text"
            className="form-control "
            placeholder="Search by status"
            onChange={getStatusValue}
          />
  </div>*/}
      </div>

      <div className="table-container  text-center px-5 ">
        {taskList.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">title</th>
                <th scope="col">status</th>
                <th scope="col">description</th>
                <th scope="col">project</th>
              </tr>
            </thead>
            <tbody>
              {taskList.map((task: object) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.status}</td>
                  <td>{task.description}</td>
                  <td>{task.project.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <button className="page-item btn btn-white">
              <a className="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </button>
            {pagesArray.map((pageNo: number) => (
              <button
                key={pageNo}
                onClick={() =>
                  getTasksList(pageNo, 10, statusSearch, searchByTitle)
                }
                className="page-item btn btn-white"
              >
                <a className="page-link">{pageNo}</a>
              </button>
            ))}

            <button className="page-item btn btn-white">
              <a className="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </button>
          </ul>
        </nav>
      </div>
    </>
  );
}

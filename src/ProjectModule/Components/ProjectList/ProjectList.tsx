import { useContext, useEffect, useState } from "react";

import axios from "axios";
import { baseUrl } from "../../../Constants/Components/Urls";
import styles from "./ProjectList.module.css";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../SharedMoudule/Components/DeleteModal/DeleteModal";
import Loading from "../../../SharedMoudule/Components/Loading/Loading";
import NoData from "../../../SharedMoudule/Components/NoData/NoData";
import Pagination from "../../../SharedMoudule/Components/Pagination/Pagination";
import { AuthContext } from "../../../Context/Components/AuthContext";

export default function ProjectList() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [titleSearch, setTitleSearch] = useState("");
  const [projects, setProjects] = useState([]);
  const [pageArray, setPageArray] = useState([]);
  const token = localStorage.getItem("userToken");
  const {userRole}=useContext(AuthContext);


  const closeModal = () => {
    setOpenDeleteModal(false);
  };


  const getAllProject = async (pageNumber ,title) => {
    let url;
    if (userRole=='Manager') {
      url=`${baseUrl}/Project/manager`;
    }
    else{
      url=`${baseUrl}/Project/employee`
    }

    try {
     setIsLoading(true)
    //  employee
    
      const response = await axios.get(url, {
        headers: { Authorization: token },
        params: {
          pageSize:10,
          pageNumber,
          title
        },
      });

      setPageArray(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );

      console.log(response.data);
      setProjects(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProject( pageNum , titleSearch);
  }, [pageNum,titleSearch]);

  // ##################### Filtration ##############################
  const searchByTitle = (title: string) => {    
    
    setTitleSearch(title);
  };

  return (
    <>
      <div className={`${styles.title} rounded-3 pt-3 slide-in-bottom textColer`}>
        <div className={`d-flex flex-wrap align-items-center  justify-content-center justify-content-sm-between rounded-3 mx-3  p-3 bg-white textColer`}>
          <h3 className="me-2">Projects</h3>
          {
            userRole=='Manager'?
            <button
            className="btn btn-warning  btn-addProject  rounded-4 btn text-white ms-2"
            onClick={() => navigate("/dashboard/projects/projects-form/add")}
          >
            <i className="fa-solid fa-plus text-white"></i>Add New Project
          </button>
          :''
          }
        </div>
        <div className="row mx-3 rounded-3 my-3 bg-white textColer">
        <div className={`p-3 col-12 col-md-4 me-auto   ${styles.borderless}`}>
          <input
            type="text"
            className="form-control shadow rounded-5 bordersInputs"
            onChange={(e) => searchByTitle(e.target.value)}
            value={titleSearch}
            placeholder="Search By Title"
          />
        </div>
        </div>
       
        {isLoading ? (
          <div className="  pt-5 mt-5 ">
            <Loading components={1} />
          </div>
        ) : (
          <>
            <div className=" p-3 table-responsive ">
              {projects.length > 0 ? (
                <table className="table table-striped text-center  caption-top ">
                  <thead className={`${styles.bg} `}>
                    <tr>
                   
                      <th className={`${styles.test2}   `} scope="col">
                        Title
                      </th>
                      <th className={`${styles.verticalRule}   `} scope="col">
                        Description
                      </th>
                      <th className={`${styles.verticalRule}  ${userRole === "Employee" ?styles.test1:""} `} scope="col">
                        TaskNum
                      </th>
                      {userRole === "Employee" ?"":<>
                      <th
                        className={` ${styles.test1} ${styles.verticalRule}`}
                        scope="col"
                      >
                        Actions
                      </th>
                      </>}
                    </tr>
                  </thead>

                  <tbody>
                    {projects.map((pro: any) => (
                      <tr  key={pro.id}>
                        <td className="p-3">{pro.title}</td>
                        <td className="p-3">{pro.description}</td>
                        <td className="p-3">{pro.task.length}</td>
                          {userRole === "Employee" ?"":<>
                        <td className="p-3">
                          <button
                            className={`${styles.solid}`}
                            onClick={() => {
                              localStorage.setItem("curruntProjectId", pro.id);
                              navigate(
                                "/dashboard/projects/projects-form/update"
                              );
                            }}
                          >
                            <i
                              className="fa fa-edit text-warning mx-2"
                              aria-hidden="true"
                            >
                              
                            </i>
                          </button>
                          <button
                            className={`${styles.solid}`}
                            onClick={() => {
                              setOpenDeleteModal(true);
                              setCurrentProjectId(pro.id);
                            }}
                          >
                            <i
                              className="fa fa-trash text-danger mx-2"
                              aria-hidden="true"
                            ></i>
                          </button>
                        </td>
                          </>}
                      </tr>
                    ))}
                  </tbody>
                
                </table>
              ) : (
                <NoData />
              )}
            </div>
            <div> {projects.length > 0 ? <Pagination
          pagesArray={pageArray}
          setPageNum={setPageNum}
          pageNum={pageNum}
        />:""}</div>
          </>
        )}

      </div>
      {openDeleteModal && (
        <DeleteModal
          id={currentProjectId}
          closeDeleteModal={closeModal}
          getList={getAllProject}
          titleSearch={titleSearch}
          pageNum={pageNum}
          type={"Project"}
        />
      )}
    </>
  );
}

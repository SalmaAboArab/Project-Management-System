import { useEffect, useState } from "react";

import axios from "axios";
import { baseUrl } from "../../../Constants/Components/Urls";
import styles from "./ProjectList.module.css";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../SharedMoudule/Components/DeleteModal/DeleteModal";
import Loading from "../../../SharedMoudule/Components/Loading/Loading";
import NoData from "../../../SharedMoudule/Components/NoData/NoData";
import Pagination from "../../../SharedMoudule/Components/Pagination/Pagination";

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
  const closeModal = () => {
    setOpenDeleteModal(false);
  };

  const getAllProject = async (pageNumber ,title) => {
    try {
      console.log({pageNumber ,title});
      
      const response = await axios.get(`${baseUrl}/Project/manager`, {
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
      <div className={`${styles.title} vh-100 pt-3 slide-in-bottom`}>
        <div
          className={`d-flex justify-content-between rounded-3 mx-2  p-3 bg-white`}
        >
          <h3 className="textColer">Projects</h3>
          <button
            className="btn-warning rounded-4 btn text-white"
            onClick={() => navigate("/dashboard/projects/projects-form/add")}
          >
            <i className="fa-solid fa-plus text-white"></i>Add New Project
          </button>
        </div>
        <div className="row mx-2 rounded-3 my-3 bg-white">
        <div className={`p-3 col-12 col-md-5   ${styles.borderless}`}>
          <input
            type="text"
            className="form-control shadow rounded-5  border border-1"
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
            <div className=" p-3 table-responsive">
              {projects.length > 0 ? (
                <table className="table table-striped text-center  caption-top">
                  <thead className={`${styles.bg} `}>
                    <tr>
                      {/* <th className={` ${styles.test2}`} scope="col">
                        #
                      </th> */}
                      <th className={`${styles.test2}   `} scope="col">
                        Title
                      </th>
                      <th className={`${styles.verticalRule}   `} scope="col">
                        Description
                      </th>
                      <th className={`${styles.verticalRule}   `} scope="col">
                        TaskNum
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
                    {projects.map((pro: any) => (
                      <tr  key={pro.id}>
                        {/* <th  scope="row">{pro.id}</th> */}
                        <td className="p-3">{pro.title}</td>
                        <td className="p-3">{pro.description}</td>
                        <td className="p-3">{pro.task.length}</td>
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
                      </tr>
                    ))}
                  </tbody>
                  <tfoot ><tr>
                    <td className="rounded-bottom-4 border-0  " colSpan={10}>

                    {projects.length > 0 ? <Pagination
          pagesArray={pageArray}
          setPageNum={setPageNum}
          pageNum={pageNum}
        />:""}
                    </td>
                    </tr></tfoot>
                </table>
              ) : (
                <NoData />
              )}
            </div>
          </>
        )}

      </div>
      {/* {openDeleteModal && (
        <DeleteModal
          id={currentProjectId}
          closeDeleteModal={closeModal}
          getList={getAllProject}
          titleSearch={titleSearch}
          pageNum={pageNum}
          type={"Project"}
        />
      )} */}
    </>
  );
}

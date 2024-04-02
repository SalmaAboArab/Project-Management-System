import { useEffect, useState } from "react";

import axios from "axios";
import { baseUrl } from "../../../Constants/Components/Urls";
import styles from "./ProjectList.module.css";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../SharedMoudule/Components/DeleteModal/DeleteModal";
import Loading from "../../../SharedMoudule/Components/Loading/Loading";
import NoData from "../../../SharedMoudule/Components/NoData/NoData";

export default function ProjectList() {
  const[isLoading,setIsLoading]=useState(true);
  const navigate = useNavigate();
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
const closeModal = () => {
    setOpenDeleteModal(false);
  };
  const [projects, setProjects] = useState([]);
  const [pageArray, setPageArray] = useState([]);
  const token = localStorage.getItem("userToken");


  const paginationData = { pageNumber: 1, pageSize: 10, title: "" };

  const getAllProject = async (paginationData: any) => {
    try {
     setIsLoading(true)
      const response = await axios.get(`${baseUrl}/Project/manager`, {
        headers: { Authorization: token },
        params: {
          pageSize: paginationData.pageSize,
          pageNumber: paginationData.pageNo,
          title: paginationData.title,
        },
      });

      setPageArray(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );

      console.log(response.data);
      setProjects(response.data.data);
setIsLoading(false)     
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getAllProject(
      paginationData.pageNumber,
      paginationData.pageSize,
      paginationData.title
    );
  }, []);
  
  // ##################### Filtration ##############################
  const [titleSearch, setTitleSearch] = useState("");
  const searchByTitle = (title: string) => {
    paginationData.title = titleSearch;
    setTitleSearch(title);
    getAllProject(paginationData, titleSearch);
  };

  return (
    <>
      <div className={`${styles.title} vh-100 pt-3 slide-in-bottom`}>
        <div className={`d-flex justify-content-between rounded-3 mx-3  p-3 bg-white`}>
          <h3 className="textColer">Projects</h3>
          <button
            className="btn-warning rounded-4 btn text-white"
            onClick={() => navigate("/dashboard/projects/projects-form/add")}
          >
            <i className="fa-solid fa-plus text-white"></i>Add New Project
          </button>
        </div>
        <div className={`p-3 w-75 m-auto ${styles.borderless}`}>
          <input
            type="text"
            className="form-control rounded-5 "
            onChange={(e) => searchByTitle(e.target.value)}
            value={titleSearch}
            placeholder="Search By Title"
          />
        </div>
        {isLoading?(<div className="  pt-5 mt-5 ">
            <Loading components={1} />
          </div>):
          
        (<>
        
          <div className=" p-3 table-responsive">
          {projects.length > 0 ? (
            <table className="table table-striped text-center  caption-top">
              <thead className={`${styles.bg} `}>
                <tr>
                  <th className={` ${styles.test2}`} scope="col">
                    #
                  </th>
                  <th className={`${styles.verticalRule}   `} scope="col">
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
   <tr key={pro.id}>
     <th scope="row">{pro.id}</th>
     <td>{pro.title}</td>
     <td>{pro.description}</td>
     <td>{pro.task.length}</td>
     <td>
       <button
         className={`${styles.solid}`}
         onClick={() => {
           localStorage.setItem(
             "curruntProjectId",
             pro.id
           );
           navigate("/dashboard/projects/projects-form/update");
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

             
            </table>
          ) : (
            <NoData/>
          )}
        </div>
        {projects.length > 0?
        <div className="d-flex justify-content-center bg-white pt-2 mx-3 rounded-3 ">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <button
                  className={`${styles.solid} p-0 m-0`}
                  aria-label="Previous"
                >
                  <span
                    className={`page-link ${styles.paginationBtn}`}
                    aria-hidden="true"
                  >
                    &laquo;
                  </span>
                </button>
              </li>
              {pageArray.map((pageNo, index) => (
                <li key={index} className="page-item">
                  <button
                    className={`${styles.solid} p-0 m-0`}
                    onClick={() => getAllProject(pageNo)}
                    aria-label={`go to page${pageNo}`}
                  >
                    <span className={`page-link ${styles.paginationBtn}`}>
                      {pageNo}
                    </span>
                  </button>
                </li>
              ))}
              <li className="page-item">
                <button className={`${styles.solid} p-0 m-0`} aria-label="Next">
                  <span
                    className={`page-link ${styles.paginationBtn}`}
                    aria-hidden="true"
                  >
                    &raquo;
                  </span>
                </button>
              </li>
            </ul>
          </nav>
        </div>:""}
        </>)}
       
        
       
      </div>
      {openDeleteModal && (
        <DeleteModal
          id={currentProjectId}
          closeDeleteModal={closeModal}
          getList={getAllProject}
          type={"Project"}
        />
      )}
    </>
  );
}

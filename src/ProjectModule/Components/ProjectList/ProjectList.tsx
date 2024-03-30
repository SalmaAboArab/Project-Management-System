import { useEffect, useState } from "react";

import axios from "axios";
import { baseUrl } from "../../../Constants/Components/Urls";
import styles from "./ProjectList.module.css"
import noData from "../../../assets/noData.jpg"

export default function ProjectList() {
const[projects,setProjects]=useState([]);
const[pageArray,setPageArray]=useState([]);

const paginationData={pageNumber:1,
  pageSize:5,
 title:"",
 }

const getAllProject=async(paginationData:any)=>{
try {
  const token=localStorage.getItem("userToken");
  const response=await axios.get(`${baseUrl}/Project/manager`,
  {headers:{Authorization:token}
  ,params:{pageSize:paginationData.pageSize,
    pageNumber:paginationData.pageNo,
  title:paginationData.title}})

  setPageArray(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1));

  console.log(response.data)
  setProjects(response.data.data); 
} catch (error) {
  console.log(error)
}
}

useEffect(()=>{ 
getAllProject(paginationData.pageNumber,paginationData.pageSize,paginationData.title);
},[])
// ##################### Filtration ##############################
const[titleSearch,setTitleSearch]=useState("");
const searchByTitle=(title:string)=>{
  paginationData.title=titleSearch;
setTitleSearch(title)
getAllProject(paginationData,titleSearch)
}


  return (
    <>

   <div className={`${styles.title} vh-100`} >
   <div className={`d-flex justify-content-between p-3 bg-white`}>
      <h3>
        Projects
      </h3>
      <button className="btn-warning rounded-4 btn"><i className="fa-solid fa-plus"></i>Add New Project</button>
    </div>
<div className={`p-3 w-75 m-auto ${styles.borderless}`}  >
  <input type="text"  className="form-control rounded-5 "
    onChange={(e)=>searchByTitle(e.target.value)}  value={titleSearch} placeholder="Search By Title"/>
</div>
    <div className="table p-3 ">
    {projects.length>0?<table className ="table table-striped text-center caption-top">
   
  <thead className={`${styles.bg}`}>
<tr>

<th className={` ${styles.test2}`} scope="col">#</th>
            <th className={`${styles.verticalRule }   `} scope="col">Title</th>         
            <th className={`${styles.verticalRule }   `} scope="col">Description</th>
            <th className={`${styles.verticalRule }   `} scope="col">TaskNum</th>
            <th className={` ${styles.test1} ${styles.verticalRule }`} scope="col">Action</th>


    </tr>
</thead>
 
<tbody>
  {projects.map((pro:any)=>(
    <tr key={pro.id}  >
    <th scope="row">{pro.id}</th>
    <td>{pro.title}</td>
    <td>{pro.description}</td>
    <td>{pro.task.length}</td>
    <td>
         <button  className={`${styles.solid}`} ><i 
   className='fa fa-edit text-warning mx-2' aria-hidden="true"> </i></button>
       <button  className={`${styles.solid}`}  >
  <i className='fa fa-trash text-danger mx-2' aria-hidden="true"></i></button>
      
    </td>
 
  </tr>
  ))}
   
</tbody>
</table>:<div className="text-center">
  <img src={noData} className="w-50 "/>
  </div>}
    </div>
    
    <div className='d-flex justify-content-center bg-white pt-2  '>
<nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <button  className={`${styles.solid} p-0 m-0`}
       aria-label="Previous">
        <span className={`page-link ${styles.paginationBtn}`} aria-hidden="true">&laquo;</span>
      </button>
    </li>
    {pageArray.map((pageNo,index)=>(
 <li key={index} className="page-item" >
  <button className={`${styles.solid} p-0 m-0`} onClick={()=>getAllProject(pageNo)}
   aria-label={`go to page${pageNo}`}>
    <span className={`page-link ${styles.paginationBtn}`}  >{pageNo}</span></button></li>
    ))}
    <li className="page-item">
      <button   className={`${styles.solid} p-0 m-0`}
       aria-label="Next">
        <span className={`page-link ${styles.paginationBtn}`} aria-hidden="true">&raquo;</span>
      </button>
    </li>
  </ul>
</nav>
</div>
   </div>
  
     </>
  )
}

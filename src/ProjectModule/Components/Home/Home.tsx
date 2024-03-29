import React, { useEffect, useState } from 'react'
import styles from "./Home.module.css"
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import {Tooltip,Title,ArcElement,Legend,Chart as ChartJS} from "chart.js"
import { baseUrl } from '../../../Constants/Components/Urls';
ChartJS.register(Tooltip,Title,ArcElement,Legend);


export default function Home() {
const[taskToDo,setTaskToDo]=useState(0);
const[taskProgres,setTaskProgres]=useState(0);
const[taskDone,setTaskDone]=useState(0);
const[userActive,setUserActive]=useState(0);
const[userInActive,setUserInActive]=useState(0);



const countTasks=async()=>{
  try {
    const token=localStorage.getItem("userToken")
    const response=await axios.get(`${baseUrl}/Task/count`,{headers:{Authorization:token}}) 
    setTaskToDo(response.data.toDo);
    setTaskProgres(response.data.inProgress);
    setTaskDone(response.data.done);
  
    console.log(response?.data);
   
  } catch (error) {
    console.log(error)
  }
}


const activeTasks=async()=>{
  try {
    const token=localStorage.getItem("userToken")
    const response=await axios.get(`${baseUrl}/Users/count`,{headers:{Authorization:token}}) 
    setUserActive(response.data.activatedEmployeeCount);
    setUserInActive(response.data.deactivatedEmployeeCount);
   
    console.log(response?.data);
  } catch (error) {
    console.log(error)
  }
}
const dataProgress = {
  datasets: [{
      data: [taskToDo,taskProgres,taskDone],
      backgroundColor:[
        " rgb(198, 160, 182)",
       'rgb(67, 135, 64)',
       " rgb(168, 176, 249)"
      ],
  }],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: [
      'ToDo',
      "inProgress",
      "Done"
  ]
};

const dataActive = {
  datasets: [{
      data: [userActive,userInActive],
      backgroundColor:[
        " rgb(114, 154, 145)",
       ' rgb(217, 138, 147)',
      
      ],
  }],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: [
      "Active",
      "InActive"
  ]
};

useEffect(()=>{
  countTasks();
  activeTasks();
 
},[])

  return (
    <>
    <div className="container-fluid  pt-3">
      <div className="row">
        <div className="col-md-6 ">
          <div className='row gy-4  ' >
      <div className='d-flex '>
      <div className={`${styles.vertical}`}></div>
      <div className='p-3'><h3>Tasks</h3>
      <p>Lorem fuga molestias, velit eius neque doloribus numquam facere vel </p></div>
        
       
      </div>
         <div className='col-md-3 '>

<div className={` ${styles.designTask} rounded-4 pt-2 px-3`} style={{backgroundColor:"#E5E6F4"}}>

  <i className={`fa-brands fa-squarespace  rounded-4 p-2 fa-2x mx-2 my-2`} style={{backgroundColor:"#CFD1EC"}}></i>
  
<h5 className='text-muted'>ToDo</h5>
<h4>{taskToDo}</h4>
</div>
 </div>
            <div className='col-md-3'>

<div className={` ${styles.designTask} rounded-4  pt-2 px-3`} style={{backgroundColor:"#F4F4E5"}}>
<i className={`fa-solid fa-bars-progress  rounded-4 p-2 fa-2x mx-2 my-2`} style={{backgroundColor:"#E4E4BC"}}></i>
<h5 className='text-muted'>In Progress</h5>
<h4>{taskProgres}</h4>
</div>
</div>
<div className='col-md-3'>

<div className={` ${styles.designTask} rounded-4 pt-2 px-3`} style={{backgroundColor:"#F4E5ED"}}>
<i className={`fa-regular fa-circle-check  rounded-4 p-2 fa-2x mx-2 my-2`} style={{backgroundColor:"#E7C3D7"}}></i>
<h5 className='text-muted'>Done</h5>
<h4>{taskDone}</h4>

</div>
</div>
         </div>
          </div>
          <div className="col-md-6 ">
          <div className='row gy-4 ' >
      <div className='d-flex '>
      <div className={`${styles.vertical}`}></div>
      <div className='p-3'><h3>Users</h3>
      <p>Lorem fuga molestias, velit eius neque doloribus numquam facere vel </p></div>
        
       
      </div>
         <div className='col-md-3'>

<div className={` ${styles.designTask} rounded-4 pt-2 px-3`} style={{backgroundColor:"#E5E6F4"}}>
  <i className={`fa-solid fa-chart-line rounded-4 p-2 fa-2x mx-2 my-2`} style={{backgroundColor:"#CFD1EC"}}></i>
  
<h5 className='text-muted'>Active</h5>
<h4>{userActive}</h4>
</div>
 </div>
            <div className='col-md-3'>

<div className={` ${styles.designTask} rounded-4  pt-2 px-3`} style={{backgroundColor:"#F4F4E5"}}>

<i className={`fa-brands fa-creative-commons-nc  rounded-4 p-2 fa-2x mx-2 my-2`} style={{backgroundColor:"#E4E4BC"}}></i>
<h5 className='text-muted'>In Active</h5>
<h4>{userInActive}</h4>
</div>
</div>
         </div>
          </div>
        </div>
    <div className="row m-auto pt-2">
      <div className="col-md-6">
        <div style={{width:"50%"}} >
        <Doughnut  data={dataProgress}/>
        </div>
      </div>

      <div className="col-md-6">
        <div style={{width:"50%"}} >
        <Doughnut  data={dataActive}/>
        </div>
      </div>
    </div>
      </div>
   
    </>
  )
}

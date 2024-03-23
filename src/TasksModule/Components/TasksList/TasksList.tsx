import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../../../Constants/Components/Urls';
import DeleteModal from '../../../SharedMoudule/Components/DeleteModal/DeleteModal';

export default function TasksList() {
  const navigate=useNavigate();
  const token=localStorage.getItem('userToken');
  const [openDeleteModal,setOpenDeleteModal]=useState(false);
  const [currentTaskId,setCurrentTaskId]=useState(null);
  const [Tasks,setTasks]=useState(null);
  const closeModal=()=>{
    setOpenDeleteModal(false);
  }

  const getdata=async()=>{
    let response=await axios.get(`${baseUrl}/Task/manager?pageSize=10&pageNumber=1`,{headers:{Authorization:token}})
    console.log("All Tasks ",response.data.data);
    setTasks(response.data.data);
    
  }
  useEffect(()=>{
    getdata();
  },[])
  return (
    <>
    <div>TasksList</div>
    <button className='btn btn-info' onClick={()=>navigate('/dashboard/tasks-form/add')}>add</button>
    <button className='btn btn-warning' onClick={()=>{localStorage.setItem('curruntTaskId',Tasks[0].id); navigate('/dashboard/tasks-form/update');}}>update</button>
    <button className='btn btn-danger' onClick={()=>{setOpenDeleteModal(true); setCurrentTaskId(Tasks[0].id)}}>delete</button>
    {openDeleteModal&&<DeleteModal id={currentTaskId} closeDeleteModal={closeModal} getList={getdata} type={'Task'}/>}
    </>
  )
}

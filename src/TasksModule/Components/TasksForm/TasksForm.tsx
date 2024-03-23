import React, { useEffect, useState } from 'react'
import styles from './TasksForm.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { baseUrl } from '../../../Constants/Components/Urls';
import { toast } from 'react-toastify';
import Loader from "../../../SharedMoudule/Components/Loading/Loading";

export default function TasksForm() {
    const navigate=useNavigate();
    const {register,handleSubmit,formState:{errors}}=useForm();
    const token=localStorage.getItem('userToken');
    const {action}=useParams();
    const [currentTask,setCurrentTask]=useState(null);
    const curruntTaskId=localStorage.getItem('curruntTaskId');
    const [ProjectsList,setProjectsList]=useState(null);
    const [UsersList,setUsersList]=useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmitAdd= async(data:any)=>{
        setIsLoading(true);
        // console.log(data);
        try {
            let response=await axios.post(`${baseUrl}/Task`,data,{headers:{Authorization:token}});
            console.log('Add task response ',response);
            toast.success('Task Added Successfuly');
            navigate('/dashboard/tasks-list');
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            toast.error(error?.response?.data?.message||'Somthing went wrong!');
        }
        
    }

    const onSubmitUpdate= async(data:any)=>{
        setIsLoading(true);
        // console.log(data);
        // {'title':data.title?data.title:currentTask.title,'description':data.description?data.description:currentTask.description}
        try {
            let response=await axios.put(`${baseUrl}/Task/${curruntTaskId}`,
            {"title": data.title?data.title:currentTask?.title,
            "description": data.description?data.description:currentTask?.description,
            "employeeId": data.employeeId?data.employeeId:currentTask?.employee?.id},
            {headers:{Authorization:token}});
            console.log('Update task response ',response);
            toast.success('Task Updated Successfuly');
            navigate('/dashboard/tasks-list');
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            toast.error(error?.response?.data?.message||'Somthing went wrong!');
        }
        
    }

    const getCurrentTask=async()=>{        
        try {
            let response=await axios.get(`${baseUrl}/Task/${curruntTaskId}`,{headers:{Authorization:token}});
            console.log('current task ',response.data);
            setCurrentTask(response.data);  
        } catch (error) {
            console.log(error);
        }
    }

    const getprojectsList=async()=>{        
        try {
            let response=await axios.get(`${baseUrl}/Project/manager`,{headers:{Authorization:token}});
            console.log('projects list ',response.data.data);
            setProjectsList(response.data.data);  
        } catch (error) {
            console.log(error);
        }
    }
    
    const getusersList=async()=>{        
        try {
            let response=await axios.get(`${baseUrl}/Users`,{headers:{Authorization:token}});
            console.log('users list ',response.data.data);
            setUsersList(response.data.data);  
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getusersList();
        if(action=='update') getCurrentTask();
        else getprojectsList();
    },[])

    
  return (
    <>
    <div className='TaskFormContainer vh-100 bg-light overflow-auto pageOverflow pb-2'>
    <div className="TaskFormHeader bg-white ps-5 py-4">
        <a href="/dashboard/tasks-list" className='text-black'>
        <i className='fa fa-arrow-left me-2'></i>
        View All Tasks
        </a>
        <h2 className='mt-2'>
        {action=='add'?'Add a New Task':'Update Task'}
        </h2>
    </div>
       <form onSubmit={handleSubmit(action=='add'?onSubmitAdd:onSubmitUpdate)} className={`${styles.TaskForm} rounded-4 bg-white shadow container  w-75`}>
       <div className={`mt-5 py-5 px-4 TaskFormInputs`}>
            <div className="title ">
            <label htmlFor="">Title</label>
        <input type="text" placeholder='Name' className='form-control rounded-4 p-3 mt-2'
        defaultValue={action=='add'?'':currentTask?.title}
        {...register('title',
        action=='add'?{required: "Task title is required"}:{})}/>
            </div>
            {errors.description&&<p className='text-danger'>{errors?.title?.message}</p>}

        <div className='description mt-4 '>
        <label htmlFor="">Description</label>
        <textarea placeholder='Description' className='form-control rounded-4 mt-2 pt-3 ps-3 pe-1 pb-5'
        defaultValue={action=='add'?'':currentTask?.description}
        {...register('description',
        action=='add'?{required: "Task description is required"}:{}
        )}
        ></textarea>
        </div>
        {errors.description&&<p className='text-danger'>{errors?.description?.message}</p>}
        
        <div className="options row mt-4">
            <div className={action=='add'?"col-md-6":'col-md-12'}>
                <label htmlFor="">User</label>
            <select name="user" id="" className='w-100 form-select mt-2 rounded-4 p-3'
            {...register('employeeId',
            {required: action=='add'?"User is required":false})}>
                {action=='add'?
                <option value="" disabled selected hidden>No Users Selected</option>
               : <option value="" selected>{currentTask?.employee?.userName}</option>
               }
                {UsersList?.map((user:any)=>
                <option key={user.id} value={user.id} >{user?.userName} </option>
                )}
            </select>
        {errors.employeeId&&<p className='text-danger'>{errors?.employeeId?.message}</p>}
            </div>
            {action=='add'?
            <div className="col-md-6">
            <label htmlFor="">Project</label>
            <select name="project" id="" className='w-100 form-select mt-2 rounded-4 p-3'
            {...register('projectId',
            {required: "Project is required"})}>
            <option value="" disabled selected hidden>No Status Selected</option>
            {ProjectsList?.map((project:any)=>
            <option key={project.id} value={project.id} >{project?.title} </option>
            )}
        </select>
        {errors.projectId&&<p className='text-danger'>{errors?.projectId?.message}</p>}
        </div>
        :''}
        </div>
        </div>

        <div className='line border-top py-4 px-4 row justify-content-between mt-3'>
            <div className="cancel col-xxl-3 col-md-6 my-3 row justify-content-start text-center px-1">
            <button className='btn border border-black rounded-5 col-md-5' onClick={()=>navigate('/dashboard/tasks-list')}>Cancel</button>
            </div>
            <div className="save col-xxl-3 col-md-6 my-3 row justify-content-end text-center px-1">
            <button className={`btn btn-warning rounded-5 text-white col-md-5 ${isLoading ? "noClick" : ""}`}>{isLoading ? <Loader /> : action=='add'?"Add":'Update'}</button>
            </div>
        </div>
       </form>
    </div>
    </>
  )
}
{/* <button
              type="submit"
              className={`btn btn-warning text-center  text-white w-75 rounded-5 mb-2 ${
                isLoading ? "noClick" : ""
              }`}
            >
              {isLoading ? <Loader /> : "Register"}
            </button> */}
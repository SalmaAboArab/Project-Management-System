import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import deleteimg from '../../../assets/delete.png';
import { toast } from 'react-toastify';
import axios from 'axios'
import { baseUrl } from '../../../Constants/Components/Urls';
import Loader from "../../../SharedMoudule/Components/Loading/Loading";

export default function DeleteModal({id,closeDeleteModal,getList,type}) {
    const [deleteShow, setDeleteShow] = useState(true);
    let token=localStorage.getItem('userToken')
    const [isLoading, setIsLoading] = useState(false);
    const deleteHandleClose = () => {setDeleteShow(false); closeDeleteModal()}

    const onSubmitDelete=async()=>{
      setIsLoading(true);
        try{
          let response=await axios.delete(`${baseUrl}/${type}/${id}`,{headers:{Authorization:token}})
          // console.log(response);
          deleteHandleClose();
          toast.success(`${type} deleted succefully`)
          getList()
        }catch(error){
          setIsLoading(false);
          // console.log(error);
          toast.error('Something went wrong!')
        }
      }
  return (
    <Modal show={deleteShow} onHide={deleteHandleClose} centered={true}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <div className='my-3 mx-5'>
            <div className="text-center">
            <img src={deleteimg} alt="trash" className='w-100' />
            <h5 className='fw-bold mt-2'>Delete This {type} ?</h5>
            <p>are you sure you want to delete this {type} ? if you are sure just click on delete it</p>
            </div>
            <div className="text-end pt-3 border-top">
            <button className='btn btn-outline-danger fw-bold  bg-danger text-white' onClick={onSubmitDelete}> {isLoading ? <Loader/> :` Delete this ${type}`}</button>
            </div>
          </div>
        </Modal.Body>
    
      </Modal>
  )
}

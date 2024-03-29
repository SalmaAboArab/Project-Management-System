import React, { useContext, useEffect, useState } from "react";
import styles from "./TasksBoard.module.css";
import axios from "axios";
import { baseUrl } from "../../../Constants/Components/Urls";
import { motion } from "framer-motion";
import { AuthContext } from "../../../Context/Components/AuthContext.js";


export default function TasksBoard() {
  const token = localStorage.getItem("userToken");
  const {userRole}:string=useContext(AuthContext);
  const [toDoTasks, setToDoTasks] = useState<object[]>();
  // interface TaskData{
  //   id:number,
  //   newstatus:string,
  //   oldstatus:string
  // }
  const [inProgressTasks, setInProgressTasks] = useState<object[]>();
  const [doneTasks, setDoneTasks] = useState<object[]>();
  const toDo: object[] = [];
  const inProgress: object[] = [];
  const done: object[] = [];
  // const [isDraggingOver,setIsDraggingOver]=useState<boolean>(false);

  const getUserTasks = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/Task?pageSize=100&pageNumber=1`,
        {
          headers: { Authorization: token },
        }
      );
      console.log("userTasks ", response.data.data);
      setTasks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setTasks = (tasks: object[]) => {
    tasks?.map((task: object) => {
      if (task?.status == "ToDo") toDo.push(task);
      else if (task?.status == "InProgress") inProgress.push(task);
      else done.push(task);
    });
    console.log("to do ", toDo);
    setToDoTasks(toDo);
    setInProgressTasks(inProgress);
    setDoneTasks(done);
  };

  const changeTaskStatus = (e, newstatus: string) => {
    const id = e.dataTransfer.getData("taskId");
    const oldstatus: string = e.dataTransfer.getData("curruntStatus");
    // console.log(id,newstatus,oldstatus);

    if (newstatus != oldstatus) {
      try {
        const response = axios.put(
          `${baseUrl}/Task/${id}/change-status`,
          { status: newstatus },
          {
            headers: { Authorization: token },
          }
        );
        console.log(response);
        getUserTasks();
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    
    getUserTasks();
  }, []);
  return (
    <>
      <div
        className={`TasksBoardContainer vh-100 bg-light overflow-auto pageOverflow pb-2`}
      >
        <div className="TasksBoardHeader bg-white ps-5 py-4">
          <h2 className="mt-2">Tasks Board</h2>
        </div>

        <div
          className={`${styles.boards} row mt-5 vh-100 justify-content-center mx-2 container mx-auto`}
        >
          <motion.div
            className="toDo col-md-4 "
            layout
            layoutId="ToDo"
            onDrop={(e) => {
              e.preventDefault();
              console.log("drop event");
              // e.dataTransfer.setData('newStatus','ToDo');
              changeTaskStatus(e, "ToDo");
            }}
            onDragOver={(e) => {
              e.preventDefault();
              console.log("drag over event");
              // setIsDraggingOver(true);
            }}
            // onDragLeave={(e)=>{
            //   setIsDraggingOver(false)
            // }}
          >
            <h4 className="mb-5">To Do</h4>
            <div className={`${styles.boardContainer} rounded-4 py-4`}>
              {toDoTasks?.map((task: object) => (
                <motion.section
                  className={`p-4 rounded-3 mx-3 text-white mt-4 `}
                  layout
                  layoutId={task?.id}
                  draggable={true}
                  onDragStart={(e) => {
                    console.log("DragStart");
                    e.dataTransfer.setData("TaskId", task?.id);
                    e.dataTransfer.setData("curruntStatus", task?.status);
                    // console.log(e.target);
                  }}
                  // onDragEnd={(e)=>{
                  //   console.log('DragEnd',e);
                  // }}
                >
                  {task?.title}
                </motion.section>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="inProgress col-md-4 "
            layout
            layoutId="InProgress"
            onDrop={(e) => {
              e.preventDefault();
              console.log("drop event");
              // e.dataTransfer.setData('newStatus','InProgress');
              changeTaskStatus(e, "InProgress");
            }}
            onDragOver={(e) => {
              e.preventDefault();
              console.log("drag over event");
              // setIsDraggingOver(true);
            }}
            // onDragLeave={(e)=>{
            //   setIsDraggingOver(false)
            // }}
          >
            <h4 className="mb-5">In progress</h4>
            <div
              className={`${styles.boardContainer} rounded-4 py-4`}
              onDragOver={(e) => {
                e.preventDefault();
                console.log("dragover");
              }}
            >
              {inProgressTasks?.map((task: object) => (
                <motion.section
                  className={`p-4 rounded-3 mx-3 text-white mt-4 `}
                  draggable={true}
                  layout
                  layoutId={task?.id}
                  onDragStart={(e) => {
                    console.log("DragStart");
                    e.dataTransfer.setData("TaskId", task?.id);
                    e.dataTransfer.setData("curruntStatus", task?.status);
                    // console.log(e.target);
                  }}
                  // onDragEnd={(e)=>{
                  //   console.log('DragEnd',e);

                  // }}
                >
                  {task?.title}
                </motion.section>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="done col-md-4 "
            layout
            layoutId="Done"
            onDrop={(e) => {
              e.preventDefault();
              console.log("drop event");
              // e.dataTransfer.setData('newStatus','Done');
              changeTaskStatus(e, "Done");
            }}
            onDragOver={(e) => {
              e.preventDefault();
              console.log("drag over event");
              // setIsDraggingOver(true);
            }}
            // onDragLeave={(e)=>{
            //   setIsDraggingOver(false)

            // }}
          >
            <h4 className="mb-5">Done</h4>
            <div className={`${styles.boardContainer} rounded-4 py-4`}>
              {doneTasks?.map((task: object) => (
                <motion.section
                  className={`p-4 rounded-3 mx-3 text-white mt-4 `}
                  draggable={true}
                  layout
                  layoutId={task?.id}
                  onDragStart={(e) => {
                    console.log("DragStart");
                    e.dataTransfer.setData("TaskId", task?.id);
                    e.dataTransfer.setData("curruntStatus", task?.status);
                    // console.log(e.target);
                  }}
                  // onDragEnd={(e)=>{
                  //   console.log('DragEnd',e);

                  // }}
                >
                  {task?.title}
                </motion.section>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

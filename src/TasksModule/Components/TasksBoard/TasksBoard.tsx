import React, { useContext, useEffect, useState } from "react";
import styles from "./TasksBoard.module.css";
import axios from "axios";
import { baseUrl } from "../../../Constants/Components/Urls";
import { motion } from "framer-motion";
import { AuthContext } from "../../../Context/Components/AuthContext.js";
import { useNavigate } from "react-router-dom";


type TaskData={
  id:number;
  title:string;
  description:string;
  status:Status;
}
type updateStatus = (e: any, newStatus: Status) => void;

export default function TasksBoard() {
  const token = localStorage.getItem("userToken");
  const {userRole}=useContext(AuthContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<TaskData[]>([]);

  const toDoTasks : TaskData[]= tasks.filter(({status})=> status ==="ToDo");
  const inProgressTasks : TaskData[]= tasks.filter(({status})=> status ==="InProgress");
  const doneTasks : TaskData[]= tasks.filter(({status})=> status ==="Done");
  const getUserTasks = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/Task?pageSize=100&pageNumber=1`,
        {
          headers: { Authorization: token },
        }
      );
      setTasks(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeTaskStatus:updateStatus = async(e, newstatus) => {
    const id = e.dataTransfer.getData("taskId");
    const oldstatus: string = e.dataTransfer.getData("curruntStatus");

    if (newstatus != oldstatus) {
      const newCards = tasks.map((task) => {
        if (task.id != id) return task;
        if (task.status == newstatus) task;
        const newCard = { ...task, status: newstatus };
        return newCard;
      });
      setTasks(newCards);
      try {
        const response =await axios.put(
          `${baseUrl}/Task/${id}/change-status`,
          { status: newstatus },
          {
            headers: { Authorization: token },
          }
        );

        getUserTasks();
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if(userRole=='Manager'){
      navigate('/dashboard');
    }
    getUserTasks();
  }, []);
  return (
    <>
      <div
        className={`TasksBoardContainer vh-100 bg-light overflow-auto pageOverflow pb-2 slide-in-bottom`}
      >
        <div className="TasksBoardHeader bg-white ps-5 py-4 textColer">
          <h2 className="mt-2">Tasks Board</h2>
        </div>

        <div
          className={`${styles.boards} row mt-5 vh-100 justify-content-center mx-2 container mx-auto`}
        >
          <Column
        changeStatus={changeTaskStatus}
        tasksArray={toDoTasks}
        status="ToDo"
        title="To Do"
      />
      <Column
        changeStatus={changeTaskStatus}
        tasksArray={inProgressTasks}
        status="InProgress"
        title="In Progress"
      />
      <Column
        changeStatus={changeTaskStatus}
        tasksArray={doneTasks}
        status="Done"
        title="Done"
      />
        </div>
      </div>
    </>
  );
}

type Status = "ToDo" | "Done" | "InProgress";
type ColumnProps = {
  title: string;
  tasksArray: TaskData[];
  status: Status;
  changeStatus: updateStatus;
};
const Column = ({ title, status, tasksArray, changeStatus }: ColumnProps) => {

  return (
<motion.div
            className="toDo textColer col-md-4 "
            layout
            
            onDrop={(e) => {
              e.preventDefault();
              changeStatus(e, status);
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            
          >
            <h4 className="mb-5">{title}</h4>
            <div className={`${styles.boardContainer} rounded-4 py-4`}>
              {tasksArray?.map((task) => (
                <Card key={task.id} card={task} />
              ))}
            </div>
          </motion.div>

  );
};

type CardProps = {
  card: TaskData;
};
const Card = ({ card }: CardProps) => {
  const { id, title, status } = card;
  return (
    <motion.section
                  className={`p-4 rounded-3 mx-3 text-white mt-4 `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  layout
                  layoutId={id}
                  draggable={true}
                  onDragStart={(e) => {
                    e?.dataTransfer?.setData("TaskId", id);
                    e?.dataTransfer?.setData("curruntStatus", status);
                  }}
                >
                  {title}
                </motion.section>
  );
};
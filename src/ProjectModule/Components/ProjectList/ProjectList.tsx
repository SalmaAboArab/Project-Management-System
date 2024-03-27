import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../Constants/Components/Urls";
import DeleteModal from "../../../SharedMoudule/Components/DeleteModal/DeleteModal";

export default function ProjectList() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [projects, setProjects] = useState(null);
  const closeModal = () => {
    setOpenDeleteModal(false);
  };

  const getProjects = async () => {
    const response = await axios.get(`${baseUrl}/Project`, {
      headers: { Authorization: token },
    });
    console.log("All Projects ", response.data.data);
    setProjects(response.data.data);
  };
  useEffect(() => {
    getProjects();
  }, []);
  return (
    <>
      <div>ProjectList</div>
      <button
        className="btn btn-info"
        onClick={() => navigate("/dashboard/projects/projects-form/add")}
      >
        add
      </button>
      <button
        className="btn btn-warning"
        onClick={() => {
          localStorage.setItem("curruntProjectId", projects[0].id);
          navigate("/dashboard/projects/projects-form/update");
        }}
      >
        update
      </button>
      <button
        className="btn btn-danger"
        onClick={() => {
          setOpenDeleteModal(true);
          setCurrentProjectId(projects[0].id);
        }}
      >
        delete
      </button>
      {openDeleteModal && (
        <DeleteModal
          id={currentProjectId}
          closeDeleteModal={closeModal}
          getList={getProjects}
          type={"Project"}
        />
      )}
    </>
  );
}

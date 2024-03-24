import { useEffect, useState } from "react";
import { Watch } from "react-loader-spinner";
import PagesHeader from "../../../SharedMoudule/Components/PagesHeader/PagesHeader";
import Filter from "../../../SharedMoudule/Components/Filter/Filter";
import axios from "axios";
import { baseUrl } from "../../../Constants/Components/Urls";
import { toast } from "react-toastify";
import styles from "./UsersList.module.css/";
import Loading from "../../../SharedMoudule/Components/Loading/Loading";
import { Button, Modal } from "react-bootstrap";
import Pagination from "../../../SharedMoudule/Components/Pagination/Pagination";
export default function UsersList() {
  const [pagesArray, setPagesArray] = useState("")
  const [isLoading, setIsLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);
  const [usersId, setUsersId] = useState("");
  const [isActivatedUser, setIsActivatedUser] = useState("");
  const [showToggle, setShowToggle] = useState(false);
  const [showView, setShowView] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [pageNum, setPageNum] = useState(1)
  const handleCloseView = () => setShowView(false);
  const handleShowView = () => setShowView(true);

  const handleCloseToggle = () => setShowToggle(false);
  const handleShowToggle = () => setShowToggle(true);

  async function getToggleActivatedEmployee() {
    try {
      const { data } = await axios.put(
        `${baseUrl}/Users/${usersId}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("userToken"),
          },
        }
      );
      getUsersList();
      handleCloseToggle();
      if (data.isActivated) {
        toast.success("Active user 😍😍");
      } else {
        toast.success("No Active user ☹️☹️");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "There was a mistake toggling user activation."
      );
    }
  }

  async function getUsersList() {
    try {
      const data  = await axios.get(
        `${baseUrl}/Users?pageSize=10&pageNumber=${pageNum}`,
        {
          headers: {
            Authorization: localStorage.getItem("userToken"),
          },
        }
      );
      console.log(data.data);
      
      setUsersList(data.data.data);
      setPagesArray(Array(data.data?.totalNumberOfPages).fill().map((_, i) => i + 1));

    } catch (error) {
      toast.error(error?.response?.data?.message || "There's a mistake.");
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getUsersList();
  }, [pageNum]);

  //? ===========handle Date==============>>
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    return formattedDate;
  };
  return (
    <>
      <div className="container-fluid d-flex flex-column   ">
        <PagesHeader title={"Users"} />
        {!isLoading ? (
          <>
            <Filter setUsersList={setUsersList} />
            {usersList.length > 0 ? (
              <div className="table-responsive w-100">
                <table className="w-100   table text-center">
                  <thead className=" p-4">
                    <tr>
                      <th>UserName</th>
                      <th>Statues</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Date Created</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="position-relative">
                    {usersList.map((user) => (
                      <tr key={user.id}>
                        <td>{user.userName}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.isActivated ? (
                            <span className="text-bg-success p-1 rounded-1">
                              Active
                            </span>
                          ) : (
                            <span className="text-bg-danger p-1 rounded-1">
                              No Active
                            </span>
                          )}
                        </td>
                        <td>{user.phoneNumber}</td>
                        <td>{formatDate(user.creationDate)}</td>{" "}
                        <td>
                          <div className="dropdown ">
                            <button
                              className="border-0 bg-body"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className=" h5 me-1 fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <ul
                              className={`${styles.dropBtn} dropdown-menu text-black `}
                            >
                              <li className="position-relative">
                                <span
                                  className={`${styles.triangle} position-absolute `}
                                >
                                  <i className="border-1  h2 fa-solid fa-caret-up"></i>
                                </span>
                              </li>
                              <li>
                                {" "}
                                <button
                                  onClick={() => {
                                    setUserDetails(user);
                                    handleShowView();
                                  }}
                                  className="dropdown-item "
                                  type="button"
                                >
                                  <i className="fa-solid fa-eye me-1 text-success"></i>
                                  View
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() => {
                                    setUsersId(user.id);
                                    setIsActivatedUser(user.isActivated);
                                    handleShowToggle();
                                  }}
                                  className="dropdown-item "
                                  type="button"
                                >
                                  {user.isActivated ? (
                                    <i className="text-danger fa-solid fa-toggle-off me-1"></i>
                                  ) : (
                                    <i className="h5 text-success fa-solid fa-toggle-on me-1"></i>
                                  )}
                                  Toggle
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                     
                      <td colSpan={10} >
                      <Pagination pageNum={pageNum} setPageNum={setPageNum} pagesArray={pagesArray}/>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              "d"
            )}{" "}
          </>
        ) : (
          <div className=" pt-5 mt-5 ">
            <Loading components={1} />
          </div>
        )}
      </div>

      <>
        <Modal
          show={showToggle}
          onHide={handleCloseToggle}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Toggle Activated Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body className="h5 text-center">
            {isActivatedUser
              ? "Are you sure to make this user no active ?😔"
              : "Are you sure to make this user active ?😍"}
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => getToggleActivatedEmployee()}
              variant={!isActivatedUser ? "success" : "danger"}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showView}
          onHide={handleCloseView}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>User Details📑🙋‍♂️</Modal.Title>
          </Modal.Header>

          <Modal.Body className="h5">
            <div>
              <h5>
                User Name:<span> {userDetails.userName}</span>
              </h5>
              <h5>
                Email:<span> {userDetails.email}</span>
              </h5>
              <h5>
                This user:
                <span> {userDetails.isActivated ? "Active" : "no Active"}</span>
              </h5>
              <h5>
                PhoneNumber:<span>{userDetails.phoneNumber}</span>
              </h5>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </>
  );
}

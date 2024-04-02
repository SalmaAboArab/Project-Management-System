import axios from "axios";
import styles from "./Filter.module.css";
import { baseUrl } from "../../../Constants/Components/Urls";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Filter({ setUsersList }) {
  const [searchValue, setSearchValue] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      callFiltrationUser();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchValue, searchCategory]);

  async function callFiltrationUser() {
    console.log();
    
    try {
      const { data } = await axios.get(`${baseUrl}/Users/`, {
        params: {
          [searchCategory]: searchValue,
          pageSize: 10,
          pageNumber: 1,
        },
        headers: {
          Authorization: localStorage.getItem("userToken"),
        },
      });
      setUsersList(data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "There was a mistake toggling user activation.");
    }
  }

  function handleInputChange(e) {
    setSearchValue(e.target.value.toLowerCase());
  }

  function handleSelectChange(e) {
    setSearchCategory(e.target.value);
  }

  return (
    <div className="bg-white p-3 rounded-3 mb-3 d-flex flex-wrap justify-content-md-start justify-content-center align-items-center gap-3">
      <input
        onChange={handleInputChange}
        placeholder="Search Fleets"
        className={`${styles.searchInput} rounded-5 p-2 form-control border-1 shadow-sm border-dark`}
        type="text"
      />
      <select
        onChange={handleSelectChange}
        className="rounded-pill shadow-sm p-2"
      >
        <option value="">Filter</option>
        <option value="userName">Search By User Name</option>
        <option value="email">Search By Email</option>
        <option value="country">Search By Country</option>
      </select>
    </div>
  );
}

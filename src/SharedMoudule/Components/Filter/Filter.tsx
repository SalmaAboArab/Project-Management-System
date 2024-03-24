import axios from "axios";
import styles from "./Filter.module.css";
import { baseUrl } from "../../../Constants/Components/Urls";
import { useEffect, useState } from "react";

export default function Filter({ setUsersList }) {
  const [searchByName, setSearchByName] = useState("");
  const [searchByEmail, setSearchByEmail] = useState("");
  const [searchByCountry, setSearchByCountry] = useState("");
  const [searchByGroup, setSearchByGroup] = useState(1||2);
  const [selectAnyThing, setSelectAnyThing] = useState(null);
  const [params, setParams] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      callFiltrationUser();
    }, 500);
    return () => {
      clearTimeout(timer);
      setSearchByName("");
      setSearchByEmail("");
      setSearchByGroup("");
      setSearchByCountry("");
    };
  }, [params]);

  async function callFiltrationUser() {
    try {
      const { data } = await axios.get(
        `${baseUrl}/Users/?userName=${searchByName}&email=${searchByEmail}&country=${searchByCountry}&groups=${searchByGroup}&pageSize=10&pageNumber=1`,
        {
          headers: {
            Authorization: localStorage.getItem("userToken"),
          },
        }
      );
      setUsersList(data.data);
    } catch (error) {
      error?.response?.data?.message ||
        "There was a mistake toggling user activation.";
    }
  }

  function filtrationValue(inputValue) {
    const inputValueLowerCase = inputValue.target.value.toLowerCase();
    setParams(inputValueLowerCase);
    if (selectAnyThing === "name") {
      setSearchByName(inputValueLowerCase);
    } else if (selectAnyThing === "email") {
      setSearchByEmail(inputValueLowerCase);
    } else if (selectAnyThing === "country") {
      setSearchByCountry(inputValueLowerCase);
    } else {
      setSearchByName(inputValueLowerCase);
    }
  }

  function filtrationSelectValue(selectValue) {
    setSelectAnyThing(selectValue.target.value);
    
    if (selectValue.target.value === "employee") {
      setSearchByGroup(2);
      
    } else if (selectValue.target.value === "manager") {
      setSearchByGroup(1);
    
    } else {
      setSearchByGroup("");
    }
      callFiltrationUser();
  }

  return (
    <>
      <div className="bg-white p-3  rounded-top-3  d-flex  flex-wrap  justify-content-md-start  justify-content-center  align-items-center gap-3 ">
        <input
          onChange={(e) => filtrationValue(e)}
          placeholder="Search Fleets"
          className={`${styles.searchInput} rounded-5  p-2 form-control border-1 shadow-sm border-dark  `}
          type="text"
        />
        <select
          onChange={(e) => filtrationSelectValue(e)}
          className=" rounded-pill  shadow-sm  p-2 "
          name=""
          id=""
        >
          <option value="">filter</option>
          <option value="name">Search By User Name</option>
          <option value="email">Search By Email</option>
          <option value="country">Search By Country</option>
         <option value="manager">Search By Manager</option>
          <option value="employee">Search By Employee</option> 
        </select>
      </div>
    </>
  );
}

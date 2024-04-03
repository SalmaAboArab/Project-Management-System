import React, { useContext } from 'react'
import Header from '../Header/Header'
import Home from '../../../ProjectModule/Components/Home/Home'
import styles from "./Dashboard.module.css"
import { ITheme, ThemeContext } from '../../../Context/Components/ThemeContext';
export default function Dashboard() {
  const { isDarkMode }:ITheme = useContext(ThemeContext);
  return (<>
  <div  className={`header  ${isDarkMode?'mainColor':styles.bg}  rounded-2 pb-3 p-2`} >

  <Header/>
  <Home/>
  </div>
  
  </>
  )
}

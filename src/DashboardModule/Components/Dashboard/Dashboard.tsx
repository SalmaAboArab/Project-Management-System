import React from 'react'
import Header from '../Header/Header'
import Home from '../../../ProjectModule/Components/Home/Home'
import styles from "./Dashboard.module.css"
export default function Dashboard() {
  return (<>
  <div  className={`header ${styles.bg}  rounded-2 pb-3 p-2`} >

  <Header/>
  <Home/>
  </div>
  
  </>
  )
}

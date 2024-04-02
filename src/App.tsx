
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import './App.css'
import Login from './AuthModule/Components/Login/Login'
import NotFound from './SharedMoudule/Components/NotFound/NotFound'
import AuthLayout from './SharedMoudule/Components/AuthLayout/AuthLayout'
import Register from './AuthModule/Components/Register/Register'
import ForgotPassword from './AuthModule/Components/ForgotPassword/ForgotPassword'
import ResetPassword from './AuthModule/Components/ResetPassword/ResetPassword'
import ChangePassword from './AuthModule/Components/ChangePassword/ChangePassword'
import MasterLayout from './SharedMoudule/Components/MasterLayout/MasterLayout'
import Dashboard from './DashboardModule/Components/Dashboard/Dashboard'
import TasksList from './TasksModule/Components/Tasks/Tasks'
import UsersList from './UsersModule/Components/Users/Users'
import VerifyAccount from './AuthModule/Components/VerifyAccount/VerifyAccount'

import ProtectedRoute from './SharedMoudule/Components/ProtectedRoute/ProtectedRoute'
import { useContext } from 'react'
import { AuthContext } from './Context/Components/AuthContext'
import ProjectForm from './ProjectModule/Components/ProjectForm/ProjectForm'
import TasksForm from './TasksModule/Components/TasksForm/TasksForm'
import ProjectList from './ProjectModule/Components/ProjectList/ProjectList'
import TasksBoard from './TasksModule/Components/TasksBoard/TasksBoard'
import { ThemeContext, ITheme } from "./Context/Components/ThemeContext";



function App() {
  let {loginData}:any=useContext(AuthContext);
  const {isDarkMode, themeClass}:ITheme = useContext(ThemeContext);

  const routers = createHashRouter([
    {
      path:"/",element:
      
      <AuthLayout/>,
      errorElement:<NotFound/>,
      children:
      [
        {index:true,element:<Login/>},
        {path:"register",element:<Register/>},
        {path:"forgot-password",element:<ForgotPassword/>},
        {path:"reset-password",element:<ResetPassword/>},
        {path:"verify-account",element:<VerifyAccount/>},
        
       
      ]
    },
    {
      path:"dashboard",
      element:(
        <ProtectedRoute loginData={loginData}>
          <MasterLayout loginData={loginData}/>
        </ProtectedRoute>
      ),
      errorElement:<NotFound/>,
      children:
      [
        {index:true,element:<Dashboard/>},
        {path:"tasks",element:<TasksList/>},
        {path:"users",element:<UsersList/>},
        {path:"projects",element:<ProjectList/>},
        {path:"change-password",element:<ChangePassword/>},
        {path:"projects/projects-form/:action",element:<ProjectForm/>},
        {path:"tasks/tasks-form/:action",element:<TasksForm/>},
        {path:"tasks-board",element:<TasksBoard/>}
        
      ]
    }
  ])

  return (
    <>
    <div className={`app ${themeClass}`}>
    <RouterProvider router={routers} />
    </div>
    </>
  )
}

export default App

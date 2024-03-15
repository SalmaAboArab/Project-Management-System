
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
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
import TasksList from './TasksModule/Components/TasksList/TasksList'
import UsersList from './UsersModule/Components/UsersList/UsersList'
import ProjectList from './ProjectModule/Components/ProjectList/ProjectList'
import VerifyAccount from './AuthModule/Components/VerifyAccount/VerifyAccount'

import ProtectedRoute from './SharedMoudule/Components/ProtectedRoute/ProtectedRoute'
import { useContext } from 'react'
import { AuthContext } from './Context/Components/AuthContext'

function App() {
  let {loginData}:any=useContext(AuthContext);
  const routers = createBrowserRouter([
    {
      path:"/",element:
      
      <AuthLayout/>,
      errorElement:<NotFound/>,
      children:
      [
        {index:true,element:<Login/>},
        {path:"Register",element:<Register/>},
        {path:"ForgotPassword",element:<ForgotPassword/>},
        {path:"ResetPassword",element:<ResetPassword/>},
        {path:"VerifyAccount",element:<VerifyAccount/>},
        
       
      ]
    },
    {
      path:"dashboard",
      element:(
        <ProtectedRoute loginData={loginData}>
          <MasterLayout loginData={loginData}/>
        </ProtectedRoute>
          // <MasterLayout loginData={loginData}/>
      ),
      errorElement:<NotFound/>,
      children:
      [
        {index:true,element:<Dashboard/>},
        {path:"TasksList",element:<TasksList/>},
        {path:"UsersList",element:<UsersList/>},
        {path:"ProjectList",element:<ProjectList/>},
        {path:"ChangePassword",element:<ChangePassword/>},
        
      ]
    }
  ])

  return (
    <>
    <RouterProvider router={routers} />
    </>
  )
}

export default App

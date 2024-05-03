import { createBrowserRouter,Navigate,Outlet,RouterProvider } from "react-router-dom";
import './index.scss'
import LeftBar from './components/LeftBar/LeftBar';
import Navbar from './components/Navbar/Navbar';
import Login from './Login/Login';
import { RoutesConfig } from './routes';
import NotMatch from './NotMatch/NotMatch';
import './utils/axios.config'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useState, createContext, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import UserAdd from "./UserManage/UserAdd";
import UserList from "./UserManage/UserList";

export const UserContext = createContext();
function App() {
  const queryClient = new QueryClient()
  /*
      - Create a user state variable
      - Store/Update user info in both localStorage and the variable
      - Share the state variable among all tags using useContext
  */
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null );
  
  const handleUserUpdate = (userInfo) => {
    setCurrentUser(userInfo);
  };


  const ProtectedRoutes = ({children})=>{
    if (!localStorage.getItem('token')){
      return <Navigate to="/login"/>
    }
    return children
  }
  const AdminRoutes = ({children})=>{
    if (currentUser.role !== 1){
      return (<h2 style={{padding: '20px', color: '#666'}}> Permission denied </h2>)
    }
    return children
  }


  const Layout = ()=>{
    return (
      <QueryClientProvider  client={queryClient}>
        <UserContext.Provider value={{ currentUser, handleUserUpdate }}>

        <div style={{display: 'flex'}}>
          <LeftBar/>
          <div style={{display: 'flex' , flex: 7}}>
            <div style={{display: 'flex', flexDirection: 'column', width:"100%"}}>
              <Navbar/>
              <Outlet currentUser={currentUser}/>
            </div>
          </div>
        </div>
        </UserContext.Provider>
      </QueryClientProvider>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/login",
      element:  <UserContext.Provider value={{ currentUser, handleUserUpdate }}>
                  <Login />
                </UserContext.Provider>
    },

    {
      path: "/",
      element: <ProtectedRoutes>
                <Layout />
               </ProtectedRoutes>,
      children: [
        { 
          path: "/user-manage/addusers", 
          element: <AdminRoutes><UserAdd/></AdminRoutes> 
        },
        { 
          path: "/user-manage/listusers",
          element:  <AdminRoutes><UserList/></AdminRoutes> 
        },
        ...RoutesConfig
      ]
    },
    {
      path: "*",
      element: <NotMatch/>
    }
  ]);
  return (
      <>
        <RouterProvider router={router} />
        <ToastContainer/>
      </>
  );
}

export default App;

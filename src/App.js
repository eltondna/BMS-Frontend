import './index.scss';
import { createBrowserRouter,Navigate,Outlet,RouterProvider } from "react-router-dom";
import LeftBar from './components/LeftBar/LeftBar';
import Navbar from './components/Navbar/Navbar';
import Login from './Login/Login';
import { RoutesConfig } from './routes';
import NotMatch from './NotMatch/NotMatch';
function App() {
  let user = true;
  const ProtectedRoutes = ({children})=>{
    if (user === false){
      return <Navigate to="/login"/>
    }
    return children
  }
  const Layout = ()=>{
    return (
        <div style={{display: 'flex'}}>
          <LeftBar/>
          <div style={{display: 'flex' , flex: 7}}>
            <div style={{display: 'flex', flexDirection: 'column', width:"100%"}}>
              <Navbar/>
              <Outlet/>
            </div>
          </div>
        </div>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />
    },

    {
      path: "/",
      element: <ProtectedRoutes>
                <Layout/>
               </ProtectedRoutes>,
      children: [
        ...RoutesConfig
      ]
    },
    {
      path: "*",
      element: <NotMatch/>
    }
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;

import LeftBar from './components/LeftBar/LeftBar';
import Navbar from './components/Navbar/Navbar';
import Login from './Login/Login';
import Home from "./Home/Home";
import NewsAdd from "./NewsManage/NewsAdd";
import NewsList from "./NewsManage/NewsList";
import ProductAdd from "./ProductManage/ProductAdd";
import ProductList from "./ProductManage/ProductList";
import UserAdd from "./UserManage/UserAdd";
import UserList from "./UserManage/UserList";
import Center from "./Center/Center";
import { Navigate } from 'react-router-dom';

export const RoutesConfig = [
        { path: "/index", element: <Home/> },
        { path: "/center", element: <Center/> },
        { path: "/news-manage/addnews", element: <NewsAdd/> },
        { path: "/news-manage/listnews", element: <NewsList/> },
        { path: "/product-manage/addproducts", element: <ProductAdd/> },
        { path: "/product-manage/listproducts", element: <ProductList/> },
        { path: "/user-manage/addusers", element: <UserAdd/> },
        { path: "/user-manage/listusers",element: <UserList/> },
        { path: '/', element: <Navigate to="/index"/> }
]

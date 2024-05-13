import Home from "./Home/Home";
import NewsAdd from "./NewsManage/NewsAdd";
import NewsList from "./NewsManage/NewsList";
import ProductAdd from "./ProductManage/ProductAdd";
import ProductList from "./ProductManage/ProductList";
import Center from "./Center/Center";
import { Navigate } from 'react-router-dom';

export const RoutesConfig = [
        { path: "/index", element: <Home/> },
        { path: "/center", element: <Center/> },
        { path: "/news-manage/addnews", element: <NewsAdd/> },
        { path: "/news-manage/listnews", element: <NewsList/> },
        { path: "/product-manage/addproducts", element: <ProductAdd/> },
        { path: "/product-manage/listproducts", element: <ProductList/> },
        { path: '/', element: <Navigate to="/index"/> }
]

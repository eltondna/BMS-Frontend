import Home from "./Home/Home";
import NewsAdd from "./NewsManage/pages/NewsAdd";
import NewsList from "./NewsManage/pages/NewsList";
import ProductAdd from "./ProductManage/pages/ProductAdd";
import ProductList from "./ProductManage/pages/ProductList";
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

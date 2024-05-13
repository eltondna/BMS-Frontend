import {
    useQuery
} from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import ProductListItem from "./components/ProductListItem/ProductListItem"
import "./ProductList.scss"
import EditProduct from "./components/EditProduct/EditProduct"

const ProductList = ()=>{
    const [openEdit, setOpenEdit] = useState(false);
    const [editProduct, setEditProduct] = useState('');

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['productAll'],
        queryFn: async ()=>{
            const {data} = await axios.get(BASE_URL + '/admin/product/getAll')
            return data.data;
        }
    })
    if (isPending){
        return <div> Loading...</div>
    }

    return(
        <div className="productlist">
            <div className="container">
                {
                    openEdit && 
                    <div className="editBoard">
                        <EditProduct setOpenEdit={setOpenEdit} product={editProduct} />
                    </div> 
                }
                <div className="top">
                    <div className="first">
                        產品管理
                        </div>
                        <div style={{color: '#DDD'}}> | </div>
                        <div className="last">產品列表</div>
                </div>

                <div className="main">
                    <div className="column">
                            <div  className="field">產品名稱</div>
                            <div  className="field">產品簡要</div>
                            <div  className="field">編輯時間</div>
                            <div  className="field">操作</div>
                    </div>

                {
                    data.map(product => (
                        <ProductListItem
                         key={product.id}
                         product={product}
                         setOpenEdit={setOpenEdit}
                         setEditProduct={setEditProduct}
                         />
                    ))
                }
                </div>
            </div>

        </div>
    )
}
export default ProductList;
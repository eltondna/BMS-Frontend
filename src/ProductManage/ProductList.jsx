import {
    useQuery
} from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import ProductListItem from "./components/ProductListItem/ProductListItem"
import "./ProductList.scss"
import EditProduct from "./components/EditProduct/EditProduct"
import { useTranslation } from 'react-i18next';

const ProductList = ()=>{
    const [openEdit, setOpenEdit] = useState(false);
    const [editProduct, setEditProduct] = useState('');
    const {t} = useTranslation();

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
                        {t('product_manage')}
                        </div>
                        <div style={{color: '#DDD'}}> | </div>
                        <div className="last">{t('product_list')}</div>
                </div>

                <div className="main">
                    <div className="column">
                            <div  className="field">{t('product_name')}</div>
                            <div  className="field">{t('product_brief')}</div>
                            <div  className="field">{t('editTime')}</div>
                            <div  className="field">{t('operation')}</div>
                    </div>

                    <div className="item">
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

        </div>
    )
}
export default ProductList;
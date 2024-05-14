import { BASE_URL } from "../config";
import axios from "axios";
import "./NewsList.scss";
import {
    useQuery
} from '@tanstack/react-query'
import NewsListItem from "./components/NewsListItem/NewsListItem";
import EditNews from "./components/EditNews/EditNews";
import { useState } from "react";
import PreviewNews from "./components/PreviewNews/PreviewNews";
import { useTranslation } from "react-i18next";
const NewsList = ()=>{

    const [openEdit, setOpenEdit] = useState(false)
    const [editNews, setEditNews] = useState('');
    const [openPreview, setOpenPreview] = useState(false)
    const [previewNews, setPreviewNews] = useState('')
    const {t} = useTranslation();


    const { isPending, isError, data, error } = useQuery({
        queryKey: ['newsAll'],
        queryFn: async ()=>{
            const res = await axios.get(BASE_URL + '/admin/news/getAll')
            return res.data.data
        }
    })
    if (isPending){
        return <h2 style={{padding: '20px', color: '#666'}}>Loading...</h2>
    }
    if (isError){
        return <h2 style={{padding: '20px', color: '#666'}}>Unknown Error occurs</h2>
    }

    return (
        <div className="newslist">

            {openEdit && 
                <div className="editBoard">
                    <EditNews setOpenEdit={setOpenEdit} news={editNews} />
                </div> 
            }
            {openPreview &&
                <div className="previewBoard">
                    <PreviewNews setOpenPreview={setOpenPreview} news={previewNews}/>
                </div>
            }
            <div className="container">
                <div className="top">

                    <div className="first">
                        {t('news_manage')}
                     </div>

                    <div style={{color: '#DDD'}}> | </div>
                    <div className="last"> {t('news_list')}</div>
                </div>
             
                <div className="main">
                    <div className="column">
                        <div  className="xlarge-field"> {t('title')}</div>
                        <div  className="field"> {t('genre')}</div>
                        <div  className="field"> {t('editTime')}</div>
                        <div  className="field"> {t('isPublish')}</div>
                        <div  className="large-field"> {t('Operation')}</div>
                    </div>
                    {
                        data.map(news =>(
                            <NewsListItem  
                            key={news.id} 
                            news={news}
                            setOpenEdit={setOpenEdit}
                            setOpenPreview={setOpenPreview}
                            setEditNews={setEditNews}
                            setPreviewNews={setPreviewNews} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default NewsList;
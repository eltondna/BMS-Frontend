import { BASE_URL } from "../../config";
import axios from "axios";
import "../styles/NewsList.scss";
import {
    useMutation,
    useQueryClient,
    useQuery
} from '@tanstack/react-query'
import NewsListItem from "../components/NewsListItem/NewsListItem";
import EditNews from "../components/EditNews/EditNews";
import { useState } from "react";
import PreviewNews from "../components/PreviewNews/PreviewNews";
const NewsList = ()=>{

    const [openEdit, setOpenEdit] = useState(false)
    const [editNews, setEditNews] = useState('');
    const [openPreview, setOpenPreview] = useState(false)
    const [previewNews, setPreviewNews] = useState('');
    
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
                        新聞管理
                     </div>

                    <div style={{color: '#DDD'}}> | </div>
                    <div className="last">新聞列表</div>
                </div>
             
                <div className="main">
                    <div className="column">
                        <div  className="xlarge-field">標題</div>
                        <div  className="field">類型</div>
                        <div  className="field">更新時間</div>
                        <div  className="field">是否發佈</div>
                        <div  className="large-field">動作</div>
                    </div>
                    {
                        data.map(news =>(
                            <NewsListItem  
                            key={news._id} 
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
import "./EditNews.scss"
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from "react";
import ReactQuill from "react-quill";
import { BASE_URL } from "../../../config";
import Notification from "../../../components/Notification/Notification";
import axios from "axios";
import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

const EditNews = ({news, setOpenEdit})=>{
    const [title, setTitle] = useState(news.title)
    const [content, setContent] = useState(news.content)
    const [category, setCategory] = useState(news.category)
    const [imageURL, setImageURL] = useState('');
    const [filePath, setFilePath] = useState('');
    
    const queryClient = useQueryClient();
    const editNews = async()=>{
        const formData = new FormData()
        formData.append('id', news._id);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);
        if (filePath !== "")
            formData.append('file', filePath);
        else
            formData.append('cover', news.cover);
        return await axios.post(BASE_URL + '/admin/news/update', formData, {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        })
    }
    const mutation = useMutation({
        mutationFn: editNews,
        // We can returned the renewed data directly from backend
        // no need to pass the payload to the mutation function
        onSuccess: ({data}) => {
        // Invalidate and refetch
        Notification("編輯成功", "success")
        return queryClient.invalidateQueries({ queryKey: ['newsAll'] })
        },
    })

    const handleClick = ()=>{
        if (title === "" || content === "" || category === "" ){
            return Notification("請填寫所有欄位", "warning")
        }
        mutation.mutate()
    }

    const displayImage = (file)=>{
        const reader = new FileReader();
        setFilePath(file);
        reader.onload = (e)=>{
         setImageURL(e.target.result)
        }
        reader.readAsDataURL(file)
    }

    return(
        <div className="editnews">
            <div className="header">
                <div>編輯新闻</div>
                <CancelIcon className='icon' onClick={()=>{setOpenEdit(false)}}/>
            </div>
            
            <div className="textEditor">
                    <div className="field">
                        <label>標題</label>
                        <input type="text" placeholder="Title..." value={title} onChange={(e)=> setTitle(e.target.value)}/>
                    </div>

                    <div className="field"> 
                        <label htmlFor="content">內容</label>
                        <div className="content">
                            <ReactQuill theme="snow" value={content} onChange={setContent} />
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="select">類型</label>
                        <select className='select' value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value={0}>選擇</option>
                            <option value={1}>最新動態</option>
                            <option value={2}>典型案例</option>
                            <option value={2}>通知公告</option>
                        </select>
                    </div>

                    <div className="field">
                        <label htmlFor="profilePic">封面</label>
                        <div className='PicUpload'>
                            <input type='file' onChange={(e)=> displayImage(e.target.files[0])}/>
                            {
                                imageURL === "" 
                                ? <img src={BASE_URL +'/'+ news.cover} alt="" className="image"/>
                                : <img src={imageURL} alt="" className="image"/>
                            }
                        </div>
                    </div>

                    <div className="field">
                            <label htmlFor="profilePic"></label>
                            <button className='submit' onClick={handleClick}>編輯新闻</button>
                    </div>
                </div>
        </div>
    )
}

export default EditNews;
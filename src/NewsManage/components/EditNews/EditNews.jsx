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
import { useTranslation } from "react-i18next";

const EditNews = ({news, setOpenEdit})=>{
    const [title, setTitle] = useState(news.title)
    const [content, setContent] = useState(news.content)
    const [genre, setGenre] = useState(news.genre)
    const [imageURL, setImageURL] = useState('');
    const [filePath, setFilePath] = useState('');
    const queryClient = useQueryClient();
    const {t} = useTranslation();


    const editNews = async()=>{
        const formData = new FormData()
        formData.append('id', news.id);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('genre', genre);
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
        console.log(typeof(genre))
        if (title === "" || content === "" || genre === 0 ){
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
                <div>{t('edit_news')}</div>
                <CancelIcon className='icon' onClick={()=>{setOpenEdit(false)}}/>
            </div>
            
            <div className="textEditor">
                    <div className="field">
                        <label>{t('title')}</label>
                        <input type="text" placeholder="Title..." value={title} onChange={(e)=> setTitle(e.target.value)}/>
                    </div>

                    <div className="field"> 
                        <label htmlFor="content">{t('content')}</label>
                        <div className="content">
                            <ReactQuill theme="snow" value={content} onChange={setContent} />
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="select">{t('genre')}</label>
                        <select className='select' value={genre} onChange={(e) => setGenre(Number(e.target.value))}>
                            <option value={0}>{t('select')}</option>
                            <option value={1}>{t('latest_news')}</option>
                            <option value={2}>{t('typical_case')}</option>
                            <option value={2}>{t('announcement')}</option>
                        </select>
                    </div>

                    <div className="field">
                        <label htmlFor="profilePic">{t('cover')}</label>
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
                            <button className='submit' onClick={handleClick}>{t('edit_news')}</button>
                    </div>
                </div>
        </div>
    )
}

export default EditNews;
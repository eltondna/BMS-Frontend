import './NewsAdd.scss'
import { useState } from 'react'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Notification from '../components/Notification/Notification';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useTranslation } from 'react-i18next';

const NewsAdd = ()=>{
    const [title, setTitle] = useState('');
    const [newsContent, setNewsContent] = useState("");
    const [imageURL, setImageURL] = useState('');
    const [filePath, setFilePath] = useState('');
    const [type, setType] = useState(0);
    const {t} = useTranslation();



    const handleClick = async ()=>{
        if (title === ''){
            return Notification('請輸入標題', "warning")
        }else if (newsContent === ''){
            return Notification('請輸入內容', "warning")
        }else if (filePath === ''){
            return Notification('請上傳封面', "warning")
        }else if (type === 0){
            return Notification('請選擇類型', "warning")
        }else{
            const data = new FormData();
            data.append('title', title);
            data.append('content', newsContent);
            data.append('type', type);
            data.append('isPublish', 1)
            data.append("file", filePath);
            try{
                const {result} = await axios.post(BASE_URL + '/admin/news/add', data,{
                    headers: {
                        "Content-type": "multipart/form-data"
                    }
                })
                console.log(result);
                setTitle('')
                setNewsContent('')
                setImageURL('');
                setFilePath('')
                setType('')
                Notification('上傳成功', "success")
            }catch (error){
                console.log(error)
                Notification('上傳失敗', "error")
            }
        }
    };

    /* 
    reader.onload
        - This sets an event handler to be called 
        when the load event is triggered, 
        which occurs when the file has been successfully read.
    */

    /*
        reader.readAsDataURL(file)
            - This line starts reading the contents of the specified file. 
            When the read operation is successfully completed, the load event
            is triggered, and the specified event handler (assigned in the 
            reader.onload statement) is executed. This will result in 
            setting the state variable imageURL with the result of reading 
            the file as a data URL.
    */
    const displayImage = (file)=>{
       const reader = new FileReader();
       setFilePath(file);
       reader.onload = (e)=>{
        setImageURL(e.target.result)
       }
       reader.readAsDataURL(file)
    }
    return (
        <div className="newsadd">
            <div className="container">
                <div className="top">
                    <div className="first">
                            {t('news_manage')}
                        </div>
                        <div style={{color: '#DDD'}}> | </div>
                        <div className="last">{t('add_news')}</div>
                    </div>
                <div className="textEditor">
                    <div className="field">
                        <label>{t('title')}</label>
                        <input type="text" placeholder="Title..." value={title} onChange={(e)=> setTitle(e.target.value)}/>
                    </div>

                    <div className="field"> 
                        <label htmlFor="content">{t('content')}</label>
                        <div className="content">
                            <ReactQuill theme="snow" value={newsContent} onChange={setNewsContent} />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="select">{t('genre')}</label>
                        <select className='select' value={type} onChange={(e) => setType(e.target.value)}>
                            <option value={0}>
                                {t('select')}
                            </option>
                            <option value={1}>
                                {t('latest_news')}
                            </option>
                            <option value={2}>
                                {t('typical_case')}
                            </option>
                            <option value={2}>
                                {t('announcement')}
                            </option>
                        </select>
                    </div>


                    <div className="field">
                        <label htmlFor="profilePic">{t('cover')}</label>
                        <div className='PicUpload'>
                            {
                                imageURL === '' 
                                ?<AddPhotoAlternateOutlinedIcon className='icon' /> 
                                :<img src={imageURL} alt="" className='image'/>
                            }
                            <input type='file' 
                            onChange={(e)=> displayImage(e.target.files[0])}
                            />
                        </div>
                    </div>
                    <div className="field">
                            <label htmlFor="profilePic"></label>
                            <button className='submit' onClick={handleClick}>{t('add_news')}</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default NewsAdd;
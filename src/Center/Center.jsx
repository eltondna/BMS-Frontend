import './Center.scss';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import PhotoCameraFrontRoundedIcon from '@mui/icons-material/PhotoCameraFrontRounded';
import { useState, useContext } from 'react';
import axios from 'axios'
import {BASE_URL} from "../config"
import {
    useMutation,
    useQueryClient,
    useQuery
} from '@tanstack/react-query'
import Notification from '../components/Notification/Notification';
import { UserContext } from '../App';
import { useTranslation } from 'react-i18next';



const Center = ()=>{
    const { currentUser, handleUserUpdate } = useContext(UserContext);
    const [username, setUsername] = useState(currentUser.username);
    const [gender, setGender] = useState(currentUser.gender)
    const [introduction, setIntroduction] = useState(currentUser.introduction ? currentUser.introduction: '')
    const [imageURL, setImageURL] = useState("")
    const [filePath, setFilePath] = useState('')
    const {t} = useTranslation()
    
    // Upload Action
    const updateProfileAction = async()=>{
        const formData = new FormData()
        formData.append("username", username);
        formData.append("gender", gender);
        formData.append("introduction", introduction);
        if (filePath !== '') formData.append("file", filePath);
        return await axios.post(BASE_URL + "/admin/user/update",formData,{
            // Needed whenever a form data is sent
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })
    }
    // Upload Mutation
    const mutation = useMutation({
        mutationFn: updateProfileAction,
        // We can returned the renewed data directly from backend
        // no need to pass the payload to the mutation function
        onSuccess: async(data) => {
        // Invalidate and refetch
            const res = await axios.post(BASE_URL + '/admin/user/get')
            handleUserUpdate(res.data.data)
        },
    })
    // handle Submit Action
    const handleClick = async ()=>{
        if (username === ''){
            Notification('Username cannot be null', 'warning')
            return;
        }
        await mutation.mutate()
        setImageURL('')
    }

    const handleGender = (e) =>{
        setGender(e.target.value);
    }
    // Display Image after selection
    const displayImage = (file) =>{
        const reader = new FileReader();
        setFilePath(file)
        reader.onload = function (e) {
          setImageURL(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    return (
        <div className="center">
            <div className="container">
                <div className="top">
                    <div className="first">
                        {t('BMS')}
                    </div>
                    <div style={{color: '#DDD'}}> | </div>
                    <div className="last">{t('personal_config')}</div>
                </div>

                <div className="main">

                    <div className="left">
                        <div className="box">
                            {
                                currentUser.avatar !== undefined
                                ? <img src= {BASE_URL + '/'+ currentUser.avatar} alt="Profile Pic"/>
                                : <PhotoCameraFrontRoundedIcon className='icon'/>
                            }
                            <div className="info">
                                <h4>{currentUser.username}</h4>
                                <h4 className='role'>{t('admin')}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="right">
                    <div className="infoFiller">
                        <h2>{t('personal_info')}</h2>
                        
                        <hr />

                        <div className="field">
                            <label htmlFor="username">{t('username')}</label>
                            <input type="text" name="username" 
                            placeholder="Username..."
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}/>
                        </div>

                        <div className="field">
                            <label htmlFor="gender">{t('gender')}</label>
                            <select className='select' 
                                    onChange={(e)=>handleGender(e)} 
                                    value={gender}>
                                <option value={0}>{t('not_to_say')}</option>
                                <option value={1}>{t('male')}</option>
                                <option value={2}>{t('female')}</option>
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="introduction">{t('introduction')}</label>
                            <textarea name="introduction" className='intro' 
                            placeholder="..."
                            value={introduction}
                            onChange={(e)=>setIntroduction(e.target.value)}></textarea>
                        </div>

                        <div className="field">
                            <label htmlFor="profilePic">{t('avatar')}</label>
                            <div className='PicUpload'>
                                {
                                    imageURL === '' 
                                    ?<AddPhotoAlternateOutlinedIcon className='icon' /> 
                                    :<img src={imageURL} alt="" className='image'/>

                                }
                                 <input type='file' onChange={(e)=> displayImage(e.target.files[0])}/>
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor=""></label>
                            <div className='submitBtn'>
                            <button className='submit' onClick={handleClick}>{t('update')}</button>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
              
        </div>
    </div>
    )
}

export default Center;
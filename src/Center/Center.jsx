import './Center.scss'
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


const Center = ()=>{
    const { currentUser, handleUserUpdate } = useContext(UserContext);
    const [username, setUsername] = useState(currentUser.username);
    const [gender, setGender] = useState(currentUser.gender)
    const [introduction, setIntroduction] = useState(currentUser.introduction ? currentUser.introduction: '')
    const [imageURL, setImageURL] = useState("")
    const [filePath, setFilePath] = useState('')
    const queryClient = useQueryClient();
    
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
        onSuccess: (data, variable) => {
        // Invalidate and refetch
        handleUserUpdate(variable)
        queryClient.invalidateQueries({ queryKey: ['user'] })
        },
    })

    // handle Submit Action
    const handleClick = async ()=>{
        if (username === ''){
            Notification('Username cannot be null', 'warning')
            return;
        }
        const payload = {
            username: username,
            gender: gender,
            introduction: introduction,
            role: currentUser.role,
            avatar: currentUser.avatar,
            _id: currentUser._id
        }
        await mutation.mutate(payload)
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

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['user'],
        queryFn: async ()=>{
            const res = await axios.post(BASE_URL + '/admin/user/get')
            return res.data.data
        }
    })
    
    if (isPending){
        return <h2 style={{padding: '20px', color: '#666'}}>Loading...</h2>
    }


    return (
        <div className="center">
            <div className="container">
                <div className="top">
                    <div className="first">
                        企業門戶網站管理系統
                    </div>
                    <div style={{color: '#DDD'}}> | </div>
                    <div className="last">個人配置</div>
                </div>

                <div className="main">

                    <div className="left">
                        <div className="box">
                            {
                                currentUser.avatar !== undefined
                                ? <img src= {BASE_URL + '/'+ currentUser.avatar} alt="Profile Pic"/>
                                : <PhotoCameraFrontRoundedIcon className='icon'/>
                            }
                            <h3>{currentUser.username}  {currentUser.profile}</h3>
                            <h4>管理員</h4>
                        </div>
                    </div>

                    <div className="right">
                    <div className="infoFiller">
                        <h2>個人資訊</h2>
                        
                        <hr />

                        <div className="field">
                            <label htmlFor="username">用户名</label>
                            <input type="text" name="username" 
                            placeholder="Username..."
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}/>
                        </div>

                        <div className="field">
                            <label htmlFor="gender">性别</label>
                            <select className='select' onChange={(e)=>handleGender(e)}>
                                <option value={0}>保密</option>
                                <option value={1}>男性</option>
                                <option value={2}>女性</option>
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="introduction">個人簡介</label>
                            <textarea name="introduction" className='intro' 
                            placeholder="..."
                            value={introduction}
                            onChange={(e)=>setIntroduction(e.target.value)}></textarea>
                        </div>

                        <div className="field">
                            <label htmlFor="profilePic">頭像</label>
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
                            <label htmlFor="profilePic"></label>
                            <button className='submit' onClick={handleClick}>更新</button>
                        </div>

                    </div>

                </div>
            </div>
              
        </div>
    </div>
    )
}

export default Center;
import './UserAdd.scss'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { useState, useContext } from 'react';
import axios from 'axios'
import {BASE_URL} from "../config";
import Notification from '../components/Notification/Notification';

const UserAdd = ()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [role, setRole] = useState(0)
    const [introduction, setIntroduction] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [filePath, setFilePath] = useState('')

    function displayImage(file) {
        if (!file){
            console.log("Action Cancelled")
            return;
        }
        const reader = new FileReader();
        setFilePath(file)
        reader.onload = function (e) {
          setImageURL(e.target.result);
        };
        reader.readAsDataURL(file);
    }
    const handleClick = async ()=>{
        if (username === ''){
            return Notification("Please enter username", "warning")
        }else if (password === ''){
            return Notification("Please enter password", "warning")
        }else if (role === 0){
            return Notification("Please select user role", "warning")
        }

        const formData = new FormData()
        formData.append("username", username);
        formData.append("password", password);
        formData.append("role", role);
        formData.append("introduction", introduction);
        if (filePath !== '') formData.append("file", filePath);
        try{
            const {data} = await axios.post(BASE_URL + "/admin/user/create",formData,{
                headers:{
                    "Content-Type": "multipart/form-data"
            }})
            console.log(data.result)
            setUsername("");
            setPassword("");
            setRole(0);
            setIntroduction("");
            setImageURL("");
            setFilePath("");
            Notification("User created successfully !", "success")
        }catch (err){
            Notification("Fail to create user !", "error")
            console.log(err)
        }
    }

    return (
        <div className="UserAdd">
            <div className='container'>
                <div className="top">
                    <div className="first">
                        用户管理
                    </div>
                    <div style={{color: '#DDD'}}> | </div>
                    <div className="last">添加用户</div>
                </div>


                <div className="main">
                    <div className="infoFiller">
                        <div className="field">
                                    <label htmlFor="username">用户名</label>
                                    <input type="text" name="username" 
                                    placeholder="Username . . . "
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}/>
                        </div>

                        <div className="field">
                                    <label htmlFor="username">密码</label>
                                    <input type="text" name="password" 
                                    placeholder="Password . . ."
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}/>
                        </div>
                        <div className="field">
                                <label htmlFor="gender">角色</label>
                                <select className='select' 
                                onChange={(e)=>setRole(e.target.value)}
                                value={role}>
                                    <option value={0} >選擇</option>
                                    <option value={1}>管理員</option>
                                    <option value={2}>編輯</option>
                                </select>
                        </div>
                        <div className="field">
                                <label htmlFor="introduction">個人簡介</label>
                                <textarea name="introduction" 
                                className='intro' 
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
                                    <input type='file' 
                                    onChange={(e)=> displayImage(e.target.files[0])}
                                    />
                                </div>
                        </div>

                        <div className="field">
                            <label htmlFor="profilePic"></label>
                            <button className='submit' onClick={handleClick}>添加用户</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAdd;
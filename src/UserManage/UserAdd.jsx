import './UserAdd.scss'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { useState, useContext, useReducer } from 'react';
import axios from 'axios'
import {BASE_URL} from "../config";
import Notification from '../components/Notification/Notification';

const UserAdd = ()=>{
    const [imageURL, setImageURL] = useState('')
    const defaultState = {
        username: '',
        password: '',
        role: 0,
        introduction: '',
        filePath: ''
    }
    const reducer = (prevState, action)=>{
        switch (action.type){
            case 'SET_USERNAME':
                return {...prevState, username : action.payload}
            case 'SET_PASSWORD':
                return {...prevState, password : action.payload}
            case 'SET_ROLE':
                return {...prevState, role : action.payload}
            case 'SET_INTRODUCTION':
                return {...prevState, introduction: action.payload} 
            case 'SET_FILEPATH':
                return {...prevState, filePath: action.payload}
            case 'RESET':
                return defaultState
            default: 
                return prevState
        }
    }

    const [state, dispatch] = useReducer(reducer, defaultState)
    function displayImage(file) {
        if (!file){
            console.log("Action Cancelled")
            return;
        }
        const reader = new FileReader();
        dispatch({type: 'SET_FILEPATH', payload: file})
        reader.onload = function (e) {
          setImageURL(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    const handleClick = async ()=>{
        if (state.username === ''){
            return Notification("Please enter username", "warning")
        }else if (state.password === ''){
            return Notification("Please enter password", "warning")
        }else if (state.role === 0){
            return Notification("Please select user role", "warning")
        }else if (state.filePath === ''){
            return Notification("Please select a profile picture", "warning")
        }
        else{
            const formData = new FormData()
            formData.append("username", state.username);
            formData.append("password", state.password);
            formData.append("role", state.role);
            formData.append("introduction", state.introduction);
            if (state.filePath !== '') formData.append("file", state.filePath);
            console.log(state.filePath)
            try{
                const {data} = await axios.post(BASE_URL + "/admin/user/create",formData,{
                    headers:{
                        "Content-Type": "multipart/form-data"
                }})
                console.log(data.result)
                setImageURL("");
                Notification("User created successfully !", "success")
            }catch (err){
                Notification("Fail to create user !", "error")
                console.log(err)
            }
            dispatch({type: 'RESET'})
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
                                    onChange={(e) => {dispatch({type: 'SET_USERNAME', payload: e.target.value})}}
                                    value={state.username}/>
                        </div>

                        <div className="field">
                                    <label htmlFor="password">密码</label>
                                    <input type="text" name="password" 
                                    placeholder="Password . . ."
                                    onChange={(e) => {dispatch({type: 'SET_PASSWORD', payload: e.target.value})}}
                                    value={state.password}/>
                        </div>
                        <div className="field">
                                <label htmlFor="role">角色</label>
                                <select className='select' name='role'
                                onChange={(e)=>{dispatch({type: 'SET_ROLE', payload: e.target.value})}}
                                value={state.role}>
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
                                value={state.introduction}
                                onChange={(e)=>{dispatch({type: 'SET_INTRODUCTION', payload: e.target.value})}}></textarea>
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
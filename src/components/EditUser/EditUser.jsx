import './EditUser.scss'
import { useState } from 'react';
import Notification from "../Notification/Notification"
import axios from 'axios';
import { BASE_URL } from '../../config';
import {
    useMutation,
    useQueryClient
}from '@tanstack/react-query';

const EditUser = ({setOpenEdit, user, setUser})=>{
    const [username, setUsername] = useState(user.username || '');
    const [password, setPassword] = useState('')
    const [role, setRole] = useState(user.role || 0)
    const [introduction, setIntroduction] = useState(user.introduction || '')
    const queryClient = useQueryClient();


    // Upload Action
    const updateProfileAction = async()=>{
        const payload = {
            id: user._id,
            username,
            role,
            introduction
        }
        console.log(payload)
        if (password !== '') payload.password = password;
        return await axios.post(BASE_URL + '/admin/user/updateOther', payload);
    }

    const mutation = useMutation({
        mutationFn: updateProfileAction,
        // We can returned the renewed data directly from backend
        // no need to pass the payload to the mutation function
        onSuccess: (data) => {
        // Invalidate and refetch
        setOpenEdit(false);
        setUser('');
        queryClient.invalidateQueries({ queryKey: ['userAll'] })
        },
    })


    const handleClick = async (e)=>{
        e.preventDefault();
        if (username === ''){
            return Notification("Please enter new username", "warning")
        }else if (role === 0){
            return Notification("Please select new user role", "warning")
        }
        mutation.mutate();
        Notification("Edit Succeed", "success")
    }
    
    return (
        <div className="edituser">
            <div className='header'>
                編輯用戶
            </div>

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
                        <option value={0}>選擇</option>
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
            
            <div className='action'>    
                <button className='cancel' onClick={()=>setOpenEdit(false)}>取消</button>  
                <button className='submit' onClick={(event) => handleClick(event)}>默認修改</button>
            </div>
        </div>
    )
}

export default EditUser;
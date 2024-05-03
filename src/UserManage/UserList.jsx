import "./UserList.scss"
import UserListItem from "../components/UserListItem/UserListItem";
import axios from "axios";
import { BASE_URL } from "../config";
import {
    useMutation,
    useQueryClient,
    useQuery
} from '@tanstack/react-query'
import EditUser from "../components/EditUser/EditUser";
import { useRef, useState } from "react";


const UserList = ()=>{
    const [openEdit, setOpenEdit] = useState(false)
    const [editUser, setEditUser] = useState('');
    
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['userAll'],
        queryFn: async ()=>{
            const res = await axios.post(BASE_URL + '/admin/user/getAll')
            return res.data.data
        }
    })
    
    if (isPending){
        return <h2 style={{padding: '20px', color: '#666'}}>Loading...</h2>
    }
    
    return (
        <div className="userlist" >
        {
            openEdit && 
            <div className="editBoard">
                <EditUser setOpenEdit={setOpenEdit} user={editUser} setUser={setEditUser}/>
            </div>
        }
            <div className="container">

                <div className="top">
                    <div className="first">
                        用户管理
                    </div>
                    <div style={{color: '#DDD'}}> | </div>
                    <div className="last">用户列表</div>
                </div>    

                <div className="list">
                    <div className="column">
                        <div  className="field">用户名</div>
                        <div  className="field">頭像</div>
                        <div  className="field">角色</div>
                        <div  className="field">操作</div>
                    </div>

                    <div className="row">
                        {
                            data.map(user =>{
                               return (
                               <UserListItem 
                                user={user} 
                                setOpenEdit={setOpenEdit}
                                setEditUser={setEditUser} />
                               ) 
                            })
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}
export default UserList;
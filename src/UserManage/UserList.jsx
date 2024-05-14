import "./UserList.scss"
import UserListItem from "./components/UserListItem/UserListItem";
import axios from "axios";
import { BASE_URL } from "../config";
import {
    useMutation,
    useQueryClient,
    useQuery
} from '@tanstack/react-query'
import EditUser from "./components/EditUser/EditUser";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";


const UserList = ()=>{
    const [openEdit, setOpenEdit] = useState(false)
    const [editUser, setEditUser] = useState('');
    const {t} = useTranslation();
    
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
                    {t('user_manage')}
                    </div>
                    <div style={{color: '#DDD'}}> | </div>
                    <div className="last">{t('user_list')}</div>
                </div>    

                <div className="list">
                    <div className="column">
                        <div  className="field">{t('username')}</div>
                        <div  className="field">{t('avatar')}</div>
                        <div  className="field">{t('role')}</div>
                        <div  className="field">{t('operation')}</div>
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
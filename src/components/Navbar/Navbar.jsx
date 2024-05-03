import "./Navbar.scss"
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../App';
const Navbar = ()=>{
    const { currentUser, handleUserUpdate } = useContext(UserContext);
    const [topMenu, setTopMenu] = useState(false);
    const navigate = useNavigate();

    const handlelogout = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        handleUserUpdate(null)
        navigate('login')
    }
    return (
        <div className="navbar">
            <p>企業門戶網站管理系統</p>
                <div>
                    <p>{currentUser.username} 管理员您好</p>
                    <div className="pop" onClick={()=> setTopMenu(!topMenu)}>
                        <Person2OutlinedIcon className="icon"/> 
                       { topMenu ? <KeyboardArrowUpRoundedIcon/> : <KeyboardArrowDownRoundedIcon/> }

                        { topMenu &&
                            <div className="menu">
                                <div onClick={()=>navigate('/center')}>個人配置</div>
                                <div onClick={handlelogout}>登出</div>
                            </div>
                        }
                    </div>  
               </div>
        </div>
    )
}

export default Navbar;

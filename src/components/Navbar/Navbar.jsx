import "./Navbar.scss"
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../App';
import GTranslateOutlinedIcon from '@mui/icons-material/GTranslateOutlined';
import { useTranslation } from "react-i18next";
const Navbar = ()=>{
    const { currentUser, handleUserUpdate } = useContext(UserContext);
    const [topMenu, setTopMenu] = useState(false);
    const [languageMenu, setLanguageMenu] = useState(false)
    const {t, i18n} = useTranslation();
    const languages = [
        {code: 'en', name: 'English'},
        {code: 'zh', name: '中文'},
    ]


    const navigate = useNavigate();
    const handlelogout = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        handleUserUpdate(null)
        navigate('login')
    }
    return (
        <div className="navbar">
            <p>{t('BMS')} </p>
            <div className="pop" onClick={()=> setLanguageMenu(!languageMenu)}>
                <GTranslateOutlinedIcon className="icon" />
                { languageMenu ? <KeyboardArrowUpRoundedIcon/> : <KeyboardArrowDownRoundedIcon/> }

                {
                    languageMenu &&
                    
                    <div className="menu">
                        <div onClick={()=> i18n.changeLanguage(languages[0].code)} key={languages[0].code}>
                            {languages[0].name}
                        </div>
                        <div onClick={()=> i18n.changeLanguage(languages[1].code)} key={languages[1].code}>
                            {languages[1].name}
                        </div>
                    </div>
                }
            </div>

                <div>
                    <p>{currentUser.username} {t('welcome')}</p>
                    <div className="pop" onClick={()=> setTopMenu(!topMenu)}>
                        <Person2OutlinedIcon className="icon"/> 
                       { topMenu ? <KeyboardArrowUpRoundedIcon/> : <KeyboardArrowDownRoundedIcon/> }

                        { topMenu &&
                            <div className="menu">
                                <div onClick={()=>navigate('/center')}>{t('personal_config')}</div>
                                <div onClick={handlelogout}>{t('logout')}</div>
                            </div>
                        }
                    </div>  
               </div>
        </div>
    )
}

export default Navbar;

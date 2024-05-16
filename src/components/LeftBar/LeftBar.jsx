import "./LeftBar.scss";
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import { ProfilePic } from "../../assets/profilePic";
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useState , useContext } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { UserContext } from '../../App';
import { useTranslation } from "react-i18next";
const LeftBar = ()=>{
    const { currentUser } = useContext(UserContext);
    const [userTab, setUserTab] = useState(false);
    const [productTab, setProductTab] = useState(false);
    const [newsTab, setnewsTab] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleNavigate = (path)=>{
        return navigate(path);
    }
    const Vadmin = currentUser.role === 1;

    return (
        <div className="leftbar">
            <div className="container">
            <div className="top">
                <div className="icon">
                    <ProfilePic />
                </div>
                <h3>{currentUser.username}</h3>
            </div>

            <div className="menu">

                <div className="column" onClick={()=>handleNavigate("/index")}>

                    <div className="info">
                        <HomeRoundedIcon/>
                        <span>{t('home')}</span>
                    </div>
                </div>
                <div className="column" onClick={()=>handleNavigate("/center")}>
                    <div className="info">
                        <AssignmentIndOutlinedIcon/>
                        <span>{t('personal_config')}</span>
                    </div>
                </div>            
                <br></br>
                <hr/>

            {
                Vadmin &&
                <div className="column" onClick={()=>setUserTab(!userTab)}>
                    <div className="info">
                        <AccountCircleOutlinedIcon/>
                        <span >{t('user_manage')}</span>
                    </div>
                    <div className="arrow">
                        {userTab 
                        ? <KeyboardArrowUpRoundedIcon/>
                        :<KeyboardArrowDownRoundedIcon/>
                        }
                    </div>
                </div>

            }

                    { userTab  &&
                        <>
                        <div className="subcolumn" 
                            onClick={()=>handleNavigate("/user-manage/addusers")}>
                            <span>{t('add_user')}</span>
                        </div>
                        <div className="subcolumn" 
                            onClick={()=>handleNavigate( "/user-manage/listusers") }>
                            <span>{t('user_list')}</span>
                        </div>
                        </>  
                    }
                    
                 <div className="column" onClick={()=>setnewsTab(!newsTab)}>
                    
                    <div className="info">
                        <NewspaperOutlinedIcon/>
                        <span>{t('news_manage')}</span>
                    </div>

                    <div className="arrow">
                        {newsTab 
                            ? <KeyboardArrowUpRoundedIcon/>
                            :<KeyboardArrowDownRoundedIcon/>
                        }
                    </div>
                
                </div>
                    {newsTab &&
                        <>
                        <div className="subcolumn" onClick={()=>handleNavigate("/news-manage/addnews")}>
                            <span>{t('add_news')}</span>
                        </div>
                        <div className="subcolumn" onClick={()=>handleNavigate("/news-manage/listnews")}>
                            <span>{t('news_list')}</span>
                        </div>
                        </>  
                    }

                <div className="column" onClick={()=>setProductTab(!productTab)}>
                    <div className="info">
                        <MenuBookOutlinedIcon/>
                        <span>{t('product_manage')}</span>
                    </div>
                    <div className="arrow">
                        {productTab 
                            ? <KeyboardArrowUpRoundedIcon/>
                            :<KeyboardArrowDownRoundedIcon/>
                        }
                    </div>
                </div>
            
                    {productTab &&
                    <>
                        <div className="subcolumn" onClick={()=>handleNavigate("/product-manage/addproducts")}>
                            <span>{t('add_product')}</span>
                        </div>
                        <div className="subcolumn-last" onClick={()=>handleNavigate("/product-manage/listproducts")}>
                            <span>{t('product_list')}</span>
                        </div>
                    </>  
                    }
            </div>

        </div>
    </div>
    )
}
export default LeftBar;
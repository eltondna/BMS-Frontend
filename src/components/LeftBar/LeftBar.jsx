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
const LeftBar = ()=>{
    const { currentUser } = useContext(UserContext);
    const [userTab, setUserTab] = useState(false);
    const [productTab, setProductTab] = useState(false);
    const [newsTab, setnewsTab] = useState(false);
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
                        <span>主页</span>
                    </div>
                </div>
                <div className="column" onClick={()=>handleNavigate("/center")}>
                    <div className="info">
                        <AssignmentIndOutlinedIcon/>
                        <span>個人配置</span>
                    </div>
                </div>            
                <br></br>
                <hr/>

            {
                Vadmin &&
                <div className="column" onClick={()=>setUserTab(!userTab)}>
                    <div className="info">
                        <AccountCircleOutlinedIcon/>
                        <span >用户管理</span>
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
                            <span>添加用户</span>
                        </div>
                        <div className="subcolumn" 
                            onClick={()=>handleNavigate( "/user-manage/listusers") }>
                            <span>用户列表</span>
                        </div>
                        </>  
                    }
                    
                 <div className="column" onClick={()=>setnewsTab(!newsTab)}>
                    
                    <div className="info">
                        <NewspaperOutlinedIcon/>
                        <span>新聞管理</span>
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
                            <span>創建新聞</span>
                        </div>
                        <div className="subcolumn" onClick={()=>handleNavigate("/news-manage/listnews")}>
                            <span>新聞列表</span>
                        </div>
                        </>  
                    }

                <div className="column" onClick={()=>setProductTab(!productTab)}>
                    <div className="info">
                        <MenuBookOutlinedIcon/>
                        <span>產品管理</span>
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
                            <span>添加產品</span>
                        </div>
                        <div className="subcolumn-last" onClick={()=>handleNavigate("/product-manage/listproducts")}>
                            <span>產品列表</span>
                        </div>
                    </>  
                    }
            </div>

        </div>
    </div>
    )
}
export default LeftBar;
import axios from 'axios'
import { BASE_URL } from "../config";
import "./Home.scss"
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Carousal from "@itseasy21/react-elastic-carousel";
import { useContext } from 'react';
import { UserContext } from '../App';
const Home = ()=>{
    const { currentUser } = useContext(UserContext);
    return (
        <div className="home">
            <div className='container'>
                <div className="top">
                    <div className="first">
                        企業門戶網站管理系統
                    </div>
                    <div style={{color: '#DDD'}}> | </div>
                    <div className="last">主页</div>
                </div>

                <div className="middle">
                    <div className="box">
                        <AccountCircleRoundedIcon className="profile"/>

                        <div className="message">
                                欢迎回来， {currentUser.username} 你可能有点累了，喝杯咖啡提提神吧。
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="box">
                        <div className="header">
                            公司产品
                        </div>
                        <div className="slider">
                            <Carousal >
                                <div className="item">
                                    <img src="https://images.unsplash.com/photo-1713098442109-b6fcf262776b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMjd8fHxlbnwwfHx8fHw%3D" alt=""/>
                                </div>
                                <div className="item">
                                    <img src="https://plus.unsplash.com/premium_photo-1701202020992-8435d66fb91d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8" alt="" />
                                </div>
                                <div className="item">
                                  <img src="https://images.unsplash.com/photo-1711542452521-fd713c7e1034?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5Mnx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                </div>
                            </Carousal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;
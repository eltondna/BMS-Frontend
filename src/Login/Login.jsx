import './Login.scss'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState, useContext } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { BASE_URL } from '../config';
import { UserContext } from '../App';
const Login = ()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nameState, setNameState] = useState(false);
    const [pwState, setPwState] = useState(false);
    const [errorState, setErrorState] = useState(false);
    const {handleUserUpdate} = useContext(UserContext)

    const navigate = useNavigate()
    const handleClick = async ()=>{
      console.log(username)
      console.log(password)
      if (username === ""){
        setNameState(true);
        return;
      }
      if (password === ""){
        setPwState(true);
        return;
      }
      const payload = {
        username: username,
        password: password
      }
      try{
        const {data} = await axios.post(BASE_URL + "/admin/auth/login",payload);
        if (data.result === 1){
          // The Token is set to localstorage in the axios.config.js using an interceptor
          console.log(data.data)
          await localStorage.setItem('user', JSON.stringify(data.data))
          handleUserUpdate(data.data)
          navigate('/');
        }
        }catch (error){
          console.log(error)
          setErrorState(true);
        }
    }
    return (
      <div className="login">
        <div className="container">
          <h1> Login </h1>
          <div className="inputfield">
            <div className='field'>
              <AccountCircleOutlinedIcon className='icon'/>
                <input type='text' name='username' 
                      placeholder={nameState ?"Please enter username" : "Username"}
                      className={nameState ? 'empty' : ''} 
                      onChange={(e)=>setUsername(e.target.value)} 
                      value={username}/>
            </div>
            <div className='field'>
              <LockOutlinedIcon className='icon'/>
              <input type='password' name='password' 
                     className={pwState ? 'empty' : ''} 
                     placeholder={pwState ? "Please enter password" : "Password"} 
                     onChange={(e)=>setPassword(e.target.value)}
                     value={password}/>
            </div>
            { errorState && <h3>Username or Password incorrect</h3>}
            <button onClick={handleClick}> Login <span></span></button>
          </div>
        </div>
        <div className="circleLeftDown"></div>
        <div className="circleRightDown"></div>
        <div className="circleLeftUp"></div>
        <div className="circleRightUp"></div>
      </div>
    )
}
export default Login;
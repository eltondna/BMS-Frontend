import './Login.scss'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
const Login = ()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nameState, setNameState] = useState(false);
    const [pwState, setPwState] = useState(false);

    const handleClick = ()=>{
      console.log(username)
      console.log(password)
      if (username === ""){
        setNameState(true);
      }
      if (password === ""){
        setPwState(true);
      }
      return ;
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
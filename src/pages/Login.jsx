import React, { useEffect } from 'react';
import NavBar from '../components/Navbar';
import axios from 'axios';
//import dashboard from '../private/dashboard';
import { useNavigate, Navigate } from 'react-router-dom';
import authContext from '../utils/auth-context';
import { useContext } from 'react';


const url = "http://127.0.0.1:8000/";
function StoreToken(res, login, setLogin, navigate){
        localStorage.setItem('access',res.data.access);    
        localStorage.setItem('refresh',res.data.refresh);
        useEffect(() => {
            navigate('/dashboard');
        },[login])
}

const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const {login, setLogin} = useContext(authContext); 
    console.log('login context in the Login.jsx', login);
    let navigate = useNavigate();
    
    useEffect(() => {
        if(login){
            navigate('/dashboard');
        }
    }, [login]);
    
    const handleUsernameChange = (event) =>{
        setUsername(event.target.value);
    }
    const handlepasswordChange = (event) =>{
        setPassword(event.target.value);
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        
        axios.post(url,{
            action : 'login',
            username : username,
            password : password
        }).then(res =>{
            console.log('returned value after login', res.data);
            setLogin(true); 
            res.data === 'success'? StoreToken(res,login, setLogin, navigate):alert("authentication failed");
        })
    }

    const check = () => {
        const token = localStorage.getItem('access'); 
        if(token){
            const url = "http://127.0.0.1:8000/isvalid/";
            axios.post(url, {
                token: token,
            }).then(res => {
                if(res.data === "Valid"){
                    setLogin(true);
                    navigate('/dashboard');
                
                }
            })
        }
    }

    return (
        
        <div>
            {!login ? check(): navigate('/dashboard')} 
            <NavBar />
            <h1>Log in</h1>
            <form>
                <input onChange={handleUsernameChange} value={username} type="text" placeholder="Username" />
                <input onChange={handlepasswordChange} value={password} type="password" placeholder="Password" />
                <button onClick={handleSubmit} >submit</button>
                
            </form>
            Don't have a account yet? <a href="/signup">Signup</a>
        </div>
    );
}
export default Login;

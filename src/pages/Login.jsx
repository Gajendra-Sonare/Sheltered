import React, { useEffect } from 'react';
import NavBar from '../components/Navbar';
import axios from 'axios';
//import dashboard from '../private/dashboard';
import { useNavigate, Navigate } from 'react-router-dom';
import authContext from '../utils/auth-context';
import { useContext } from 'react';

const url = "http://127.0.0.1:8000/";
function StoreToken(res, login, setLogin, navigate){
        setLogin(true); 
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
            res.status === 200? StoreToken(res,login, setLogin, navigate):alert("authentication failed");
        }).catch(err => {
            if (err.response.status === 401) {
            alert("authentication failed");
           }
        }
        )
    }

    const getNewToken = () => {
        axios.post(url+"getnewtoken/",{
            refresh : localStorage.getItem('refresh')
        }).then(res =>{
            //StoreToken(res,login, setLogin, navigate)
            res.status === 200? StoreToken(res,login, setLogin, navigate):alert("authentication failed");
        }
        )}

    const check = () => {
        const token = localStorage.getItem('access'); 
        if(token){
            const url = "http://127.0.0.1:8000/isvalid/";
            axios.post(url, {
                token: token,
            }).then(res => {
                if(res.status === 200){
                    setLogin(true);
                    navigate('/dashboard');
                
                }
            }).catch(err => {
                if (err.response.status === 401) {
                    if(err.response.data === "signature expired"){
                        getNewToken();
                    }else{
                        localStorage.removeItem('access');
                        localStorage.removeItem('refresh');
                        setLogin(false);
                    }
                }
            }
            )
        }
    }

    return (
        
        <div>
            {useEffect(() => {!login ? check(): navigate('/dashboard')} , [login])}
            <NavBar />
            <form>
                <h3>Sign In</h3>
                <div className="mb-3" >
                <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter username"
                        onChange={handleUsernameChange}
                        value={username}
                    />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        onChange={handlepasswordChange} value={password} 
                    />
                </div>

                <div className="d-grid">
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>

            </form>
            Don't have an account yet? <a href="/signup">Signup</a>
        </div>
    );
}


export default Login;

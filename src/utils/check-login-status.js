import React, {useContext, useEffect} from 'react';
import {Navigate, useNavigate, Link} from 'react-router-dom';
import authContext from '../utils/auth-context';
import PrivateNavbar from '../privateComponents/privateNavbar';
import axios from 'axios'; 
import Login from '../pages/Login';

const CheckLoginStatus = () => {
    const {login, setLogin} = useContext(authContext);
    let navigate = useNavigate(); 
    const token = localStorage.getItem('access'); 
    if(!token){
        console.log('not token ', token);
        setLogin(false);
        navigate('/login');
    }
    console.log('yes token', token)
    const url = "http://127.0.0.1:8000/isvalid/";
    axios.post(url, {
        token: token,
    }).then(res => {
        console.log('res ', res);
        if(res.status === 200){
            setLogin(true);
            navigate('/dashboard');
        
        }
    })
}

export default CheckLoginStatus;
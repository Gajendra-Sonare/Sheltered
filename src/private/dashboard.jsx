import React, {useContext} from 'react';
import {Navigate, useNavigate, Link} from 'react-router-dom';
import authContext from '../utils/auth-context';
import PrivateNavbar from '../privateComponents/privateNavbar';
import CheckLoginStatus from '../utils/check-login-status';

const Dashboard = () => {
    const {login, setLogin} = useContext(authContext);
    let navigate = useNavigate();
    return (
        <div>
            <PrivateNavbar /> 
            {!login?CheckLoginStatus():console.log('hello')}
            {(login) ? <button onClick={()=>{localStorage.removeItem('access'); localStorage.removeItem('refresh');setLogin(false); navigate('/login')}}>logout</button> : <Navigate to="/login" />}
            <h1>You are logged in</h1> 
            <Link to="/create">Create</Link> |||||||||
            <Link to="/mypost" > My Posts</Link>
        </div>
    );
}

export default Dashboard;

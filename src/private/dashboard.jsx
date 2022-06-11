import React, {useContext, useEffect, useState} from 'react';
import {Navigate, useNavigate, Link} from 'react-router-dom';
import authContext from '../utils/auth-context';
import PrivateNavbar from '../privateComponents/privateNavbar';
import CheckLoginStatus from '../utils/check-login-status';
import axios from 'axios'; 


const url = "http://127.0.0.1:8000/dashboard/";
let page_number = 1;


const getAllPosts = (setPosts, page_number) => {
    axios.post(url, {
        page : page_number,
    }).then(res => {
        if (res.status===200){
            setPosts(res.data);
        }else{
            alert('error');
        }
    })
}

const showImages = (posts) => {
    return (
        <ol>
                {posts.map( post =>
                <li>
                    <div><h4>{post[0]}</h4></div>
                    <img width={200} height={200} src={"http://127.0.0.1:8000" + post[4]} alt = ""/>
                    <div>{"price: " + post[1]}</div>
                    <div>{post[2]}</div>
                    <div>{post[3]}</div>
                    <div>  </div>
                    
                </li>
                )}
            </ol>
    )

}

const Dashboard = () => {
    const {login, setLogin} = useContext(authContext);
    const [posts, setPosts] = useState([]);
    let navigate = useNavigate();
    const handle = (e) => {
        e.preventDefault();
        page_number += 1;
        getAllPosts(setPosts, page_number);
    }
    return (
        <div>
            <PrivateNavbar /> 
            {!login?CheckLoginStatus():console.log('hello')}
            {(login) ? <button onClick={()=>{localStorage.removeItem('access'); localStorage.removeItem('refresh');setLogin(false); navigate('/login')}}>logout</button> : <Navigate to="/login" />}
            <h1>You are logged in</h1> 
            <ul >
            <li><Link to="/create">Create</Link> </li>
            <li float="right" ><Link to="/mypost" > My Posts</Link> </li>
            </ul>
            {useEffect(() => {
                getAllPosts(setPosts, page_number);
            }, [])}
            {showImages(posts)}
            <button type = "submit" onClick={handle}>Next</button> 
        </div>
    );
}

export default Dashboard;

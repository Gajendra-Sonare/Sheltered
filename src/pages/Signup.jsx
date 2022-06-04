import React from 'react';
import NavBar from '../components/Navbar';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const url = "http://127.0.0.1:8000/";
const Signup = () =>{
    const [name, setName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    let navigate = useNavigate();
    const handleNameChange = (event) =>{
        setName(event.target.value);
    }
    const handleUsernameChange = (event) =>{
        setUsername(event.target.value);
    }
    const handlepasswordChange = (event) =>{
        setPassword(event.target.value);
    }
    const handleemailChange = (event) =>{
        setEmail(event.target.value);
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        axios.post(url,{
            action:"signup",
            username : username,
            name : name,
            password : password,
            email: email,
        }).then(res =>{
            console.log(res.data);
            alert(res.data);
            if(res.data==="Account created"){
                navigate('/login');
            }
        })
    }
    return (
        <div>
            <NavBar />
            <h1>Signup</h1>
            <form>
                <input onChange={handleNameChange} value={name} type="text" placeholder="Name" />
                <input onChange={handleUsernameChange} value={username} type="text" placeholder='Username' />
                <input onChange={handleemailChange} value={email} type="text" placeholder='email' />
                <input onChange={handlepasswordChange} value={password} type="password" placeholder="Password" />  
            </form>
            <button onClick={handleSubmit}>submit</button>
    
        </div>
    );
}
export default Signup;

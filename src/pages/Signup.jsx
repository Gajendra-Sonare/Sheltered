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
    const [number, setNumber] = React.useState('');
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
    const handleNumberChange = (event) =>{
        setNumber(event.target.value);
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        axios.post(url,{
            action:"signup",
            username : username,
            name : name,
            password : password,
            email: email,
            mobile : number,
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
            <div className="mb-3">
                <label>Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    onChange={handleNameChange}
                    value={name}
                />
            </div>

            <div className="mb-3">
                <label>Username</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    onChange={handleUsernameChange} value={username}
                />
            </div>

            <div className="mb-3"> 
                <label> Mobile Number </label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter mobile number"
                    onChange={handleNumberChange} value={number}
                />
            </div>

            <div className="mb-3">
                <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={handleemailChange} value={email}
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

            </form>
            <button onClick={handleSubmit}>submit</button>  
    
        </div>
    );
}
export default Signup;

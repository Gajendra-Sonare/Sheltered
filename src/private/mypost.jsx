import React from 'react';
import {useContext, useState, useEffect} from 'react';
import authContext from '../utils/auth-context';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'; 
import PrivateNavbar from '../privateComponents/privateNavbar';

function showContent(info){
    console.log('info', info);

        let url = "http://127.0.0.1:8000"

        return(
            <ol>
                {info.map( post =>
                    <li>
                        <div><h3>{"title: " + post[1]} </h3> </div> 
                        <div>{"post id: "+ post[0]}</div>
                        
                        <div>{"price: " + post[2]}</div>
                        <div>{"description: " + post[3]}</div>
                        <img width={200} height={200} src={url + post[4]} alt = ""/>
                        { post[5] ? <img width={400} height={400} src={url + post[5]} alt = ""/> : console.log(0)}
                        { post[6] ? <img width={400} height={400} src={url + post[6]} alt = ""/> : console.log(0)}
                        { post[7] ? <img width={400} height={400} src={url + post[7]} alt = ""/> : console.log(0)}
                    </li>
                )}
            </ol>
        )
    }

const MyPost = () =>{
    const url = "http://127.0.0.1:8000/mypost/";
    const {login, setLogin} = useContext(authContext);
    let navigate = useNavigate();
    const [show , setShow] = useState(false);
    const [info, setInfo] = useState([]);

    const submit = () =>{
        const token = localStorage.getItem('access');
        axios.post(url, {
            token: token,
        }).then(res => {
            if (res.status===200){
                setInfo(res.data);

                setShow(true);
            }else{
                alert('error');
            }
        })
    }
    return (
        <div>
            <PrivateNavbar/>
            {useEffect(()=>{
                submit();
            }, [])}
            {show && showContent(info)}
        </div>
    )
}
export default MyPost;

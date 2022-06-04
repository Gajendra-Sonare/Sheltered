import React from 'react';
import {useContext, useState} from 'react';
import authContext from '../utils/auth-context';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'; 

function showContent(pic, ids){
    console.log('ids', ids)
    console.log('allpics', pic )
        //   <li><img width={200} height={200} src = {"http://127.0.0.1:8000"+pic[2][0].slice(1,pic.length-1)}/></li>
        let temp = ["http://127.0.0.1:8000/media/post_image/IMG-20220429-WA0011.jpg", "http://127.0.0.1:8000/media/post_image/android-chrome-192x192_5nS20k8.png"];


        //{allid.map(id=>{<ol>{allpics[id].map(pic=>{<li><img width={200} height={200} src={pic}/></li>})}</ol>})} 
        return(
            <div>
                {
                    ids.map(id => pic[id].map(p => <h1>{<img width={200}  height={200} src={"http://127.0.0.1:8000"+p.slice(1,-1)}/>}</h1>))
                }
                
            </div>
        )
    }

const MyPost = () =>{
    const url = "http://127.0.0.1:8000/mypost/";
    const {login, setLogin} = useContext(authContext);
    let navigate = useNavigate();
    const [show , setShow] = useState(false);
    const [pic, setPic] = useState([]);
    const [ids, setIds] = useState([]);
    let allpics = {}; 
    let allid = [];

    const submit = () =>{
        const token = localStorage.getItem('access');
        axios.post(url, {
            token: token,
        }).then(res => {
            if (res.status===200){
                for(const post_id in res.data.images){
                    let temp = [];
                    for(let i = 0; i<res.data.images[post_id].length; i++){
                        temp.push(JSON.stringify(res.data.images[post_id][i]));
                    }
                    allpics[post_id] = temp;   
                }
                for(let i =0; i<res.data.posts.length; i++){
                    allid.push(JSON.stringify(res.data.posts[i]));
                }
                setIds(allid);
                setPic(allpics);
                setShow(true);
            }else{
                alert('error');
            }
        })
    }
    return (
        <div>
            <h1>My Post</h1> 
            <button onClick={submit}>submit</button>
            {show && showContent(pic, ids)}
        </div>
    )
}
export default MyPost;

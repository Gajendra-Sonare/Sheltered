import React from 'react';
import {useContext, useState, useEffect} from 'react';
import authContext from '../utils/auth-context';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'; 
import PrivateNavbar from '../privateComponents/privateNavbar';

function showContent(info){
    console.log('info', info);
        //   <li><img width={200} height={200} src = {"http://127.0.0.1:8000"+pic[2][0].slice(1,pic.length-1)}/></li>

        //     {
            //         ids.map(id => pic[id].map(p => <h1>{<img width={200}  height={200} src={"http://127.0.0.1:8000"+p.slice(1,-1)}/>}</h1>))
            //     }

        let temp = ["http://127.0.0.1:8000/media/post_image/IMG-20220429-WA0011.jpg", "http://127.0.0.1:8000/media/post_image/android-chrome-192x192_5nS20k8.png"];
        let url = "http://127.0.0.1:8000"

        //{allid.map(id=>{<ol>{allpics[id].map(pic=>{<li><img width={200} height={200} src={pic}/></li>})}</ol>})} 
        return(
            <div>
                {info.map( post =>
                    <div>
                        <h1>{"post id: "+ post[0]}</h1>
                        <h1>{"title: " + post[1]}</h1>
                        <h1>{"price: " + post[2]}</h1>
                        <h1>{"description: " + post[3]}</h1>
                        <img width={200} height={200} src={url + post[4]}/>
                        { post[5] ? <img width={200} height={200} src={url + post[5]}/> : console.log(0)}
                        { post[6] ? <img width={200} height={200} src={url + post[6]}/> : console.log(0)}
                        { post[7] ? <img width={200} height={200} src={url + post[7]}/> : console.log(0)}
                    </div>
                )}
            </div>
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
                // for(const post_id in res.data.images){
                //     let temp = [];
                //     for(let i = 0; i<res.data.images[post_id].length; i++){
                //         temp.push(JSON.stringify(res.data.images[post_id][i]));
                //     }
                //     allpics[post_id] = temp;   
                // }
                // for(let i =0; i<res.data.posts.length; i++){
                //     allid.push(JSON.stringify(res.data.posts[i]));
                // }

                setShow(true);
            }else{
                alert('error');
            }
        })
    }
    return (
        <div>
            <PrivateNavbar/>
            {/* <button onClick={submit}>submit</button> */}
            {useEffect(()=>{
                submit();
            }, [])}
            {show && showContent(info)}
        </div>
    )
}
export default MyPost;

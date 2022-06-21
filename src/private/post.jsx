import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const url = "http://127.0.0.1:8000/post/";

const Post = () => {
    let { id } = useParams();
    const [post, setPost] = useState([]);
    const [show, setShow] = useState(false);
    const getPost = () => {
        axios.post(url, {
            post_id: id,
            token: localStorage.getItem("access"),
        }).then((res) => {
            if (res.status === 200) {
                setPost(res.data);
                setShow(true);
                console.log(res.data);
            } else {
                alert("error");
            }
        }
        );
    }
    
    return (
        <div>
        {useEffect(() => {
            getPost();
        }, [])}
        {/* if show if true then render the post*/
        show ? (
            <div>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
                <p>{post.price}</p>
            </div>
        ) : console.log(2)}
        <h1>Post</h1>
        </div>
    );
}

export default Post;
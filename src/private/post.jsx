import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const url = "http://127.0.0.1:8000/post/";
const images = [];

const Post = () => {
    // get params 
    let { id } = useParams();
    //get params 
    const [show, setShow] = useState(false); 
    const [selectedImage, setSelectedImage] = useState(null);
    const getPost = () => {
        axios.post(url, {
            post_id: id,
            token: localStorage.getItem("access"),
        }).then((res) => {
            if (res.status === 200) {
                setShow(true);
                images.push("http://127.0.0.1:8000"+res.data['image']);
                if(res.data['other_image1']) images.push("http://127.0.0.1:8000"+res.data['other_image1']);
                if(res.data['other_image2']) images.push("http://127.0.0.1:8000"+res.data['other_image2']);
                if(res.data['other_image3']) images.push("http://127.0.0.1:8000"+res.data['other_image3']);
                setSelectedImage(images[0]);
                console.log(images);
            } else {
                alert("error");
            }
        }
        );
    }
    const mainpage = () => {
        return (

                <div>
                    <img src = {selectedImage} alt = "post" style = {{width: "500px", height: "auto"}}/>
                    <div> 
                    {
                        images.map((img)=>{
                            return (
                                <img src = {img}
                                onClick = {() => { setSelectedImage(img) }}
                                alt = "post" 
                                style = {(img === selectedImage) ? {width: "100px", height: "auto", border:"5px solid red"} : {width: "100px", height: "auto"}}/>
                            )
                        })
                    }
                    </div>
                </div>
            )
    }
    
    return (
        <div>
            {useEffect(() => getPost(), [])}

            {show ? mainpage(): <div>loading</div>}
        </div>
        );
}

export default Post;
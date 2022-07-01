import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Card from "react-bootstrap/Card";
import GridList from "react-bootstrap/ListGroup";
import SlideShow from 'react-slideshow-ui';
import { Zoom, Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const url = "http://127.0.0.1:8000/post/";
const images = [];

const Post = () => {
    let { id } = useParams();
    console.log(id);
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
                images.push("http://127.0.0.1:8000"+res.data['image']);
                if(res.data['other_image1']) images.push("http://127.0.0.1:8000"+res.data['other_image1']);
                if(res.data['other_image2']) images.push("http://127.0.0.1:8000"+res.data['other_image2']);
                if(res.data['other_image3']) images.push("http://127.0.0.1:8000"+res.data['other_image3']);
                console.log(images);
            } else {
                alert("error");
            }
        }
        );
    }
    const slideRef = useRef();
    const properties = {
        duration: 5000,
        autoplay: false,
        transitionDuration: 500,
        arrows: false,
        infinite: true,
        easing: "ease",
        indicators: (i) => <div className="indicator">{i + 1}</div>
      };
      const back = () =>  {
        slideRef.current.goBack();
      }
    
      const next = () => {
        slideRef.current.goNext();
      }
    
    return (
        <div>
        {useEffect(() => {
            getPost();
        }, [])}
        {/* if show if true then render the post*/
        show ? (
            <div>
                <div className="slide-container">
                <Slide {...properties} >
                    {images.map((image) => (
                        <div>
                            {console.log(1)}
                        </div>
                    ))}
                </Slide>

                <div className="slide-container buttons">
                    <button onClick={back} type="button">
                        Go Back
                    </button>
                    <button onClick={next} type="button">
                        Go Next
                    </button>
                </div>

                </div>
            </div>
      
        ) : console.log(2)}
        <h1>Post</h1>
        </div>
    );
}

export default Post;
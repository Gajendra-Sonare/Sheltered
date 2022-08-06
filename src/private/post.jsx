import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import PrivateNavbar from "../privateComponents/privateNavbar";

const url = "http://127.0.0.1:8000/post/";
const images = [];

const Post = () => {
  let { id } = useParams();
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [post, setPost] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setEdit(queryParams.get("edit"));
  }, []);

  const deletePost = (e, id) => {
    e.preventDefault();
    // give a warning before deleting
    if (window.confirm("Are you sure you want to delete this post?")) {
      const token = localStorage.getItem("access");
      axios
        .post("http://127.0.0.1:8000/deletepost/", {
          token: token,
          post_id: id,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data, "sucess");
            window.location.href = "/mypost/1";
          } else {
            alert("error");
          }
        });
    } else {
      return;
    }
  };

  const showPost = () => {
    return (
      <div >
        <div style={{ position: "absolute", textAlign: "left", 'background-color': 'rgb(0 0 0 / 13%)', width:'50%', top:'10%'}}>
          {/* <h3 style={{ textAlign: "center" }}>{post["title"]}</h3> */}
          <img
            src={selectedImage}
            alt="post"
            style={{ display: 'block',
              'margin-left': 'auto',
              'margin-right': 'auto', height: "250px", 'border-style': 'solid'}}
          />
          <div style={{display: 'block',
              'margin-left': 'auto',
              'margin-right': 'auto'}}>
            {images.map((img) => {
              return (
                <img
                
                  src={img}
                  onClick={() => {
                    setSelectedImage(img);
                  }}
                  key={img}
                  alt="post"
                  style={
                    img === selectedImage
                      ? {
                          width: "100px",
                          height: "auto",
                          border: "5px solid red",
                           
                        }
                      : { width: "100px", height: "auto", 'border-style': 'double'}
                  }
                />
              );
            })}
          </div>
          
        </div>

          <div style={{ position: "absolute", textAlign: "top", width:'50%', left:'52%', height: "250px", top:'10%', 'background-color': 'rgb(0 0 0 / 13%)'}} >
            
            <h1>₹ {post["price"]} </h1>
            <h4>{post["title"]}</h4>
            <small>{post["landmark"] + " " + post["street"] + " " + post["pincode"]}</small>
            
          </div>

            <div style={{ position: "absolute", textAlign: "left", width:'50%', left:'52%',  top:'60%', 'background-color': 'rgb(0 0 0 / 13%)'}} >
            <h4>Dealer</h4>
            <p>name : {post["user_details"]["name"]}</p>
            <p>mobile : {post["user_details"]["mobile"]}</p>
            </div>
        
        <div style={{position: "absolute", top:'60%', width:'50%', 'background-color': 'rgb(0 0 0/13%)'}}>
          <h3>details</h3>
          <p>{post["description"]}</p>
        </div>

      </div>
    );
  };

  useEffect(() => {
    axios
      .post(url, {
        post_id: id,
        token: localStorage.getItem("access"),
      })
      .then((res) => {
        if (res.status === 200) {
          images.splice(0, images.length);
          setPost(res.data);
          setShow(true);
          images.push("http://127.0.0.1:8000" + res.data["image"]);
          if (res.data["other_image1"])
            images.push("http://127.0.0.1:8000" + res.data["other_image1"]);
          if (res.data["other_image2"])
            images.push("http://127.0.0.1:8000" + res.data["other_image2"]);
          if (res.data["other_image3"])
            images.push("http://127.0.0.1:8000" + res.data["other_image3"]);
          setSelectedImage(images[0]);
        } else {
          alert("error");
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!show) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <PrivateNavbar />
        {showPost()}
        {edit === "true" ? (
          <button style={{position:'absolute', bottom:'8%'}} className="btn btn-danger" onClick={(e) => deletePost(e, id)}>
            delete
          </button>
        ) : null}
      </div>
    );
  }
};

export default Post;

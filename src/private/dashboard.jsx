import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import authContext from "../utils/auth-context";
import PrivateNavbar from "../privateComponents/privateNavbar";
import CheckLoginStatus from "../utils/check-login-status";
import axios from "axios";
import Card from "react-bootstrap/Card";
import GridList from "react-bootstrap/ListGroup";

const url = "http://127.0.0.1:8000/dashboard/";
let page_number = 1;

const Dashboard = () => {
  const { login, setLogin } = useContext(authContext);
  const [posts, setPosts] = useState([]);
  let navigate = useNavigate();
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setSearch(queryParams.get("search"));
  }, []);
  

  const handleNext = (e) => {
    e.preventDefault();
    if(posts.length === 4){
      page_number += 1;
      getAllPosts(setPosts, page_number);
    }else{
      alert("You have reached the end of the list");
    }
    
  };

  const handlePrv = (e) => {
    e.preventDefault();
    if(page_number > 1){
      page_number -= 1;
      getAllPosts(setPosts, page_number);
    }
  }

  const getAllPosts = (setPosts, page_number) => {
    axios
      .post(url, {
        page: page_number,
      })
      .then((res) => {
        if (res.status === 200) {
          if(res.data.length === 0){
            alert('no more posts');
          }else{
            setPosts(res.data);
          }
        } else {
          alert("error");
        }
      });
  };

  const getPost = (e, id) => {
    e.preventDefault();
    //navigate to /dashboard/post and pass id as param
    navigate("/dashboard/post/"+id);
  };


  const showImages = (posts) => {
    return (
      <GridList cols={3} 
      key={posts.id} 
      // style={{ position: "absolute", textAlign: "center"}}
      >

        {posts.map((post) => (
          <Card 
            href="#"
            style={{
             
              width: "26rem",
              justifyContent: "space-between",
              margin: "2rem",
              position: "relative",
            }}
            bg="secondary"
            text="white"
            key={post.id}
          >
            <Card.Link href={"http://localhost:3000/dashboard/post/"+post[1]}>
              <Card.Header  style={{ cursor: "pointer" }} className="text-white">
                <h4>{post[0]}</h4>
              </Card.Header>
            </Card.Link>
            <Card.Img variant="top" src={"http://127.0.0.1:8000" + post[7]}  />
            <Card.Body>
              <Card.Title>{"₹ " + post[2]}</Card.Title>
              <Card.Text> {post[3]} </Card.Text>
              <button onClick={(e) => getPost(e, post[1])} className="btn btn-primary" >
                  View Post
                </button>
              <Card.Text>
                <small className="text-white-50 bg-dark float-right"> {post[5] + ' ' + post[6]} </small>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </GridList>
    );
  };

  return (
    <div>
      <PrivateNavbar />
      {!login ? CheckLoginStatus() : null}
      {login ? null : <Navigate to="/login" />}
      {useEffect(() => {
        getAllPosts(setPosts, page_number);
      }, [])}
      {showImages(posts)}

      {page_number > 1 ? <button style={{"margin":"20px"}} onClick={handlePrv} className="btn btn-primary">Previous</button> : null}
      {posts.length === 4 ? <button onClick={handleNext} className="btn btn-primary">Next</button> : null}
      {(posts.length === 0) && <div style={{"textAlign":"center"}}>No posts</div>}
      
    </div>
  );
};

export default Dashboard;

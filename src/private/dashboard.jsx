import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import authContext from "../utils/auth-context";
import PrivateNavbar from "../privateComponents/privateNavbar";
import CheckLoginStatus from "../utils/check-login-status";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import MyPost from "./mypost";

const url = "http://127.0.0.1:8000/dashboard/";
let page_number = 1;

const Dashboard = () => {
  let x = -1;
  const { login, setLogin } = useContext(authContext);
  const [posts, setPosts] = useState([]);
  let navigate = useNavigate();
  const handle = (e) => {
    e.preventDefault();
    page_number += 1;
    getAllPosts(setPosts, page_number);
  };

  const getAllPosts = (setPosts, page_number) => {
    axios
      .post(url, {
        page: page_number,
      })
      .then((res) => {
        if (res.status === 200) {
          setPosts(res.data);
        } else {
          alert("error");
        }
      });
  };

  const getPost = (e, id) => {
    e.preventDefault();
    //navigate to /dashboard/post and pass id as param
    navigate("/dashboard/post/"+id);
    console.log('you wants to see', id);
  };


  const showImages = (posts) => {
    return (
      <ListGroup>
        {posts.map((post) => (
          <Card
            href="#"
            style={{
              width: "26rem",
              justifyContent: "space-between",
              margin: "2rem",
            }}
            bg="secondary"
            text="white"
          >
            <Card.Link>
              <Card.Header style={{ cursor: "pointer" }} className="text-white">
                <h4>{post[0]}</h4>
              </Card.Header>
            </Card.Link>
            <Card.Img variant="top" src={"http://127.0.0.1:8000" + post[4]} />
            <Card.Body>
              <Card.Title>{"price :" + post[2] + " Rs."}</Card.Title>
              <Card.Text> {post[3]} </Card.Text>
              <button onClick={(e) => getPost(e, post[1])} className="btn btn-primary" >
                  View Post
                </button>
            </Card.Body>
          </Card>
        ))}
      </ListGroup>
    );
  };

  return (
    <div>
      <PrivateNavbar />
      {!login ? CheckLoginStatus() : console.log("hello")}
      {login ? console.log(1) : <Navigate to="/login" />}
      {useEffect(() => {
        getAllPosts(setPosts, page_number);
      }, [])}
      {showImages(posts)}
      <button type="submit" onClick={handle}>
        Next
      </button>
    </div>
  );
};

export default Dashboard;

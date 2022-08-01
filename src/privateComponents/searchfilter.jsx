import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import GridList from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import PrivateNavbar from "./privateNavbar";


const Search = () => {
  const url = "http://127.0.0.1:8000/";
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setSearch(queryParams.get("pincode"));
  }, []);

  useEffect(() => {
    if (search) {
      axios
        .post(url + "searchfilter/", {
          pincode: search,
        })
        .then((res) => {
            setPosts(res.data);
            console.log(res.data);
        });
    }
  }, [search]);
  const getPost = (e, id) => {
    e.preventDefault();
    //navigate to /dashboard/post and pass id as param
    navigate("/dashboard/post/"+id);
  };

  const showPosts = () => {
    return (
      <div>
        {(!posts || posts.length === 0) ? <h1>No posts found</h1> : null}
        {console.log(posts)}
        {posts.map((post) => (
          <GridList cols={3} key={post.id} >
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
                  {/* <button onClick={(e) => edit(e, post[1])} className="btn btn-info" style={{margin:"20px"}}> Edit</button> */}
  
                  
                <Card.Text>
                  <small className="text-white-50 bg-dark float-right"> {post[5] + ' ' + post[6]} </small>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </GridList>
        ))}
       </div>
    );
  };
//  show it only once
  if (!posts || posts.length === 0) {
    return <div>Loading...</div>;

  } else {
    return (
      <div>
        <PrivateNavbar />
        {showPosts()}
      </div>
    );
  }
};
export default Search;

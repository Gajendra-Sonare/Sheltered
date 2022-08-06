import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import authContext from "../utils/auth-context";
import PrivateNavbar from "../privateComponents/privateNavbar";
import axios from "axios";
import Card from "react-bootstrap/Card";
import GridList from "react-bootstrap/ListGroup";
// import Post from "./post";

const url = "http://127.0.0.1:8000/";

const Search = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setSearch(queryParams.get("pincode"));
    setPage(queryParams.get("page"));

  }, []);

    const getPost = (e, id) => {
    e.preventDefault();
    //navigate to /dashboard/post and pass id as param
    navigate("/dashboard/post/"+id);
  };

  const handleNext = (e) => {
    if(posts.length === 4){ 
      const newPage = parseInt(page) + 1;
        setPage(newPage);
        console.log(newPage);
        // change url search params to page +1 
        navigate("?pincode="+search+"&page="+newPage);

        // navigate("/mypost/"+page);
    }else{
      alert("You have reached the end of the list");
    }
  };

  const handlePrv = (e) => {

    e.preventDefault();
    if(page > 1){
      const newPage = parseInt(page) - 1;
        setPage(newPage);
        console.log(newPage);
        navigate("?pincode="+search+"&page="+newPage);
    }
  }


  const getAllPosts = (setPosts) => {
    console.log('search', search);
    const token = localStorage.getItem("access");
    if(search){
      axios
      .post(url + "searchfilter/", {
        page: page,
        pincode: search,
      })
      .then((res) => {
          setPosts(res.data);
          console.log(res.data);
      });
    }
  };

  

  const showImages = (posts) => {
    return (
      <GridList cols={3} key={posts.id}>
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
            <Card.Link href={"http://localhost:3000/dashboard/post/" + post[1]}>
              <Card.Header style={{ cursor: "pointer" }} className="text-white">
                <h4>{post[0]}</h4>
              </Card.Header>
            </Card.Link>
            <Card.Img variant="top" src={"http://127.0.0.1:8000" + post[7]} />
            <Card.Body>
              <Card.Title>{"₹ " + post[2]}</Card.Title>
              <Card.Text> {post[3]} </Card.Text>
                               <button onClick={(e) => getPost(e, post[1])} className="btn btn-primary" >
                     View Post
                   </button>

              <Card.Text>
                <small className="text-white-50 bg-dark float-right">
                  {" "}
                  {post[5] + " " + post[6]}{" "}
                </small>
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
      {useEffect(() => {
        getAllPosts(setPosts);
      }, [search])}
      {showImages(posts)}
      {page > 1 ? <button style={{"margin":"20px"}} onClick={handlePrv} className="btn btn-primary">Previous</button> : null}
      {posts.length === 4 ? <button onClick={handleNext} className="btn btn-primary">Next</button> : null}
      {(posts.length === 0) && <div style={{"textAlign":"center"}}>No posts</div>}
    </div>
    
  );
};

export default Search;

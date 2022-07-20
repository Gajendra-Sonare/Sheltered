import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import GridList from "react-bootstrap/ListGroup";

const Search = () => {
    const url = "http://127.0.0.1:8000/";
    const [search, setSearch] = useState("");
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        setSearch(queryParams.get("pincode"));
        
      }, []);

      const getPosts = () => {
        axios
          .post(url+'searchfilter/', {
            pincode: search,
          })
          .then((res) => {
            if (res.status === 200) {
              console.log(res.data);
            } else {
              alert("error");
            }
          });
        
          return(
            <div>
              <h1>{search}</h1>
            </div>
          )
      }
        

    return (
        <div>
            {(search) ? getPosts() : <h1>No pincode found</h1>}
        </div>
    );
    }
export default Search;
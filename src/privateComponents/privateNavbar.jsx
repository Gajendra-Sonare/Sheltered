import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const PrivateNavbar = () => {
  const ref_pincode = useRef();
  let navigate = useNavigate();
  
  const search = (e) => {
    e.preventDefault();
    navigate(`/dashboard/search/?pincode=${ref_pincode.current.value}`+"&page=1");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" style={{ color: "#6042c9" }} href="/">
            Sheltered
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/dashboard"
                >
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/create">
                  Create
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/mypost/1">
                  My posts
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/logout">
                  Logout
                </a>
              </li>

              <form
                id="pincode"
                className="form-inline my-2 my-lg-0"
              >
                <input
                  id="x"
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search by Pincode"
                  aria-label="Search"
                  ref={ref_pincode}
                />
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                  onClick={search}
                >
                  Search
                </button>
              </form>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default PrivateNavbar;

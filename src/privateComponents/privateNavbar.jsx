import React from "react";
class PrivateNavbar extends React.Component {
  
  render() { 
    return (

      <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" style={{color:'#6042c9'}} href="/">Sheltered</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/dashboard">Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/create">Create</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/mypost/1">My posts</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/logout">Logout</a>
              </li>
              
            </ul>
          </div>
              
        </div>
      </nav>
      </div>
    );
  }
}

export default PrivateNavbar;

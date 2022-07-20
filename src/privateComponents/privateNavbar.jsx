import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
// class PrivateNavbar extends React.Component {

//   render() {
//     const func = (e) => {
//       // get the input field whose id is "pincode"
//       e.preventDefault();
//       console.log(e.target.value);
//       var inputVal = document.getElementById("x");
//       console.log(inputVal.inputMode);
//       // console.log(inputVal.id);
//       return <h1>hello</h1>
//     }
//     return (

//       <div>
//                 <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//         <div className="container-fluid">
//           <a className="navbar-brand" style={{color:'#6042c9'}} href="/">Sheltered</a>
//           <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav">
//               <li className="nav-item">
//                 <a className="nav-link active" aria-current="page" href="/dashboard">Dashboard</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="/create">Create</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="/mypost/1">My posts</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="/logout">Logout</a>
//               </li>

//               <form id='pincode' class="form-inline my-2 my-lg-0" onSubmit={func}>
//                 <input id = 'x' class="form-control mr-sm-2" type="search" placeholder="Search by Pincode" aria-label="Search" />
//               <button  class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
//             </form>

//             </ul>
//           </div>

//         </div>
//       </nav>
//       </div>
//     );
//   }
// }

const PrivateNavbar = () => {
  const ref_pincode = useRef();
  let navigate = useNavigate();
  
  const search = (e) => {
    e.preventDefault();
    navigate(`/dashboard/search/?pincode=${ref_pincode.current.value}`);
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
                class="form-inline my-2 my-lg-0"
              >
                <input
                  id="x"
                  class="form-control mr-sm-2"
                  type="search"
                  placeholder="Search by Pincode"
                  aria-label="Search"
                  ref={ref_pincode}
                />
                <button
                  class="btn btn-outline-success my-2 my-sm-0"
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

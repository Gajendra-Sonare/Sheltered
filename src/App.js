import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, {useContext, useState} from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import AboutPage from "./pages/AboutPage";
import Dashboard from "./private/dashboard";
import PrivateRoute from "./utils/PrivateRoute";
import authContext from './utils/auth-context';
import Create from "./private/create";
import MyPost from "./private/mypost";
import CheckLoginStatus from "./utils/check-login-status";
import NavBar from "./components/Navbar";
import Logout from "./utils/logout";
import Post from "./private/post";
import NoPageFound from "./pages/NoPageFound";
import Search from "./privateComponents/searchfilter";

function App(){
  const temp = useContext(authContext);
  const [login, setLogin] = useState(temp); 
  return (
    <BrowserRouter>
        <authContext.Provider value={{login, setLogin}}>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route exact path="/dashboard" element={<PrivateRoute> <Dashboard/> </PrivateRoute>} />
            <Route path="create" element={<PrivateRoute> <Create/> </PrivateRoute>}/>
            <Route exact path="/mypost/:page" element={<PrivateRoute> <MyPost/> </PrivateRoute>}/>
            <Route path="/check" element={<PrivateRoute> <CheckLoginStatus/> </PrivateRoute>}/>
            <Route path="/logout" element={<PrivateRoute> <Logout /> </PrivateRoute>}/>
            <Route exact path="/dashboard/post/:id" element={<PrivateRoute> <Post/> </PrivateRoute>}/>
            <Route exact path="dashboard/search/" element={<PrivateRoute> <Search/> </PrivateRoute>}/>
          
            <Route exact path="/" element={<Home/>}/> 
            <Route exact path="/signup" element={<Signup/>}/>
            <Route exact path="/about" element={<About/>}/>
            <Route exact path="/aboutpage" element={<AboutPage/>}/>
            <Route exact path="*" element={<NoPageFound/>}/>

          </Routes>
        </authContext.Provider>
     
    </BrowserRouter>
  );
}

export default App;

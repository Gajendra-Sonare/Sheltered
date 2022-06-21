import authContext from "./auth-context";
import { useContext } from "react";
import { useNavigate, Navigate} from "react-router-dom";

const Logout = () => {
    let navigate = useNavigate();
    const { setLogin } = useContext(authContext);
    setLogin(false);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    return(
        <div>
            {navigate('/login')}
            <Navigate to="/login"/>
        </div>
    )
}
export default Logout;
import React, {useContext, useRef} from 'react'; 
import authContext from '../utils/auth-context';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import PrivateNavbar from '../privateComponents/privateNavbar';

const url = "http://127.0.0.1:8000/create_post/";
const Create = () => {
    const {login, setLogin} = useContext(authContext);
    let navigate = useNavigate();
    const ref_title = useRef();
    const ref_price = useRef();
    const ref_desc = useRef();
    const ref_image = useRef();
    const ref_other_image1 = useRef();
    const ref_other_image2 = useRef();
    const ref_other_image3 = useRef();

    const submit = () =>{
        const token = localStorage.getItem('access');
        let formdata = new FormData();                      // using formdata
        formdata.append('title', ref_title.current.value);
        formdata.append('price',ref_price.current.value);
        formdata.append('description',ref_desc.current.value);
        formdata.append('token',token);
        if(ref_image.current.value!==''){
            formdata.append('image',ref_image.current.files[0], ref_image.current.files[0].name);
        } 
        if(ref_other_image1.current.value!==''){
            formdata.append('other_image1',ref_other_image1.current.files[0], ref_other_image1.current.files[0].name);
        }
        if(ref_other_image2.current.value!==''){
            formdata.append('other_image2',ref_other_image1.current.files[0], ref_other_image2.current.files[0].name);
        }
        if(ref_other_image3.current.value!==''){
            formdata.append('other_image3',ref_other_image1.current.files[0], ref_other_image3.current.files[0].name);
        }  
        console.log(formdata.get('image'));
        axios.post(url, formdata).then(res => {
            (res.status == 200)?alert('success'):alert('error');
        })
        
    }
    
    
    return (
        <div>
            {!login?<Navigate to='/login' />:console.log("hello")}
            {(login) ? <button onClick={()=>{localStorage.removeItem('access'); localStorage.removeItem('refresh');setLogin(false); navigate('/login')}}>logout</button> : <Navigate to="/login" />}
            <PrivateNavbar />
            <form>
                <input type="text" placeholder="title" ref={ref_title} />
                <input type="number" placeholder="price" ref={ref_price} />
                <input type="text" placeholder="description" ref={ref_desc} />
                <input type="file" ref={ref_image} />
                <input type="file" ref={ref_other_image1} />
                <input type="file" ref={ref_other_image2} />
                <input type="file" ref={ref_other_image3} />
                
            </form>
            <button onClick={submit}>submit</button>
        </div>
    )
}
export default Create

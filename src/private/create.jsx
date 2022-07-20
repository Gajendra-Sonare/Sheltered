import React, { useContext, useRef } from "react";
import authContext from "../utils/auth-context";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import PrivateNavbar from "../privateComponents/privateNavbar";

const url = "http://127.0.0.1:8000/create_post/";

{
  /* <div className="mb-3">
<label>description</label>
<input style={{"height":"100px"}}
  type="text"
  className="form-control"
  placeholder="Description"
  ref={ref_desc}
/>
</div> */
}

const Create = () => {
  const { login, setLogin } = useContext(authContext);
  let navigate = useNavigate();
  const ref_title = useRef();
  const ref_price = useRef();
  const ref_desc = useRef();
  const ref_image = useRef();
  const pincode = useRef();
  const street = useRef();
  const landmark = useRef();
  const ref_other_image1 = useRef();
  const ref_other_image2 = useRef();
  const ref_other_image3 = useRef();

  const submit = () => {
    const token = localStorage.getItem("access");

    let formdata = new FormData(); // using formdata
    formdata.append("title", ref_title.current.value);
    formdata.append("price", ref_price.current.value);
    formdata.append("description", ref_desc.current.value);
    formdata.append("token", token);
    formdata.append("pincode", pincode.current.value);
    formdata.append("street", street.current.value);
    formdata.append("landmark", landmark.current.value);
    console.log(ref_image.current.value);

    if (ref_image.current.value !== "") {
      formdata.append(
        "image",
        ref_image.current.files[0],
        ref_image.current.files[0].name
      );
    }
    if (ref_other_image1.current.value !== "") {
      formdata.append(
        "other_image1",
        ref_other_image1.current.files[0],
        ref_other_image1.current.files[0].name
      );
    }

    if (ref_other_image2.current.value !== "") {
      formdata.append(
        "other_image2",
        ref_other_image1.current.files[0],
        ref_other_image2.current.files[0].name
      );
    }
    if (ref_other_image3.current.value !== "") {
      formdata.append(
        "other_image3",
        ref_other_image1.current.files[0],
        ref_other_image3.current.files[0].name
      );
    }
    console.log(formdata.get("image"));
    axios.post(url, formdata).then((res) => {
      res.status == 200 ? navigate('/mypost/1') : alert("error");
    });
  };
  const Check = () => {
    const { login, setLogin } = useContext(authContext);
    let navigate = useNavigate();
    const token = localStorage.getItem("access");
    if (!token) {
      console.log("not token ", token);
      setLogin(false);
      navigate("/login");
    }
    const url = "http://127.0.0.1:8000/isvalid/";
    axios
      .post(url, {
        token: token,
      })
      .then((res) => {
        if (res.status === 200) {
          setLogin(true);
        }
      });
  };

  return (
    <div>
      <PrivateNavbar />
      <form>
        <h3>Create Post</h3>
        <div className="mb-3 ">
          <label>title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            ref={ref_title}
          />
        </div>

        <div className="mb-3">
          <label>price</label>
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            ref={ref_price}
          />
        </div>

        <div className="mb-3">
          <label>description</label>
          <textarea
            style={{ resize: "none" }}
            rows="5"
            cols="60"
            name="description"
            type="text"
            className="form-control"
            placeholder="Description"
            ref={ref_desc}
          ></textarea>
        </div>

        <div className="mb-3">
          <label>pincode</label>
          <input
            type="number"
            className="form-control"
            placeholder="Pincode"
            ref={pincode}
          />
        </div>

        <div className="mb-3">
          <label>street</label>
          <input
            type="text"
            className="form-control"
            placeholder="Street"
            ref={street}
          />
        </div>

        <div className="mb-3">
          <label>landmark</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ex. near sabji mandi"
            ref={landmark}
          />
        </div>

        <div className="mb-3">
          <input type="file" ref={ref_image} />
          <input type="file" ref={ref_other_image1} />
          <input type="file" ref={ref_other_image2} />
          <input type="file" ref={ref_other_image3} />
        </div>
        {/* <input type="file" ref={ref_other_image1} />
                <input type="file" ref={ref_other_image2} />
                <input type="file" ref={ref_other_image3} /> */}
      </form>

      <button onClick={submit} className="btn btn-primary">
        submit
      </button>
    </div>
  );
};
export default Create;

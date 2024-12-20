import React, {useState, useEffect} from "react";
import {useNavigate, useParams, Link, Navigate} from "react-router-dom";
import "./AddEdit.css";
import {toast} from "react-toastify";
import axios from "axios";

const initialState = {
    name: "",
    email: "",
    contact: "",
};

const AddEdit = () => {
    const [state, setState] =useState(initialState);

    const {name,  email, contact} = state;

    const history = useNavigate();

    const {id} =useParams();
    
    useEffect (() => {
       axios
       .get(`http://localhost:8085/api/remove/${id}`)
       .then((resp) => setState({ ...resp.data[0] }));
    }, [id]);

    const handleSubmit = (e) => {
      e.preventDefault();
      if(!name || !email || !contact) {
        toast.error("Please provide value into each input field");
      }else{
        if(!id) {
            axios
               .post("http://localhost:8085/api/post", {
                 name,
                 email,
                 contact,
              })
              .then(() => {
                setState({name: "", email: "", contact:""})
              })
              .catch((err) => toast.error(err.response.data));
            toast.success("Contact Added Successfully");
        } else {
            axios
            .put(`http://localhost:8085/api/update/${id}`, {
                name,
                email,
                contact,
            })
            .then(() => {
                setState({name: "", email: "", contact:""})
            })
            .catch((err) => toast.error(err.response.data));
           toast.success("Contact Updated Successfully");
        }
       
       setTimeout(() => Navigate("/"), 500);
      }   
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({ ...state, [name]: value });
    };

    return(
        <div style={{marginTop: "100px"}}>
          <form 
              style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}
            onSubmit={handleSubmit}
            >
                <label htmlFor="name">Name</label>
                <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name ..."
                value={name || ""}
                onChange={handleInputChange}
                />
                <label htmlFor="email">Email</label>
                <input
                type="text"
                id="email"
                name="email"
                placeholder="Your email ..."
                value={email || ""}
                onChange={handleInputChange}
                />
                <label htmlFor="contact">Contact</label>
                <input
                type="number"
                id="contact"
                name="contact"
                placeholder="Your Contact No ..."
                value={contact || ""} 
                onChange={handleInputChange}
                />
                <input type="submit"value={id ? "Update" : "Save"} />
                <Link to="/">
                     <input type="button"value="Go Back" />
                </Link>
            </form>
        </div>
    )
}

export default AddEdit;
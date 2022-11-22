import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const serverApi = process.env.REACT_APP_SERVER_API;

const Login = (props) => {

    const {showAlert} = props;

    let navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch(`${serverApi}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            const res = await response.json();
            if(res.authToken){
                //Save the authToken and redirect
                localStorage.setItem("token", res.authToken);
                showAlert("Logged in successfully", "success");
                navigate("/");
            }else{
                console.log("Authentication failed");
                showAlert("Incorrect Credentials", "warning");
                navigate("/login");
                // res.status(401).send("Incorrect credentials entered");
            }
        } catch (error) {
            console.log(error);
            showAlert("Some Internal Error", "danger");
            navigate("/login");
            // res.status(500).send("Some Internal Error");
        }
    }

    return (
        <div>
            <h1 className="mt-3">Log In to your Cloud Notebook account</h1>
            <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={user.email} id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={user.password} id="password" name="password" onChange={onChange} required/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
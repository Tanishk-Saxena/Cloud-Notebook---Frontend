import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  let location = useLocation();
  let navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    showAlert("Logged out successfully.", "success");
    navigate("/login");
  }
  
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand"><img src={require("../images/notebook.png")} height="30px"/></Link>
        <Link className="navbar-brand" to="/">Cloud Notebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/"?"active":""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about"?"active":""}`} to="/about">About</Link>
            </li>
          </ul>
          <form className="d-flex">
            {!localStorage.getItem("token")?
            <>
            <Link className="btn btn-outline-info mx-2" to="/login" role="button">Log In</Link>
            <Link className="btn btn-outline-info" to="/signup" role="button">Sign Up</Link>
            </>:
            <>
            <button className="btn btn-primary" onClick={handleLogOut}>Log Out</button>
            </>}
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
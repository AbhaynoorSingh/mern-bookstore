import React from 'react'

import { Link } from 'react-router-dom';

function Navbar() {
  const handellogout=()=>{
    const confirm= window.confirm("are you really want to logout?")
  
    if(confirm){
      window.location.href="./AdminLogin"
    }else{
  
    }
  }

  return (
    <div>
       <nav style={{border:"1px solid",backdropFilter:"blur(10px)",boxShadow: '12px 18px 22px rgba(0, 0, 0, 0.1)'}} className={`navbar navbar-expand-lg` }>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Admin</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/AdminUi">Add books</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Allbooks">All books</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Students">All students</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Issuereq"> Requests</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/issued"> Issued</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/feedbackUser"> Feedback</Link>
              </li>
             
              <li className="nav-item">
                <Link  onClick={handellogout} style={{backgroundColor:"transparent",borderRadius:"12px"}} className="nav-link" >Logout</Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar

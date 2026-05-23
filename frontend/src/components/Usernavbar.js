import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../Usercontext'

function Navbar() {

  const {setAcess,Acess,userdata,setuserdata} = useContext(UserContext)

const handellogout=()=>{
  const confirm= window.confirm("are you really want to logout?")

  if(confirm){
    window.location.href="./"
  }else{

  }
}

  return (
    <div>
       <nav style={{border:"1px solid",backdropFilter:"blur(10px)",boxShadow: '12px 18px 22px rgba(0, 0, 0, 0.1)'}} className={`navbar navbar-expand-lg`}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Hi {userdata.name}</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
  <li className="nav-item">
                <Link className="nav-link" to="/home" > Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Ui">Books</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Issuebooks" > Issued books</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/feedback" >  Feedback</Link>
              </li>
              
              <li className="nav-item">
              
                <Link className="nav-link" onClick={handellogout}  >Log out</Link>
              </li>
              
             
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar

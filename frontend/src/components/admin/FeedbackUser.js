import React from 'react'
import AdminNavbar from './AdminNavbar'
import { useState,useEffect } from 'react'

function FeedbackUser() {
const [data,setdata]=useState([])

    const fetchFeedback=async()=>{
const response = await fetch("http://localhost:8080/getfeedback",{
    method:"GET",
    headers:{
        "CONTENT-TYPE":"appliction/json"
    }
})
const Fetchdata = await response.json()
setdata(Fetchdata)
console.log(data)
    }

    useEffect(()=>{
        fetchFeedback() 
    })

  return (
    <div style={{backgroundColor:"aliceblue",height:"100vh",width:"100%"}}>
    <AdminNavbar></AdminNavbar>
 <h1 style={{textAlign:"center",margin:"50px",backgroundColor:"black",color:"white"}}>Feedbacks</h1>
   {data.map((info,index)=>(
    <div className="card text-bg-info mb-3" style={{ maxWidth: "28rem" }}>
  <div className="card-header"><h4>Feedback {index+1}</h4></div>
        <div className="card-body">
    <h6 className="card-title">Feedback from {info.name}</h6>
    <h6>Email::{info.email}</h6>
    <h6 className="card-text">
    Message::{info.message}
    </h6>
  </div>
</div>
   
   ))}
    </div>




  )
}

export default FeedbackUser

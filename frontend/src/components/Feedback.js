import React from 'react'
import Usernavbar from './Usernavbar'
import { useState,useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import styles from './Feedback.module.css'

function Feedback() {
    const [data,setdata]=useState({name:"",email:"",message:""})

   const handelchange=(e)=>{
const {name,value}=e.target;
setdata({
    ...data,
    [name]:value
})
console.log(data)
   }

   const handelsubmit=async(e)=>{
    e.preventDefault();
try{
const response = fetch("http://localhost:8080/feedback",{
    method:"POST",
    body:JSON.stringify(data),
    headers:{
        'CONTENT-TYPE':'application/json'
    }
})
const dataFetch = await response.json();
console.log("data fetch",dataFetch)
}
catch(err){
console.log(err)
}
   }

   useEffect(()=>{
    AOS.init({duration:"1000"})
   })

   const label={
    margin:"5px",
    fontSize:"20px",
    
   }
   const input={
width:"350px",
    padding:"5px",
   
   }
   const btn={
   
     marginTop:"10px",
    padding:"8px",
    width:"350px",
    backgroundColor:"#3eab3e",
    color:"white"
   }
   

   const bg="https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  return (
    <div className={styles.bg} style={{backgroundImage:`url(${bg})`,backgroundPosition:"center",height:"100vh"}}>
        <Usernavbar/>
<div style={{display:"flex"}} className={styles.container}>

       <div style={{ maxWidth:"500px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"500px"}} className={styles.container} data-aos="fade-right">
<h1>Feedback</h1><br></br>
<h2>We value your input!</h2><br></br>
<p>Your feedback is crucial in helping us improve our library management system. Whether you have suggestions, questions, or concerns, we want to hear from you. Please take a moment to share your thoughts with us.</p>
      <div className="contact">
       <h5>Email: support@librarysystem.com</h5><br></br>
       <h5>Phone: 1-800-LIBRARY</h5>
       </div>
      </div>
      <div style={{display:"flex",flexDirection:"column", justifyContent:"center",alignItems:'center    '}} className="form" data-aos="fade-left">
        <form className={styles.form} action="submit" method='POST' onSubmit={handelsubmit}>
            <h1 style={{textAlign:"center"}}>Feedback</h1>
            <label style={label} htmlFor="">Name</label><br />
            <input style={input} type="text" name="name" className={styles.input} onChange={handelchange} value={data.name} /><br />

            <label style={label} htmlFor="">Email</label><br />
            <input style={input} type="text" name="email" className={styles.input} onChange={handelchange} value={data.email}  /><br />

            <label style={label} htmlFor="">message</label><br />
             <textarea style={input} type="Message" name="message" row="5" cols="40" onChange={handelchange} value={data.message}  required/><br />

             <input style={btn} type="submit" value="Submit" />
        </form>
      </div>
    </div>
</div>
  )
}

export default Feedback

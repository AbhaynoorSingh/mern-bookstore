import React from 'react'
import Usernavbar from "./Usernavbar"
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';

function Home() {
const image="https://t3.ftcdn.net/jpg/04/47/19/30/360_F_447193040_0MTKO703A5olX1bC1lON7F4kHiPKEtte.jpg"

const box1="https://images.unsplash.com/photo-1543497415-75c0a27177c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJvb2t8ZW58MHx8MHx8fDA%3D"
const box2="https://images.unsplash.com/photo-1546521343-4eb2c01aa44b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvb2t8ZW58MHx8MHx8fDA%3D"
const box3="https://images.unsplash.com/photo-1576872381149-7847515ce5d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D"


useEffect(() => {
  AOS.init({ duration: 2000 });
}, []);

  return (
    <div style={{backgroundImage:`url(${image})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center",height:"100vh"}}>
          <Usernavbar />
      <div className="container">
        <h1 style={{textAlign:"center",marginTop:"20px"}}>Welcome to Library</h1>
       
       <div style={{marginTop:"100px",backdropFilter:"blur(10px)",borderRadius:"12px"}} className="knowledge">
        <h3>Books are an endless source of knowledge. They provide information on a wide range of topics, from science and history to art and philosophy. Reading books helps us expand our understanding of the world, develop critical thinking skills, and acquire new knowledge that can be applied in our everyday lives.</h3>
       </div>
 <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} className="boxes">

       <div  className="card" data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="1000" 
        style={{ width: "18rem",height:"20rem",margin:"20px" ,backgroundImage:`url(${box1})`,backgroundPosition:"center"}}>
  <div style={{display:"flex",flexDirection:"column",justifyContent:"center",boxShadow: '12px 12px 12px rgba(0, 0, 0, 0.1)'}} className="card-body">
    <h5 className="card-title"> Mental Stimulation and Cognitive Development</h5>
    <p className="card-text">
    Reading regularly stimulates the brain, enhancing cognitive functions and improving focus and concentration.  </p>
   
  </div>

  
 </div>

 <div  className="card" data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="1000"  style={{ width: "18rem",height:"20rem",margin:"20px" ,backgroundImage:`url(${box2})`,backgroundPosition:"center"}}>
  <div style={{display:"flex",flexDirection:"column",justifyContent:"center",boxShadow: '12px 12px 12px rgba(0, 0, 0, 0.1)'}} className="card-body">
    <h5 className="card-title">Stress Reduction and Relaxation</h5>
    <p className="card-text">
    Immersing yourself in a good book can be a great way to escape the stresses of everyday life.     </p>
    
  </div>

  
 </div>

 <div  className="card" data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="1000"  style={{ width: "18rem",height:"20rem",margin:"20px" ,backgroundImage:`url(${box3})`,backgroundPosition:"center", boxShadow: '12px 12px 12px rgba(0, 0, 0, 0.1)'}}>
  <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}} className="card-body">
    <h5 className="card-title"> Inspiration and Creativity</h5>
    <p className="card-text">
    books have the power to inspire us and fuel our creativity. They encourage us to think differently and explore new possibilities.    </p>
    
  </div>

  
 </div>
</div>


      </div>

    </div>
  )
}

export default Home

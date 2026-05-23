import React from 'react'
import Adminnavbar from "./AdminNavbar"
import { useState,useEffect } from 'react'

function Issued() {
const [fetchData,setData]=useState([])

  const fetching=async ()=>{
    const response = await fetch("http://localhost:8080/issuedbooks",{
      method:"GET"
    })
    const data=await response.json();
    console.log(data)
    setData(data)
  }
useEffect(()=>{
  fetching()

},[])

const currentDate=()=>{
  const date = new Date();
  return date.toLocaleDateString()
}

  return (
    <div style={{backgroundColor:"aliceblue",height:"100vh",width:"100%"}}>
    <Adminnavbar/>
    <h1 style={{textAlign:"center",margin:"20px"}}>issuedbooks</h1>
    <h4>Date:{currentDate()}</h4>
    <table className="table table-dark">
      <thead >
        <tr>
          <td>Student_name</td>
          <td>Book_name</td>
          <td>Author</td>
          <td>Date</td>
          <td>Price</td>
        </tr>
      </thead>
<tbody>
  {fetchData.map((list,index)=>(

  <tr key={index}>
    <td>{list.student}</td>
    <td>{list.name}</td>
    <td>{list.author}</td>
    <td>{list.date}</td>
    <td>{list.price}</td>
  </tr>

  ))}
</tbody>
</table>
    </div>
  )
}

export default Issued

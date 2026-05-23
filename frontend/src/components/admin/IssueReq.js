import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';


function Admin() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const response = await fetch("http://localhost:8080/requests", {
      method: "GET"
    });
    const result = await response.json();
    console.log(result);
    setRequests(result);
  };

  useEffect(() => {
    fetchRequests();
  }, [requests]);

  const approveRequest = async (requestId) => {
    const response = await fetch(`http://localhost:8080/approveRequest/${requestId}`, {
      method: "POST"
    });
    const result = await response.json();
    console.log(result);
    fetchRequests(); 
  };

  return (
    <div style={{backgroundColor:"aliceblue",height:"100vh",width:"100%"}}>
      <AdminNavbar/>
      <h1 style={{textAlign:"center",margin:"20px"}}>Request Panel</h1>
      <table className="table">
        <thead className="table-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Date</th>
            <th scope="col">Author</th>
            <th scope="col">Price</th>
            <th scope="col">Student</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index}>
              <td>{request.name}</td>
              <td>{request.date}</td>
              <td>{request.author}</td>
              <td>{request.price}</td>
              <td>{request.student}</td>
              <td>
                <button
                  onClick={() => approveRequest(request.id)}
                  className="btn btn-outline-success"
                >
                  Approve
                </button>
              </td>
            </tr> 
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;

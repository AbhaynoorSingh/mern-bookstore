import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";

function Admin() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const response = await fetch("http://localhost:8080/requests", {
        method: "GET",
      });

      const result = await response.json();

      setRequests(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approveRequest = async (requestId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/approveRequest/${requestId}`,
        {
          method: "POST",
        },
      );

      const result = await response.json();

      console.log(result);

      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right,#0f172a,#1e3a5f)",
      }}
    >
      <AdminNavbar />

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "3rem",
            }}
          >
            Request Panel
          </h1>

          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              padding: "15px 25px",
              borderRadius: "15px",
              color: "white",
              backdropFilter: "blur(10px)",
            }}
          >
            Pending Requests : <strong>{requests.length}</strong>
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="text-center text-white mt-5">
            <h2>No Pending Requests 📚</h2>
          </div>
        ) : (
          <div className="row">
            {requests.map((request, index) => (
              <div className="col-lg-4 col-md-6 mb-4" key={index}>
                <div
                  className="card h-100"
                  style={{
                    borderRadius: "25px",
                    overflow: "hidden",
                    border: "none",
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    color: "white",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                  }}
                >
                  <div
                    style={{
                      height: "200px",
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1974&auto=format&fit=crop)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>

                  <div className="card-body">
                    <h3
                      style={{
                        fontWeight: "bold",
                        marginBottom: "20px",
                      }}
                    >
                      {request.name}
                    </h3>

                    <p>
                      <strong>Author:</strong> {request.author}
                    </p>

                    <p>
                      <strong>Published:</strong> {request.date}
                    </p>

                    <p>
                      <strong>Price:</strong> ₹{request.price}
                    </p>

                    <p>
                      <strong>Requested By:</strong> {request.student}
                    </p>

                    <div className="mb-3">
                      <span
                        className="badge bg-warning text-dark"
                        style={{
                          padding: "10px",
                          fontSize: "14px",
                        }}
                      >
                        Pending Approval
                      </span>
                    </div>

                    <button
                      onClick={() => approveRequest(request.id)}
                      className="btn btn-success w-100"
                      style={{
                        borderRadius: "12px",
                        padding: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Approve Request
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;

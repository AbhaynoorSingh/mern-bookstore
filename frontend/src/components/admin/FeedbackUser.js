import React from "react";
import AdminNavbar from "./AdminNavbar";
import { useState, useEffect } from "react";

function FeedbackUser() {
  const [data, setdata] = useState([]);

  const fetchFeedback = async () => {
    try {
      const response = await fetch("http://localhost:8080/getfeedback", {
        method: "GET",
        headers: {
          "CONTENT-TYPE": "application/json",
        },
      });

      const Fetchdata = await response.json();

      setdata(Fetchdata);

      console.log(Fetchdata);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right,#0f172a,#1e3a5f)",
      }}
    >
      <AdminNavbar />

      <div className="container py-5">
        <div className="text-center mb-5">
          <h1
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "3rem",
            }}
          >
            User Feedbacks
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              marginTop: "10px",
            }}
          >
            Review what users are saying about the BOOKSTORE
          </p>
        </div>

        <div className="row">
          {data.map((info, index) => (
            <div className="col-lg-4 col-md-6 mb-4" key={index}>
              <div
                className="card h-100"
                style={{
                  border: "none",
                  borderRadius: "25px",
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  color: "white",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    background: "linear-gradient(to right,#06b6d4,#3b82f6)",
                    padding: "20px",
                  }}
                >
                  <h4
                    style={{
                      margin: 0,
                      fontWeight: "bold",
                    }}
                  >
                    Feedback #{index + 1}
                  </h4>
                </div>

                <div className="card-body">
                  <div className="mb-3">
                    <h5
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      👤 {info.name}
                    </h5>
                  </div>

                  <div className="mb-3">
                    <p
                      style={{
                        color: "#cbd5e1",
                        marginBottom: "5px",
                      }}
                    >
                      Email
                    </p>

                    <h6>{info.email}</h6>
                  </div>

                  <div>
                    <p
                      style={{
                        color: "#cbd5e1",
                        marginBottom: "5px",
                      }}
                    >
                      Message
                    </p>

                    <div
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        padding: "15px",
                        borderRadius: "15px",
                        lineHeight: "1.6",
                      }}
                    >
                      {info.message}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {data.length === 0 && (
          <div className="text-center text-white mt-5">
            <h2>No Feedback Available 📭</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedbackUser;

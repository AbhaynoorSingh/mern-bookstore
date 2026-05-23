import React from "react";
import Adminnavbar from "./AdminNavbar";
import { useState, useEffect } from "react";

function Issued() {
  const [fetchData, setData] = useState([]);

  const fetching = async () => {
    try {
      const response = await fetch("http://localhost:8080/issuedbooks", {
        method: "GET",
      });

      const data = await response.json();

      console.log(data);

      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetching();
  }, []);

  const currentDate = () => {
    const date = new Date();

    return date.toLocaleDateString();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right,#0f172a,#1e3a5f)",
      }}
    >
      <Adminnavbar />

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "3rem",
              }}
            >
              Issued Books
            </h1>

            <p
              style={{
                color: "#cbd5e1",
                marginTop: "10px",
              }}
            >
              Track all issued books in the BOOKSTORE
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              padding: "15px 25px",
              borderRadius: "15px",
              color: "white",
              backdropFilter: "blur(10px)",
            }}
          >
            <strong>Date:</strong> {currentDate()}
          </div>
        </div>

        <div className="row">
          {fetchData.map((list, index) => (
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
                    height: "220px",
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
                    {list.name}
                  </h3>

                  <p>
                    <strong>Student:</strong> {list.student}
                  </p>

                  <p>
                    <strong>Author:</strong> {list.author}
                  </p>

                  <p>
                    <strong>Published:</strong> {list.date}
                  </p>

                  <p>
                    <strong>Price:</strong> ₹{list.price}
                  </p>

                  <div className="mt-3">
                    <span
                      className="badge bg-success"
                      style={{
                        padding: "10px",
                        fontSize: "14px",
                      }}
                    >
                      Issued Successfully
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {fetchData.length === 0 && (
          <div className="text-center text-white mt-5">
            <h2>No Issued Books Found 📚</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Issued;

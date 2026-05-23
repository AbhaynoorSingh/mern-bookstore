import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";

function AdminUi() {
  const [rows, setRows] = useState([
    { name: "", date: "", author: "", price: "" },
  ]);

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(rows);
      const response = await fetch("http://localhost:8080/addbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rows),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #141e30, #243b55)",
        paddingBottom: "40px",
      }}
    >
      <AdminNavbar />

      <div className="container py-5">
        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              color: "white",
              marginBottom: "40px",
              fontWeight: "bold",
            }}
          >
            Admin Dashboard
          </h1>

          <div className="row text-center mb-5">
            <div className="col-md-4 mb-3">
              <div
                style={{
                  background: "#00c853",
                  padding: "25px",
                  borderRadius: "15px",
                  color: "white",
                }}
              >
                <h2>{rows.length}</h2>
                <p>Total Books Added</p>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div
                style={{
                  background: "#2962ff",
                  padding: "25px",
                  borderRadius: "15px",
                  color: "white",
                }}
              >
                <h2>BOOKSTORE</h2>
                <p>Management System</p>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div
                style={{
                  background: "#ff6d00",
                  padding: "25px",
                  borderRadius: "15px",
                  color: "white",
                }}
              >
                <h2>Admin</h2>
                <p>Control Panel</p>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "15px",
              padding: "30px",
            }}
          >
            <h3 className="mb-4 text-center">Add New Books</h3>

            <form method="POST" onSubmit={handleSubmit}>
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Book Name</th>
                    <th>Published Date</th>
                    <th>Author</th>
                    <th>Price</th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter book name"
                          value={row.name}
                          onChange={(e) =>
                            handleInputChange(index, "name", e.target.value)
                          }
                        />
                      </td>

                      <td>
                        <input
                          type="date"
                          className="form-control"
                          value={row.date}
                          onChange={(e) =>
                            handleInputChange(index, "date", e.target.value)
                          }
                        />
                      </td>

                      <td>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter author name"
                          value={row.author}
                          onChange={(e) =>
                            handleInputChange(index, "author", e.target.value)
                          }
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter price"
                          value={row.price}
                          onChange={(e) =>
                            handleInputChange(index, "price", e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="text-center mt-4">
                <button type="submit" className="btn btn-success btn-lg px-5">
                  Submit Books
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUi;

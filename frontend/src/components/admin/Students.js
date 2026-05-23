import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const fetchingData = async () => {
    try {
      const response = await fetch("http://localhost:8080/allstudents", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result && Array.isArray(result.success)) {
        setStudents(result.success);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);

      setStudents([]);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right,#0f172a,#1e3a5f)",
      }}
    >
      <AdminNavbar />

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "3rem",
            }}
          >
            Students
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
            Total Students : <strong>{students.length}</strong>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search students..."
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "15px",
              borderRadius: "15px",
              border: "none",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          />
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            borderRadius: "25px",
            overflow: "hidden",
            boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
          }}
        >
          <table className="table table-dark table-hover mb-0">
            <thead>
              <tr
                style={{
                  backgroundColor: "#111827",
                }}
              >
                <th>#</th>
                <th>Student Name</th>
                <th>Age</th>
                <th>Phone Number</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <td
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {data.name}
                  </td>

                  <td>{data.age}</td>

                  <td>{data.phoneno}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Students;

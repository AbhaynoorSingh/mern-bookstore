import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handellogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (confirmLogout) {
      navigate("/AdminLogin");
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: "rgba(0,0,0,0.2)",
        backdropFilter: "blur(10px)",
        padding: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/AdminUi">
          Admin Dashboard
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-2">
            <li className="nav-item">
              <Link className="nav-link" to="/AdminUi">
                Add Books
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/Allbooks">
                All Books
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/Students">
                Users
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/Issuereq">
                Requests
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/issued">
                Issued
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/feedbackUser">
                Feedback
              </Link>
            </li>

            <li className="nav-item">
              <button
                onClick={handellogout}
                className="btn btn-danger"
                style={{
                  borderRadius: "10px",
                  padding: "8px 16px",
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

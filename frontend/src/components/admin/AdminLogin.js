import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [admindata, setUserData] = useState({
    name: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({
      ...admindata,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!admindata.name) {
      errors.name = "Please enter your name";
    }

    if (!admindata.password) {
      errors.password = "Please enter your password";
    } else if (admindata.password !== "admin123") {
      errors.password = "Incorrect password";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/admin", {
        method: "POST",
        body: JSON.stringify(admindata),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log("Response from server:", data);

      navigate("/AdminUi");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right,#0f172a,#1e3a5f)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "420px",
          padding: "40px",
          borderRadius: "25px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <div className="text-center mb-4">
          <h1
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: "3rem",
            }}
          >
            Admin Login
          </h1>

          <p
            style={{
              color: "#cbd5e1",
            }}
          >
            BOOKSTORE Dashboard
          </p>
        </div>

        <form method="POST" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              style={{
                color: "white",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Username
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={admindata.name}
              onChange={handleChange}
              className="form-control"
              style={{
                padding: "14px",
                borderRadius: "14px",
                border: "none",
                background: "rgba(255,255,255,0.12)",
                color: "white",
              }}
            />

            {formErrors.name && (
              <p
                style={{
                  color: "#ff6b6b",
                  marginTop: "5px",
                }}
              >
                {formErrors.name}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              style={{
                color: "white",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Password
            </label>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                name="password"
                value={admindata.password}
                onChange={handleChange}
                className="form-control"
                style={{
                  padding: "14px",
                  borderRadius: "14px 0 0 14px",
                  border: "none",
                  background: "rgba(255,255,255,0.12)",
                  color: "white",
                }}
              />

              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="btn btn-light"
                style={{
                  borderRadius: "0 14px 14px 0",
                  fontWeight: "bold",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {formErrors.password && (
              <p
                style={{
                  color: "#ff6b6b",
                  marginTop: "5px",
                }}
              >
                {formErrors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              background: "linear-gradient(to right,#2563eb,#7c3aed)",
              color: "white",
              padding: "14px",
              borderRadius: "14px",
              border: "none",
              fontSize: "18px",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            Login
          </button>

          <div className="text-center mt-4">
            <Link
              to="/"
              style={{
                color: "#cbd5e1",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              ← Back to User Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;

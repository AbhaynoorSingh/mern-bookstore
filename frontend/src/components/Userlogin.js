import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import UserContext from "../Usercontext";

function Userlogin() {
  const { userdata, setuserdata } = useContext(UserContext);
  const [error, seterror] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    let isvalid = true;

    if (!userdata.name) {
      errors.name = "fill the username";
      isvalid = false;
    } else if (!userdata.age) {
      errors.age = "fill the age";
      isvalid = false;
    } else if (!userdata.phoneno || userdata.phoneno.length < 9) {
      errors.phoneno = "fill the phoneno";
      isvalid = false;
    }
    seterror(errors);

    return isvalid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserdata({
      ...userdata,
      [name]: value,
    });
    console.log(userdata);
  };

  const handelsubmit = async (e) => {
    e.preventDefault();
    console.log(userdata);

    validateForm();
    if (!validateForm()) {
      return;
    }
    try {
      navigate("/Ui");
      const response = await fetch("http://localhost:8080/user", {
        method: "POST",
        body: JSON.stringify(userdata),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("response from server", data);
    } catch (err) {
      console.log("error sending data", err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #6dd5ed 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <form
          method="Post"
          onSubmit={handelsubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              color: "white",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            BOOKSTORE
          </h1>

          <p
            style={{
              textAlign: "center",
              color: "#f1f1f1",
              marginBottom: "20px",
            }}
          >
            Student Login Portal
          </p>

          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            value={userdata.name}
            onChange={handleChange}
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              fontSize: "16px",
            }}
          />

          {error.name && <span style={{ color: "#ffb3b3" }}>{error.name}</span>}

          <input
            type="number"
            placeholder="Enter your Age"
            name="age"
            value={userdata.age}
            onChange={handleChange}
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              fontSize: "16px",
            }}
          />

          {error.age && <span style={{ color: "#ffb3b3" }}>{error.age}</span>}

          <input
            type="tel"
            placeholder="Enter your phone number"
            name="phoneno"
            value={userdata.phoneno}
            onChange={handleChange}
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              fontSize: "16px",
            }}
          />

          {error.phoneno && (
            <span style={{ color: "#ffb3b3" }}>{error.phoneno}</span>
          )}

          <button
            type="submit"
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              background: "#00c853",
              color: "white",
              fontSize: "17px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Login
          </button>

          <Link
            to="/AdminLogin"
            style={{
              textAlign: "center",
              textDecoration: "none",
              color: "white",
              fontWeight: "500",
              marginTop: "10px",
            }}
          >
            Admin Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Userlogin;

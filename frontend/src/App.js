import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Ui from "./components/Ui";
import Userlogin from "./components/Userlogin";
import AdminLogin from "./components/admin/AdminLogin";
import AdminUi from "./components/admin/AdminUi";
import Allbooks from "./components/admin/Allbooks";
import Students from "./components/admin/Students";
import Issuebooks from "./components/Issuebooks";
import IssueReq from "./components/admin/IssueReq";
import Home from "./components/Home";
import Issued from "./components/admin/Issued";
import Feedback from "./components/Feedback";
import FeedbackUser from "./components/admin/FeedbackUser";

import UserContext from "./Usercontext";

import "./App.css";

function App() {
  const [Acess, setAcess] = useState("");

  const [userdata, setuserdata] = useState({
    name: "",
    age: "",
    phoneno: "",
  });

  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/allbooks")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBooks(data);
      });
  }, []);

  return (
    <div className="app-background">
      <UserContext.Provider value={{ setAcess, Acess, userdata, setuserdata }}>
        <Container fluid className="p-0">
          <Routes>
            <Route path="/" element={<Userlogin />} />

            <Route path="/AdminLogin" element={<AdminLogin />} />

            <Route path="/Ui" element={<Ui />} />

            <Route path="/AdminUi" element={<AdminUi />} />

            <Route path="/allbooks" element={<Allbooks />} />

            <Route path="/students" element={<Students />} />

            <Route path="/Issuebooks" element={<Issuebooks />} />

            <Route path="/Issuereq" element={<IssueReq />} />

            <Route path="/home" element={<Home />} />

            <Route path="/issued" element={<Issued />} />

            <Route path="/feedback" element={<Feedback />} />

            <Route path="/feedbackUser" element={<FeedbackUser />} />
          </Routes>
        </Container>
      </UserContext.Provider>
    </div>
  );
}

export default App;

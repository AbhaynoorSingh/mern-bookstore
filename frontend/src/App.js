import React, { useState,useMemo,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Userlogin from './components/Userlogin';
import AdminLogin from './components/admin/AdminLogin';

import AdminUi from './components/admin/AdminUi';

import AdminNavbar from './components/admin/AdminNavbar';
import UserContext from './Usercontext';
import Allbooks from './components/admin/Allbooks'
import Usernavbar from './components/Usernavbar'

import Ui from './components/Ui';
import Students from './components/admin/Students';
import Issuebooks from './components/Issuebooks';
import IssueReq from './components/admin/IssueReq';
import Home from './components/Home';
import Issued from './components/admin/Issued';
import Feedback from './components/Feedback';
import FeedbackUser from './components/admin/FeedbackUser';

function App() {


  const [Acess, setAcess] = useState("")

  const [userdata, setuserdata] = useState({
    name: "",
    age: "",
    phoneno: ""
  });

  const [books, setBooks] = useState([]);
  useEffect(() => {
  fetch("http://localhost:8080/allbooks")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setBooks(data);
    });
  }, []);



  return (

    <div>


      <UserContext.Provider value={{ setAcess, Acess, userdata, setuserdata }}>

        <Routes>
          <Route path='/Ui' element={<Ui />}></Route>
          <Route path='/' element={<Userlogin />}></Route>
          <Route path='/AdminLogin' element={<AdminLogin />}></Route>
          <Route path='AdminUi' element={<AdminUi />}></Route>
          <Route path='allbooks' element={<Allbooks />}></Route>
          <Route path='students' element={<Students />}></Route>
          <Route path='/Issuebooks' element={<Issuebooks />}></Route>
          <Route path='/Issuereq' element={<IssueReq />}></Route>
          <Route path='/home' element={<Home></Home>}></Route>
          <Route path='/issued' element={<Issued></Issued>}></Route>
          <Route path='/feedback' element={<Feedback></Feedback>}></Route>
          <Route path='/feedbackUser' element={<FeedbackUser></FeedbackUser>}></Route>
        </Routes>
      </UserContext.Provider>
    </div>

  );
}

export default App;

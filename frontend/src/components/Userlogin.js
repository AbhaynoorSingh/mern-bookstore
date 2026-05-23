import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserContext from '../Usercontext';

function Userlogin() {

  const { userdata, setuserdata } = useContext(UserContext)
  const [error, seterror] = useState({})
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {}
let isvalid = true;

    if (!userdata.name) {
      errors.name = "fill the username"
       isvalid= false;
    } else if (!userdata.age) {
      errors.age = "fill the age"
       isvalid= false;
    }
    else if (!userdata.phoneno || userdata.phoneno.length<9) {
      errors.phoneno = "fill the phoneno"
       isvalid= false;
    }
    seterror(errors)

   return isvalid 
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserdata({
      ...userdata,
      [name]: value
    });
    console.log(userdata)
  };

  const handelsubmit = async (e) => {
    e.preventDefault();
    console.log(userdata);

    validateForm()
    if (!validateForm()) {
      return;
    }
    try {
      navigate('/Ui')
      const response = await fetch("http://localhost:8080/user", {
        method: "POST",
        body: JSON.stringify(userdata),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('response from server', data);


    } catch (err) {
      console.log('error sending data', err);
    }
  };

  return (
    <div style={{ padding: '20px', backgroundImage: 'url(https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundPosition: "center", height: "100vh", backgroundRepeat: "no-repeat" }}>
      <div className="container" style={{ maxWidth: '600px', margin: '150px  auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
        <form method='Post' onSubmit={handelsubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h1 style={{ textAlign: 'center' }}>Student Form</h1>

          <input
            type='text'
            placeholder='Enter your name'
            name='name'
            value={userdata.name}
            onChange={handleChange}
            style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          {error.name && <span style={{ color: 'red' }}>{error.name}</span>}
          <input
            type='number'
            placeholder='Enter your Age'
            name='age'
            value={userdata.age}
            onChange={handleChange}
            style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
  {error.age && <span style={{ color: 'red' }}>{error.age}</span>}
          <input
            type='tel'
            placeholder='Enter your phoneno'
            name='phoneno'
            value={userdata.phoneno}
            onChange={handleChange}
            style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
 {error.phoneno && <span style={{ color: 'red' }}>{error.phoneno}</span>}
          <input
            type="submit"
            value="Login"
            style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white' }}
          />

          <Link to="/AdminLogin" style={{ textAlign: 'center', textDecoration: 'none', color: '#007BFF' }}>Admin login</Link>
        </form>
      </div>
    </div>
  );
}

export default Userlogin;

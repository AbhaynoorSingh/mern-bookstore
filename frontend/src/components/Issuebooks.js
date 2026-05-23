import React from 'react'
import Usernavbar from "./Usernavbar"
import { useState, useEffect } from 'react';
import UserContext from '../Usercontext';
import { useContext } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import Aos from 'aos';

function Issuebooks() {
  const { setAcess, Acess, userdata, setuserdata } = useContext(UserContext)
  const [issue, setissue] = useState([]);
  const [tableDisplay, setTableDisplay] = useState("grid")
  const [cardDisplay, setCardDisplay] = useState("none")
  const [buttonTxt, setButtonTxt] = useState("Card")


  const handleTable = () => {
    if (tableDisplay === "none") {
      setTableDisplay("grid");
      setCardDisplay("none")
      setButtonTxt("Card")
    } else if (tableDisplay === "grid") {
      setTableDisplay("none");
      setCardDisplay("flex")
      setButtonTxt("Table")
    }
  };

  const background = "https://t3.ftcdn.net/jpg/04/47/19/30/360_F_447193040_0MTKO703A5olX1bC1lON7F4kHiPKEtte.jpg"

  const card = "https://static.vecteezy.com/system/resources/thumbnails/029/861/640/small_2x/open-book-on-blue-background-back-to-school-concept-copy-space-generative-ai-photo.jpg"

  const fetchdata = async () => {
    const response = await fetch("http://localhost:8080/issuedbooks", {
      method: "GET"

    })
    const data = await response.json();
    console.log(data)
    setissue(data);
  }
  useEffect(() => {
    fetchdata()
    AOS.init({duration:"1000"})
  }, [issue])

  const Returnbook = async (bookid) => {
    const response = await fetch("http://localhost:8080/issuebooksdelete", {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id: bookid })
    })
    if (response.ok) {
      console.log("done")
    } else {
      console.log("error")
    }
  }

  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", height: "100vh" }}>
      <Usernavbar />

      <h1 style={{ margin: "20px", textAlign: "center", backdropFilter: "blur(3px)", backgroundColor: "grey",color:"white" }}>Issued by User {userdata.name}</h1>
      <button type="button" style={{ margin: "10px", maxWidth: "100%" }} onClick={handleTable} class="btn btn-info">View in {buttonTxt}</button>


      <div style={{ display: tableDisplay }} className="table-responsive" data-aos="fade-down">
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Student</th>
              <th scope="col">Book_Name</th>
              <th scope="col">Date</th>
              <th scope="col">Author</th>
              <th scope="col">Price</th>
              <th scope="col">Issued</th>
              <th scope="col">Return</th>


            </tr>
          </thead>
          <tbody>
            {issue.map((data, index) => (
              <tr key={index}>
                <td>{data.student}</td>
                <td>{data.name}</td>
                <td>{data.date}</td>
                <td>{data.author}</td>
                <td>{data.price}</td>
                <td>YES</td>
                <td>
                  <button onClick={() => Returnbook(data._id)} type="button" className="btn btn-outline-warning">Return</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: cardDisplay }} class="row row-cols-2 row-cols-md-3 g-0">
        {issue.map((data, index) => (
          <div>
            <div className="card" style={{ margin: "12px", backgroundImage: `url(${card})`, backgroundPosition: "center", boxShadow: '12px 12px 12px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", backdropFilter: "blur(2px)" }} className="card-body">
                <h5 className="card-title"> {data.name}</h5>
                <h5 className="card-title"> {data.date}</h5>
                <h5 className="card-title"> {data.author}</h5>
                <h5 className="card-title"> {data.price}$ </h5>
                <button onClick={() => Returnbook(data._id)} type="button" className="btn btn-outline-warning">Return</button>


              </div>

            </div>

          </div>

        ))}
      </div>
    </div>
  )
}

export default Issuebooks

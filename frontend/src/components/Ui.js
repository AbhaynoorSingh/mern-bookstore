import React, { useEffect, useState, useContext } from 'react';
import Usernavbar from "./Usernavbar";
import UserContext from '../Usercontext';
import 'aos/dist/aos.css';
import AOS from 'aos';

function Ui() {
  const { setAcess, Acess, userdata } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [pendingBooks, setPendingBooks] = useState({});
  const [image, setimage] = useState()
  const [searchdata, setsearchdata] = useState("")
  const [finddata, setfinddata] = useState([])
  const[tableDisplay,setTableDisplay]=useState("grid")
  const[cardDisplay,setCardDisplay]=useState("none")
  const[buttonTxt,setButtonTxt]=useState("Card")
 

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
console.log(tableDisplay)


  const background="https://t3.ftcdn.net/jpg/04/47/19/30/360_F_447193040_0MTKO703A5olX1bC1lON7F4kHiPKEtte.jpg"

  const card = "https://static.vecteezy.com/system/resources/thumbnails/029/861/640/small_2x/open-book-on-blue-background-back-to-school-concept-copy-space-generative-ai-photo.jpg"
  

  const images = () => {
    setimage("https://media.tenor.com/Jf0DeFnXWw0AAAAM/books-reading.gif")
  }


  const fetchData = async () => {
    const response = await fetch("http://localhost:8080/allbooks", {
      method: "GET"
    });
    const result = await response.json();
    console.log(result);
    setData(result);
  };

  useEffect(() => {
    fetchData();
    images()
    AOS.init({ duration: 1000 })
  }, []);

  const requestBook = async (name, date, author, price, index, student) => {
    const response = await fetch("http://localhost:8080/requestIssue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, date, author, price, student })
    });
    const result = await response.json();
    console.log(result);
    setPendingBooks(prevState => ({
      ...prevState,
      [index]: "Request Pending"
    }));
  };

  let style = {
    fontSize: "20px"
  }

  const handelchange = (e) => {
    const { name, value } = e.target;
    setsearchdata({
      ...searchdata,
      [name]: value,
    });
  }
  console.log(searchdata)

  const submit = async (e) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:8080/search?name=${encodeURIComponent(searchdata.name)}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    console.log("data", data)
    setfinddata(data);
    console.log("fetch", response)
  }

  return (
    <div style={{backgroundImage:`url(${background})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center",height:"100vh"}}>

      <Usernavbar />

       
      <form style={{margin:"20px"}} className="d-flex" role="search" method='GET' onSubmit={submit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search books"
          aria-label="Search"
          name="name"
          value={searchdata.name}
          onChange={handelchange}
        />
        <button className="btn btn-outline-success" type="submit">
          Search 
        </button>
      </form>
      
      <table className="table">
        <thead className="table">
          </thead>
        <tbody>
          {finddata.map((book, index) => (
            

            <tr key={index}>
             <td > {<img style={{ height: "50px" }} src={image} alt="loading" />}</td>
              <td >{book.name}</td>
              <td >{book.date}</td>
              <td >{book.author}</td>
              <td >{book.price}$</td>
              <td>
              <button style={{ marginTop: "7px" }}
                  onClick={() => requestBook(book.name, book.date, book.author, book.price, index, userdata.name)}
                  className="btn btn-outline-success"
                >
                  {pendingBooks[index] || "Request Issue"}
                </button>
              </td>
            </tr>
          ))}
           
        </tbody>
      </table>

      <h1 style={{ textAlign: "center", margin: "30px,0px,0px,0px", backgroundColor: "grey", color: "white" }}>Available Books</h1>
      
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">

  <button type="button" style={{margin:"10px",width:"100px"}} onClick={handleTable} class="btn btn-info">View in {buttonTxt}</button>
</div>
      <div  style={{display:tableDisplay}} className="table-responsive " data-aos="zoom-in-down">
      <table className="table">
        <thead className="table-light">
          <tr>
            <th scope="col">images</th>
            <th scope="col">Book_Name</th>
            <th scope="col">Date</th>
            <th scope="col">Author</th>
            <th scope="col">Price</th>
            <th scope="col">Issue</th>
          </tr>
        </thead>
        <tbody>
          {data.map((book, index) => (
            <tr key={index}>
              <td > {<img style={{ height: "50px" }} src={image} alt="loading" />}</td>
              <td style={style}>{book.name}</td>
              <td style={style}>{book.date}</td>
              <td style={style}>{book.author}</td>
              <td style={style}>{book.price}$</td>
              <td style={style}>
                <button style={{ marginTop: "7px" }}
                  onClick={() => requestBook(book.name, book.date, book.author, book.price, index, userdata.name)}
                  className="btn btn-outline-success"
                >
                  {pendingBooks[index] || "Request Issue"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
</div>
<div  style={{display:cardDisplay}} class="row row-cols-2 row-cols-md-3 g-0">
  


{data.map((book,index)=>(
  <div>
<div  className="card" style={{margin:"12px",backgroundImage:`url(${card})`,backgroundPosition:"center", boxShadow: '12px 12px 12px rgba(0, 0, 0, 0.1)'}}>
  <div style={{display:"flex",flexDirection:"column",justifyContent:"center",backdropFilter:"blur(2px)"}} className="card-body">
    <h5 className="card-title"> {book.name}</h5>
    <h5 className="card-title"> {book.date}</h5>
    <h5 className="card-title"> {book.author}</h5>
    <h5 className="card-title"> {book.price}$ </h5>
    <button style={{ marginTop: "7px" }}
                  onClick={() => requestBook(book.name, book.date, book.author, book.price, index, userdata.name)}
                  className="btn btn-outline-success"
                >
                  {pendingBooks[index] || "Request Issue"}
                </button>
    
  </div>
  
 </div>

    </div>

))}

</div>
</div>
   
  );
}

export default Ui;

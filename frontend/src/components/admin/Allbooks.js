import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';

function Allbooks() {
  const [books, setBooks] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [findData, setFindData] = useState([]);
  const [iDisplay, setDisplay] = useState("none");
  const [update, setUpdate] = useState({
    id: "",
    name: "",
    date: "",
    author: "",
    price: ""
  });

  const fetchData = async () => {
    const response = await fetch("http://localhost:8080/allbooks", {
      method: "GET"
    });
    const data = await response.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchData();
  }, [books]);

  const deleteBooks = async () => {
    const result = await fetch("http://localhost:8080/allbooksdelete", {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (!result.ok) {
      const errData = await result.json();
      console.error('Error deleting resource:', errData);
    } else {
      console.log("All books deleted");
      fetchData();
    }
  };

  const deleteBook = async (bookId) => {
    const result = await fetch("http://localhost:8080/allbookdelete", {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id: bookId })
    });
    if (!result.ok) {
      const errData = await result.json();
      console.error('Error deleting resource:', errData);
    } else {
      console.log("Book deleted");
      fetchData();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/search?name=${encodeURIComponent(searchData.name)}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    setFindData(data);
    if(findData){
      setDisplay("contents")
    }else if(!findData){
      setDisplay("none")
    }
  };
 

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdate({
      ...update,
      [name]: value,
    });
  };

  const handleUpdateClick = (book) => {
    setUpdate({
      id: book._id,
      name: book.name,
      date: book.date,
      author: book.author,
      price: book.price,
    });
  };

  const updateData = async (id) => {
    const response = await fetch(`http://localhost:8080/update/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: update.name,
        date: update.date,
        author: update.author,
        price: update.price,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      fetchData();
    } else {
      const errorData = await response.json();
      console.error('Error updating resource:', errorData);
    }
  };
  
  return (
    <div style={{ backdropFilter: "blur(10px)",backgroundColor:"aliceblue",height:"100vh",width:"100%" }}>
      <AdminNavbar />

      <form style={{ margin: "40px" }} className="d-flex" role="search" method='GET' onSubmit={submit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search books"
          aria-label="Search"
          name="name"
          value={searchData.name}
          onChange={handleChange}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>

      <table style={{ marginTop: "10px" }} className="table">
        <thead style={{ display: iDisplay, marginTop: "10px",width:"100vh" }}>
          <tr>
            <th scope="col">Book_Name</th>
            <th scope="col">Date</th>
            <th scope="col">Author</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {findData.map((book, index) => (
            <tr key={index}>
              <td>{book.name}</td>
              <td>{book.date}</td>
              <td>{book.author}</td>
              <td>{book.price}$</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1 style={{ textAlign: "center" }}>All books</h1>
      <button style={{ margin: "20px", float: "right" }} onClick={deleteBooks} type="button" className="btn btn-danger">Delete all books</button>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Book_Name</th>
            <th scope="col">Date</th>
            <th scope="col">Author</th>
            <th scope="col">Price</th>
            <th scope="col">update</th>
            <th scope="col">remove</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <th scope="row">{book.name}</th>
              <td>{book.date}</td>
              <td>{book.author}</td>
              <td>{book.price}</td>
              <td>
                <button onClick={() => handleUpdateClick(book)} type="button" className="btn btn-success">update</button>
              </td>
              <td>
                <button onClick={() => deleteBook(book._id)} type="button" className="btn btn-danger">X</button>
              </td>
            </tr>
          ))}
          {update.id && (
            <tr>
              <td colSpan="6">
                <form style={{ display: "flex", gap: "10px" }} onSubmit={() => { updateData(update.id) }}>
                  <input
                    type="text"
                    placeholder="Enter the name"
                    name="name"
                    value={update.name}
                    onChange={handleUpdateChange}
                  />
                  <input
                    type="text"
                    placeholder="Enter the date"
                    name="date"
                    value={update.date}
                    onChange={handleUpdateChange}
                  />
                  <input
                    type="text"
                    placeholder="Enter the author"
                    name="author"
                    value={update.author}
                    onChange={handleUpdateChange}
                  />
                  <input
                    type="text"
                    placeholder="Enter the price"
                    name="price"
                    value={update.price}
                    onChange={handleUpdateChange}
                  />
                  <button type="submit" className="btn btn-success">submit</button>
                </form>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Allbooks;

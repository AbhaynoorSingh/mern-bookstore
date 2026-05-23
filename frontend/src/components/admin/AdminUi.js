import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';

function AdminUi() {


  const [rows, setRows] = useState([{ name: '', date: '', author: '', price: '' }]);

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(rows);
      const response = await fetch('http://localhost:8080/addbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rows)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
 
   
   
  
  return (
    <div style={{backgroundColor:"aliceblue",height:"100vh",width:"100%"}}>
      <AdminNavbar />
      <div className="Books">
        <h1 style={{ textAlign: "center", margin: "30px" }}>Add Books</h1>
        
        <form method='POST' onSubmit={handleSubmit}>
          <table  className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
                <th scope="col">Author Name</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Book name"
                      value={row.name}
                      onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      className="form-control"
                      value={row.date}
                      onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter author name"
                      value={row.author}
                      onChange={(e) => handleInputChange(index, 'author', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter price"
                      value={row.price}
                      onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="submit" style={{ margin: "20px" }} className="btn btn-primary">Submit all books</button>
        </form>
      </div>
    </div>
  );
}

export default AdminUi;

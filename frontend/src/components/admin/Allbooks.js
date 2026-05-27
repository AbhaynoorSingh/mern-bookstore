import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";

function Allbooks() {
  const [books, setBooks] = useState([]);
  const [searchData, setSearchData] = useState({
    name: "",
  });
  const [findData, setFindData] = useState([]);
  const [searched, setSearched] = useState(false);
  const [message, setMessage] = useState("");

  const [update, setUpdate] = useState({
    id: "",
    name: "",
    date: "",
    author: "",
    price: "",
  });

  const fetchData = async () => {
    const response = await fetch("http://localhost:8080/allbooks", {
      method: "GET",
    });

    const data = await response.json();

    setBooks(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteBooks = async () => {
    const result = await fetch("http://localhost:8080/allbooksdelete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!result.ok) {
      const errData = await result.json();

      console.error("Error deleting resource:", errData);
    } else {
      console.log("All books deleted");
      setMessage("Books deleted successfully!");

      setTimeout(() => {
        setMessage("");
      }, 3000);
      fetchData();
    }
  };

  const deleteBook = async (bookId) => {
    const result = await fetch("http://localhost:8080/allbookdelete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: bookId }),
    });

    if (!result.ok) {
      const errData = await result.json();

      console.error("Error deleting resource:", errData);
    } else {
      console.log("Book deleted");
      setMessage("Book deleted successfully!");

      setTimeout(() => {
        setMessage("");
      }, 3000);
      fetchData();

      setFindData((prev) => prev.filter((book) => book._id !== bookId));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSearchData({
      ...searchData,
      [name]: value,
    });

    if (value === "") {
      setSearched(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!searchData.name || searchData.name.trim() === "") {
      setSearched(false);
      setFindData([]);
      return;
    }

    const response = await fetch(
      `http://localhost:8080/search?name=${encodeURIComponent(searchData.name)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    setFindData(data);
    setSearched(true);
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: update.name,
        date: update.date,
        author: update.author,
        price: update.price,
      }),
    });

    if (response.ok) {
      setMessage("Book updated successfully!");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      fetchData();

      setUpdate({
        id: "",
        name: "",
        date: "",
        author: "",
        price: "",
      });
    } else {
      const errorData = await response.json();

      console.error("Error updating resource:", errorData);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #141e30, #243b55)",
        paddingBottom: "40px",
      }}
    >
      {message && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#22c55e",
            color: "white",
            padding: "12px 20px",
            borderRadius: "10px",
            zIndex: "999",
            fontWeight: "bold",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          {message}
        </div>
      )}
      <AdminNavbar />

      <div className="container py-4">
        <form
          style={{ marginBottom: "40px" }}
          className="d-flex"
          role="search"
          method="GET"
          onSubmit={submit}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search books..."
            aria-label="Search"
            name="name"
            value={searchData.name}
            onChange={handleChange}
          />

          <button className="btn btn-success" type="submit">
            Search
          </button>
        </form>

        <h1
          style={{
            textAlign: "center",
            color: "white",
            marginTop: "40px",
            marginBottom: "30px",
            fontWeight: "bold",
          }}
        >
          All Books
        </h1>

        <div className="text-end mb-4">
          <button
            onClick={deleteBooks}
            type="button"
            className="btn btn-danger btn-lg"
          >
            Delete All Books
          </button>
        </div>

        {searched && findData.length === 0 && (
          <h3
            style={{
              color: "white",
              textAlign: "center",
              marginTop: "30px",
            }}
          >
            No books found 📚
          </h3>
        )}

        <div className="row">
          {(Array.isArray(searched ? findData : books)
            ? searched
              ? findData
              : books
            : []
          ).map((book, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div
                className="card h-100"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "none",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                }}
              >
                <div
                  style={{
                    height: "180px",
                    background:
                      "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: "40px",
                  }}
                >
                  📚
                </div>

                <div className="card-body">
                  <h4 className="card-title">{book.name}</h4>

                  <p className="card-text">
                    <strong>Author:</strong> {book.author}
                  </p>

                  <p className="card-text">
                    <strong>Date:</strong> {book.date}
                  </p>

                  <p className="card-text">
                    <strong>Price:</strong> ₹{book.price}
                  </p>

                  <div className="d-flex gap-2 mt-3">
                    <button
                      onClick={() => handleUpdateClick(book)}
                      className="btn btn-success w-100"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => deleteBook(book._id)}
                      className="btn btn-danger w-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {update.id && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            zIndex: "1000",
            width: "400px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
          }}
        >
          <h3 className="mb-4 text-center">Update Book</h3>

          <form
            className="d-flex flex-column gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              updateData(update.id);
            }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              name="name"
              value={update.name}
              onChange={handleUpdateChange}
            />

            <input
              type="text"
              className="form-control"
              placeholder="Enter date"
              name="date"
              value={update.date}
              onChange={handleUpdateChange}
            />

            <input
              type="text"
              className="form-control"
              placeholder="Enter author"
              name="author"
              value={update.author}
              onChange={handleUpdateChange}
            />

            <input
              type="text"
              className="form-control"
              placeholder="Enter price"
              name="price"
              value={update.price}
              onChange={handleUpdateChange}
            />

            <button type="submit" className="btn btn-success">
              Update Book
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() =>
                setUpdate({
                  id: "",
                  name: "",
                  date: "",
                  author: "",
                  price: "",
                })
              }
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Allbooks;

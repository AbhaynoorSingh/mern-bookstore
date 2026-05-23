import React, { useEffect, useState, useContext } from "react";
import Usernavbar from "./Usernavbar";
import UserContext from "../Usercontext";
import "aos/dist/aos.css";
import AOS from "aos";

function Ui() {
  const { userdata } = useContext(UserContext);

  const [data, setData] = useState([]);
  const [pendingBooks, setPendingBooks] = useState({});
  const [searchdata, setsearchdata] = useState("");
  const [finddata, setfinddata] = useState([]);

  const background =
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop";

  useEffect(() => {
    fetchData();

    AOS.init({
      duration: 1000,
    });
  }, []);

  const fetchData = async () => {
    const response = await fetch("http://localhost:8080/allbooks", {
      method: "GET",
    });

    const result = await response.json();

    setData(result);
  };

  const requestBook = async (name, date, author, price, index, student) => {
    const response = await fetch("http://localhost:8080/requestIssue", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        date,
        author,
        price,
        student,
      }),
    });

    const result = await response.json();

    console.log(result);

    setPendingBooks((prevState) => ({
      ...prevState,
      [index]: "Pending",
    }));
  };

  const handelchange = (e) => {
    const { name, value } = e.target;

    setsearchdata({
      ...searchdata,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:8080/search?name=${encodeURIComponent(searchdata.name)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const result = await response.json();

    setfinddata(result);
  };

  const booksToDisplay = finddata.length > 0 ? finddata : data;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Usernavbar />

      <div
        className="container-fluid"
        style={{
          background: "rgba(0,0,0,0.6)",
          minHeight: "100vh",
          paddingBottom: "50px",
        }}
      >
        <div className="container py-5">
          <div className="text-center text-white mb-5" data-aos="fade-down">
            <h1
              style={{
                fontSize: "4rem",
                fontWeight: "bold",
              }}
            >
              Welcome {userdata.name}
            </h1>

            <p
              style={{
                fontSize: "1.2rem",
                opacity: "0.8",
              }}
            >
              Explore your digital BOOKSTORE
            </p>
          </div>

          <form
            className="d-flex mb-5"
            role="search"
            method="GET"
            onSubmit={submit}
          >
            <input
              className="form-control form-control-lg me-3"
              type="search"
              placeholder="Search your favorite books..."
              aria-label="Search"
              name="name"
              value={searchdata.name}
              onChange={handelchange}
              style={{
                borderRadius: "15px",
                border: "none",
                padding: "15px",
              }}
            />

            <button
              className="btn btn-success btn-lg"
              type="submit"
              style={{
                borderRadius: "15px",
                width: "140px",
              }}
            >
              Search
            </button>
          </form>

          <div className="row">
            {booksToDisplay.map((book, index) => (
              <div
                className="col-lg-4 col-md-6 mb-4"
                key={index}
                data-aos="zoom-in"
              >
                <div
                  className="card h-100"
                  style={{
                    borderRadius: "25px",
                    overflow: "hidden",
                    border: "none",
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(12px)",
                    color: "white",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                    transition: "0.3s",
                  }}
                >
                  <div
                    style={{
                      height: "220px",
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1974&auto=format&fit=crop)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>

                  <div className="card-body">
                    <h3
                      className="card-title"
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {book.name}
                    </h3>

                    <hr style={{ color: "white" }} />

                    <p className="card-text">
                      <strong>Author:</strong> {book.author}
                    </p>

                    <p className="card-text">
                      <strong>Published:</strong> {book.date}
                    </p>

                    <p className="card-text">
                      <strong>Price:</strong> ₹{book.price}
                    </p>

                    <button
                      onClick={() =>
                        requestBook(
                          book.name,
                          book.date,
                          book.author,
                          book.price,
                          index,
                          userdata.name,
                        )
                      }
                      className="btn btn-success w-100 mt-3"
                      style={{
                        borderRadius: "12px",
                        padding: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {pendingBooks[index] || "Request Issue"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ui;

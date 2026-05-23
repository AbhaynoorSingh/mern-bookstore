import React, { useEffect, useState, useContext } from "react";
import Usernavbar from "./Usernavbar";
import UserContext from "../Usercontext";
import "aos/dist/aos.css";
import AOS from "aos";

function Issuebooks() {
  const { userdata } = useContext(UserContext);

  const [issue, setissue] = useState([]);

  const background =
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop";

  useEffect(() => {
    fetchdata();

    AOS.init({
      duration: 1000,
    });
  }, []);

  const fetchdata = async () => {
    const response = await fetch(
      `http://localhost:8080/issuedbooks?student=${userdata.name}`,
      {
        method: "GET",
      },
    );

    const data = await response.json();

    setissue(data);
  };

  const Returnbook = async (bookid) => {
    const response = await fetch("http://localhost:8080/issuebooksdelete", {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        _id: bookid,
      }),
    });

    if (response.ok) {
      fetchdata();
    } else {
      console.log("error");
    }
  };

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
        style={{
          minHeight: "100vh",
          background: "rgba(0,0,0,0.65)",
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
              My Issued Books
            </h1>

            <p
              style={{
                fontSize: "1.2rem",
                opacity: "0.8",
              }}
            >
              Welcome back, {userdata.name}
            </p>
          </div>

          {issue.length === 0 ? (
            <div
              className="text-center text-white"
              style={{
                marginTop: "100px",
              }}
            >
              <h2>No books issued yet 📚</h2>
            </div>
          ) : (
            <div className="row">
              {issue.map((data, index) => (
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
                      background: "rgba(255,255,255,0.12)",
                      backdropFilter: "blur(12px)",
                      color: "white",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
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
                        {data.name}
                      </h3>

                      <hr style={{ color: "white" }} />

                      <p>
                        <strong>Author:</strong> {data.author}
                      </p>

                      <p>
                        <strong>Published:</strong> {data.date}
                      </p>

                      <p>
                        <strong>Price:</strong> ₹{data.price}
                      </p>

                      <div className="mb-3">
                        <span
                          className="badge bg-success"
                          style={{
                            padding: "10px",
                            fontSize: "14px",
                          }}
                        >
                          Issued Successfully
                        </span>
                      </div>

                      <button
                        onClick={() => Returnbook(data._id)}
                        className="btn btn-warning w-100"
                        style={{
                          borderRadius: "12px",
                          padding: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        Return Book
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Issuebooks;

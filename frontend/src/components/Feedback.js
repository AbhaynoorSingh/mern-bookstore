import React, { useState, useEffect } from "react";
import Usernavbar from "./Usernavbar";
import "aos/dist/aos.css";
import AOS from "aos";
import styles from "./Feedback.module.css";

function Feedback() {
  const [data, setdata] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const handelchange = (e) => {
    const { name, value } = e.target;

    setdata({
      ...data,
      [name]: value,
    });
  };

  const handelsubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/feedback", {
        method: "POST",

        body: JSON.stringify(data),

        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataFetch = await response.json();

      console.log("data fetch", dataFetch);

      alert("Feedback submitted successfully ✅");

      setdata({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const bg =
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop";

  return (
    <div
      className={styles.bg}
      style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <Usernavbar />

      <div
        style={{
          background: "rgba(0,0,0,0.72)",
          minHeight: "100vh",
          paddingBottom: "50px",
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 text-white mb-5" data-aos="fade-right">
              <h1
                style={{
                  fontSize: "4rem",
                  fontWeight: "bold",
                  marginBottom: "30px",
                }}
              >
                Feedback
              </h1>

              <h2
                style={{
                  marginBottom: "25px",
                  fontWeight: "bold",
                }}
              >
                We value your input!
              </h2>

              <p
                style={{
                  fontSize: "1.15rem",
                  lineHeight: "2",
                  opacity: "0.9",
                }}
              >
                Your feedback is crucial in helping us improve our BOOKSTORE.
                Whether you have suggestions, questions, or concerns, we would
                love to hear from you. Share your thoughts and help us create a
                better experience.
              </p>

              <div
                style={{
                  marginTop: "40px",
                  background: "rgba(255,255,255,0.08)",
                  padding: "25px",
                  borderRadius: "20px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <h4 style={{ marginBottom: "20px" }}>
                  📧 support@BOOKSTORE.com
                </h4>

                <h4>📞 1-800-BOOKSTORE</h4>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-left">
              <div
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(14px)",
                  borderRadius: "30px",
                  padding: "40px",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                }}
              >
                <h1
                  className="text-center text-white"
                  style={{
                    marginBottom: "35px",
                    fontWeight: "bold",
                  }}
                >
                  Send Feedback
                </h1>

                <form method="POST" onSubmit={handelsubmit}>
                  <div className="mb-4">
                    <label className="form-label text-white">Name</label>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={data.name}
                      onChange={handelchange}
                      required
                      style={{
                        padding: "12px",
                        borderRadius: "12px",
                        border: "none",
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-white">Email</label>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={data.email}
                      onChange={handelchange}
                      required
                      style={{
                        padding: "12px",
                        borderRadius: "12px",
                        border: "none",
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-white">Message</label>

                    <textarea
                      rows="5"
                      name="message"
                      className="form-control"
                      value={data.message}
                      onChange={handelchange}
                      required
                      style={{
                        padding: "12px",
                        borderRadius: "12px",
                        border: "none",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success w-100"
                    style={{
                      padding: "14px",
                      borderRadius: "14px",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Submit Feedback
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;

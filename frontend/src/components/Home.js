import React, { useEffect } from "react";
import Usernavbar from "./Usernavbar";
import "aos/dist/aos.css";
import AOS from "aos";

function Home() {
  const background =
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop";

  const box1 =
    "https://images.unsplash.com/photo-1543497415-75c0a27177c0?w=500&auto=format&fit=crop&q=60";

  const box2 =
    "https://images.unsplash.com/photo-1546521343-4eb2c01aa44b?w=500&auto=format&fit=crop&q=60";

  const box3 =
    "https://images.unsplash.com/photo-1576872381149-7847515ce5d8?w=500&auto=format&fit=crop&q=60";

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

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
          background: "rgba(0,0,0,0.7)",
          paddingBottom: "60px",
        }}
      >
        <div className="container py-5">
          <div className="text-center text-white" data-aos="fade-down">
            <h1
              style={{
                fontSize: "5rem",
                fontWeight: "bold",
                marginTop: "50px",
              }}
            >
              Welcome to BOOKSTORE
            </h1>

            <p
              style={{
                fontSize: "1.3rem",
                marginTop: "20px",
                opacity: "0.85",
              }}
            >
              Discover knowledge, imagination and inspiration
            </p>
          </div>

          <div className="mt-5" data-aos="fade-up">
            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
                borderRadius: "25px",
                padding: "40px",
                color: "white",
                boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
              }}
            >
              <h2
                style={{
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                Why Reading Matters 📚
              </h2>

              <p
                style={{
                  fontSize: "1.2rem",
                  lineHeight: "2",
                }}
              >
                Books are an endless source of knowledge. They provide
                information on a wide range of topics, from science and history
                to art and philosophy. Reading books helps us expand our
                understanding of the world, develop critical thinking skills,
                and acquire new knowledge that can be applied in our everyday
                lives.
              </p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-4 col-md-6 mb-4" data-aos="zoom-in">
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
                    height: "250px",
                    backgroundImage: `url(${box1})`,
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
                    Mental Stimulation
                  </h3>

                  <p
                    className="card-text"
                    style={{
                      marginTop: "15px",
                      lineHeight: "1.8",
                    }}
                  >
                    Reading regularly stimulates the brain, enhances focus,
                    improves concentration and develops stronger cognitive
                    abilities.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4" data-aos="zoom-in">
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
                    height: "250px",
                    backgroundImage: `url(${box2})`,
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
                    Stress Reduction
                  </h3>

                  <p
                    className="card-text"
                    style={{
                      marginTop: "15px",
                      lineHeight: "1.8",
                    }}
                  >
                    Immersing yourself in a good book can help you relax, reduce
                    stress, and mentally escape daily pressures.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4" data-aos="zoom-in">
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
                    height: "250px",
                    backgroundImage: `url(${box3})`,
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
                    Inspiration & Creativity
                  </h3>

                  <p
                    className="card-text"
                    style={{
                      marginTop: "15px",
                      lineHeight: "1.8",
                    }}
                  >
                    Books inspire creativity, encourage imagination, and help us
                    think about new possibilities and perspectives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

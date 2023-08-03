import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://movie-ticket-booking-backend.azurewebsites.net/api/Movie/Reterive/All"
        );
        setMovieList(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // const handleBookTicket = (movieId) => {
  //   const isAuthenticated = localStorage.getItem("accessToken") !== null;

  //   if (isAuthenticated) {
  //     // User is logged in, allow booking ticket
  //     // Redirect to the booking page with the movie ID
  //     window.location.href = `/booking/${movieId}`;
  //   } else {
  //     // User is not logged in, show a toast message to login
  //     toast.error("Please login to book tickets", { autoClose: 3000 });
  //   }
  // };

  return (
    <section id="home" className="mt-5">
      <div className="container mt-2 pt-2">
        {!loading ? (
          <div className="row">
            {movieList.map((movie) => (
              <div className="col-md-4 mb-5" key={movie.id}>
                <div className="card">
                  <div className="card-overlay">
                    <img
                      className="card-image"
                      src={movie.movieImage}
                      alt={movie.movieName}
                    />
                    <div className="card-content">
                      <h3 className="card-title text-primary">
                        {movie.movieName}
                      </h3>
                      <ul className="card-details">
                        <li>
                          <strong>Genre:</strong> {movie.genre}
                        </li>
                        <li>
                          <strong>Languages:</strong>{" "}
                          {movie.languages.split(",").map((language, index) => (
                            <span key={index}>{language}</span>
                          ))}
                        </li>
                        <li>
                          <strong>Description:</strong> {movie.description}
                        </li>
                      </ul>
                      {/* <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleBookTicket(movie.id)}
                      >
                        Book Tickets
                      </button> */}

                      {authStatus && (
                        <>
                          <Link
                            to={"/booking/" + movie.id}
                            className="btn btn-outline-primary btn-sm"
                          >
                            Book Ticket
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row min-vh-100 justify-content-center align-items-center">
            <div className="col-3 d-flex justify-content-center align-items-center">
              <div className="spinner-grow text-muted" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default Home;
import SeatLayout from "../SeatingLayout/SeatingLayout";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MovieService from "../../api/movieService";
import TheatreService from "../../api/theatreService";
import BookingService from "../../api/bookingService";
import "./booking.css";

const Booking = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [theatreList, setTheatreList] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState("Select Theatre");
  const [currentTheatre, setCurrentTheatre] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState(0);
  const [isSoldOut, setIsSoldOut] = useState(false);

  useEffect(() => {
    getMovie(id);
    getTheatre();
  }, [id]);

  const getMovie = async (id) => {
    try {
      const response = await MovieService.getMovie(id);
      setMovie(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getTheatre = async () => {
    try {
      const response = await TheatreService.getTheatre();
      setTheatreList(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSelectedTheatre = (theatreId, theatreName) => {
    setSelectedTheatre(theatreName);

    TheatreService.getTheatreById(theatreId)
      .then((response) => {
        setCurrentTheatre(response);
        setSelectedSeats([]);
        setAvailableSeats(response.availableSeat);
        setIsSoldOut(response.availableSeat === 0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const bookTicket = () => {
    const ticketCount = selectedSeats.length;

    if (ticketCount > 0 && ticketCount <= availableSeats) {
      const data = {
        ticketsCount: ticketCount,
        movieId: id,
        theatreId: currentTheatre.id,
        seats: selectedSeats,
      };

      BookingService.bookTicket(data)
        .then((response) => {
          toast.success(response.message, { autoClose: 5000 });
          setSelectedTheatre("Select Theatre");
          setSelectedSeats([]);
          setAvailableSeats(
            (prevAvailableSeats) => prevAvailableSeats - ticketCount
          );
        })
        .catch((error) => {
          toast.error(error.response.data.message, { autoClose: 5000 });
        });
    } else if (ticketCount === 0) {
      toast.error("Please select at least one seat", { autoClose: 5000 });
    } else {
      toast.error("Invalid ticket count", { autoClose: 5000 });
    }
  };

  const handleSeatSelect = (selectedSeat) => {
    if (selectedSeats.includes(selectedSeat)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== selectedSeat));
    } else {
      setSelectedSeats([...selectedSeats, selectedSeat]);
    }
  };

  const handleClearSelection = () => {
    setSelectedSeats([]);
  };

  return (
    <section id="booking">
      <div className="container">
        {!loading ? (
          <div className="row mt-4 pt-4 justify-content-center">
            <div className="col-md-4">
              <div className="card border-0 bg-secondary">
                <div className="card-body text-center">
                  <div>
                    <img
                      src={movie.movieImage}
                      className="img-fluid"
                      width="200"
                      height="200"
                      alt={movie.movieName}
                    />
                    <h3 className="mt-3">{movie.movieName}</h3>
                    <ul className="text-body list-unstyled mb-3">
                      <li className="mb-2">
                        <strong>Genre: </strong>
                        <span>{movie.genre}</span>
                      </li>
                      <li className="mb-2">
                        <strong>Languages: </strong>
                        {movie.languages &&
                          movie.languages
                            .split(",")
                            .map((language) => (
                              <span key={language}>{language}</span>
                            ))}
                      </li>
                      <li className="mb-2">
                        <strong>Description: </strong>
                        <span>{movie.description}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 bg-secondary">
                <div className="card-body">
                  <h4 className="card-title">Book Ticket</h4>
                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm w-100 dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {selectedTheatre}
                    </button>
                    <ul className="dropdown-menu my-1">
                      {theatreList.map((theatre) => (
                        <li key={theatre.id}>
                          <button
                            type="button"
                            className="dropdown-item"
                            onClick={() =>
                              updateSelectedTheatre(
                                theatre.id,
                                theatre.theatreName
                              )
                            }
                          >
                            {theatre.theatreName}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {currentTheatre && (
                    <div>
                      {isSoldOut ? (
                        <div className="alert alert-danger mt-3" role="alert">
                          Sorry Tickets are Sold Out !!!
                        </div>
                      ) : (
                        <div>
                          <div className="mt-3">
                            <h5>Available Seats : {availableSeats}</h5>
                          </div>
                          <div className="mt-3">
                            <h5>Tickets Count : {selectedSeats.length}</h5>
                          </div>
                          <div className="mt-3">
                            <h5>Select Seats</h5>
                            <SeatLayout
                              availableSeats={availableSeats}
                              selectedSeats={selectedSeats}
                              onSeatSelect={handleSeatSelect}
                              onClearSelection={handleClearSelection}
                            />
                          </div>
                          <div className="mt-3">
                            <button
                              type="button"
                              className="btn btn-block w-100 btn-outline-primary btn-sm"
                              onClick={bookTicket}
                            >
                              Book
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
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

export default Booking;

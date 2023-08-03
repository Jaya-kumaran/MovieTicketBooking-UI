import React, { useEffect, useState } from "react";
import TicketService from "../../api/ticketService";

const Ticket = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const ticketService = new TicketService();

    const getTickets = () => {
      ticketService
        .getTickets()
        .then((res) => {
          console.log(res);
          setTickets(res);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getTickets();
  }, []);

  return (
    <section id="home" className="mt-5">
      <div className="container mt-5 pt-5">
        {!loading ? (
          <div className="row">
            {tickets.map((ticket) => (
              <div className="col-md-6 col-lg-4 mb-5" key={ticket.id}>
                <div className="card border-0 shadow overflow-hidden">
                  <div className="row g-0">
                    <div
                      className="col-sm-5 bg-repeat-0 bg-size-cover"
                      style={{
                        backgroundImage: `url(${ticket.movie.movieImage})`,
                        minHeight: "14rem",
                      }}
                    ></div>
                    <div className="col-sm-7">
                      <div className="card-body">
                        <h4 className="card-title">{ticket.movie.movieName}</h4>
                        <p className="card-text">
                          Theatre :{" "}
                          <strong>{ticket.theatre.theatreName}</strong>
                        </p>
                        <p className="card-text">
                          No. of tickets booked:{" "}
                          <strong>{ticket.totalCount}</strong>
                        </p>
                      </div>
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
    </section>
  );
};

export default Ticket;

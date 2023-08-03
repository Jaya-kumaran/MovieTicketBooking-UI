import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch } from "@fortawesome/free-solid-svg-icons";
import "./seatlayout.css";

const SeatLayout = ({
  availableSeats,
  selectedSeats,
  onSeatSelect,
  onClearSelection,
}) => {
  function toggleSeatSelection(seatId) {
    onSeatSelect(seatId);
  }

  function handleClearSelection() {
    onClearSelection();
  }

  return (
    <div className="seat-layout">
      <div className="seats">
        {Array.from({ length: availableSeats }, (_, index) => (
          <div
            key={index}
            className={`seat ${
              selectedSeats.includes(index) ? "selected" : ""
            }`}
            onClick={() => toggleSeatSelection(index)}
          >
            <FontAwesomeIcon icon={faCouch} size="lg" />
            <span className="seat-number"></span>
          </div>
        ))}
      </div>
      <div className="selected-seats">
        <h6 style={{ marginTop: "20px" }}>Selected Seats:</h6>
        {selectedSeats.length > 0 ? (
          <ul>
            {selectedSeats.map((seat, index) => (
              <li key={index}>{seat + 1}</li>
            ))}
          </ul>
        ) : (
          <p>No seats selected</p>
        )}
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={handleClearSelection}
        >
          Clear Selection
        </button>
      </div>
    </div>
  );
};

export default SeatLayout;

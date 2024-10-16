
import React from 'react';
// Main App Component
const Seats = ({bookTicketLayout, resetDatabase}) => {

const seatLayout = bookTicketLayout.seats
  // Simulating the booked seats received from the backend
  const bookedSeatsFromBackend = bookTicketLayout.bookSeats

  // Convert backend seats to a format easy for comparison
  const bookedSeatsMap = bookedSeatsFromBackend.map(
    (seat) => `R${seat.row_number + 1}C${seat.seat_number + 1}`
  );
  
  return (
    
    <div className="seat-selector-custom">
      <h2>Select Your Seats</h2>
      <div className="button-container">
            <button className="select-seats-button" onClick={resetDatabase}>Reset DB</button>
        </div>
      <div className="seat-grid">
        {seatLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((seat, colIndex) => {
              const seatNumber = `R${rowIndex + 1}C${colIndex + 1}`;
              const isBookedByUser = bookedSeatsMap.includes(seatNumber);
              return (
                <div
                  key={colIndex}
                  className={`seat 
                    ${seat === 0 ? 'available' : 'booked'} 
                    ${isBookedByUser ? 'booked-by-user' : ''}
                    `}
                >
                  {colIndex + 1}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seats;

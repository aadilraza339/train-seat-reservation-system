import React, { useState } from 'react';
import './App.css'; // Optional for styling
import Seats from './seats';
import axios from 'axios';
import { useEffect } from 'react';

const App = () => {
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('');  // 'success' or 'error'
  const [bookTicketLayout, setBookTicketLayout] = useState({
    bookSeats: [], seats: []})

  const bookSeats = () => {
    try {
      axios.get(`http://localhost:3000/api/book-ticket/${selectedSeats}`).then((response) => {
        if (response.data.success == false) {
          setTimeout(() => {
            setMessage('')
            setShowMessage(false);
          }, 3000);
          setMessage(response.data.message)
          setMessageType('error');
          setShowMessage(true);
          return
        }

        setBookTicketLayout({
          bookSeats: response.data.data.bookSeats, seats: response.data.data.seats
        })
      })
    } catch (error) {

    }
  };
  const initializeBookSeat = () => {
    try {
      axios.get(`http://localhost:3000/api/seats`).then((response) => {

        setBookTicketLayout({
          bookSeats: [], seats: response.data.data
        })
      })
    } catch (error) {

    }
  }

  const resetDatabase = () => {
    axios.get(`http://localhost:3000/api/reset-db`).then((response) => {
      setBookTicketLayout({
        bookSeats: [], seats: response.data.data
      })
    })
  }

  useEffect(() => {
    initializeBookSeat()
  }, [])
  return (
    <>
      <Seats bookTicketLayout={bookTicketLayout} resetDatabase={resetDatabase}/>
      <div className="overlay">
      {showMessage && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}
        <div className="cart-container">
          <h2>How Many Seats?</h2>

          {/* Seat Component */}
          <SeatSelector selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} />

          {/* Select Seats button */}
          <div className="button-container">
            <button className="select-seats-button green" onClick={bookSeats}>Select Seats</button>
          </div>
        </div>

      </div>

    </>
  );
};

// SeatSelector Component
const SeatSelector = ({ selectedSeats, setSelectedSeats }) => {
  return (
    <div className="seat-selector">
      {[...Array(7)].map((_, index) => (
        <div
          key={index}
          className={`seat-option ${selectedSeats === index + 1 ? 'selected' : ''}`}
          onClick={() => setSelectedSeats(index + 1)}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default App;

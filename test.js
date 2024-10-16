function getAvailableSeats(row) {
    return seats[row].filter(seat => seat === 0).length;
}

// Function to book seats in a specific row
function bookSeatsInRow(row, numSeats) {
    let booked = [];
    for (let i = 0; i < seats[row].length && numSeats > 0; i++) {
        if (seats[row][i] === 0) {
            seats[row][i] = 1; // Mark seat as booked
            booked.push({ row, seat: i });
            numSeats--;
        }
    }
    return booked;
}

// Main function to book seats with "nearby" logic
function bookSeats(numSeats) {
    let bookedSeats = [];

    // First, try to find a row with enough seats
    for (let row = 0; row < seats.length; row++) {
        const availableSeats = getAvailableSeats(row);
        if (availableSeats >= numSeats) {
            // If enough seats are available in this row, book them all
            bookedSeats = bookSeatsInRow(row, numSeats);
            return bookedSeats;
        }
    }

    // If no single row has enough seats, book nearby seats across rows
    for (let row = 0; row < seats.length; row++) {
        let availableSeats = getAvailableSeats(row);
        console.log("row", row, "availableSeats", availableSeats, "numSeats", numSeats)
        if (availableSeats > 0) {
            // Book the available seats in this row
            const seatsToBook = Math.min(availableSeats, numSeats);
            bookedSeats.push(...bookSeatsInRow(row, seatsToBook));
            numSeats -= seatsToBook;
        }

        // Check if we still need to book more seats
        if (numSeats === 0) {
            return bookedSeats; // Return once all seats are booked
        }
    }

    // If we reach here, it means there were not enough seats
    console.log("Not enough seats available");
    return null;
}
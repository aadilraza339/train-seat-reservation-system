const express = require('express');
const knex = require('knex')(require('../knexfile').development);

const route = express.Router()

async function displaySeats() {
    try {
        // Fetch all seat data from the database
        const allSeats = await knex('seats').select('row_number', 'seat_number', 'is_reserved');

        // Create an empty array to represent the coach (11 rows with 7 seats, 1 row with 3 seats)
        const coach = [];

        // Initialize rows 1 to 11 with 7 seats per row
        for (let i = 0; i <= 11; i++) {
            coach[i] = Array(7).fill(0); // 7 seats in each row, filled with 0 (available)
        }

        // Initialize the last row (row 12) with 3 seats
        coach[11] = Array(3).fill(0); // 3 seats in the last row

        // Fill the coach with seat data from the database
        allSeats.forEach(seat => {
            const rowIndex = seat.row_number;
            const seatIndex = seat.seat_number;
            coach[rowIndex][seatIndex] = seat.is_reserved; // 1 for reserved, 0 for available
        });

        return coach;
    } catch (error) {
        console.error('Error displaying seats:', error);
    }
}

route.get('/seats', async (req, res) => {
    try {
        const seats = await displaySeats()
        res.send({
            message: 'Seats fetched successfully:',
            data: seats,
            success: true
        })

    } catch (error) {
        res.send({
            message: 'Error fetching seats:',
            data: [],
            success: false
        })
    }
})
route.get('/book-ticket/:seat', async (req, res) => {
    try {
        const numSeats = parseInt(req.params.seat);
        if (numSeats > 7 || numSeats < 0) {
            res.send({
                message: 'You can only reserve up to 7 seats at a time.',
                data: [],
                success: false
            })
        }

        const availableRow = await knex('seats')
            .where('is_reserved', false)
            .groupBy('row_number')
            .having(knex.raw('COUNT(*) >= ?', [numSeats]))
            .first();

        if (availableRow) {
            // Get available seats in the row
            const seatsToReserve = await knex('seats')
                .where({ row_number: availableRow.row_number, is_reserved: false })
                .limit(numSeats)
                .select('id', 'row_number', 'seat_number');



            // Update the seats to mark them as reserved
            await knex('seats')
                .whereIn('id', seatsToReserve.map(seat => seat.id))
                .update({ is_reserved: true });


            const seats = await displaySeats()
            res.send({
                message: 'Seats reserved successfully:',
                data: {
                    bookSeats: seatsToReserve,
                    seats: seats,
                },
                success: true
            })
        } else {
            // If no single row has enough seats, find nearby seats across multiple rows
            const nearbySeats = await knex('seats')
                .where('is_reserved', false)
                .orderBy('row_number', 'asc')
                .limit(numSeats)
                .select('id', 'row_number', 'seat_number');


            if (nearbySeats.length === numSeats) {
                // Create a new reservation entry


                // Update the seats to mark them as reserved
                await knex('seats')
                    .whereIn('id', nearbySeats.map(seat => seat.id))
                    .update({ is_reserved: true });

                const seats = await displaySeats()

                res.send({
                    message: 'Seats reserved successfully:',
                    data: {
                        bookSeats: nearbySeats,
                        seats: seats,
                    },
                    success: true
                })
            } else {
                res.send({
                    message: 'Not enough seats available.',
                    data: [],
                    success: false
                })

            }
        }

    } catch (error) {
        console.log(error);
        res.send({
            message: 'Error',
            data: [],
            success: false
        })
    }
})
route.get('/reset-db', async (req, res) => {
    try {
        await knex('seats').update({ is_reserved: 0 }).where({ is_reserved: 1 });
        const seats = await displaySeats()
        res.send({
            message: 'Database reset successfully:',
            data: seats,
            success: true
        })
    } catch (error) {
        res.send({
            message: 'Error resetting database:',
            data: [],
            success: false
        })
    }
})

module.exports = route;
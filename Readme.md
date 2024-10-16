# Train Seat Reservation System

This project is a **train seat reservation system** where users can book seats in a train coach. The coach consists of 80 seats with 7 seats per row, except for the last row, which has 3 seats. Users can reserve up to 7 seats at a time with a priority of booking seats in the same row. If seats aren't available in the same row, nearby seats will be booked.

## Features

- Users can reserve up to 7 seats in a single booking.
- Prioritizes booking seats in the same row or nearby if the row is unavailable.
- Displays seat availability in a grid format with color-coding to differentiate reserved and available seats.
- Reset the database to clear all reservations.

## Tech Stack

- **Node.js** with **Express** for the backend.
- **MySQL** as the database.
- **Knex.js** for database queries and migrations.
- **React.js** for the frontend user interface.
- **Aiven Cloud** for hosting the MySQL database.

## Prerequisites

Before you can set up and run this project, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MySQL** (v5.7 or higher, or use Aiven Cloud MySQL)
- **Git** (for version control)

## Installation

Follow these steps to set up the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/train-seat-reservation.git
cd train-seat-reservation
```

## 3. Setup the database
Make sure you have access to a MySQL database. You can use your local MySQL instance or an Aiven Cloud MySQL instance.

Create a new database in MySQL:

```sql
CREATE DATABASE train_reservation;
```

Update the .env with credentials:
## 4. Start the application
Run the application: It will run our both server
```
yarn run start
```
API Endpoints
GET /seats: Fetch all seat details, including their reservation status.
POST /seats/reserve: Reserve seats. The request body should contain the number of seats to reserve.
json
Copy code
{
  "numSeats": 4
}
`POST /seats/reset: Reset all reservations.

## Project Structure
```

├── client/               # React frontend code
├── knexfile.js           # Database configuration
├── migrations/           # Knex migration files
├── seeds/                # Knex seed files (initial data)
├── src/
│   ├── controllers/      # Backend controllers
│   ├── routes/           # Backend API routes
│   ├── models/           # Knex models for database operations
│   └── index.js          # Main backend entry point
└── README.md             # This file
```






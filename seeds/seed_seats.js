exports.seed = function(knex) {
  const seats = [];
  for (let row = 0; row <= 11; row++) {
    const seatsInRow = row === 11 ? 2 : 6;
    for (let seat = 0; seat <= seatsInRow; seat++) {
      seats.push({ row_number: row, seat_number: seat, is_reserved: false });
    }
  }
  return knex('seats').insert(seats);
};

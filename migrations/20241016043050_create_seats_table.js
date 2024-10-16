exports.up = function(knex) {
    return knex.schema.createTable('seats', function(table) {
      table.increments('id').primary(); // Unique seat ID
      table.integer('row_number').notNullable(); // Row number (1 to 12)
      table.integer('seat_number').notNullable(); // Seat number in row
      table.boolean('is_reserved').defaultTo(false); // Reserved status
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('seats');
  };
  
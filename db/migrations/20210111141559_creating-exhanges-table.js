exports.up = function (knex) {
  return knex.schema.createTable("exchanges", (exchangesTable) => {
    exchangesTable.increments("exchange_id").primary();
    exchangesTable.text("owner_id").references("users.user_id").notNullable();
    exchangesTable
      .text("requester_id")
      .references("users.user_id")
      .notNullable();
    exchangesTable.boolean("book_sent").defaultTo(false);
    exchangesTable.boolean("book_received").defaultTo(false);
    exchangesTable.integer("book_id").references("books.book_id").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("exchanges");
};

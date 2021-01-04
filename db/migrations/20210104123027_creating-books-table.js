exports.up = function (knex) {
  return knex.schema.createTable("books", (booksTable) => {
    booksTable.increments("book_id").primary();
    booksTable.integer("owner_id").references("users.user_id").notNullable();
    booksTable.text("title").notNullable();
    booksTable.specificType("authors", "varchar[]").notNullable();
    booksTable.text("description");
    booksTable.text("thumbnail");
    booksTable.integer("year").notNullable();
    booksTable.integer("ISBN").notNullable();
    booksTable
      .datetime("date_posted", { useTz: false })
      .defaultTo(knex.fn.now());
    booksTable.integer("quality").notNullable();
    booksTable.text("owner_comments");
    booksTable.specificType("photo", "bytea");
    booksTable.specificType("previous_owners", "INT[]");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("books");
};

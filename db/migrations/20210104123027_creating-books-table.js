exports.up = function (knex) {
  return knex.schema.createTable("books", (booksTable) => {
    booksTable.increments("book_id").primary();
    booksTable
      .integer("owner_id")
      .references("users.user_id")
      .onDelete("cascade")
      .notNullable();
    booksTable.text("title").notNullable();
    booksTable.text("authors").notNullable();
    booksTable.text("description");
    booksTable.text("thumbnail");
    booksTable.integer("published_year");
    booksTable.bigInteger("ISBN");
    booksTable.text("other_identifier");
    booksTable
      .datetime("date_posted", { useTz: false })
      .defaultTo(knex.fn.now());
    booksTable.integer("quality").notNullable();
    booksTable.text("owner_comments");
    booksTable.specificType("photo", "bytea");
    booksTable.specificType("previous_owners", "INT[]");
    booksTable.boolean("display_book").defaultTo(true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("books");
};

const connection = require("../db/connection");

exports.fetchAllBooks = (user_id) => {
  return connection
    .select("*")
    .from("books")
    .whereNot("owner_id", "=", user_id)
    .then((books) => {
      return {
        book_count: books.length,
        books,
      };
    });
};

exports.fetchBookById = (book_id) => {
  return connection
    .select("*")
    .from("books")
    .where("book_id", "=", book_id)
    .then((book) => {
      return book[0];
    });
};

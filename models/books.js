const connection = require("../db/connection");

exports.fetchAllBooks = () => {
  return connection
    .select("*")
    .from("books")
    .then((books) => {
      return {
        book_count: books.length,
        books,
      };
    });
};

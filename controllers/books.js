const { fetchAllBooks, fetchBookById } = require("../models/books");

exports.getAllBooks = (req, res, next) => {
  const { user_id } = req.body;
  fetchAllBooks(user_id).then((books) => {
    res.status(200).send({ books });
  });
};

exports.getBookById = (req, res, next) => {
  const { book_id } = req.params;
  fetchBookById(book_id).then((book) => {
    res.status(200).send({ book });
  });
};

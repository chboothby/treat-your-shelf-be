const {
  fetchAllBooks,
  fetchBookById,
  patchBook,
  removeBookById,
} = require("../models/books");

exports.getAllBooks = (req, res, next) => {
  const { user_id } = req.body;
  fetchAllBooks(user_id, req.query)
    .then((books) => {
      res.status(200).send({ books });
    })
    .catch(next);
};

exports.getBookById = (req, res, next) => {
  const { book_id } = req.params;
  fetchBookById(book_id)
    .then((book) => {
      res.status(200).send({ book });
    })
    .catch(next);
};

exports.updateBook = (req, res, next) => {
  const updates = req.body;
  const { book_id } = req.params;
  patchBook(updates, book_id)
    .then((book) => {
      res.status(201).send({ book });
    })
    .catch(next);
};

exports.deleteBookById = (req, res, next) => {
  const { book_id } = req.params;
  removeBookById(book_id)
    .then((book) => {
      res.status(204).send();
    })
    .catch(next);
};

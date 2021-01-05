const { fetchAllBooks } = require("../models/books");

exports.getAllBooks = (req, res, next) => {
  fetchAllBooks().then((books) => {
    res.status(200).send({ books });
  });
};

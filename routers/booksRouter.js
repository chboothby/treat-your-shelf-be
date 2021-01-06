const {
  getAllBooks,
  getBookById,
  updateBook,
} = require("../controllers/books");
const booksRouter = require("express").Router();

booksRouter.route("/").get(getAllBooks);
booksRouter.route("/:book_id").get(getBookById).patch(updateBook);

module.exports = booksRouter;
